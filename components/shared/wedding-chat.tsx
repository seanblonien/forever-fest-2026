'use client';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { ChevronDown, Clock, Pencil, Send, Square, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import type { RefObject } from 'react';
import { Button } from '@/components/ui/button';
import { codePointLength, messageText, QUESTION_LIMIT } from '@/lib/chat/contracts';
import { boundPairs, completedPair, newChatHistory, pairsToMessages, restoreChatHistory, restorePairs, saveChatHistory, STORAGE_KEY, THREAD_STORAGE_KEY, updateChatHistory } from '@/lib/chat/storage';
import { useMobileChatViewport } from '@/lib/chat/useMobileChatViewport';
import { cn } from '@/lib/utils';
import type { ChatHistory, ChatThread, CompletedPair } from '@/lib/chat/storage';
import type { UIMessage } from 'ai';

function DiscoBallIcon() {
  return (
    <svg aria-hidden='true' className='size-6' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.4' viewBox='0 0 24 24'>
      <path d='M10 2v5' />
      <circle cx='10' cy='14' r='7' />
      <ellipse cx='10' cy='14' rx='3' ry='7' />
      <path d='M3 14h14M4 10.5q6 3 12 0M4 17.5q6-3 12 0M20 2v6M17 5h6' />
    </svg>
  );
}

const publicFailure = z.object({ code: z.string(), resetAt: z.number().optional() });
const FAQ_HINT_KEY = 'forever-fest-chat:faq-hint-seen';
async function chatFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const response = await fetch(input, init);
  if (response.ok)
    return response;
  let message = 'Chat is unavailable. Please use the FAQs or contact Sean or Eva.';
  try {
    const failure = publicFailure.safeParse(await response.json());
    if (response.status === 429 && failure.success && failure.data.resetAt && failure.data.resetAt < Date.parse('2026-10-19T05:00:00Z')) {
      const time = new Date(failure.data.resetAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'medium' });
      message = `The chat limit has been reached. You can try again after ${time}.`;
    } else if (response.status === 400 || response.status === 413) {
      message = 'This question or chat history is too large or invalid. Please start a new chat and try a question of up to 500 characters.';
    }
  } catch {/* Keep the safe fallback, including for a proxy's HTML error page. */}
  throw new Error(message);
}
// One instance for the shared site layout. Only completed, bounded pairs enter subsequent requests.
const transport = new DefaultChatTransport({
  api: '/api/chat',
  fetch: chatFetch,
  prepareSendMessagesRequest: ({ messages }) => ({
    body: { messages: messages.slice(-7).map((message) => ({ id: message.id, role: message.role, parts: [{ type: 'text', text: messageText(message) }] })) },
  }),
});
type ChatHistoryMenuProps = {
  history: ChatHistory | null;
  onSelect: (thread: ChatThread) => void;
};
function ChatHistoryMenu({ history, onSelect }: ChatHistoryMenuProps) {
  return (
    <div aria-label='Previous chats' className='absolute inset-x-3 top-[calc(3rem+max(.75rem,env(safe-area-inset-top)))] z-10 max-h-[60%] overflow-y-auto overscroll-none rounded-xl border border-lavender-pink/30 bg-penn-blue p-2 shadow-xl shadow-black/40 sm:top-18' id='wedding-chat-history' role='region'>
      <p className='px-3 py-2 text-xs font-semibold text-lavender-pink'>Previous chats</p>
      {history?.threads.length ? history.threads.map((thread) => (
        <button
          key={thread.id}
          aria-current={thread.id === history.activeId ? 'true' : undefined}
          className={cn('block w-full rounded-lg px-3 py-2 text-left hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-lavender-pink', thread.id === history.activeId ? 'bg-white/10' : '')}
          type='button'
          onClick={() => onSelect(thread)}
        >
          <span className='block truncate text-sm'>{thread.title}</span>
          <span className='mt-1 block text-xs text-white/50'>{new Date(thread.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
        </button>
      )) : <p className='px-3 py-2 text-sm text-white/60'>No previous chats yet.</p>}
    </div>
  );
}

type ChatTranscriptProps = {
  enabled: boolean;
  isIncomplete: boolean;
  messages: UIMessage[];
  onScrollPosition: (isAtBottom: boolean) => void;
  showThinking: boolean;
  transcriptRef: RefObject<HTMLDivElement | null>;
};
function ChatTranscript({
  enabled,
  isIncomplete,
  messages,
  onScrollPosition,
  showThinking,
  transcriptRef,
}: ChatTranscriptProps) {
  return (
    <div
      ref={transcriptRef}
      aria-label='Chat history'
      className='min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-none p-4'
      role='region'
      tabIndex={messages.length > 0 ? 0 : -1}
      onScroll={(event) => {
        const element = event.currentTarget;
        onScrollPosition(element.scrollHeight - element.scrollTop - element.clientHeight < 48);
      }}
    >
      {enabled || messages.length === 0 ? (
        <p className='max-w-[90%] rounded-2xl rounded-tl-sm bg-white/10 p-3 text-sm leading-relaxed'>
          {enabled ? 'Hey, festival friend! 🪩 Your Forever Fest info booth is open. Ask about arrival, outfits, food, or the weekend plans. Let’s get you ready to celebrate! ✨' : 'Chat is unavailable. Please contact Sean or Eva.'}
        </p>
      ) : null}
      {messages.map((message, index) => message.role === 'assistant' && !messageText(message)
        ? null
        : (
            <div key={message.id} className={cn('w-fit max-w-[90%] rounded-2xl p-3', message.role === 'user' ? 'ml-auto rounded-tr-sm bg-steel-pink' : 'rounded-tl-sm bg-white/10')}>
              <span className='sr-only'>{message.role === 'user' ? 'You: ' : 'Forever Fest Help: '}</span>
              <p className='whitespace-pre-wrap wrap-anywhere text-sm leading-relaxed'>{messageText(message)}</p>
              {isIncomplete && index === messages.length - 1 && message.role === 'assistant' ? <p className='mt-2 text-xs text-papaya-whip'>Answer stopped</p> : null}
            </div>
          ))}
      {showThinking ? (
        <div aria-hidden='true' className='flex w-fit gap-1.5 rounded-2xl rounded-tl-sm bg-white/10 px-4 py-4' data-testid='chat-thinking'>
          <span className='size-1.5 rounded-full bg-lavender-pink motion-safe:animate-bounce' />
          <span className='size-1.5 rounded-full bg-lavender-pink motion-safe:animate-bounce [animation-delay:150ms]' />
          <span className='size-1.5 rounded-full bg-lavender-pink motion-safe:animate-bounce [animation-delay:300ms]' />
        </div>
      ) : null}
    </div>
  );
}

type ChatComposerProps = {
  canSend: boolean;
  composerRef: RefObject<HTMLTextAreaElement | null>;
  input: string;
  isBusy: boolean;
  isRestored: boolean;
  length: number;
  onInput: (value: string) => void;
  onStop: () => void;
  onSubmit: () => void;
};
function ChatComposer({
  canSend,
  composerRef,
  input,
  isBusy,
  isRestored,
  length,
  onInput,
  onStop,
  onSubmit,
}: ChatComposerProps) {
  return (
    <form
      className='shrink-0 border-t border-white/10 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] sm:pb-3'
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label className='sr-only' htmlFor='wedding-chat-question'>Your question</label>
      <div className='flex items-start gap-2 rounded-xl border border-white/20 bg-white/5 p-2 focus-within:border-lavender-pink'>
        <textarea
          ref={composerRef}
          aria-describedby='wedding-chat-counter'
          autoComplete='off'
          className='h-11 max-h-32 min-h-11 w-full resize-none bg-transparent px-1 py-2.5 text-base text-white placeholder:text-white/50 focus-visible:outline-none disabled:opacity-60'
          disabled={!isRestored}
          id='wedding-chat-question'
          placeholder='Ask a question…'
          rows={1}
          value={input}
          onChange={(event) => onInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) {
              event.preventDefault();
              onSubmit();
            }
          }}
        />
        {isBusy ? (
          <Button
            aria-label='Stop'
            className='size-11 shrink-0 rounded-lg bg-white/20 text-white hover:bg-white/30 focus-visible:ring-lavender-pink'
            size='icon'
            type='button'
            onClick={onStop}
          >
            <Square aria-hidden='true' />
          </Button>
        ) : (
          <Button aria-label='Send' className='size-11 shrink-0 rounded-lg bg-steel-pink text-white hover:bg-steel-pink/80 focus-visible:ring-lavender-pink' disabled={!canSend} size='icon' type='submit'>
            <Send aria-hidden='true' />
          </Button>
        )}
      </div>
      <p className={length > QUESTION_LIMIT ? 'mt-2 text-xs text-orange-200' : 'sr-only'} id='wedding-chat-counter'>
        {length > QUESTION_LIMIT ? 'Please keep your question within 500 characters.' : 'Up to 500 characters. Enter to send; Shift+Enter for a new line.'}
      </p>
    </form>
  );
}

