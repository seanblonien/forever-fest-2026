import {Header, Navigation} from '@/components/home';

type PageLayoutProps = {
  children: React.ReactNode;
};

export default function PageLayout({children}: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-forever-fest-gradient`}>
      <Header />
      <Navigation />

      {/* Main Content */}
      {children}
    </div>
  );
}
