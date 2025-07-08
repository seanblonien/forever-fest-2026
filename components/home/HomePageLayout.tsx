import { ReactNode } from 'react';

interface HomePageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function HomePageLayout({
  children,
  className = ''
}: HomePageLayoutProps) {
  return (
    <div className={`min-h-screen bg-forever-fest-gradient ${className}`}>
      {children}
    </div>
  );
}
