import { Alex_Brush as AlexBrush, League_Gothic as LeagueGothic } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Footer } from '@/components/shared/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { ChildrenProps, cn, OPEN_GRAPH_DEFAULTS, PUBLIC_SITE_BASE_URL } from '@/lib';
import type { Metadata } from 'next';
import { Header } from '@/components/shared/header';
import { Navigation } from '@/components/shared/navigation';
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
  description: 'Join Sean Blonien & Eva Melendez as they celebrate their love and lifelong marriage together at Forever Fest 2026!',
  keywords: [
    'Forever Fest 2026',
    'Sean Blonien and Eva Melendez wedding',
    'Dallas wedding March 2026',
    'DEC on Dragon wedding',
    'Dallas Design District wedding',
    'March 28 2026 wedding',
    'Texas wedding celebration',
    'Blonien Melendez wedding',
    'EDM wedding',
    'Festival wedding',
  ],
  authors: [{ name: 'Sean Blonien' }, { name: 'Eva Melendez' }],
  creator: 'Sean Blonien & Eva Melendez',
  publisher: 'Forever Fest 2026',
  formatDetection: {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- library api
    email: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention -- library api
    address: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention -- library api
    telephone: false,
  },
  metadataBase: new URL(PUBLIC_SITE_BASE_URL),
  alternates: {
    canonical: PUBLIC_SITE_BASE_URL,
  },
  openGraph: OPEN_GRAPH_DEFAULTS,
  twitter: {
    card: 'summary_large_image',
    title: 'Forever Fest 2026 - Sean & Eva\'s Wedding',
    description: 'Join Sean Blonien & Eva Melendez as they celebrate their love and lifelong marriage together at Forever Fest 2026!',
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

function RootLayout({ children }: ChildrenProps) {
  return (
    <html suppressHydrationWarning className={cn(boldFont.variable, cursiveFont.variable, 'dark')} lang='en' style={{ colorScheme: 'dark' }}>
      <body>
        <ThemeProvider disableTransitionOnChange enableSystem attribute='class' defaultTheme='dark'>
          <div className='min-h-screen bg-forever-fest-gradient flex flex-col'>
            <Header />
            <Navigation />

            {/* Main Content */}
            <main className='flex-1'>
              {children}
            </main>

            <Footer />
            <Analytics />
            <SpeedInsights />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
export default RootLayout;
