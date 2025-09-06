import { useState } from "react";
import { Send, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { JoyCharacter } from "./JoyCharacter";

interface Message {
  id: string;
  text: string;
  sender: "user" | "joy";
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! I'm Joy, your AI music companion! 🎵 How are you feeling today? I can help you find the perfect music for your mood!",
      sender: "joy",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate Joy's response
    setTimeout(() => {
      const responses = [
        "That's awesome! Let me find some perfect music for that vibe! 🎶",
        "I love that energy! Here are some tracks that might make you smile! 😊",
        "Great choice! Music has such amazing power to lift our spirits! ✨",
        "Ooh, I have the perfect playlist for that mood! Let me play it for you! 🎵",
      ];
      
      const joyResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "joy",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, joyResponse]);
    }, 1000);

    setInputText("");
  };

  return (
    <Card className="joy-card h-[400px] flex flex-col bg-card/80 backdrop-blur-xl border-border/50">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <JoyCharacter mood="thinking" className="w-full h-full" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Chat with Joy</h3>
            <p className="text-sm text-muted-foreground">Your AI music companion</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`
                max-w-[80%] p-3 rounded-lg
                ${message.sender === "user"
                  ? "bg-primary text-primary-foreground ml-8"
                  : "bg-muted text-muted-foreground mr-8"
                }
              `}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tell Joy how you're feeling..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-background/50"
          />
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-secondary/20"
          >
            <Mic className="w-5 h-5" />
          </Button>
          <Button
            onClick={handleSendMessage}
            className="bg-primary hover:bg-primary-glow"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};