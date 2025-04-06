const weatherService = require('../services/weather_service');
const geminiService = require('../services/gemini_service');

class ChatController {
  constructor() {
    this.userSessions = new Map();
  }

  async handleWeatherQuery(socketId, query) {
    try {
      // Initialize or get user session
      if (!this.userSessions.has(socketId)) {
        this.userSessions.set(socketId, {
          context: null,
          lastCity: null
        });
      }
      const session = this.userSessions.get(socketId);

      // Check if user is asking for a new city
      const cityExtraction = this._extractCity(query, session.lastCity);
      const city = cityExtraction.city;
      const isNewCity = cityExtraction.isNew;

      // Get weather data if city is mentioned or we have a last city
      let weatherData = null;
      if (city) {
        try {
          weatherData = await weatherService.getCurrentWeather(city);
          session.lastCity = city;
          session.context = 'weather';
        } catch (error) {
          if (error.status === 404) {
            return `I couldn't find weather information for ${city}. Please check the spelling or try another city.`;
          }
          throw error;
        }
      } else if (session.lastCity && this._isWeatherRelated(query)) {
        // Use last city if query is weather-related
        weatherData = await weatherService.getCurrentWeather(session.lastCity);
        session.context = 'weather';
      }

      // Handle special commands
      if (this._isSpecialCommand(query)) {
        return this._handleSpecialCommand(query, session);
      }

      // Generate AI response with context
      return await geminiService.generateResponse(query, weatherData);
    } catch (error) {
      console.error('Chat error:', { socketId, query, error: error.message });
      return "I'm having trouble processing your request. Please try again.";
    }
  }

  _extractCity(query, lastCity) {
    const originalQuery = query.trim();
    const lowerQuery = originalQuery.toLowerCase();

    const cityKeywords = [
      'weather in', 'forecast for', 'temperature in', 'climate in',
      'conditions in', 'city of', 'the forecast for', 'in', 'at', 'for', 'about'
    ];

    // Step 1: Try to find a keyword and strip it out to isolate city
    for (const keyword of cityKeywords) {
      const keywordIndex = lowerQuery.indexOf(keyword);
      if (keywordIndex !== -1) {
        const afterKeyword = originalQuery
          .slice(keywordIndex + keyword.length)
          .replace(/[?.,!]/g, '') // Remove punctuation
          .trim();
        if (afterKeyword.length > 0) {
          return { city: afterKeyword, isNew: true };
        }
      }
    }

    // Step 2: Implicit weather query
    const implicitMatch = originalQuery.match(
      /^(what(?:'s| is)|how is|tell me about)\s+(?:the )?weather(?: in| at| for)?\s*([a-zA-Z\s]+)?/i
    );
    if (implicitMatch && implicitMatch[2]) {
      return { city: implicitMatch[2].trim(), isNew: true };
    }

    // Step 3: Direct match (fallback)
    const directMatch = originalQuery.match(/^([a-zA-Z\s]{2,})$/i);
    if (directMatch && !lastCity) {
      return { city: directMatch[1].trim(), isNew: true };
    }

    // Step 4: Use last known city
    if (lastCity) {
      return { city: lastCity, isNew: false };
    }

    return { city: null, isNew: false };
  }



  _isWeatherRelated(query) {
    const weatherKeywords = [
      'weather', 'temperature', 'forecast', 'humidity',
      'wind', 'rain', 'snow', 'sunny', 'cloudy'
    ];
    return weatherKeywords.some(keyword =>
      query.toLowerCase().includes(keyword) // Fixed missing closing parenthesis
    );
  }

  _isSpecialCommand(query) {
    const commands = ['reset', 'clear', 'help', 'history'];
    return commands.some(cmd =>
      query.toLowerCase().includes(cmd) // Fixed missing closing parenthesis
    );
  }

  _handleSpecialCommand(query, session) {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('reset') || lowerQuery.includes('clear')) {
      session.lastCity = null;
      session.context = null;
      geminiService.clearHistory();
      return "Conversation reset. Ask me about any city!";
    }

    if (lowerQuery.includes('help')) {
      return "I can help with:\n🌦️ Current weather\n🗓️ Forecasts\n🧳 Travel tips\n🏙️ City information\n💡 Weather facts\nSay 'reset' to start over.";
    }

    return null;
  }
}

module.exports = new ChatController();