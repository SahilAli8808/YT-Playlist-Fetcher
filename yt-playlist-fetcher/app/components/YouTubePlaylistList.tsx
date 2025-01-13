import { useState } from 'react'
import { FaPlayCircle, FaChevronUp, FaChevronDown, FaVideo } from 'react-icons/fa'

const YouTubePlaylistList = ({ playlists }: { playlists: any[] }) => {
  const [expandedPlaylist, setExpandedPlaylist] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setExpandedPlaylist(expandedPlaylist === index ? null : index)
  }

  return (
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 border border-gray-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Playlists:</h2>
      
      {playlists?.length > 0 ? (
        <ul className="space-y-4">
          {playlists.map((playlist: any, index: number) => (
            <li key={playlist.id}>
              <div
                onClick={() => handleToggle(index)}
                className="flex items-center cursor-pointer space-x-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <FaPlayCircle className="text-2xl text-black" />
                <h3 className="text-xl font-medium text-gray-900">
                  {index + 1}. {playlist?.snippet?.title || 'Untitled Playlist'}
                </h3>
                <div className="ml-auto">
                  {expandedPlaylist === index ? (
                    <FaChevronUp className="text-gray-600" />
                  ) : (
                    <FaChevronDown className="text-gray-600" />
                  )}
                </div>
              </div>

              {expandedPlaylist === index && playlist.items && playlist.items.length > 0 && (
                <ul className="mt-4 space-y-2 pl-6">
                  {playlist.items.map((video: any, videoIndex: number) => (
                    <li
                      key={video.id}
                      className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <FaVideo className="text-2xl text-gray-600" />
                        <span className="font-semibold">{videoIndex + 1}.</span>
                        <strong className="ml-2 text-gray-800">
                          {video?.snippet?.title || 'Untitled Video'}
                        </strong>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {expandedPlaylist === index && (!playlist.items || playlist.items.length === 0) && (
                <p className="text-sm text-red-500 mt-2 pl-6">No videos found in this playlist.</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No playlists found.</p>
      )}
    </div>
  )
}

export default YouTubePlaylistList
