'use client'

import { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FaSignInAlt, FaSignOutAlt, FaPlayCircle, FaChevronDown, FaChevronUp, FaVideo } from 'react-icons/fa'

const Home = () => {
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [expandedPlaylist, setExpandedPlaylist] = useState<number | null>(null)

  // Function to fetch playlists and their videos after user logs in
  const fetchPlaylists = async () => {
    if (!session?.accessToken) {
      alert('You need to sign in first!')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/fetchPlaylists')
      const data = await res.json()

      if (data.error) {
        alert(data.error)
        setLoading(false)
        return
      }

      setPlaylists(data.items)
    } catch (error) {
      alert('Failed to fetch playlists')
      setLoading(false)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (session) {
      fetchPlaylists() // Fetch playlists automatically after login
    }
  }, [session])

  const handleToggle = (index: number) => {
    setExpandedPlaylist(expandedPlaylist === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-black mb-6">
        YouTube Playlist Data Retriever
      </h1>
      <p className="text-center text-gray-600 mb-4">
        Sign in with your Google account to view your YouTube playlists and their video details.
      </p>

      {session ? (
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 border border-gray-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Playlists:</h2>
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <ul className="space-y-4">
              {playlists.length > 0 ? (
                playlists.map((playlist: any, index: number) => (
                  <li key={playlist.id}>
                    <div
                      onClick={() => handleToggle(index)}
                      className="flex items-center cursor-pointer space-x-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <FaPlayCircle className="text-2xl text-black" />
                      <h3 className="text-xl font-medium text-gray-900">{index + 1}. {playlist.snippet.title}</h3>
                      <div className="ml-auto">
                        {expandedPlaylist === index ? (
                          <FaChevronUp className="text-gray-600" />
                        ) : (
                          <FaChevronDown className="text-gray-600" />
                        )}
                      </div>
                    </div>

                    {expandedPlaylist === index && playlist.videos.length > 0 && (
                      <ul className="mt-4 space-y-2 pl-6">
                        {playlist.videos.map((video: any, videoIndex: number) => (
                          <li key={video.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center space-x-4">
                              <FaVideo className="text-2xl text-gray-600" />
                              <span className="font-semibold">{videoIndex + 1}.</span>
                              <strong className="ml-2 text-gray-800">{video.snippet.title}</strong>
                            </div>
                            <div className="flex items-center space-x-4 flex-shrink-0">
                              <img 
                                src={video.snippet.thumbnails.medium.url} 
                                alt="Video thumbnail" 
                                className="w-16 h-16 object-cover rounded-md" 
                              />
                              <button
                                className="px-4 py-2 bg-black text-white font-semibold rounded-md transition duration-300"
                                onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank')}
                              >
                                <FaPlayCircle />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}

                    {expandedPlaylist === index && playlist.videos.length === 0 && (
                      <p className="text-sm text-red-500 mt-2 pl-6">No videos found in this playlist.</p>
                    )}
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">No playlists found.</p>
              )}
            </ul>
          )}
          <div className="text-center mt-4">
            <button
              onClick={() => signOut()}
              className="px-6 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition duration-300 flex items-center justify-center space-x-2"
            >
              <FaSignOutAlt />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-sm bg-white p-6 shadow-lg rounded-lg border border-gray-300">
          <button
            onClick={() => signIn('google')}
            className="w-full px-6 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition duration-300 flex items-center justify-center space-x-2"
          >
            <FaSignInAlt />
            <span>Sign in with Google</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default Home
