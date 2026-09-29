import React, { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { Navbar } from './components/Navbar';
import { CentralBanner } from './components/CentralBanner';
import { PolaroidCard } from './components/PolaroidCard';
import { StickyNoteCard } from './components/StickyNoteCard';
import { PhotoLightboxModal } from './components/PhotoLightboxModal';
import { NoteModal } from './components/NoteModal';
import { MicroAccents } from './components/MicroAccents';
import { initialPhotos, PhotoItem } from './data/photosData';
import { initialNotes, StickyNoteItem } from './data/notesData';
import { soundManager } from './utils/audio';
import { Images, BookHeart, Sparkles, X, Volume2, Heart, Maximize2 } from 'lucide-react';

export const App: React.FC = () => {
  // State
  const [photos, setPhotos] = useState<PhotoItem[]>(initialPhotos);
  const [notes] = useState<StickyNoteItem[]>(initialNotes);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [selectedNote, setSelectedNote] = useState<StickyNoteItem | null>(null);
  const [readNotes, setReadNotes] = useState<Set<string>>(new Set());
  const [resetTrigger, setResetTrigger] = useState<number>(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isSfxOn, setIsSfxOn] = useState<boolean>(true);
  const [showMusicPrompt, setShowMusicPrompt] = useState<boolean>(true);
  const [activeDrawer, setActiveDrawer] = useState<'photos' | 'notes' | null>(null);
  const [scaleFactor, setScaleFactor] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'orbit' | 'feed'>('orbit');

  // Calculate dynamic scale factor based on screen size so elements stay comfortable on mobile
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setScaleFactor(0.48);
      } else if (width < 768) {
        setScaleFactor(0.65);
      } else if (width < 1024) {
        setScaleFactor(0.78);
      } else if (width < 1440) {
        setScaleFactor(0.92);
      } else {
        setScaleFactor(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle ambient music
  const handleToggleMusic = () => {
    const isPlaying = soundManager.toggleMusic();
    setIsMusicPlaying(isPlaying);
    setShowMusicPrompt(false);
  };

  // Toggle sound effects
  const handleToggleSfx = () => {
    const isSfxActive = soundManager.toggleSfx();
    setIsSfxOn(isSfxActive);
  };

  // Reset positions
  const handleResetPositions = () => {
    setResetTrigger((prev) => prev + 1);
  };

  // Toggle View Mode (Orbit vs Mobile Story Feed)
  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === 'orbit' ? 'feed' : 'orbit'));
  };

  // Replace photo image
  const handleReplaceImage = (photoId: string, newImageSrc: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === photoId ? { ...p, imageSrc: newImageSrc } : p))
    );
    if (selectedPhoto && selectedPhoto.id === photoId) {
      setSelectedPhoto((prev) => (prev ? { ...prev, imageSrc: newImageSrc } : null));
    }
  };

  // Note selection
  const handleSelectNote = (note: StickyNoteItem) => {
    setSelectedNote(note);
    setReadNotes((prev) => new Set(prev).add(note.id));
  };

  // Photo navigation in Lightbox
  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[prevIndex]);
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
  };

  // Note navigation in Modal
  const handlePrevNote = () => {
    if (!selectedNote) return;
    const currentIndex = notes.findIndex((n) => n.id === selectedNote.id);
    const prevIndex = (currentIndex - 1 + notes.length) % notes.length;
    const newNote = notes[prevIndex];
    setSelectedNote(newNote);
    setReadNotes((prev) => new Set(prev).add(newNote.id));
  };

  const handleNextNote = () => {
    if (!selectedNote) return;
    const currentIndex = notes.findIndex((n) => n.id === selectedNote.id);
    const nextIndex = (currentIndex + 1) % notes.length;
    const newNote = notes[nextIndex];
    setSelectedNote(newNote);
    setReadNotes((prev) => new Set(prev).add(newNote.id));
  };

  // Scale positions based on viewport scale factor
  const scaledPhotos = photos.map((p) => ({
    ...p,
    defaultPosition: {
      x: p.defaultPosition.x * scaleFactor,
      y: p.defaultPosition.y * scaleFactor,
    },
  }));

  const scaledNotes = notes.map((n) => ({
    ...n,
    defaultPosition: {
      x: n.defaultPosition.x * scaleFactor,
      y: n.defaultPosition.y * scaleFactor,
    },
  }));

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden bg-[#fff8fa] font-sans select-none text-slate-800">
      {/* 1. Dreamy White & Pink Celestial Background */}
      <CosmicBackground />

      {/* 2. Sleek Translucent Navigation Bar */}
      <Navbar
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        isSfxOn={isSfxOn}
        onToggleSfx={handleToggleSfx}
        onResetPositions={handleResetPositions}
        readNotesCount={readNotes.size}
        totalNotesCount={notes.length}
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
      />

      {/* 3. Floating Quick View Shortcuts (Bottom Left) */}
      <div className="fixed bottom-3.5 left-3 sm:left-6 z-30 flex items-center space-x-2">
        <button
          onClick={() => {
            soundManager.playChime(1.1);
            setActiveDrawer((prev) => (prev === 'photos' ? null : 'photos'));
          }}
          className={`flex items-center space-x-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full glass-panel border text-xs font-medium transition-all active:scale-95 ${
            activeDrawer === 'photos'
              ? 'border-pink-400 bg-pink-100/90 text-rose-700 shadow-glow-soft'
              : 'border-pink-200/80 text-slate-700 hover:bg-white/95'
          }`}
          title="Open Photo Gallery Overview"
        >
          <Images className="w-3.5 h-3.5 text-pink-600" />
          <span>Photos (6)</span>
        </button>

        <button
          onClick={() => {
            soundManager.playChime(1.2);
            setActiveDrawer((prev) => (prev === 'notes' ? null : 'notes'));
          }}
          className={`flex items-center space-x-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full glass-panel border text-xs font-medium transition-all active:scale-95 ${
            activeDrawer === 'notes'
              ? 'border-pink-400 bg-pink-100/90 text-rose-700 shadow-glow-soft'
              : 'border-pink-200/80 text-slate-700 hover:bg-white/95'
          }`}
          title="Open All Notes Overview"
        >
          <BookHeart className="w-3.5 h-3.5 text-rose-500" />
          <span>Notes ({readNotes.size}/14)</span>
        </button>
      </div>

      {/* 4. Ambient Music Gentle First-Time Prompt (Bottom Right) */}
      {showMusicPrompt && !isMusicPlaying && (
        <div
          onClick={handleToggleMusic}
          className="fixed bottom-3.5 right-3 sm:right-6 z-30 glass-panel border border-pink-300/80 px-3 py-2 rounded-2xl flex items-center space-x-2 cursor-pointer shadow-glow-soft hover:scale-105 active:scale-95 transition-all duration-300 animate-bounce"
        >
          <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center">
            <Volume2 className="w-3.5 h-3.5 text-pink-600" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-rose-800">Play Music 🌸</span>
            <span className="text-[10px] text-pink-600/80">Tap for ambient vibes</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMusicPrompt(false);
            }}
            className="text-slate-400 hover:text-slate-700 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 5. MAIN CONTENT: Dual Mode Switching (Zero-Gravity Orbit vs Mobile Story Feed) */}
      {viewMode === 'orbit' ? (
        /* MODE A: Zero-Gravity Floating Orbit Playground */
        <main className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
          {/* Micro Floating Celestial Accents */}
          <MicroAccents />

          {/* Central Prominent Glowing Banner */}
          <CentralBanner
            onSparkleClick={() => {
              soundManager.playCelebrationChime();
            }}
          />

          {/* Floating Polaroid Photo Frames (6 Frames) */}
          {scaledPhotos.map((photo) => (
            <PolaroidCard
              key={photo.id}
              photo={photo}
              resetTrigger={resetTrigger}
              onSelectPhoto={(p) => setSelectedPhoto(p)}
              onReplaceImage={handleReplaceImage}
            />
          ))}

          {/* Floating Digital Sticky Notes (14 Notes) */}
          {scaledNotes.map((note) => (
            <StickyNoteCard
              key={note.id}
              note={note}
              resetTrigger={resetTrigger}
              isRead={readNotes.has(note.id)}
              onSelectNote={handleSelectNote}
            />
          ))}
        </main>
      ) : (
        /* MODE B: Mobile-Optimized Story Feed (Smooth Vertical Scroll) */
        <main className="relative z-10 pt-20 pb-24 px-4 max-w-3xl mx-auto space-y-12">
          {/* Hero Banner in Feed */}
          <CentralBanner
            onSparkleClick={() => {
              soundManager.playCelebrationChime();
            }}
          />

          {/* Section 1: Sequential Polaroid Story Gallery */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-pink-200/80 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-800">
                  Our Photo Journey
                </h2>
              </div>
              <span className="text-xs font-mono text-rose-600 bg-pink-100 px-2.5 py-0.5 rounded-full">
                6 Memories
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white/95 rounded-2xl p-3 pb-5 shadow-polaroid hover:shadow-polaroid-hover border border-pink-100 transition-all duration-300 relative group"
                >
                  <div
                    onClick={() => {
                      soundManager.playChime(1.3);
                      setSelectedPhoto(photo);
                    }}
                    className="relative w-full aspect-[4/4.5] bg-pink-50 rounded-xl overflow-hidden cursor-pointer shadow-inner"
                  >
                    <img
                      src={photo.imageSrc}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                      <span className="text-xs text-white font-medium flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5" /> Enlarge
                      </span>
                      <span className="text-[10px] font-mono bg-rose-500 text-white px-2 py-0.5 rounded-full">
                        #{photo.frameNumber}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 px-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-rose-600 font-semibold">
                        {photo.tag}
                      </span>
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 opacity-90" />
                    </div>
                    <p className="font-handwriting text-lg text-slate-800 leading-snug">
                      "{photo.caption}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: 14 Love, Support & Birthday Notes */}
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between border-b border-pink-200/80 pb-3">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-800">
                  Letters to You
                </h2>
              </div>
              <span className="text-xs font-mono text-rose-600 bg-pink-100 px-2.5 py-0.5 rounded-full">
                {readNotes.size} / 14 Read
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => {
                    soundManager.playChime(1.35);
                    handleSelectNote(note);
                  }}
                  className={`p-4 rounded-2xl border ${note.colorClasses.bg} ${note.colorClasses.text} ${note.colorClasses.border} shadow-sm hover:shadow-md cursor-pointer transition-all active:scale-[0.98] relative`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md ${note.colorClasses.badgeBg} ${note.colorClasses.badgeText}`}
                    >
                      {note.category}
                    </span>
                    {readNotes.has(note.id) ? (
                      <span className="text-[10px] opacity-70 font-mono text-emerald-700">✓ read</span>
                    ) : (
                      <span className="text-[10px] opacity-70 font-mono text-rose-600">new</span>
                    )}
                  </div>
                  <p className="font-handwriting text-base sm:text-lg leading-relaxed select-text">
                    "{note.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* 6. Slide-Over Gallery Shelf Drawer for Photos or Notes */}
      {activeDrawer && (
        <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-96 glass-panel border-l border-pink-200 p-5 shadow-2xl flex flex-col backdrop-blur-2xl bg-white/95 animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-pink-200">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <h3 className="font-serif text-lg font-bold text-slate-800">
                {activeDrawer === 'photos' ? 'All Memories (6)' : 'All 14 Sticky Notes'}
              </h3>
            </div>
            <button
              onClick={() => setActiveDrawer(null)}
              className="p-1.5 rounded-full hover:bg-pink-100 text-slate-500 hover:text-rose-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {activeDrawer === 'photos'
              ? photos.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      soundManager.playChime(1.3);
                      setSelectedPhoto(p);
                    }}
                    className="p-2.5 rounded-xl bg-pink-50/80 hover:bg-pink-100/90 border border-pink-200/80 cursor-pointer flex items-center space-x-3 transition-all shadow-xs"
                  >
                    <img
                      src={p.imageSrc}
                      alt={p.title}
                      className="w-16 h-16 object-cover rounded-lg border border-pink-200 shadow-xs"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-rose-600 font-semibold">#{p.frameNumber}</span>
                        <span className="text-[10px] text-slate-500">{p.tag}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 truncate">{p.title}</p>
                      <p className="text-[11px] text-slate-600 line-clamp-1 italic">
                        "{p.caption}"
                      </p>
                    </div>
                  </div>
                ))
              : notes.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      soundManager.playChime(1.2);
                      handleSelectNote(n);
                    }}
                    className={`p-3 rounded-xl border ${n.colorClasses.bg} ${n.colorClasses.text} ${n.colorClasses.border} shadow-xs cursor-pointer hover:scale-[1.02] transition-transform`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded ${n.colorClasses.badgeBg} ${n.colorClasses.badgeText}`}
                      >
                        {n.category}
                      </span>
                      {readNotes.has(n.id) && (
                        <span className="text-[9px] opacity-70 font-mono">✓ read</span>
                      )}
                    </div>
                    <p className="font-handwriting text-sm leading-snug line-clamp-2">
                      "{n.text}"
                    </p>
                  </div>
                ))}
          </div>
        </div>
      )}

      {/* 7. Lightbox Photo View Modal */}
      <PhotoLightboxModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
        onReplaceImage={handleReplaceImage}
      />

      {/* 8. Sticky Note Reading Modal */}
      <NoteModal
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
        onPrev={handlePrevNote}
        onNext={handleNextNote}
      />

      {/* Bottom Hint Indicator (Only in Orbit Mode on larger screens) */}
      {viewMode === 'orbit' && (
        <footer className="fixed bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden md:block">
          <div className="glass-panel px-4 py-1 rounded-full border border-pink-200/80 text-[11px] text-rose-700/80 shadow-xs">
            🌸 Zero-Gravity: Drag items freely across space • Click to view full memories
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
