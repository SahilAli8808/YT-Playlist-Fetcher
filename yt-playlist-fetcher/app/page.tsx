'use client'

import { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FaSignInAlt, FaSignOutAlt, FaPlayCircle } from 'react-icons/fa'

const Home = () => {
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Function to fetch playlists after user logs in
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

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-black mb-6">
        YouTube Playlist Data Retriever
      </h1>
      <p className="text-center text-gray-600 mb-4">
        Sign in with your Google account to view your YouTube playlists. Once logged in, you will be able to see all your playlists and their details.
      </p>

      {session ? (
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 border border-gray-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Playlists:</h2>
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <ul className="space-y-4">
              {playlists.length > 0 ? (
                playlists.map((playlist: any) => (
                  <li
                    key={playlist.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <FaPlayCircle className="text-2xl text-black" />
                      <h3 className="text-xl font-medium text-gray-900">{playlist.snippet.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{playlist.snippet.description}</p>
                    {playlist.contentDetails?.itemCount > 0 ? (
                      <p className="text-sm text-gray-500 mt-2">
                        {playlist.contentDetails.itemCount} videos in this playlist.
                      </p>
                    ) : (
                      <p className="text-sm text-red-500 mt-2">No videos found in this playlist.</p>
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
