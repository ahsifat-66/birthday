import React from 'react';
import { motion } from 'framer-motion';
import { Star, Gift, Sparkles, Heart } from 'lucide-react';

interface AccentItem {
  id: string;
  type: 'star' | 'balloon' | 'gift' | 'heart';
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const accents: AccentItem[] = [
  { id: 'acc-1', type: 'star', x: -280, y: -140, size: 20, color: 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]', duration: 7, delay: 0 },
  { id: 'acc-2', type: 'balloon', x: 280, y: -150, size: 26, color: 'text-pink-400 drop-shadow-[0_0_12px_rgba(244,114,182,0.4)]', duration: 8.5, delay: 0.8 },
  { id: 'acc-3', type: 'gift', x: -120, y: 160, size: 22, color: 'text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.4)]', duration: 6.5, delay: 1.2 },
  { id: 'acc-4', type: 'heart', x: 140, y: 150, size: 22, color: 'text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]', duration: 7.8, delay: 0.5 },
  { id: 'acc-5', type: 'star', x: -550, y: 40, size: 24, color: 'text-rose-300 drop-shadow-[0_0_8px_rgba(253,164,175,0.5)]', duration: 9, delay: 1.5 },
  { id: 'acc-6', type: 'balloon', x: 550, y: -20, size: 28, color: 'text-rose-400 drop-shadow-[0_0_12px_rgba(251,113,133,0.4)]', duration: 8.2, delay: 0.3 },
  { id: 'acc-7', type: 'gift', x: -50, y: -240, size: 20, color: 'text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.4)]', duration: 7.4, delay: 1.0 },
  { id: 'acc-8', type: 'heart', x: 70, y: -230, size: 18, color: 'text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]', duration: 6.2, delay: 0.4 },
];

export const MicroAccents: React.FC = () => {
  const renderIcon = (type: AccentItem['type'], size: number, color: string) => {
    switch (type) {
      case 'star':
        return <Star className={`${color} fill-current`} style={{ width: size, height: size }} />;
      case 'balloon':
        return (
          <div className="relative flex flex-col items-center">
            {/* Balloon Body */}
            <div
              className={`rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 shadow-sm border border-white/60`}
              style={{ width: size, height: size * 1.25 }}
            />
            {/* Balloon Knot & String */}
            <div className="w-1 h-1 bg-pink-400 rounded-sm -mt-0.5" />
            <div className="w-[1px] h-5 bg-pink-300/60" />
          </div>
        );
      case 'gift':
        return <Gift className={color} style={{ width: size, height: size }} />;
      case 'heart':
        return <Heart className={`${color} fill-current`} style={{ width: size, height: size }} />;
      default:
        return <Sparkles className={color} style={{ width: size, height: size }} />;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-5">
      {accents.map((item) => (
        <motion.div
          key={item.id}
          initial={{ x: item.x, y: item.y, opacity: 0 }}
          animate={{
            opacity: [0.45, 0.9, 0.45],
            y: [item.y - 10, item.y + 10, item.y - 10],
            rotate: [-6, 6, -6],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
          className="absolute hidden sm:block"
          style={{
            left: '50%',
            top: '50%',
          }}
        >
          {renderIcon(item.type, item.size, item.color)}
        </motion.div>
      ))}
    </div>
  );
};
