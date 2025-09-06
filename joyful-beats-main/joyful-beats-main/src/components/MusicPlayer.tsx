import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { JoyCharacter } from "./JoyCharacter";
import { YouTubePlayer } from "./YouTubePlayer";
import { YouTubeVideo } from "@/services/youtube";

interface MusicPlayerProps {
  onJoyInteract?: () => void;
  currentSong?: YouTubeVideo | null;
  playlist?: YouTubeVideo[];
  onSongChange?: (song: YouTubeVideo) => void;
}

export const MusicPlayer = ({ 
  onJoyInteract, 
  currentSong, 
  playlist = [], 
  onSongChange 
}: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [progress, setProgress] = useState([0]);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [player, setPlayer] = useState<any>(null);

  const defaultSong = {
    id: "jGflUbPQfW8",
    title: "Relaxing Music",
    artist: "Peaceful Piano",
    thumbnail: "https://img.youtube.com/vi/jGflUbPQfW8/mqdefault.jpg",
    duration: "3:45",
    channelTitle: "Peaceful Piano"
  };

  const activeSong = currentSong || defaultSong;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (playlist.length > 0 && onSongChange) {
      const currentIndex = playlist.findIndex(song => song.id === activeSong.id);
      const nextIndex = (currentIndex + 1) % playlist.length;
      onSongChange(playlist[nextIndex]);
    }
  };

  const handlePrevious = () => {
    if (playlist.length > 0 && onSongChange) {
      const currentIndex = playlist.findIndex(song => song.id === activeSong.id);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;
      onSongChange(playlist[prevIndex]);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (player && duration > 0) {
      const newTime = (value[0] / 100) * duration;
      player.seekTo(newTime);
      setCurrentTime(newTime);
    }
  };

  const handlePlayerStateChange = (state: number) => {
    // YouTube player states: -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering, 5 cued
    setIsPlaying(state === 1);
    
    if (state === 0) { // ended
      handleNext();
    }
  };

  const handleTimeUpdate = (current: number, total: number) => {
    setCurrentTime(current);
    setDuration(total);
  };

  useEffect(() => {
    if (player && volume.length > 0) {
      player.setVolume(volume[0]);
    }
  }, [player, volume]);

  return (
    <Card className="joy-card p-6 bg-card/80 backdrop-blur-xl border-border/50">
      <div className="flex items-center gap-4">
        {/* Song Info */}
        <div className="flex items-center gap-4 flex-1">
          <img
            src={activeSong.thumbnail}
            alt={activeSong.title}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold text-foreground line-clamp-1">{activeSong.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{activeSong.artist}</p>
          </div>
        </div>

        {/* Joy Character */}
        <div className="w-20 h-20">
          <JoyCharacter 
            mood={isPlaying ? "dancing" : "happy"} 
            onClick={onJoyInteract}
            className="w-full h-full"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsLiked(!isLiked)}
            className={`hover:bg-secondary/20 ${isLiked ? "text-accent" : "text-muted-foreground"}`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-secondary/20"
            onClick={handlePrevious}
          >
            <SkipBack className="w-5 h-5" />
          </Button>
          
          <Button
            variant="default"
            size="icon"
            onClick={handlePlayPause}
            className="w-12 h-12 rounded-full bg-primary hover:bg-primary-glow"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-secondary/20"
            onClick={handleNext}
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 min-w-[120px]">
          <Volume2 className="w-5 h-5 text-muted-foreground" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <Slider
          value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
          onValueChange={handleProgressChange}
          max={100}
          step={0.1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{activeSong.duration}</span>
        </div>
      </div>

      {/* Hidden YouTube Player */}
      <div className="hidden">
        <YouTubePlayer
          videoId={activeSong.id}
          onReady={() => setPlayer(window.YT?.players?.[Object.keys(window.YT?.players || {})[0]])}
          onStateChange={handlePlayerStateChange}
          onTimeUpdate={handleTimeUpdate}
        />
      </div>
    </Card>
  );
};