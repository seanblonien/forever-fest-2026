import {Header, Navigation} from '@/components/home';

type PageLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PageLayout({children, className = ''}: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-forever-fest-gradient ${className}`}>
      <Header />
      <Navigation />

      {/* Main Content */}
      {children}
    </div>
  );
}
