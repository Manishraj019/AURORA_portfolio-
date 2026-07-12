import React, { useEffect, useRef, useState } from 'react';

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoSrc = '/background-video.mp4';

  const scrollPercentRef = useRef(0);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.5; // Play at half speed for a more ambient, cinematic feel
      video.play().catch(() => {});
    }
  }, [isVideoLoaded]);

  const handleLoadedMetadata = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {};

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-900/15 to-[#08090d]/70 dark:from-black/15 dark:via-black/25 dark:to-[#08090d]/80 z-10 transition-all duration-300"></div>

      <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-[#08090d] -z-20"></div>

      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-cover select-none transition-opacity duration-1000 transform-gpu translate-z-0 backface-hidden will-change-[transform,opacity]"
        muted
        playsInline
        loop
        autoPlay
        preload="auto"
        referrerPolicy="no-referrer"
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleVideoError}
        style={{
          filter: `contrast(1.08) brightness(1.0) saturate(1.15)`,
          opacity: isVideoLoaded ? 0.75 : 0,
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform, opacity'
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40 z-10 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none z-10 animate-pulse duration-[6000ms]"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-10 animate-pulse duration-[8000ms]"></div>
    </div>
  );
}
