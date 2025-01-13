'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Playlist, PlaylistItem } from "./types/youtube";
import { fetchPlaylists, fetchPlaylistItems } from "./lib/youtube";
import PlaylistCard from "./components/PlaylistCard";
import PlaylistItemCard from "./components/PlaylistItemCard";

export default function Home() {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlaylists() {
      if (session?.accessToken) {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchPlaylists(session.accessToken);  // Removed 'as string' since type is now defined
          setPlaylists(data.items);
        } catch (err) {
          setError('Failed to load playlists');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    }
    loadPlaylists();
  }, [session]);

  async function handlePlaylistClick(playlistId: string) {
    setSelectedPlaylist(playlistId);
    if (session?.accessToken) {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPlaylistItems(playlistId, session.accessToken);  // Removed 'as string'
        setPlaylistItems(data.items);
      } catch (err) {
        setError('Failed to load playlist items');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 transition-colors"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">YouTube Playlists</h1>
        <button
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 transition-colors"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Playlists</h2>
            {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onClick={handlePlaylistClick}
              />
            ))}
          </div>

          {selectedPlaylist && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Playlist Items</h2>
              {playlistItems.map((item) => (
                <PlaylistItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
