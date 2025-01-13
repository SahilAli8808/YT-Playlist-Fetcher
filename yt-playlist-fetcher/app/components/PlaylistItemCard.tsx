'use client';

import { PlaylistItem } from '../types/youtube';

interface PlaylistItemCardProps {
  item: PlaylistItem;
}

export default function PlaylistItemCard({ item }: PlaylistItemCardProps) {
  return (
    <div className="rounded border p-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.snippet.thumbnails.default.url}
          alt={item.snippet.title}
          className="h-16 w-16 rounded"
        />
        <div>
          <h3 className="font-semibold">{item.snippet.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {item.snippet.description}
          </p>
          {item.snippet.resourceId?.videoId && (
            <a
              href={`https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Watch Video
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
