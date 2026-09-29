import React from 'react';
import { Volume2, VolumeX, Music, RotateCcw, Sparkles, BookOpen, Heart, Smartphone, Orbit } from 'lucide-react';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

interface NavbarProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  isSfxOn: boolean;
  onToggleSfx: () => void;
  onResetPositions: () => void;
  readNotesCount: number;
  totalNotesCount: number;
  viewMode: 'orbit' | 'feed';
  onToggleViewMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMusicPlaying,
  onToggleMusic,
  isSfxOn,
  onToggleSfx,
  onResetPositions,
  readNotesCount,
  totalNotesCount,
  viewMode,
  onToggleViewMode,
}) => {
  const triggerCelebration = () => {
    soundManager.playCelebrationChime();

    // Rose, pink, gold, and white confetti explosion
    const count = 120;
    const defaults = {
      origin: { y: 0.15 },
      colors: ['#f43f6e', '#fb7193', '#fecdd8', '#ffd700', '#ffffff'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-8 py-2.5 sm:py-3 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand / Title Tag */}
        <div className="flex items-center space-x-2 sm:space-x-3 glass-panel px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-pink-200/80 shadow-sm">
          <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 text-white shadow-sm">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold tracking-wider bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent font-serif">
              MY LOVE ✨
            </span>
            <span className="text-[9px] sm:text-[10px] text-pink-700/70 tracking-wider uppercase font-mono hidden xs:inline">
              Birthday Edition
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5">
          {/* Mobile/Desktop Mode Switcher (Orbit vs Story Feed) */}
          <button
            onClick={() => {
              soundManager.playChime(1.1);
              onToggleViewMode();
            }}
            className={`flex items-center space-x-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full glass-panel border text-xs font-medium transition-all active:scale-95 ${
              viewMode === 'feed'
                ? 'border-pink-400 bg-pink-100/80 text-rose-700 shadow-glow-soft'
                : 'border-pink-200/80 text-slate-700 hover:bg-white/90'
            }`}
            title={viewMode === 'orbit' ? 'Switch to Mobile Story Feed' : 'Switch to Zero-Gravity Orbit'}
          >
            {viewMode === 'orbit' ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-pink-600" />
                <span className="hidden sm:inline">Story Feed</span>
              </>
            ) : (
              <>
                <Orbit className="w-3.5 h-3.5 text-pink-600" />
                <span className="hidden sm:inline">Orbit View</span>
              </>
            )}
          </button>

          {/* Notes Counter Pill */}
          <div
            title={`${readNotesCount} of ${totalNotesCount} notes opened`}
            className="hidden md:flex items-center space-x-1.5 glass-panel px-3 py-1.5 rounded-full border border-pink-200/80 text-xs text-slate-700 shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-pink-500" />
            <span>
              <strong className="text-rose-700 font-medium">{readNotesCount}</strong> / {totalNotesCount} Notes
            </span>
          </div>

          {/* Reset Orbit Positions Button (Only in Orbit Mode) */}
          {viewMode === 'orbit' && (
            <button
              onClick={() => {
                soundManager.playChime(1.2);
                onResetPositions();
              }}
              className="flex items-center space-x-1 glass-panel hover:bg-white/90 active:scale-95 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border border-pink-200/80 text-xs text-rose-700 transition-all duration-200 shadow-sm group"
              title="Reset cards back to original floating orbit"
            >
              <RotateCcw className="w-3.5 h-3.5 text-pink-500 group-hover:-rotate-90 transition-transform duration-300" />
              <span className="hidden lg:inline">Reset Orbit</span>
            </button>
          )}

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              onToggleSfx();
              soundManager.playChime(1.0);
            }}
            className={`p-1.5 sm:p-2 rounded-full glass-panel border transition-all duration-200 active:scale-95 ${
              isSfxOn
                ? 'border-pink-300 text-rose-600 bg-pink-50/80'
                : 'border-pink-200/60 text-slate-400 hover:text-slate-600'
            }`}
            title={isSfxOn ? 'Mute Interaction Sounds' : 'Unmute Interaction Sounds'}
          >
            {isSfxOn ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          {/* Ambient Music Toggle */}
          <button
            onClick={() => {
              onToggleMusic();
            }}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full glass-panel border transition-all duration-300 active:scale-95 ${
              isMusicPlaying
                ? 'border-pink-400 bg-pink-100/90 text-rose-700 shadow-glow-soft'
                : 'border-pink-200/80 text-slate-700 hover:bg-white/90'
            }`}
            title={isMusicPlaying ? 'Pause Ambient Cosmic Music' : 'Play Ambient Cosmic Music'}
          >
            <Music className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isMusicPlaying ? 'animate-bounce text-rose-600' : 'text-slate-600'}`} />
            <span className="text-xs font-medium hidden sm:inline">
              {isMusicPlaying ? 'Music Playing' : 'Music'}
            </span>
            {isMusicPlaying && (
              <span className="flex items-end space-x-0.5 h-3 sm:h-3.5">
                <span className="w-0.5 bg-rose-500 h-full animate-[pulse_0.6s_ease-in-out_infinite]"></span>
                <span className="w-0.5 bg-pink-400 h-2/3 animate-[pulse_0.9s_ease-in-out_infinite]"></span>
                <span className="w-0.5 bg-rose-400 h-4/5 animate-[pulse_0.75s_ease-in-out_infinite]"></span>
              </span>
            )}
          </button>

          {/* Stardust Celebration Trigger */}
          <button
            onClick={triggerCelebration}
            className="flex items-center space-x-1 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 hover:from-rose-600 hover:to-pink-500 text-white font-medium text-xs shadow-glow-pink active:scale-95 transition-all duration-300"
            title="Launch Celebration Fireworks"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-very-slow text-yellow-100" />
            <span className="font-medium">Wish 🌸</span>
          </button>
        </div>
      </div>
    </header>
  );
};
