'use client';

import { LinkIcon } from 'lucide-react';
import { useState } from 'react';

import { generateSlug } from './utils';

type IndividualFaqProps = {
  answer: string;
  component?: React.ReactNode;
  highlightedId: string | null;
  question: string;
};

export const IndividualFaq: React.FC<IndividualFaqProps> = ({
  answer,
  component,
  highlightedId,
  question,
}) => {
  const [hasCopiedTooltip, setHasCopiedTooltip] = useState(false);
  const slug = generateSlug(question);
  const isHighlighted = highlightedId === slug;

  const copyLinkToClipboard = () => {
    const url = `${window.location.origin}${window.location.pathname}#${slug}`;
    void navigator.clipboard.writeText(url);

    setHasCopiedTooltip(true);

    setTimeout(() => {
      setHasCopiedTooltip(false);
    }, 1500);
  };

  return (
    <div
      className={`bg-white/10 backdrop-blur-xs rounded-lg p-6 transition-all duration-500 group/question ${
        isHighlighted
          ? 'ring-2 ring-[#DE1ACE] shadow-lg shadow-[#DE1ACE]/50 bg-white/20'
          : ''
      }`}
      id={slug}
    >
      <div className='flex items-center justify-between mb-3'>
        <h3 className='text-xl font-bold flex-1'>
          <button
            className='text-left cursor-pointer group-hover/question:underline transition-all duration-200'
            title='Copy link to this question'
            type='button'
            onClick={copyLinkToClipboard}
          >
            {question}
          </button>
        </h3>
        <div className='relative'>
          <button
            className='ml-3 p-1 rounded-sm hover:bg-white/10 transition-all duration-200 opacity-0 group-hover/question:opacity-100'
            title='Copy link to this question'
            onClick={copyLinkToClipboard}
          >
            <LinkIcon className='w-4 h-4 text-white/60 hover:text-white transition-colors duration-200' />
          </button>
          {hasCopiedTooltip && (
            <div className='absolute -top-8 -left-4 bg-[#DE1ACE]/90 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg transition-opacity duration-300 animate-in fade-in-0'>
              Link copied!
            </div>
          )}
        </div>
      </div>
      <p className='text-lg mb-4'>{answer}</p>
      {component && (
        <div className='mt-4 flex justify-center'>
          {component}
        </div>
      )}
    </div>
  );
};
