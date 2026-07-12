import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const TRACK_URL = 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3';

export default function AmbientAudio() {
  const [volume, setVolume] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(TRACK_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume > 0 && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      } else if (newVolume === 0 && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    }
  };

  const toggleMute = () => {
    const targetVolume = volume > 0 ? 0 : 0.45;
    setVolume(targetVolume);
    if (audioRef.current) {
      audioRef.current.volume = targetVolume;
      if (targetVolume > 0) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-3 bg-white/80 dark:bg-[#0b0c10]/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-slate-200 dark:border-white/10 shadow-lg">
      <button 
        onClick={toggleMute}
        className="text-slate-600 dark:text-slate-300 hover:text-violet-500 dark:hover:text-violet-400 transition-colors cursor-pointer"
        title={volume > 0 ? "Mute" : "Unmute"}
        aria-label={volume > 0 ? "Mute" : "Unmute"}
      >
        {volume > 0 ? <Volume2 aria-hidden="true" className="w-5 h-5" /> : <VolumeX aria-hidden="true" className="w-5 h-5" />}
      </button>
      
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.01" 
        value={volume}
        onChange={handleVolumeChange}
        className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500 outline-none"
        title="Volume control"
      />
    </div>
  );
}
