
import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  top: string;
  left: string;
  scale: number;
  animationDelay: string;
  type: "dustSprite" | "leaf" | "totoro" | "sootball";
}

const DustSprite = ({ className }: { className?: string }) => (
  <div className={`text-ghibli-brown ${className}`}>●</div>
);

const Leaf = ({ className }: { className?: string }) => (
  <div className={`text-ghibli-green ${className}`}>🍃</div>
);

const Totoro = ({ className }: { className?: string }) => (
  <div className={`${className}`}>となりのトトロ</div>
);

const Sootball = ({ className }: { className?: string }) => (
  <div className={`text-gray-800 ${className}`}>•</div>
);

const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Generate random floating elements
    const newElements: FloatingElement[] = [];
    const elementTypes = ["dustSprite", "leaf", "totoro", "sootball"];
    
    for (let i = 0; i < 12; i++) {
      newElements.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        scale: 0.5 + Math.random() * 1.5,
        animationDelay: `${Math.random() * 5}s`,
        type: elementTypes[Math.floor(Math.random() * elementTypes.length)] as any,
      });
    }
    
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => {
        const style = {
          top: element.top,
          left: element.left,
          transform: `scale(${element.scale})`,
          animationDelay: element.animationDelay,
        };

        switch (element.type) {
          case "dustSprite":
            return (
              <div 
                key={element.id}
                className="absolute animate-float opacity-50" 
                style={style}
              >
                <DustSprite className="text-2xl" />
              </div>
            );
          case "leaf":
            return (
              <div 
                key={element.id}
                className="absolute animate-float-slow opacity-60" 
                style={style}
              >
                <Leaf className="text-xl" />
              </div>
            );
          case "totoro":
            return (
              <div 
                key={element.id}
                className="absolute animate-float opacity-20" 
                style={style}
              >
                <Totoro className="font-ghibli text-xs text-ghibli-darkGreen" />
              </div>
            );
          case "sootball":
            return (
              <div 
                key={element.id}
                className="absolute animate-float-fast opacity-70" 
                style={style}
              >
                <Sootball className="text-sm" />
              </div>
            );
        }
      })}
    </div>
  );
};

export default FloatingElements;
