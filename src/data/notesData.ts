export type NoteCategory = 'Support' | 'Love' | 'Wish' | 'Promise';

export interface StickyNoteItem {
  id: string;
  category: NoteCategory;
  text: string;
  colorName: 'yellow' | 'pink' | 'cyan' | 'lavender' | 'mint';
  colorClasses: {
    bg: string;
    text: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    pinColor: string;
    glow: string;
  };
  defaultPosition: { x: number; y: number };
  defaultRotation: number;
  floatDuration: number;
  floatDelay: number;
}

export const initialNotes: StickyNoteItem[] = [
  // 1. Support
  {
    id: 'note-1',
    category: 'Support',
    text: 'When everything felt like it was falling apart, you were the steady ground beneath my feet. Thank you for never letting go.',
    colorName: 'yellow',
    colorClasses: {
      bg: 'bg-[#fffbeb]',
      text: 'text-amber-950',
      border: 'border-amber-200/80',
      badgeBg: 'bg-amber-200/70',
      badgeText: 'text-amber-900',
      pinColor: '#d97706',
      glow: 'rgba(245, 158, 11, 0.3)',
    },
    defaultPosition: { x: -620, y: -260 },
    defaultRotation: -7,
    floatDuration: 6.2,
    floatDelay: 0.1,
  },
  // 2. Support
  {
    id: 'note-2',
    category: 'Support',
    text: 'You saw me at my absolute lowest and loved me anyway. I will never forget who stood by me in the storm.',
    colorName: 'pink',
    colorClasses: {
      bg: 'bg-[#fff1f2]',
      text: 'text-rose-950',
      border: 'border-rose-200/80',
      badgeBg: 'bg-rose-200/70',
      badgeText: 'text-rose-900',
      pinColor: '#e11d48',
      glow: 'rgba(244, 63, 94, 0.3)',
    },
    defaultPosition: { x: -640, y: -60 },
    defaultRotation: 6,
    floatDuration: 7.1,
    floatDelay: 0.4,
  },
  // 3. Support
  {
    id: 'note-3',
    category: 'Support',
    text: 'On the days when I struggled to believe in myself, your faith in me carried us both forward.',
    colorName: 'cyan',
    colorClasses: {
      bg: 'bg-[#f0f9ff]',
      text: 'text-sky-950',
      border: 'border-sky-200/80',
      badgeBg: 'bg-sky-200/70',
      badgeText: 'text-sky-900',
      pinColor: '#0284c7',
      glow: 'rgba(14, 165, 233, 0.3)',
    },
    defaultPosition: { x: -630, y: 150 },
    defaultRotation: -5,
    floatDuration: 5.7,
    floatDelay: 0.7,
  },
  // 4. Support
  {
    id: 'note-4',
    category: 'Support',
    text: 'Thank you for being my safe harbor when life felt overwhelming. Having you in my corner changed everything.',
    colorName: 'lavender',
    colorClasses: {
      bg: 'bg-[#faf5ff]',
      text: 'text-purple-950',
      border: 'border-purple-200/80',
      badgeBg: 'bg-purple-200/70',
      badgeText: 'text-purple-900',
      pinColor: '#9333ea',
      glow: 'rgba(168, 85, 247, 0.3)',
    },
    defaultPosition: { x: -440, y: -80 },
    defaultRotation: 9,
    floatDuration: 8.3,
    floatDelay: 0.2,
  },
  // 5. Support
  {
    id: 'note-5',
    category: 'Support',
    text: "You didn't just hold my hand during tough times—you brought light back into rooms that had gone completely dark.",
    colorName: 'mint',
    colorClasses: {
      bg: 'bg-[#f0fdf4]',
      text: 'text-emerald-950',
      border: 'border-emerald-200/80',
      badgeBg: 'bg-emerald-200/70',
      badgeText: 'text-emerald-900',
      pinColor: '#059669',
      glow: 'rgba(16, 185, 129, 0.3)',
    },
    defaultPosition: { x: -390, y: 320 },
    defaultRotation: -8,
    floatDuration: 6.9,
    floatDelay: 0.5,
  },
  // 6. Support
  {
    id: 'note-6',
    category: 'Support',
    text: 'Strength looks like you: gentle, patient, and unwavering when I needed support the most.',
    colorName: 'yellow',
    colorClasses: {
      bg: 'bg-[#fffbeb]',
      text: 'text-amber-950',
      border: 'border-amber-200/80',
      badgeBg: 'bg-amber-200/70',
      badgeText: 'text-amber-900',
      pinColor: '#d97706',
      glow: 'rgba(245, 158, 11, 0.3)',
    },
    defaultPosition: { x: -180, y: -330 },
    defaultRotation: 4,
    floatDuration: 7.7,
    floatDelay: 0.8,
  },

  // 7. Love
  {
    id: 'note-7',
    category: 'Love',
    text: 'You have a way of making ordinary moments feel like memories I want to keep forever.',
    colorName: 'pink',
    colorClasses: {
      bg: 'bg-[#fff1f2]',
      text: 'text-rose-950',
      border: 'border-rose-200/80',
      badgeBg: 'bg-rose-200/70',
      badgeText: 'text-rose-900',
      pinColor: '#e11d48',
      glow: 'rgba(244, 63, 94, 0.3)',
    },
    defaultPosition: { x: 190, y: -340 },
    defaultRotation: -6,
    floatDuration: 6.4,
    floatDelay: 0.3,
  },
  // 8. Love
  {
    id: 'note-8',
    category: 'Love',
    text: 'Your kindness isn’t just something you show—it’s who you are, and it inspires me every single day.',
    colorName: 'lavender',
    colorClasses: {
      bg: 'bg-[#faf5ff]',
      text: 'text-purple-950',
      border: 'border-purple-200/80',
      badgeBg: 'bg-purple-200/70',
      badgeText: 'text-purple-900',
      pinColor: '#9333ea',
      glow: 'rgba(168, 85, 247, 0.3)',
    },
    defaultPosition: { x: 440, y: -80 },
    defaultRotation: 8,
    floatDuration: 7.9,
    floatDelay: 0.6,
  },
  // 9. Love
  {
    id: 'note-9',
    category: 'Love',
    text: 'You bring warmth, grace, and color to everything you touch. Life is simply better with you in it.',
    colorName: 'cyan',
    colorClasses: {
      bg: 'bg-[#f0f9ff]',
      text: 'text-sky-950',
      border: 'border-sky-200/80',
      badgeBg: 'bg-sky-200/70',
      badgeText: 'text-sky-900',
      pinColor: '#0284c7',
      glow: 'rgba(14, 165, 233, 0.3)',
    },
    defaultPosition: { x: 620, y: -260 },
    defaultRotation: -9,
    floatDuration: 5.5,
    floatDelay: 0.2,
  },
  // 10. Love
  {
    id: 'note-10',
    category: 'Love',
    text: 'To the girl who holds my heart: thank you for simply being you, unapologetically and beautifully.',
    colorName: 'pink',
    colorClasses: {
      bg: 'bg-[#fff1f2]',
      text: 'text-rose-950',
      border: 'border-rose-200/80',
      badgeBg: 'bg-rose-200/70',
      badgeText: 'text-rose-900',
      pinColor: '#e11d48',
      glow: 'rgba(244, 63, 94, 0.3)',
    },
    defaultPosition: { x: 640, y: -60 },
    defaultRotation: 7,
    floatDuration: 8.6,
    floatDelay: 0.7,
  },

  // 11. Wish
  {
    id: 'note-11',
    category: 'Wish',
    text: 'May this year bring you all the peace, joy, and dreams you so effortlessly give to everyone around you.',
    colorName: 'yellow',
    colorClasses: {
      bg: 'bg-[#fffbeb]',
      text: 'text-amber-950',
      border: 'border-amber-200/80',
      badgeBg: 'bg-amber-200/70',
      badgeText: 'text-amber-900',
      pinColor: '#d97706',
      glow: 'rgba(245, 158, 11, 0.3)',
    },
    defaultPosition: { x: 630, y: 150 },
    defaultRotation: -4,
    floatDuration: 6.7,
    floatDelay: 0.4,
  },
  // 12. Wish
  {
    id: 'note-12',
    category: 'Wish',
    text: 'Today is all about celebrating the day the universe gave me the best thing in my life. Happy Birthday, my love.',
    colorName: 'mint',
    colorClasses: {
      bg: 'bg-[#f0fdf4]',
      text: 'text-emerald-950',
      border: 'border-emerald-200/80',
      badgeBg: 'bg-emerald-200/70',
      badgeText: 'text-emerald-900',
      pinColor: '#059669',
      glow: 'rgba(16, 185, 129, 0.3)',
    },
    defaultPosition: { x: 390, y: 320 },
    defaultRotation: 11,
    floatDuration: 7.3,
    floatDelay: 0.1,
  },

  // 13. Promise
  {
    id: 'note-13',
    category: 'Promise',
    text: 'I promise to always stand by your side, celebrate your victories, and support you just as you have supported me.',
    colorName: 'lavender',
    colorClasses: {
      bg: 'bg-[#faf5ff]',
      text: 'text-purple-950',
      border: 'border-purple-200/80',
      badgeBg: 'bg-purple-200/70',
      badgeText: 'text-purple-900',
      pinColor: '#9333ea',
      glow: 'rgba(168, 85, 247, 0.3)',
    },
    defaultPosition: { x: 0, y: 380 },
    defaultRotation: -2,
    floatDuration: 8.0,
    floatDelay: 0.5,
  },
  // 14. Promise
  {
    id: 'note-14',
    category: 'Promise',
    text: 'Here’s to another year of growing, laughing, and building a beautiful life together. Happy Birthday!',
    colorName: 'cyan',
    colorClasses: {
      bg: 'bg-[#f0f9ff]',
      text: 'text-sky-950',
      border: 'border-sky-200/80',
      badgeBg: 'bg-sky-200/70',
      badgeText: 'text-sky-900',
      pinColor: '#0284c7',
      glow: 'rgba(14, 165, 233, 0.3)',
    },
    defaultPosition: { x: 0, y: -370 },
    defaultRotation: 5,
    floatDuration: 6.6,
    floatDelay: 0.8,
  },
];
