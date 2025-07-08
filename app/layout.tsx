import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - Sean & Eva\'s Wedding',
  description: 'Join Sean & Eva as they celebrate their love at Forever Fest 2026! Save the date for an unforgettable wedding celebration.',
  keywords: ['wedding', 'Forever Fest 2026', 'Sean and Eva', 'wedding celebration', 'save the date'],
  authors: [{ name: 'Sean & Eva' }],
  creator: 'Sean & Eva',
  publisher: 'Forever Fest 2026',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL('https://foreverfest.wedding'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Forever Fest 2026 - Sean & Eva\'s Wedding',
    description: 'Join Sean & Eva as they celebrate their love at Forever Fest 2026! Save the date for an unforgettable wedding celebration.',
    url: 'https://foreverfest.wedding',
    siteName: 'Forever Fest 2026',
    images: [
      {
        url: '/sean_and_eva_banner_photo.png',
        width: 1200,
        height: 630,
        alt: 'Sean & Eva - Forever Fest 2026'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forever Fest 2026 - Sean & Eva\'s Wedding',
    description: 'Join Sean & Eva as they celebrate their love at Forever Fest 2026! Save the date for an unforgettable wedding celebration.',
    images: ['/sean_and_eva_banner_photo.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png'
  },
  manifest: '/site.webmanifest'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
