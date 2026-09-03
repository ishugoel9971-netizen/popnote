import { AnimatePresence, motion } from 'framer-motion';
import { BellDot } from 'lucide-react';

export function ProcessingOverlay({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-x-4 top-4 z-40 mx-auto max-w-xl rounded-lg border border-line bg-white/90 p-4 shadow-soft backdrop-blur-xl"
        >
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-softBlue text-appleBlue">
              <BellDot size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">Organizing new notifications</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-200">
                <motion.div
                  className="h-full rounded-full bg-appleBlue"
                  initial={{ width: '12%' }}
                  animate={{ width: ['12%', '88%', '42%', '96%'] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
