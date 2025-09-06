import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { MusicPlayer } from "@/components/MusicPlayer";
import { PlaylistGrid } from "@/components/PlaylistGrid";
import { ChatInterface } from "@/components/ChatInterface";
import { MusicSearch } from "@/components/MusicSearch";
import { Footer } from "@/components/Footer";
import { YouTubeVideo } from "@/services/youtube";

const Index = () => {
  const [showMainInterface, setShowMainInterface] = useState(false);
  const [currentSong, setCurrentSong] = useState<YouTubeVideo | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<YouTubeVideo[]>([]);

  if (showMainInterface) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold gradient-text">Joyable</h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowMainInterface(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8 space-y-8">
          {/* Music Player */}
          <div className="animate-slide-up">
            <MusicPlayer 
              onJoyInteract={() => console.log("Joy clicked!")}
              currentSong={currentSong}
              playlist={currentPlaylist}
              onSongChange={(song) => setCurrentSong(song)}
            />
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Playlists */}
            <div className="lg:col-span-2 animate-slide-up space-y-8">
              <PlaylistGrid 
                onPlaylistSelect={(songs) => {
                  setCurrentPlaylist(songs);
                  if (songs.length > 0) {
                    setCurrentSong(songs[0]);
                  }
                }}
              />
            </div>

            {/* Search & Chat */}
            <div className="lg:col-span-2 space-y-8">
              <div className="animate-slide-up">
                <MusicSearch 
                  onSongSelect={(song) => {
                    setCurrentSong(song);
                    setCurrentPlaylist([song]);
                  }}
                />
              </div>
              
              <div className="animate-slide-up">
                <ChatInterface />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      {/* Navigation to main app */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setShowMainInterface(true)}
          className="joy-card p-4 bg-primary text-primary-foreground hover:bg-primary-glow transition-all duration-300 rounded-full shadow-lg hover:shadow-glow"
        >
          Enter Joyable →
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
