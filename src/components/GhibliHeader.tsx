
import { Cloud, Sun, Sparkles } from "lucide-react";

const GhibliHeader = () => {
  return (
    <header className="text-center py-6 relative">
      <div className="absolute top-0 left-5 animate-float-slow opacity-70">
        <Cloud className="text-white h-10 w-10" />
      </div>
      <div className="absolute top-4 right-10 animate-float opacity-80">
        <Sun className="text-ghibli-yellow h-8 w-8" />
      </div>
      <div className="absolute top-10 left-1/4 animate-float-fast opacity-70">
        <Sparkles className="text-ghibli-yellow h-5 w-5" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-ghibli text-ghibli-darkGreen mb-2 tracking-wide">
        Ghibli Dream Wardrobe
      </h1>
      <p className="text-lg font-ghibli text-ghibli-darkGreen opacity-80">
        Magical outfits inspired by your city's spirit
      </p>
    </header>
  );
};

export default GhibliHeader;
