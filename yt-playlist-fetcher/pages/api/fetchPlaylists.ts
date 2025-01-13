// pages/api/fetchPlaylists.ts 
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/playlists'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  
  if (!session || !session.accessToken) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  const accessToken = session.accessToken
  
  // Log the accessToken to the console
  console.log('Access Token:', accessToken)

  try {
    // Correctly append query parameters to the URL
    const response = await fetch(`${YOUTUBE_API_URL}?part=snippet&mine=true`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await response.json()

    if (response.ok) {
      return res.status(200).json(data)
    } else {
      return res.status(response.status).json(data)
    }
  } catch (error) {
    console.error('Error fetching playlists:', error)
    return res.status(500).json({ error: 'Failed to fetch playlists' })
  }
}
