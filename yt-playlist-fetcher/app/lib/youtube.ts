export async function fetchPlaylists(accessToken: string) {
    try {
      const response = await fetch(
        'https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching playlists:', error);
      throw error;
    }
  }
  
  export async function fetchPlaylistItems(playlistId: string, accessToken: string) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch playlist items');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching playlist items:', error);
      throw error;
    }
  }