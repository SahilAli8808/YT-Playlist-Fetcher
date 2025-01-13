import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import YouTubePlaylistList from './YouTubePlaylistList'


const YouTubePlaylistFetcher = () => {
  const [channelId, setChannelId] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [playlists, setPlaylists] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const fetchPlaylists = async () => {
    if (!channelId || !apiKey) {
      setError('Both Channel ID and API Key are required.')
      return
    }

    setLoading(true)
    setError('') // Reset error before starting the fetch

    try {
      const res = await fetch(`/api/fetchPlaylistsByChannel?channelId=${channelId}&apiKey=${apiKey}`)
      const data = await res.json()

      if (data.error) {
        setError(`Error: ${data.error.message}`)
        setLoading(false)
        return
      }

      setPlaylists(data.items)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch playlists.')
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg border border-gray-300">
      <div className="space-y-4">
        <div>
          <label htmlFor="channelId" className="block text-gray-600">YouTube Channel ID</label>
          <input
            type="text"
            id="channelId"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Channel ID"
          />
        </div>
        
        <div>
          <label htmlFor="apiKey" className="block text-gray-600">API Key</label>
          <input
            type="text"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter API Key"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="text-center">
          <button
            onClick={fetchPlaylists}
            className="px-6 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition duration-300 flex items-center justify-center space-x-2"
          >
            <FaSearch />
            <span>Search</span>
          </button>
        </div>
      </div>

      <div className="mt-4">
      {loading ? (
        <p className="text-center text-gray-700">Loading playlists...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : ( playlists &&
        <YouTubePlaylistList playlists={playlists} />
      )}
    </div>
    </div>
  )
}

export default YouTubePlaylistFetcher
