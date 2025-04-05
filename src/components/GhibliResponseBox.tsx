
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface GhibliResponseBoxProps {
  message: string;
  isLoading: boolean;
}

const GhibliResponseBox = ({ message, isLoading }: GhibliResponseBoxProps) => {
  if (!message && !isLoading) return null;

  // Split message into sections for nicer formatting
  const formatMessage = (text: string) => {
    const sections = [];
    
    // Try to extract weather, outfit, and movie sections
    const weatherMatch = text.match(/Weather:?([\s\S]*?)(?=Outfit:|$)/i);
    const outfitMatch = text.match(/Outfit:?([\s\S]*?)(?=Movie Recommendation:|$)/i);
    const movieMatch = text.match(/Movie Recommendation:?([\s\S]*?)$/i);
    
    if (weatherMatch && weatherMatch[1]) {
      sections.push(
        <div key="weather" className="mb-4">
          <h3 className="text-xl font-ghibli text-ghibli-darkGreen mb-2 flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-ghibli-yellow" />
            Weather
          </h3>
          <p className="storybook-text">{weatherMatch[1].trim()}</p>
        </div>
      );
    }
    
    if (outfitMatch && outfitMatch[1]) {
      sections.push(
        <div key="outfit" className="mb-4">
          <h3 className="text-xl font-ghibli text-ghibli-darkGreen mb-2 flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-ghibli-yellow" />
            Outfit
          </h3>
          <p className="storybook-text">{outfitMatch[1].trim()}</p>
        </div>
      );
    }
    
    if (movieMatch && movieMatch[1]) {
      sections.push(
        <div key="movie" className="mb-2">
          <h3 className="text-xl font-ghibli text-ghibli-darkGreen mb-2 flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-ghibli-yellow" />
            Movie Recommendation
          </h3>
          <p className="storybook-text">{movieMatch[1].trim()}</p>
        </div>
      );
    }
    
    // If we couldn't parse the sections properly, just return the text
    if (sections.length === 0) {
      return <p className="storybook-text">{text}</p>;
    }
    
    return sections;
  };

  return (
    <div className="mt-8 max-w-3xl mx-auto animate-fade-in">
      <Card className="ghibli-paper p-6 sm:p-8 rounded-2xl">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-ghibli-blue border-t-transparent rounded-full mb-4"></div>
            <p className="font-ghibli text-ghibli-darkGreen">The spirits are crafting your magical recommendations...</p>
          </div>
        ) : (
          <div className="prose max-w-none">
            {formatMessage(message)}
          </div>
        )}
      </Card>
    </div>
  );
};

export default GhibliResponseBox;
