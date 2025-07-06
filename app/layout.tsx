import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Forever Fest 2026',
  description: 'Sean & Eva are getting married!',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
