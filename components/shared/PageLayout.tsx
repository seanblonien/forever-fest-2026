import { Header, Navigation } from '@/components/home';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div
      className={`min-h-screen ${className}`}
      style={{
        background: 'linear-gradient(180deg, #101048 0%, #DE1ACE 100%)'
      }}
    >
      <Header />
      <Navigation />
      
      {/* Main Content */}
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  );
}
