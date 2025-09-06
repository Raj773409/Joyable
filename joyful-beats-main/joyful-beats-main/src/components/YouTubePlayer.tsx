import { useEffect, useRef, useState } from "react";

interface YouTubePlayerProps {
  videoId: string;
  onReady?: () => void;
  onStateChange?: (state: number) => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  className?: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const YouTubePlayer = ({ 
  videoId, 
  onReady, 
  onStateChange, 
  onTimeUpdate,
  className = "w-full h-64"
}: YouTubePlayerProps) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<any>(null);
  const [isAPIReady, setIsAPIReady] = useState(false);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setIsAPIReady(true);
      };
    } else {
      setIsAPIReady(true);
    }
  }, []);

  useEffect(() => {
    if (isAPIReady && playerRef.current && !player) {
      const newPlayer = new window.YT.Player(playerRef.current, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          fs: 0,
          cc_load_policy: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event: any) => {
            setPlayer(event.target);
            onReady?.();
          },
          onStateChange: (event: any) => {
            onStateChange?.(event.data);
          },
        },
      });
    }
  }, [isAPIReady, videoId, player, onReady, onStateChange]);

  useEffect(() => {
    if (player && videoId) {
      player.loadVideoById(videoId);
    }
  }, [player, videoId]);

  useEffect(() => {
    if (player && onTimeUpdate) {
      const interval = setInterval(() => {
        if (player.getPlayerState() === 1) { // Playing
          const currentTime = player.getCurrentTime();
          const duration = player.getDuration();
          onTimeUpdate(currentTime, duration);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [player, onTimeUpdate]);

  return (
    <div className={className}>
      <div 
        ref={playerRef} 
        className="w-full h-full rounded-lg overflow-hidden"
        style={{ display: 'none' }} // Hide the actual player
      />
    </div>
  );
};