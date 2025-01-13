// pages/api/fetchPlaylistsByChannel.ts
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { channelId, apiKey } = req.query

  if (!channelId || !apiKey) {
    return res.status(400).json({ error: 'Both Channel ID and API Key are required.' })
  }

  try {
    // Fetch playlists for the given channelId and apiKey
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&key=${apiKey}`)
    const data = await response.json()

    console.log(data)

    if (data.error) {
      return res.status(500).json({ error: data.error.message })
    }

    return res.status(200).json({ items: data.items })
  } catch (error) {
    console.error('Error fetching playlists:', error)
    return res.status(500).json({ error: 'Failed to fetch playlists.' })
  }
}
