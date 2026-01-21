import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

import type { LucideIcon } from 'lucide-react';

type FaqLinkProps = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export const FaqLink: React.FC<FaqLinkProps> = ({ href, icon: Icon, label }) => {
  const isExternal = href.startsWith('http');
  const className = 'inline-flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-colors duration-200 rounded-lg p-4 group text-lg font-league-gothic';

  const content = (
    <>
      <Icon className='w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200' />
      <span>{label}</span>
      <ExternalLink className='w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-200' />
    </>
  );

  if (isExternal) {
    return (
      <a className={className} href={href} rel='noopener noreferrer' target='_blank'>
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={href as '/'}>
      {content}
    </Link>
  );
};
