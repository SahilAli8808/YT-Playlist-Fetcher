# YouTube Playlist Data Retriever

A Next.js application that allows users to fetch and display YouTube playlists and their video details. Users can sign in with Google, view their playlists, and explore video titles with thumbnails. Optionally, users can input a Channel ID to fetch playlists without logging in.

## Features:
- Google Sign-In for user authentication
- Fetch and display YouTube playlists and videos
- Expandable playlist details
- Option to fetch playlists using a YouTube Channel ID
- Clean and responsive UI

## Screenshots:
### 1. Landing Page (Before Signing In)
![Playlist View](https://github.com/SahilAli8808/YT-Playlist-Fetcher/blob/main/Screenshots/Screenshot1.jpg)

### 2. Playlists View (After Signing In)
![Channel ID Fetcher](https://github.com/SahilAli8808/YT-Playlist-Fetcher/blob/main/Screenshots/Screenshot2.jpg)

## Setup:
1. **Clone the repo**:
   ```bash
   git clone https://github.com/SahilAli8808/YT-Playlist-Fetcher.git
   cd YT-Playlist-Fetcher
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up API Key**:
   - Obtain a YouTube API key from [Google Developers Console](https://console.developers.google.com/).
   - Set your API key in `.env.local`:
     ```
     YOUTUBE_API_KEY=your-api-key
     ```

4. **Run the app**:
   ```bash
   npm run dev
   ```

## Tech Stack:
- **Frontend**: Next.js, React, Tailwind CSS
- **Authentication**: NextAuth.js (Google OAuth)
- **APIs**: YouTube Data API v3

## License:
MIT License



