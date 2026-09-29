import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, Sparkles, Heart } from 'lucide-react';
import { PhotoItem } from '../data/photosData';
import { soundManager } from '../utils/audio';

interface PhotoLightboxModalProps {
  photo: PhotoItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onReplaceImage: (photoId: string, newImageSrc: string) => void;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  photo,
  onClose,
  onPrev,
  onNext,
  onReplaceImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && photo) {
      soundManager.playChime(1.5);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onReplaceImage(photo.id, event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {photo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur with Soft Rose Tint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md -z-10"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className="relative w-full max-w-4xl bg-white/95 border border-pink-200/90 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden glass-panel flex flex-col md:flex-row my-auto max-h-[90vh] overflow-y-auto"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-rose-600 border border-pink-200 shadow-sm transition-colors active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left/Main: High-Res Photo Display with Navigation Arrows */}
            <div className="relative md:w-3/5 bg-gradient-to-b from-pink-50/70 to-rose-50/70 flex items-center justify-center p-3 sm:p-6 min-h-[260px] sm:min-h-[440px]">
              <img
                src={photo.imageSrc}
                alt={photo.title}
                className="max-h-[42vh] sm:max-h-[60vh] w-auto object-contain rounded-xl shadow-md border border-pink-100"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.playChime(1.1);
                  onPrev();
                }}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-white/85 hover:bg-white text-slate-700 hover:text-rose-600 border border-pink-200 shadow-md transition-transform hover:scale-110 active:scale-95"
                title="Previous Photo (Left Arrow)"
              >
                <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.playChime(1.2);
                  onNext();
                }}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-white/85 hover:bg-white text-slate-700 hover:text-rose-600 border border-pink-200 shadow-md transition-transform hover:scale-110 active:scale-95"
                title="Next Photo (Right Arrow)"
              >
                <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>

            {/* Right: Romantic Details & Captions */}
            <div className="md:w-2/5 p-4 sm:p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-pink-100 bg-white/90">
              <div>
                {/* Header Tag & Number */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-pink-100/90 text-rose-700 border border-pink-200 flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                    Memory #{photo.frameNumber}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {photo.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span>{photo.title}</span>
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                </h3>

                {/* Romantic Caption Quote */}
                <div className="relative p-3.5 sm:p-4 rounded-xl bg-pink-50/70 border border-pink-200/70 mb-4 sm:mb-6 shadow-xs">
                  <p className="font-handwriting text-lg sm:text-2xl text-slate-800 leading-snug">
                    "{photo.caption}"
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-sans hidden sm:block">
                  Captured in the tapestry of our journey. A precious moment preserved where love blossoms and time stands still.
                </p>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 sm:pt-6 mt-3 sm:mt-6 border-t border-pink-100 flex items-center justify-between">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-xs text-rose-700 font-medium transition-all active:scale-95 shadow-xs"
                >
                  <Camera className="w-3.5 h-3.5 text-rose-500" />
                  <span>Replace Photo</span>
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />

                <span className="text-xs text-slate-400 font-mono">
                  {photo.frameNumber} of 6
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
