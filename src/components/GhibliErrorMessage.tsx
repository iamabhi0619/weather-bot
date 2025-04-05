
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface GhibliErrorMessageProps {
  error: string;
}

const GhibliErrorMessage = ({ error }: GhibliErrorMessageProps) => {
  return (
    <div className="mt-8 max-w-3xl mx-auto animate-fade-in">
      <Card className="ghibli-paper p-6 rounded-2xl border-ghibli-pink">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="h-12 w-12 text-ghibli-pink mb-4" />
          <h3 className="text-xl font-ghibli text-ghibli-darkGreen mb-2">Oh no! The spirits are resting</h3>
          <p className="storybook-text text-gray-600">
            {error || "The forest spirits couldn't find your recommendation right now. Please try again later."}
          </p>
          <p className="mt-4 font-ghibli text-sm text-ghibli-darkGreen opacity-70">
            "Sometimes we must see with our hearts instead." — Howl's Moving Castle
          </p>
        </div>
      </Card>
    </div>
  );
};

export default GhibliErrorMessage;
