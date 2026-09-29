import React, { useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Camera, Maximize2, Sparkles, Heart } from 'lucide-react';
import { PhotoItem } from '../data/photosData';
import { soundManager } from '../utils/audio';

interface PolaroidCardProps {
  photo: PhotoItem;
  resetTrigger: number;
  onSelectPhoto: (photo: PhotoItem) => void;
  onReplaceImage: (photoId: string, newImageSrc: string) => void;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  photo,
  resetTrigger,
  onSelectPhoto,
  onReplaceImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const controls = useAnimationControls();

  // Handle resetting back to initial position when navbar Reset is clicked
  React.useEffect(() => {
    if (resetTrigger > 0) {
      controls.start({
        x: photo.defaultPosition.x,
        y: photo.defaultPosition.y,
        rotate: photo.defaultRotation,
        transition: { type: 'spring', damping: 20, stiffness: 60 },
      });
    }
  }, [resetTrigger, controls, photo]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
    <motion.div
      drag
      dragMomentum={true}
      dragElastic={0.15}
      animate={controls}
      initial={{
        x: photo.defaultPosition.x,
        y: photo.defaultPosition.y,
        rotate: photo.defaultRotation,
        opacity: 0,
        scale: 0.85,
      }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.05,
        zIndex: 50,
        rotate: 0,
        transition: { duration: 0.25 },
      }}
      whileDrag={{
        scale: 1.08,
        zIndex: 60,
        cursor: 'grabbing',
      }}
      onDragStart={() => soundManager.playChime(1.1)}
      onDragEnd={() => soundManager.playSoftRelease()}
      className="absolute cursor-grab select-none touch-none"
      style={{
        left: '50%',
        top: '50%',
      }}
    >
      {/* Floating vertical drift wrapper */}
      <motion.div
        animate={{
          y: [-7, 7, -7],
          rotate: [photo.defaultRotation - 1.5, photo.defaultRotation + 1.5, photo.defaultRotation - 1.5],
        }}
        transition={{
          duration: photo.floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: photo.floatDelay,
        }}
        className="group relative"
      >
        {/* Soft Pink Halo Glow on Hover */}
        <div
          className="absolute -inset-2.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"
          style={{ background: 'rgba(244, 63, 110, 0.35)' }}
        />

        {/* Polaroid Physical Frame */}
        <div className="relative w-52 sm:w-64 md:w-72 bg-white/95 text-slate-900 rounded-xl p-2.5 sm:p-3 pb-4 sm:pb-5 shadow-polaroid hover:shadow-polaroid-hover backdrop-blur-md border border-pink-100/90 transition-all duration-300">
          {/* Subtle rose washi tape sticker at top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 bg-pink-100/70 backdrop-blur-sm border-x border-pink-200 shadow-xs rotate-1 pointer-events-none rounded-xs" />

          {/* Photo Frame Container */}
          <div
            onClick={() => {
              soundManager.playChime(1.3);
              onSelectPhoto(photo);
            }}
            className="relative w-full aspect-[4/4.5] bg-pink-50 rounded-lg overflow-hidden group/img cursor-pointer border border-pink-100 shadow-inner"
          >
            <img
              src={photo.imageSrc}
              alt={photo.title}
              className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-gradient-to-t from-rose-950/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-end justify-between p-2 sm:p-2.5">
              <span className="text-[10px] sm:text-[11px] font-medium text-white flex items-center gap-1 drop-shadow">
                <Maximize2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> Expand
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase bg-rose-500/90 text-white px-2 py-0.5 rounded-full">
                #{photo.frameNumber}
              </span>
            </div>
          </div>

          {/* Bottom Handwritten Caption Area */}
          <div className="pt-2 sm:pt-3 px-0.5 sm:px-1">
            <div className="flex items-center justify-between mb-0.5 sm:mb-1">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-rose-600/80 font-semibold flex items-center gap-1">
                <Sparkles className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-pink-500" />
                {photo.tag}
              </span>
              <div className="flex items-center space-x-1">
                {/* Upload / Replace Photo Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Replace photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500 opacity-90" />
              </div>
            </div>

            {/* Handwritten style quote caption */}
            <p className="font-handwriting text-sm sm:text-base md:text-lg leading-tight text-slate-800 line-clamp-2 select-text">
              "{photo.caption}"
            </p>
          </div>

          {/* Hidden File Input for Image Replacement */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
