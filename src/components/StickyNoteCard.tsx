import React from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { StickyNoteItem } from '../data/notesData';
import { soundManager } from '../utils/audio';

interface StickyNoteCardProps {
  note: StickyNoteItem;
  resetTrigger: number;
  isRead: boolean;
  onSelectNote: (note: StickyNoteItem) => void;
}

export const StickyNoteCard: React.FC<StickyNoteCardProps> = ({
  note,
  resetTrigger,
  isRead,
  onSelectNote,
}) => {
  const controls = useAnimationControls();

  // Reset back to orbit positions
  React.useEffect(() => {
    if (resetTrigger > 0) {
      controls.start({
        x: note.defaultPosition.x,
        y: note.defaultPosition.y,
        rotate: note.defaultRotation,
        transition: { type: 'spring', damping: 20, stiffness: 60 },
      });
    }
  }, [resetTrigger, controls, note]);

  return (
    <motion.div
      drag
      dragMomentum={true}
      dragElastic={0.15}
      animate={controls}
      initial={{
        x: note.defaultPosition.x,
        y: note.defaultPosition.y,
        rotate: note.defaultRotation,
        opacity: 0,
        scale: 0.85,
      }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.06,
        zIndex: 50,
        rotate: 0,
        transition: { duration: 0.2 },
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 60,
        cursor: 'grabbing',
      }}
      onDragStart={() => soundManager.playChime(1.15)}
      onDragEnd={() => soundManager.playSoftRelease()}
      className="absolute cursor-grab select-none touch-none"
      style={{
        left: '50%',
        top: '50%',
      }}
    >
      {/* Zero-gravity vertical floating drift */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotate: [note.defaultRotation - 1.2, note.defaultRotation + 1.2, note.defaultRotation - 1.2],
        }}
        transition={{
          duration: note.floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: note.floatDelay,
        }}
        className="group relative"
      >
        {/* Soft Ambient Glow Behind Note */}
        <div
          className="absolute -inset-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none"
          style={{ background: note.colorClasses.glow }}
        />

        {/* Note Body */}
        <div
          onClick={() => {
            soundManager.playChime(1.35);
            onSelectNote(note);
          }}
          className={`relative w-40 sm:w-50 md:w-56 p-3 sm:p-4 rounded-xl border ${note.colorClasses.bg} ${note.colorClasses.text} ${note.colorClasses.border} shadow-sticky-paper cursor-pointer transition-all duration-200`}
        >
          {/* Pushpin / Tape Top Accent */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <div
              className="w-3.5 h-3.5 rounded-full shadow-sm border border-white/60 ring-1 ring-black/10"
              style={{ backgroundColor: note.colorClasses.pinColor }}
            />
          </div>

          {/* Category Pill Tag & Read indicator */}
          <div className="flex items-center justify-between mt-0.5 mb-1.5 sm:mb-2">
            <span
              className={`text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase px-1.5 sm:px-2 py-0.5 rounded-md ${note.colorClasses.badgeBg} ${note.colorClasses.badgeText}`}
            >
              {note.category}
            </span>
            {isRead && (
              <span className="text-[9px] sm:text-[10px] opacity-70 font-mono">
                ✓ read
              </span>
            )}
          </div>

          {/* Sticky Note Snippet Text */}
          <p className="font-handwriting text-sm sm:text-base md:text-lg leading-snug line-clamp-3 select-text">
            "{note.text}"
          </p>

          {/* Tap to read hint */}
          <div className="mt-2 pt-1 border-t border-black/5 flex items-center justify-between text-[9px] sm:text-[10px] opacity-60">
            <span>Tap to read</span>
            <span>🌸</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
