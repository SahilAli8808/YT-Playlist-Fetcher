'use client';

import { Playlist } from '../types/youtube';

interface PlaylistCardProps {
  playlist: Playlist;
  onClick: (id: string) => void;
}

export default function PlaylistCard({ playlist, onClick }: PlaylistCardProps) {
  return (
    <div
      onClick={() => onClick(playlist.id)}
      className="cursor-pointer rounded border p-4 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center space-x-4">
        <img
          src={playlist.snippet.thumbnails.default.url}
          alt={playlist.snippet.title}
          className="h-16 w-16 rounded"
        />
        <div>
          <h3 className="font-semibold">{playlist.snippet.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {playlist.snippet.description}
          </p>
        </div>
      </div>
    </div>
  );
}