import { Header, Navigation } from '@/components/home';
import { ChildrenProps } from '../../lib';
import Footer from './Footer';

export const PageLayout: React.FC<ChildrenProps> = ({ children }) => (
  <div className='min-h-screen bg-forever-fest-gradient flex flex-col'>
    <Header />
    <Navigation />

    {/* Main Content */}
    <main className='flex-1'>
      {children}
    </main>

    <Footer />
  </div>
);
