import { motion } from 'framer-motion';
import { MessageSquareReply, Send, Star } from 'lucide-react';
import { useState } from 'react';
import type { CrucialAlert } from '../types';
import { formatElapsed } from '../utils/filterEngine';

export function CrucialAlertCard({ alert }: { alert: CrucialAlert }) {
  const [replyOpen, setReplyOpen] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="rounded-lg border border-line/80 bg-white p-4 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-softBlue text-appleBlue">
          <Star size={19} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-ink">{alert.sender}</h3>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-muted">
              Priority
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">
            {alert.platform} / {formatElapsed(alert.minutesAgo)} / {alert.reason}
          </p>
          <p className="mt-3 text-sm leading-6 text-ink">{alert.content}</p>
        </div>
      </div>

      <div className="mt-4">
        <button
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-neutral-50 px-3 text-sm text-ink transition hover:border-appleBlue/40 hover:text-appleBlue"
          type="button"
          onClick={() => setReplyOpen((open) => !open)}
        >
          <MessageSquareReply size={16} />
          Quick Reply
        </button>
        <motion.div
          initial={false}
          animate={{ height: replyOpen ? 'auto' : 0, opacity: replyOpen ? 1 : 0 }}
          className="overflow-hidden"
        >
          <div className="mt-3 rounded-lg border border-line bg-neutral-50 p-3">
            <textarea
              aria-label={`Reply to ${alert.sender}`}
              className="min-h-20 w-full resize-none rounded-lg border border-line bg-white p-3 text-sm text-ink outline-none placeholder:text-neutral-400 focus:border-appleBlue"
              placeholder="Draft a calm, concise response..."
            />
            <button className="mt-3 inline-flex h-9 items-center gap-2 rounded-lg bg-appleBlue px-3 text-sm font-semibold text-white" type="button">
              <Send size={15} />
              Send
            </button>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
