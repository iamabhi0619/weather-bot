
import { useState } from "react";
import GhibliHeader from "@/components/GhibliHeader";
import GhibliForm from "@/components/GhibliForm";
import GhibliResponseBox from "@/components/GhibliResponseBox";
import GhibliErrorMessage from "@/components/GhibliErrorMessage";
import GhibliFooter from "@/components/GhibliFooter";
import FloatingElements from "@/components/FloatingElements";
import { getGhibliRecommendation } from "@/services/geminiService";

const Index = () => {
  const [recommendation, setRecommendation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (city: string) => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await getGhibliRecommendation(city);
      
      if (response.error) {
        setError(response.error);
        setRecommendation("");
      } else {
        setRecommendation(response.message);
      }
    } catch (err) {
      setError("The magical spirits couldn't connect. Please try again.");
      console.error("Error fetching recommendation:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container px-4 mx-auto relative z-10 min-h-screen flex flex-col">
      <FloatingElements />
      
      <div className="flex-grow">
        <GhibliHeader />
        
        <div className="mt-8">
          <GhibliForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        
        {error ? (
          <GhibliErrorMessage error={error} />
        ) : (
          <GhibliResponseBox message={recommendation} isLoading={isLoading} />
        )}
      </div>
      
      <GhibliFooter />
    </div>
  );
};

export default Index;
