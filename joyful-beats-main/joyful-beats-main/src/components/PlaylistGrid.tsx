import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { YouTubeService, YouTubeVideo } from "@/services/youtube";

interface Playlist {
  id: string;
  title: string;
  description: string;
  mood: string;
  songs: YouTubeVideo[];
}

interface PlaylistGridProps {
  onPlaylistSelect?: (songs: YouTubeVideo[]) => void;
}

export const PlaylistGrid = ({ onPlaylistSelect }: PlaylistGridProps) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const moodPlaylists = [
    { id: "energetic", title: "Energetic Vibes", description: "High-energy tracks to boost your mood", mood: "energetic" },
    { id: "calm", title: "Chill & Relax", description: "Peaceful melodies for relaxation", mood: "calm" },
    { id: "focused", title: "Focus Flow", description: "Instrumental beats for concentration", mood: "focused" },
    { id: "happy", title: "Happy Moments", description: "Uplifting songs to make you smile", mood: "happy" },
    { id: "chill", title: "Lo-Fi Chill", description: "Smooth beats for relaxation", mood: "chill" },
    { id: "party", title: "Party Time", description: "Dance hits for celebration", mood: "party" },
  ];

  useEffect(() => {
    const loadPlaylists = async () => {
      setIsLoading(true);
      try {
        const loadedPlaylists = await Promise.all(
          moodPlaylists.map(async (playlist) => {
            const songs = await YouTubeService.getMoodPlaylist(playlist.mood);
            return {
              ...playlist,
              songs,
            };
          })
        );
        setPlaylists(loadedPlaylists);
      } catch (error) {
        console.error("Failed to load playlists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlaylists();
  }, []);

  const handlePlaylistClick = (playlist: Playlist) => {
    if (playlist.songs.length > 0) {
      onPlaylistSelect?.(playlist.songs);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold gradient-text mb-2">Mood-Based Playlists</h2>
          <p className="text-muted-foreground">Loading curated playlists from YouTube...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="joy-card bg-card/60 backdrop-blur-sm border-border/30 animate-pulse">
              <div className="aspect-square bg-muted/20"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-muted/20 rounded"></div>
                <div className="h-3 bg-muted/10 rounded"></div>
                <div className="flex justify-between">
                  <div className="h-3 w-16 bg-muted/10 rounded"></div>
                  <div className="h-3 w-12 bg-muted/10 rounded"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold gradient-text mb-2">Mood-Based Playlists</h2>
        <p className="text-muted-foreground">
          Curated by Joy to match your emotions and energy
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <Card
            key={playlist.id}
            className="joy-card group cursor-pointer overflow-hidden bg-card/60 backdrop-blur-sm border-border/30"
            onClick={() => handlePlaylistClick(playlist)}
          >
            <div className="relative">
              <img
                src={playlist.songs[0]?.thumbnail || "/placeholder.svg"}
                alt={playlist.title}
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  size="icon"
                  className="w-16 h-16 rounded-full bg-primary hover:bg-primary-glow animate-scale-in"
                >
                  <Play className="w-8 h-8 ml-1" />
                </Button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-1">{playlist.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{playlist.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{playlist.songs.length} tracks</span>
                <span className="capitalize bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {playlist.mood}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};