import React, { useRef, useEffect, useState } from 'react';
import { Pointer, Sparkles, Rocket } from 'lucide-react';

export const FrostedGlassCard = ({ onEnter }) => {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Dramatically increased 3D tilt logic (15 degrees multiplier)
      const rotateY = ((x - centerX) / centerX) * 15;
      const rotateX = ((y - centerY) / centerY) * -15;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04) translateZ(10px)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Holographic gradient position calculation based on Pokemon card effect
      const h = rect.height;
      const w = rect.width;
      const lp = Math.abs(Math.floor((100 / w) * x) - 100);
      const tp = Math.abs(Math.floor((100 / h) * y) - 100);
      card.style.setProperty('--holo-x', `${lp}%`);
      card.style.setProperty('--holo-y', `${tp}%`);
    };

    const handleMouseLeave = () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleCardClick = () => {
    setFlipped(true);
    setTimeout(() => {
      onEnter();
    }, 800); // Match 0.8s flip animation duration
  };

  return (
    <div 
      className="card-container flex items-center justify-center p-4"
      style={{ perspective: '800px' }} // Critical for enabling highly noticeable 3D depth
    >
      {/* Soft Rainbow Border & Shadow Wrapper */}
      <div
        ref={cardRef}
        className={`ludi-rainbow-wrap group w-full max-w-md cursor-pointer select-none ${flipped ? 'flipped' : ''}`}
      >
        {/* Soft Rainbow Glow Shadow */}
        <div className="ludi-rainbow-glow" />

        <div className="flip-card-inner">
          {/* FRONT */}
          <div
            onClick={handleCardClick}
            className="flip-card-front card-ludi relative w-full h-full rounded-[2.45rem] p-10 text-white overflow-hidden"
            style={{
              background: 'rgba(9, 9, 11, 0.85)', // Darker backing to contrast with the rainbow border
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              transformStyle: 'preserve-3d',
              transition: 'background-color 0.3s ease',
              border: 'none', // Removed border since the rainbow wrapper acts as the border
            }}
          >
            {/* Holographic Gradient Overlay masked with cursor-following spotlight (Ludinauts soft colors) */}
            <div 
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                backgroundImage: 'linear-gradient(115deg, transparent 0%, rgba(107, 139, 180, 0.8) 30%, rgba(224, 176, 255, 0.8) 70%, transparent 100%)',
                backgroundPosition: 'var(--holo-x, 50%) var(--holo-y, 50%)',
                backgroundSize: '250% 250%',
                mixBlendMode: 'color-dodge',
                zIndex: 1,
                maskImage: 'radial-gradient(180px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 20%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(180px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 20%, transparent 100%)',
              }}
            />

            {/* Holographic Sparkles Overlay (Always Active, No Masking) */}
            <div 
              className="pointer-events-none absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-300"
              style={{
                backgroundImage: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/13471/sparkles.gif")',
                backgroundPosition: 'center',
                backgroundSize: '180%',
                mixBlendMode: 'color-dodge',
                zIndex: 2,
              }}
            />

            {/* Content Box with layered 3D TranslateZ Staggering */}
            <div 
              className="relative z-10 flex flex-col items-center text-center" 
              style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}
            >
              {/* Astronaut Badge / Icon - Staggered at 30px */}
              <div 
                className="w-20 h-20 bg-gradient-to-tr from-[#6B8BB4] to-[#E0B0FF] rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(224,176,255,0.4)] transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ transform: 'translateZ(30px)' }}
              >
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
              </div>

              {/* H2 Title - Staggered at 45px */}
              <h2 
                className="text-3xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#E0B0FF]"
                style={{ transform: 'translateZ(45px)' }}
              >
                LumiNauts
              </h2>

              {/* Interactive Button CTA - Staggered at 60px */}
              <div 
                className="ep-shine-btn w-full max-w-xs py-4 px-6 bg-gradient-to-r from-[#6B8BB4] to-[#91aed4] hover:from-[#E0B0FF] hover:to-[#dfc8ef] border-2 border-white/30 text-white rounded-full font-bold shadow-[0_10px_25px_rgba(107,139,180,0.3)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
                style={{ transform: 'translateZ(60px)' }}
              >
                <Pointer size={18} className="text-white animate-bounce" />
                <span>¡Haz clic aquí Ludinauta!</span>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            className="flip-card-back card-ludi relative w-full h-full rounded-[2.45rem] p-10 text-white overflow-hidden flex flex-col items-center justify-center text-center"
            style={{
              background: 'rgba(9, 9, 11, 0.9)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              transformStyle: 'preserve-3d',
              border: 'none',
            }}
          >
            {/* Back Content Box with staggered 3D TranslateZ */}
            <div 
              className="relative z-10 flex flex-col items-center text-center" 
              style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}
            >
              <div 
                className="w-20 h-20 bg-gradient-to-tr from-[#6B8BB4] to-[#E0B0FF] rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(224,176,255,0.4)] animate-bounce"
                style={{ transform: 'translateZ(30px)' }}
              >
                <Rocket className="w-10 h-10 text-white" />
              </div>
              
              <h2 
                className="text-3xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#E0B0FF]"
                style={{ transform: 'translateZ(45px)' }}
              >
                ¡Despegue!
              </h2>
              
              <p 
                className="text-zinc-300 text-sm font-medium"
                style={{ transform: 'translateZ(55px)' }}
              >
                Iniciando sistemas de navegación estelar...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
