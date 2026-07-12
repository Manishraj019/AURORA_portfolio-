import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Check local storage first
    const saved = localStorage.getItem('aurora-theme');
    if (saved) {
      return saved === 'dark';
    }
    // Check system preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Default to dark for premium futuristic feel
  });

  const [isPulling, setIsPulling] = useState(false);
  const [isSwinging, setIsSwinging] = useState(false);
  const [hasToggled, setHasToggled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aurora-theme-toggled') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('aurora-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('aurora-theme', 'light');
    }
  }, [isDark]);

  const handlePull = () => {
    if (isPulling) return;
    setIsPulling(true);

    if (!hasToggled) {
      setHasToggled(true);
      localStorage.setItem('aurora-theme-toggled', 'true');
    }

    // Trigger physical pendulum swing
    setIsSwinging(false);
    setTimeout(() => setIsSwinging(true), 10);
    setTimeout(() => setIsSwinging(false), 2500);

    // Animate the pull string down and toggle precisely
    setTimeout(() => {
      setIsDark(!isDark);
    }, 150);

    // Release the cord
    setTimeout(() => {
      setIsPulling(false);
    }, 400);
  };

  return (
    <div
      className={`fixed top-0 right-6 md:right-16 z-[100] flex flex-col items-center select-none cursor-pointer group origin-top ${isSwinging ? 'swinging-lamp' : ''}`}
      onClick={handlePull}
      role="button"
      aria-label="Switch to dark mode"
    >
      {/* Main Lamp Wire (Hanging from Ceiling) */}
      <div className="w-0.5 h-16 bg-[#2a2a2a] dark:bg-[#111]"></div>

      {/* Socket Base */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Top connector (wire attachment) */}
        <div className="w-3 h-4 bg-[#2c2c2c] dark:bg-[#1a1a1a] rounded-t-sm transition-colors duration-500"></div>

        {/* Brass Socket */}
        <div className="w-8 h-8 bg-gradient-to-b from-[#b5852a] via-[#e6b85c] to-[#8a631c] dark:from-[#3d2c0d] dark:via-[#5c4314] dark:to-[#2b1f09] rounded-sm transition-colors duration-500 shadow-md border-b-2 border-black/40 flex flex-col justify-evenly">
          {/* Socket ridges */}
          <div className="w-full h-px bg-black/30"></div>
          <div className="w-full h-px bg-black/30"></div>
          <div className="w-full h-px bg-black/30"></div>
        </div>

        {/* Glass Bulb */}
        <div
          className={`w-16 h-16 rounded-full absolute top-[2.4rem] transition-all duration-700 ease-in-out flex items-center justify-center overflow-hidden backdrop-blur-sm border-2 ${isDark
            ? 'bg-slate-800/10 border-white/5 shadow-none'
            : 'bg-amber-100/20 border-white/30 shadow-[0_0_80px_40px_rgba(255,255,255,0.4),0_0_120px_80px_rgba(251,191,36,0.2)] z-20'
            }`}
        >
          {/* Glowing Filament */}
          <div className="relative w-full h-full flex items-center justify-center pt-2">
            <div className={`w-3 h-6 border-b-[2px] border-l-[1px] border-r-[1px] rounded-b-md transition-all duration-700 ${isDark ? 'border-white/10' : 'border-amber-200 drop-shadow-[0_0_12px_rgba(251,191,36,1)]'
              }`}></div>
            {/* Filament Stem Base */}
            <div className={`absolute top-0 w-2 h-4 transition-colors duration-700 ${isDark ? 'bg-white/5' : 'bg-amber-500/20'}`}></div>
          </div>

          {/* Glass reflection highlight */}
          <div className="absolute top-1 left-2 w-4 h-4 rounded-full bg-white/20 blur-[1px]"></div>
        </div>
      </div>

      {/* Pull Cord */}
      <div
        className={`w-px bg-slate-400 dark:bg-slate-600 transition-all duration-200 origin-top ease-out ${isPulling ? 'h-32 translate-y-4' : 'h-24'
          } absolute top-[6.5rem] left-1/2 -translate-x-1/2 z-0`}
      >
        {/* Pull Cord End Knob */}
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-[#e6b85c] to-[#8a631c] dark:from-[#5c4314] dark:to-[#2b1f09] absolute -bottom-1 -left-[4px] shadow-sm flex items-center justify-center">
          {/* Subtle ping effect for first-time users */}
          {!hasToggled && (
            <span className="absolute w-6 h-6 rounded-full bg-amber-400/50 animate-ping"></span>
          )}
        </div>
      </div>

      {/* Modern Tooltip / Coach Mark */}
      <div 
        className={`absolute top-[13.5rem] right-1/2 translate-x-1/2 whitespace-nowrap transition-all duration-500 pointer-events-none flex flex-col items-center gap-1.5
          ${!hasToggled ? 'opacity-100 animate-bounce' : 'opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0'}
        `}
      >
        {!hasToggled && (
          <div className="w-0.5 h-4 bg-gradient-to-t from-transparent to-black/20 dark:to-white/20"></div>
        )}
        <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md text-slate-800 dark:text-slate-200 text-xs font-semibold py-1.5 px-3.5 rounded-full shadow-lg border border-black/5 dark:border-white/10 flex items-center gap-2">
          <span>Pull to Toggle Theme</span>
        </div>
      </div>
    </div>
  );
}
