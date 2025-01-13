'use client'

import { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

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
        console.log(data)
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
    <div className="container">
      <h1>YouTube Playlist Data Retriever</h1>
      {session ? (
        <div>
          <h2>Your Playlists:</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {playlists.length > 0 ? (
                playlists.map((playlist: any) => (
                  <li key={playlist.id}>
                    <h3>{playlist.snippet.title}</h3>
                    <p>{playlist.snippet.description}</p>
                  </li>
                ))
              ) : (
                <p>No playlists found.</p>
              )}
            </ul>
          )}
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div>
          <button onClick={() => signIn('google')}>Sign in with Google</button>
        </div>
      )}
    </div>
  )
}

export default Home