// eslint-disable-next-line max-lines-per-function -- Keep the tab lifecycle and its single panel together.
export function WeddingChat({ enabled }: {
  enabled: boolean;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<ChatHistory | null>(null);
  const [input, setInput] = useState('');
  const [isRestored, setIsRestored] = useState(false);
  const [notice, setNotice] = useState('');
  const [isIncomplete, setIsIncomplete] = useState(false);
  const pairs = useRef<CompletedPair[]>([]);
  const savedHistory = useRef<ChatHistory | null>(null);
  const sending = useRef(false);
  const clearing = useRef(false);
  const mounted = useRef(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const hasShownFaqHint = useRef(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const historyButton = useRef<HTMLButtonElement>(null);
  const composer = useRef<HTMLTextAreaElement>(null);
  const transcript = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  useMobileChatViewport(isOpen, panel);
  const atBottom = useRef(true);
  const { clearError, messages, sendMessage, setMessages, status, stop } = useChat({
    transport,
    onFinish: ({ finishReason, isAbort, isDisconnect, isError, messages: finished }) => {
      sending.current = false;
      if (!mounted.current || clearing.current)
        return;
      const isComplete = !isAbort && !isError && !isDisconnect && finishReason === 'stop';
      setIsIncomplete(!isComplete);
      setNotice((previous) => {
        if (isComplete) return 'Answer complete.';
        if (isError || isDisconnect) return previous;

        return 'Answer stopped or incomplete. Please use the FAQs.';
      });
      const pair = isComplete ? completedPair(finished) : undefined;
      if (pair) {
        pairs.current = boundPairs([...pairs.current, pair]);
        if (savedHistory.current)
          persistHistory(updateChatHistory(savedHistory.current, pairs.current));
      }
    },
    onError: (error) => {
      sending.current = false;
      if (!mounted.current || clearing.current)
        return;
      setIsIncomplete(true);
      // Stream error text is generated by our server; network/parser errors use a fixed fallback.
      setNotice(error.message.startsWith('The chat limit') || error.message.startsWith('Chat is unavailable') ||
        error.message.startsWith('This question')
        ? error.message
        : 'The answer is incomplete. Please use the FAQs.');
    },
  });

  function persistHistory(next: ChatHistory) {
    savedHistory.current = next;
    setHistory(next);
    try {
      saveChatHistory(localStorage, next);
    } catch {
      // Keep history in memory when browser storage is unavailable.
    }
  }

  /* eslint-disable react-hooks/set-state-in-effect -- Restore browser history after mount and keep SSR deterministic. */
  useEffect(() => {
    mounted.current = true;
    let initial = newChatHistory();
    try {
      const stored = restoreChatHistory(localStorage.getItem(THREAD_STORAGE_KEY));
      if (stored) {
        initial = stored;
      } else {
        const legacyPairs = restorePairs(sessionStorage.getItem(STORAGE_KEY));
        initial = updateChatHistory(initial, legacyPairs);
      }
      if (saveChatHistory(localStorage, initial))
        sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Keep history in memory when browser storage is unavailable.
    }
    savedHistory.current = initial;
    setHistory(initial);
    pairs.current = initial.threads.find(({ id }) => id === initial.activeId)?.pairs ?? [];
    setMessages(pairsToMessages(pairs.current));
    setIsRestored(true);

    return () => {
      mounted.current = false;
    };
  }, [setMessages]);
  /* eslint-enable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!enabled || pathname !== '/faqs' || hasShownFaqHint.current)
      return;
    let hint: Animation | undefined;
    // Defer consuming the session flag until after React's development effect replay.
    const frame = requestAnimationFrame(() => {
      hasShownFaqHint.current = true;
      try {
        if (sessionStorage.getItem(FAQ_HINT_KEY))
          return;
        sessionStorage.setItem(FAQ_HINT_KEY, 'true');
      } catch {
        // The ref still prevents repeat hints when browser storage is unavailable.
      }
      if (isOpen || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        return;
      hint = launcher.current?.animate([
        { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(252,173,231,0), 0 0 0 rgba(184,21,158,0)' },
        { transform: 'scale(1.1)', boxShadow: '0 0 0 8px rgba(252,173,231,0.3), 0 0 28px rgba(184,21,158,0.7)' },
        { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(252,173,231,0), 0 0 0 rgba(184,21,158,0)' },
      ], { duration: 1200, iterations: 3, easing: 'ease-in-out' });
    });

    return () => {
      cancelAnimationFrame(frame);
      hint?.cancel();
    };
  }, [enabled, isOpen, pathname]);
  const isBusy = status === 'submitted' || status === 'streaming';
  const latestMessage = messages.at(-1);
  const showThinking = isBusy && !isIncomplete && (latestMessage?.role !== 'assistant' || !messageText(latestMessage));
  useEffect(() => {
    // eslint-disable-next-line react-you-might-not-need-an-effect/no-event-handler -- Scroll after new messages render.
    if (isOpen && atBottom.current && transcript.current)
      transcript.current.scrollTop = transcript.current.scrollHeight;
  }, [isOpen, /* effect dep */ messages, /* effect dep */ showThinking]);
  function closePanel() {
    setIsOpen(false);
    setShowHistory(false);
    requestAnimationFrame(() => launcher.current?.focus());
  }
  useEffect(() => {
    // eslint-disable-next-line react-you-might-not-need-an-effect/no-event-handler -- Focus once the opened panel is visible.
    if (!isOpen)
      return;
    // eslint-disable-next-line @typescript-eslint/naming-convention -- library api
    (enabled ? composer.current : closeButton.current)?.focus({ preventScroll: true });
  }, [enabled, isOpen]);
  useEffect(() => {
    const element = composer.current;
    if (!isOpen || !element)
      return;
    function resizeComposer() {
      if (!element)
        return;
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    }
    resizeComposer();
    window.addEventListener('resize', resizeComposer);

    return () => window.removeEventListener('resize', resizeComposer);
  }, [isOpen, /* effect dep */ enabled, /* effect dep */ input]);
  useEffect(() => {
    if (!isOpen)
      return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (showHistory) {
          setShowHistory(false);
          historyButton.current?.focus();
        } else closePanel();
      }
    };
    document.addEventListener('keydown', onEscape);

    return () => document.removeEventListener('keydown', onEscape);
  }, [isOpen, showHistory]);
  const length = codePointLength(input);
  const canSend = enabled && isRestored && !isBusy && length <= QUESTION_LIMIT &&
    Boolean(input.trim());
  async function submit() {
    if (!canSend || sending.current)
      return;
    sending.current = true;
    clearing.current = false;
    setShowHistory(false);
    clearError();
    setMessages(pairsToMessages(pairs.current));
    setIsIncomplete(false);
    setNotice('Getting an answer…');
    const text = input.trim();
    setInput('');
    composer.current?.focus();
    atBottom.current = true;
    await sendMessage({ text });
    sending.current = false;
  }
  async function selectChat(thread?: ChatThread) {
    if (clearing.current || !savedHistory.current)
      return;
    clearing.current = true;
    await stop();
    sending.current = false;
    pairs.current = thread?.pairs ?? [];
    setMessages(pairsToMessages(pairs.current));
    clearError();
    setInput('');
    setIsIncomplete(false);
    setNotice(thread ? 'Chat reopened.' : 'New chat started.');
    persistHistory({ ...savedHistory.current, activeId: thread?.id ?? crypto.randomUUID() });
    setShowHistory(false);
    atBottom.current = true;
    clearing.current = false;
    composer.current?.focus();
  }

  return (
    <div className={cn('fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-1000 flex flex-col items-end gap-3 text-left text-white [&_button:enabled]:cursor-pointer', isOpen && 'max-sm:inset-0 max-sm:overflow-hidden max-sm:overscroll-none max-sm:bg-penn-blue')}>
      <section
        ref={panel}
        aria-labelledby='wedding-chat-heading'
        className={cn('fixed inset-x-0 top-[var(--chat-viewport-top,0px)] h-[var(--chat-viewport-height,100dvh)] w-full flex-col overflow-hidden overscroll-none bg-penn-blue shadow-2xl shadow-black/40 sm:relative sm:inset-auto sm:h-[min(36rem,calc(100dvh-7rem))] sm:w-[min(24rem,calc(100vw-2rem))] sm:rounded-2xl sm:border sm:border-lavender-pink/30', isOpen ? 'flex' : 'hidden')}
        id='wedding-chat-panel'
        role='dialog'
      >
        <div className='flex shrink-0 items-center gap-1 border-b border-white/10 bg-linear-to-r from-steel-pink/30 to-penn-blue p-3 pt-[max(.75rem,env(safe-area-inset-top))] sm:gap-2 sm:p-4'>
          <span className='size-6 shrink-0 text-lavender-pink'><DiscoBallIcon /></span>
          <h2 className='mr-auto text-2xl leading-none font-league-gothic' id='wedding-chat-heading'>Forever Fest Help</h2>
          <Button
            aria-label='New chat'
            className='size-9 shrink-0 rounded-full bg-transparent text-white/70 hover:bg-white/10 hover:text-white focus-visible:ring-lavender-pink'
            disabled={!enabled || !isRestored}
            size='icon'
            title='New chat'
            type='button'
            onClick={() => {void selectChat();}}
          >
            <Pencil aria-hidden='true' />
          </Button>
          <Button
            ref={historyButton}
            aria-controls='wedding-chat-history'
            aria-expanded={showHistory}
            aria-label='Previous chats'
            className='size-9 shrink-0 rounded-full bg-transparent text-white/70 hover:bg-white/10 hover:text-white focus-visible:ring-lavender-pink'
            disabled={!isRestored}
            size='icon'
            title='Previous chats'
            type='button'
            onClick={() => setShowHistory((wasShown) => !wasShown)}
          >
            <Clock aria-hidden='true' />
          </Button>
          <Button
            ref={closeButton}
            aria-label='Close chat'
            className='size-9 shrink-0 rounded-full bg-transparent text-white/70 hover:bg-white/10 hover:text-white focus-visible:ring-lavender-pink'
            size='icon'
            type='button'
            onClick={closePanel}
          >
            <X aria-hidden='true' />
          </Button>
        </div>
        {showHistory ? (
          <ChatHistoryMenu history={history} onSelect={(thread) => {void selectChat(thread);}} />
        ) : null}
        <ChatTranscript
          enabled={enabled}
          isIncomplete={isIncomplete}
          messages={messages}
          showThinking={showThinking}
          transcriptRef={transcript}
          onScrollPosition={(isAtBottom) => {
            atBottom.current = isAtBottom;
          }}
        />
        <p aria-atomic='true' aria-live='polite' className={cn('text-xs text-papaya-whip', isIncomplete ? 'px-4 pb-3' : 'sr-only')} role='status'>{notice}</p>
        {enabled ? (
          <ChatComposer
            canSend={canSend}
            composerRef={composer}
            input={input}
            isBusy={isBusy}
            isRestored={isRestored}
            length={length}
            onInput={setInput}
            onStop={() => {
              setIsIncomplete(true);
              setNotice('Answer stopped.');
              void stop();
            }}
            onSubmit={() => {void submit();}}
          />
        ) : null}
      </section>
      <Button
        ref={launcher}
        aria-controls='wedding-chat-panel'
        aria-expanded={isOpen}
        aria-haspopup='dialog'
        aria-label='Ask about Forever Fest'
        className={cn('size-12 rounded-full border border-lavender-pink/30 bg-steel-pink p-0 text-white shadow-lg shadow-black/30 hover:bg-steel-pink/90 focus-visible:ring-lavender-pink [&_svg]:size-6', isOpen && 'hidden sm:inline-flex')}
        title='Ask about Forever Fest'
        type='button'
        onClick={() => {
          if (isOpen) closePanel();
          else setIsOpen(true);
        }}
      >
        {isOpen ? <ChevronDown aria-hidden='true' /> : <DiscoBallIcon />}
      </Button>
    </div>
  );
}
