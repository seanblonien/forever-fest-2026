import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Alex_Brush as AlexBrush, League_Gothic as LeagueGothic } from 'next/font/google';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { ChildrenProps } from '../lib';
import { cn } from '../lib/utils';
import './globals.css';

const boldFont = LeagueGothic({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-league-gothic',
});

const cursiveFont = AlexBrush({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alex-brush',
});

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - Sean & Eva\'s Wedding',
  description: 'Join Sean & Eva as they celebrate their love at Forever Fest 2026! Save the date for an unforgettable wedding celebration.',
  keywords: ['wedding', 'Forever Fest 2026', 'Sean and Eva', 'wedding celebration', 'save the date'],
  authors: [{ name: 'Sean & Eva' }],
  creator: 'Sean & Eva',
  publisher: 'Forever Fest 2026',
  formatDetection: {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- library api
    email: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention -- library api
    address: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention -- library api
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
        url: '/sean_and_eva_banner_photo.webp',
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
    images: ['/sean_and_eva_banner_photo.webp'],
  },
  robots: {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- library api
    index: true,
    // eslint-disable-next-line @typescript-eslint/naming-convention -- library api
    follow: true,
    googleBot: {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- library api
      'index': true,
      // eslint-disable-next-line @typescript-eslint/naming-convention -- library api
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

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#101048' },
  ],
};

const RootLayout: React.FC<ChildrenProps> = ({
  children,
}) => (
  <html className={cn(boldFont.variable, cursiveFont.variable, 'dark')} lang='en' style={{ colorScheme: 'dark' }}>
    <body suppressHydrationWarning>
      <ThemeProvider disableTransitionOnChange enableSystem attribute='class' defaultTheme='dark'>
        {children}
        <Analytics />
        <SpeedInsights />
      </ThemeProvider>
    </body>
  </html>
);
export default RootLayout;
