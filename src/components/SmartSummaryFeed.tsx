import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, MessagesSquare } from 'lucide-react';
import { useState } from 'react';
import type { SmartSummary } from '../types';

export function SmartSummaryFeed({ summaries }: { summaries: SmartSummary[] }) {
  const [openId, setOpenId] = useState(summaries[0]?.id ?? '');

  return (
    <section className="glass rounded-lg p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">Digest</p>
          <h2 className="mt-1 text-xl font-semibold text-ink">Message Summaries</h2>
        </div>
        <MessagesSquare className="text-appleBlue" size={22} />
      </div>

      <div className="space-y-3">
        {summaries.slice(0, 8).map((summary) => {
          const isOpen = openId === summary.id;
          return (
            <article className="rounded-lg border border-line/80 bg-white" key={summary.id}>
              <button
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
                type="button"
                onClick={() => setOpenId(isOpen ? '' : summary.id)}
              >
                <span>
                  <span className="block text-sm font-semibold text-ink">{summary.chat}</span>
                  <span className="text-xs text-muted">
                    {summary.platform} / {summary.count} messages summarized
                  </span>
                </span>
                <ChevronDown className={`shrink-0 text-muted transition ${isOpen ? 'rotate-180' : ''}`} size={18} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-line/80 px-4 py-3 text-sm leading-6 text-muted">
                      <p>{summary.summary}</p>
                      <p className="mt-2 text-xs text-neutral-500">Active senders: {summary.senders.join(', ')}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
}
