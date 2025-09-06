import { useState } from "react";
import { Search, Music } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { YouTubeService, YouTubeVideo } from "@/services/youtube";

interface MusicSearchProps {
  onSongSelect?: (song: YouTubeVideo) => void;
}

export const MusicSearch = ({ onSongSelect }: MusicSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const searchResults = await YouTubeService.searchMusic(query);
      setResults(searchResults);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="joy-card p-6 bg-card/80 backdrop-blur-xl border-border/50">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold gradient-text mb-2">Search Music</h2>
          <p className="text-sm text-muted-foreground">
            Find any song from YouTube's vast music library
          </p>
        </div>

        {/* Search Input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for songs, artists, or albums..."
              className="pl-10 bg-input/50 border-border/30"
            />
          </div>
          <Button 
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className="bg-primary hover:bg-primary-glow"
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.map((song) => (
              <Card
                key={song.id}
                className="p-3 bg-card/40 border-border/20 hover:bg-card/60 cursor-pointer transition-all duration-200"
                onClick={() => onSongSelect?.(song)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={song.thumbnail}
                    alt={song.title}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm line-clamp-1">
                      {song.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {song.artist}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Music className="w-3 h-3" />
                    <span>{song.duration}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground mt-2">Searching for music...</p>
          </div>
        )}

        {results.length === 0 && query && !isLoading && (
          <div className="text-center py-8">
            <Music className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No results found. Try a different search term.</p>
          </div>
        )}
      </div>
    </Card>
  );
};