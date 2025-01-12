export interface PlaylistItem {
    id: string;
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        default: { url: string };
      };
      resourceId?: {
        videoId?: string;
      };
    };
  }
  
  export interface Playlist {
    id: string;
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        default: { url: string };
      };
    };
  }
  