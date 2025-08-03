import {Header, Navigation} from '@/components/home';
import Footer from './Footer';

type PageLayoutProps = {
  children: React.ReactNode;
};

export default function PageLayout({children}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-forever-fest-gradient flex flex-col">
      <Header />
      <Navigation />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
