import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, Shield, Gift } from 'lucide-react';
import { StickyNoteItem } from '../data/notesData';
import { soundManager } from '../utils/audio';

interface NoteModalProps {
  note: StickyNoteItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  note,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Support':
        return <Shield className="w-4 h-4 text-amber-600" />;
      case 'Love':
        return <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />;
      case 'Wish':
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
      case 'Promise':
        return <Gift className="w-4 h-4 text-purple-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-pink-500" />;
    }
  };

  return (
    <AnimatePresence>
      {note && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur with Soft Slate/Rose Tint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/35 backdrop-blur-md -z-10"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className={`relative w-full max-w-lg rounded-3xl p-5 sm:p-8 shadow-2xl border ${note.colorClasses.border} ${note.colorClasses.bg} ${note.colorClasses.text} my-auto overflow-hidden`}
            style={{
              boxShadow: `0 20px 40px -10px rgba(136, 19, 55, 0.15), 0 0 40px ${note.colorClasses.glow}`,
            }}
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-full bg-black/5 hover:bg-black/15 text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header: Category Badge & Number */}
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <span
                className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${note.colorClasses.badgeBg} ${note.colorClasses.badgeText} shadow-xs`}
              >
                {getCategoryIcon(note.category)}
                <span>{note.category} Note</span>
              </span>
            </div>

            {/* Main Note Text */}
            <div className="relative py-2 my-2">
              <span className="absolute -top-6 -left-2 text-5xl sm:text-6xl opacity-15 font-serif select-none pointer-events-none">
                “
              </span>
              <p className="font-handwriting text-xl sm:text-3xl leading-relaxed select-text tracking-wide text-slate-800">
                "{note.text}"
              </p>
              <span className="absolute -bottom-8 right-2 text-5xl sm:text-6xl opacity-15 font-serif select-none pointer-events-none">
                ”
              </span>
            </div>

            {/* Decorative Divider */}
            <div className="w-16 h-1 rounded-full mx-auto my-4 sm:my-6 opacity-25 bg-current" />

            {/* Navigation and Bottom Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-black/10">
              <button
                onClick={() => {
                  soundManager.playChime(1.1);
                  onPrev();
                }}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/15 text-xs font-medium transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Note</span>
              </button>

              <span className="text-[11px] opacity-60 font-mono">
                Birthday Love Note
              </span>

              <button
                onClick={() => {
                  soundManager.playChime(1.2);
                  onNext();
                }}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/15 text-xs font-medium transition-all active:scale-95"
              >
                <span>Next Note</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
