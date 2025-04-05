
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Sparkles, Wind } from "lucide-react";

interface GhibliFormProps {
  onSubmit: (city: string) => void;
  isLoading: boolean;
}

const GhibliForm = ({ onSubmit, isLoading }: GhibliFormProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) {
      toast.error("Please enter a city name");
      return;
    }
    onSubmit(city.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
      <div className="absolute -left-6 -top-4 animate-float-slow">
        <Wind className="h-5 w-5 text-ghibli-blue" />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter your city..."
          className="pr-12 border-ghibli-blue border-2 rounded-xl py-6 px-4 shadow-md font-ghibli text-lg placeholder:text-gray-400 placeholder:font-ghibli"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="absolute right-0 top-0 h-full rounded-r-xl bg-ghibli-blue hover:bg-ghibli-darkGreen transition-all duration-300 px-3"
          disabled={isLoading}
        >
          <Sparkles className="h-5 w-5 text-white" />
          <span className="sr-only">Submit</span>
        </Button>
      </div>
    </form>
  );
};

export default GhibliForm;
