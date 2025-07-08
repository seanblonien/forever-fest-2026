import {ReactNode} from 'react';

type MainContentProps = {
  children: ReactNode;
  className?: string;
};

export default function MainContent({
  children,
  className = '',
}: MainContentProps) {
  return (
    <div className={`container mx-auto px-4 text-center relative ${className}`}>
      {children}
    </div>
  );
}
