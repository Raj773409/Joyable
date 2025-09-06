import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JoyCharacter } from "./JoyCharacter";
import { ChatInterface } from "./ChatInterface";
import heroBackground from "@/assets/hero-background.jpg";

export const HeroSection = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url(${heroBackground})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Joy Character */}
        <div className="w-48 h-48 mx-auto mb-8 animate-slide-up">
          <JoyCharacter
            mood="excited"
            onClick={() => setShowChat(!showChat)}
            className="w-full h-full"
          />
        </div>

        {/* Hero Text */}
        <div className="space-y-6 mb-8">
          <h1 className="text-6xl md:text-8xl font-bold gradient-text animate-slide-up">
            Joyable
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
            Meet Joy, your AI music companion who helps you discover the perfect soundtrack for every moment
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up">
          <Button
            variant="hero"
            size="lg"
            onClick={() => setShowChat(true)}
            className="text-lg px-8 py-4 h-auto"
          >
            Start Your Musical Journey
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-4 h-auto bg-background/20 backdrop-blur-sm border-border/50 hover:bg-background/40"
          >
            Explore Playlists
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: "🎵",
              title: "Mood-Based Discovery",
              description: "Joy understands your emotions and finds perfect music matches",
            },
            {
              icon: "🤖",
              title: "AI Companion",
              description: "Chat with Joy for personalized recommendations and music insights",
            },
            {
              icon: "✨",
              title: "3D Experience",
              description: "Immersive animated interface that reacts to your music",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="joy-card p-6 bg-card/40 backdrop-blur-sm border-border/30 text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Chat Interface */}
        {showChat && (
          <div className="max-w-md mx-auto animate-slide-up">
            <ChatInterface />
          </div>
        )}
      </div>
    </div>
  );
};