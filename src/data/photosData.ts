export interface PhotoItem {
  id: string;
  frameNumber: number;
  imageSrc: string;
  caption: string;
  title: string;
  tag: string;
  defaultPosition: { x: number; y: number };
  defaultRotation: number;
  floatDuration: number;
  floatDelay: number;
  glowColor: string;
}

export const initialPhotos: PhotoItem[] = [
  {
    id: 'photo-1',
    frameNumber: 1,
    imageSrc: '/photos/photo1.jpg',
    caption: 'Every photo we take is a reminder of how lucky I am to share this journey with you.',
    title: 'Tender Whispers',
    tag: 'Journey Together',
    defaultPosition: { x: -380, y: -230 },
    defaultRotation: -4,
    floatDuration: 6.8,
    floatDelay: 0.2,
    glowColor: 'rgba(0, 240, 255, 0.45)',
  },
  {
    id: 'photo-2',
    frameNumber: 2,
    imageSrc: '/photos/photo2.jpg',
    caption: 'From our quietest late-night conversations to our biggest adventures, every chapter with you is a gift.',
    title: 'Blossoms & You',
    tag: 'Special Chapters',
    defaultPosition: { x: 380, y: -220 },
    defaultRotation: 5,
    floatDuration: 7.4,
    floatDelay: 0.6,
    glowColor: 'rgba(255, 77, 148, 0.45)',
  },
  {
    id: 'photo-3',
    frameNumber: 3,
    imageSrc: '/photos/photo3.jpg',
    caption: 'You are my best friend, my confidante, and the person I always want to come home to.',
    title: 'Pure Smiles',
    tag: 'My Best Friend',
    defaultPosition: { x: -480, y: 120 },
    defaultRotation: 3,
    floatDuration: 5.9,
    floatDelay: 0.4,
    glowColor: 'rgba(157, 78, 221, 0.45)',
  },
  {
    id: 'photo-4',
    frameNumber: 4,
    imageSrc: '/photos/photo4.jpg',
    caption: 'Looking back at all we’ve walked through together, I wouldn’t trade a single mile with anyone else.',
    title: 'Walking Together',
    tag: 'HSC Memories',
    defaultPosition: { x: -160, y: 280 },
    defaultRotation: -3,
    floatDuration: 8.1,
    floatDelay: 0.8,
    glowColor: 'rgba(0, 240, 255, 0.45)',
  },
  {
    id: 'photo-5',
    frameNumber: 5,
    imageSrc: '/photos/photo5.jpg',
    caption: 'Loving you is the easiest, most natural thing I have ever done.',
    title: 'Candlelight & Roses',
    tag: 'Endless Love',
    defaultPosition: { x: 170, y: 270 },
    defaultRotation: 4,
    floatDuration: 6.5,
    floatDelay: 0.3,
    glowColor: 'rgba(255, 77, 148, 0.45)',
  },
  {
    id: 'photo-6',
    frameNumber: 6,
    imageSrc: '/photos/photo6.jpg',
    caption: 'In a world full of noise, your laugh is still my absolute favorite sound.',
    title: 'Our Quiet Sanctuary',
    tag: 'Favorite Sound',
    defaultPosition: { x: 490, y: 130 },
    defaultRotation: -5,
    floatDuration: 7.2,
    floatDelay: 0.5,
    glowColor: 'rgba(157, 78, 221, 0.45)',
  },
];
