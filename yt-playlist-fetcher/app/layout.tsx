'use client' // Add this line at the top to mark this as a Client Component

import { SessionProvider } from 'next-auth/react'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </SessionProvider>
  )
}
