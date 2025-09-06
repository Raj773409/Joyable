import { useState, useEffect } from "react";
import joyCharacterImage from "@/assets/joy-character.png";

interface JoyCharacterProps {
  mood?: "happy" | "dancing" | "thinking" | "excited";
  className?: string;
  onClick?: () => void;
}

export const JoyCharacter = ({ mood = "happy", className = "", onClick }: JoyCharacterProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAnimationClass = () => {
    switch (mood) {
      case "dancing":
        return "animate-bounce-gentle";
      case "excited":
        return "animate-glow-pulse";
      case "thinking":
        return "animate-float";
      default:
        return "animate-float";
    }
  };

  return (
    <div
      className={`joy-character-container ${className}`}
      onClick={onClick}
    >
      <div
        className={`
          joy-glow transition-all duration-500 cursor-pointer
          ${getAnimationClass()}
          ${isAnimating ? "scale-110" : "scale-100"}
          hover:scale-105
        `}
      >
        <img
          src={joyCharacterImage}
          alt="Joy - Your AI Music Companion"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};