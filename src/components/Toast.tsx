import { AnimatePresence, motion } from 'framer-motion';

const Toast = ({ message }: { message: string | null }) => (
  <AnimatePresence>
    {message ? (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        className="fixed bottom-6 right-6 z-50 rounded-full border border-neon-cyan/40 bg-black/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-neon-cyan shadow-glow"
      >
        {message}
      </motion.div>
    ) : null}
  </AnimatePresence>
);

export default Toast;
