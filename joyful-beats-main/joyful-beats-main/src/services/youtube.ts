// YouTube API service for fetching and playing music
const YOUTUBE_API_KEY = 'AIzaSyBDcgHTdDzNTpzKZhO9JHNrk1KoR_3qBoo'; // Public demo key
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
  channelTitle: string;
}

export interface PlaylistData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videos: YouTubeVideo[];
}

export class YouTubeService {
  private static formatDuration(duration: string): string {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';
    
    const hours = parseInt(match[1]?.replace('H', '') || '0');
    const minutes = parseInt(match[2]?.replace('M', '') || '0');
    const seconds = parseInt(match[3]?.replace('S', '') || '0');
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  static async searchMusic(query: string, maxResults = 20): Promise<YouTubeVideo[]> {
    try {
      const searchResponse = await fetch(
        `${YOUTUBE_API_BASE}/search?part=snippet&type=video&videoCategoryId=10&maxResults=${maxResults}&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`
      );
      
      if (!searchResponse.ok) throw new Error('Failed to search YouTube');
      
      const searchData = await searchResponse.json();
      const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
      
      // Get video details including duration
      const detailsResponse = await fetch(
        `${YOUTUBE_API_BASE}/videos?part=snippet,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
      );
      
      if (!detailsResponse.ok) throw new Error('Failed to get video details');
      
      const detailsData = await detailsResponse.json();
      
      return detailsData.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url,
        duration: this.formatDuration(item.contentDetails.duration),
        channelTitle: item.snippet.channelTitle,
      }));
    } catch (error) {
      console.error('YouTube search error:', error);
      return [];
    }
  }

  static async getTrendingMusic(): Promise<YouTubeVideo[]> {
    return this.searchMusic('trending music 2024', 12);
  }

  static async getMoodPlaylist(mood: string): Promise<YouTubeVideo[]> {
    const moodQueries: Record<string, string> = {
      energetic: 'upbeat energetic music workout',
      calm: 'relaxing calm music peaceful',
      focused: 'focus concentration study music',
      happy: 'happy uplifting feel good music',
      chill: 'chill lofi ambient music',
      romantic: 'romantic love songs',
      party: 'party dance electronic music'
    };
    
    const query = moodQueries[mood] || 'popular music';
    return this.searchMusic(query, 15);
  }

  static getEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1`;
  }

  static getThumbnail(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  }
}