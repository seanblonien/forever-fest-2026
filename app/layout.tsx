import {ThemeProvider} from '@/components/theme-provider';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';
import type {Metadata} from 'next';
import {Alex_Brush, League_Gothic} from 'next/font/google';
import {cn} from '../lib/utils';
import './globals.css';

const boldFont = League_Gothic({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-league-gothic',
});

const cursiveFont = Alex_Brush({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alex-brush',
});

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - Sean & Eva\'s Wedding',
  description: 'Join Sean & Eva as they celebrate their love at Forever Fest 2026! Save the date for an unforgettable wedding celebration.',
  keywords: ['wedding', 'Forever Fest 2026', 'Sean and Eva', 'wedding celebration', 'save the date'],
  authors: [{name: 'Sean & Eva'}],
  creator: 'Sean & Eva',
  publisher: 'Forever Fest 2026',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://foreverfest.wedding'),
  alternates: {
    canonical: '/',
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
        alt: 'Sean & Eva - Forever Fest 2026',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forever Fest 2026 - Sean & Eva\'s Wedding',
    description: 'Join Sean & Eva as they celebrate their love at Forever Fest 2026! Save the date for an unforgettable wedding celebration.',
    images: ['/sean_and_eva_banner_photo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(boldFont.variable, cursiveFont.variable, 'dark')} style={{colorScheme: 'dark'}} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
