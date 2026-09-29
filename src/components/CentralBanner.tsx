import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CentralBannerProps {
  onSparkleClick?: () => void;
}

export const CentralBanner: React.FC<CentralBannerProps> = ({ onSparkleClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto pointer-events-none select-none my-auto"
    >
      {/* Ambient Pulsing Glow Halo Behind Banner */}
      <div className="absolute -inset-10 bg-gradient-to-r from-pink-300/30 via-rose-300/40 to-pink-200/30 rounded-full blur-3xl -z-10 animate-pulse-slow pointer-events-none" />

      {/* Floating Pill Header */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 rounded-full glass-panel border border-pink-300/70 text-rose-700 text-[11px] sm:text-xs font-medium tracking-widest uppercase mb-3 sm:mb-4 shadow-sm pointer-events-auto cursor-pointer hover:border-pink-400 transition-colors"
        onClick={() => {
          soundManager.playChime(1.4);
          if (onSparkleClick) onSparkleClick();
        }}
      >
        <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin-very-slow" />
        <span>A Celestial Tribute for Your Day</span>
        <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
      </motion.div>

      {/* Main Title: "Happy Birthday, My Love ✨" */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-slate-900 mb-2 sm:mb-3 drop-shadow-sm leading-tight">
        <span className="bg-gradient-to-r from-rose-900 via-rose-700 to-pink-700 bg-clip-text text-transparent">
          Happy Birthday,{' '}
        </span>
        <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-300">
          My Love
        </span>
        <span className="inline-block ml-1.5 text-pink-500 animate-pulse">✨</span>
      </h1>

      {/* Elegant Subtitle */}
      <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal max-w-lg mx-auto leading-relaxed mb-4 sm:mb-6 font-sans">
        Floating across our quietest moments, biggest adventures, and endless gratitude. Every star in this universe shines for you today.
      </p>

      {/* Interactive Helper Badge */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-xs text-rose-900/70 pointer-events-auto">
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white/70 border border-pink-200/80 backdrop-blur-sm shadow-xs">
          <span>🌸 Zero-Gravity Playground</span>
        </span>
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white/70 border border-pink-200/80 backdrop-blur-sm shadow-xs">
          <span>Drag freely & click any card</span>
        </span>
      </div>
    </motion.div>
  );
};
