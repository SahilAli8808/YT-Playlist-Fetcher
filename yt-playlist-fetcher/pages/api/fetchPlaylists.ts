// pages/api/fetchPlaylists.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/playlists'
const YOUTUBE_PLAYLIST_ITEMS_API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  console.log('Session in Production:', session)

   // Prevent caching of the response
   res.setHeader('Cache-Control', 'no-store')
  
  if (!session || !session.accessToken) {

    return res.status(401).json({ error: 'Not authenticated' })
  }

  const accessToken = session.accessToken

  try {
    // Fetch playlists of the authenticated user
    const playlistResponse = await fetch(`${YOUTUBE_API_URL}?part=snippet&mine=true`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    
    const playlistData = await playlistResponse.json()

    if (!playlistResponse.ok) {
      return res.status(playlistResponse.status).json(playlistData)
    }

    const playlists = playlistData.items || []

    // Fetch videos for each playlist
    const playlistsWithVideos = await Promise.all(
      playlists.map(async (playlist: any) => {
        const videoResponse = await fetch(
          `${YOUTUBE_PLAYLIST_ITEMS_API_URL}?part=snippet&playlistId=${playlist.id}&maxResults=10`, // Limiting to 5 videos per playlist
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        const videoData = await videoResponse.json()

        if (videoResponse.ok) {
          // Add video details to the playlist
          return {
            ...playlist,
            videos: videoData.items || [],
          }
        } else {
          return {
            ...playlist,
            videos: [],
            error: videoData.error.message,
          }
        }
      })
    )

    return res.status(200).json({ items: playlistsWithVideos })
  } catch (error) {
    console.error('Error fetching playlists or video details:', error)
    return res.status(500).json({ error: 'Failed to fetch playlists or video details' })
  }
}
