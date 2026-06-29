import React, { useRef, useEffect, useState } from 'react';
import { Pointer, Sparkles } from 'lucide-react';
import { RobotFaceIcon } from './RobotFaceIcon';

// ─── Particle system ──────────────────────────────────────────────────────────
const PARTICLE_COLORS = [
  '#FFD700', '#FFC300', '#FFE066',   // gold
  '#ffffff', '#f0f0ff', '#e8e8ff',   // white/silver
  '#a855f7', '#E0B0FF', '#c084fc',   // purple
  '#06b6d4', '#67e8f9',              // cyan
  '#ec4899', '#f9a8d4',              // pink
  '#6B8BB4', '#91aed4',              // blue
];
const PARTICLE_SHAPES = ['✦', '★', '✶', '✸', '◆', '•', '✧', '⭐'];

function createParticles(count = 26) {
  return Array.from({ length: count }, (_, i) => {
    const baseAngle = (360 / count) * i;
    const jitter = (Math.random() - 0.5) * (360 / count) * 1.8;
    const angle = baseAngle + jitter;
    const distance = 75 + Math.random() * 100;
    const rad = (angle * Math.PI) / 180;
    return {
      id: `p_${Date.now()}_${i}_${Math.random()}`,
      tx: Math.cos(rad) * distance,
      ty: Math.sin(rad) * distance,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      shape: PARTICLE_SHAPES[Math.floor(Math.random() * PARTICLE_SHAPES.length)],
      size: 8 + Math.random() * 10,
      duration: 0.5 + Math.random() * 0.45,
      delay: Math.random() * 0.12,
      spin: (Math.random() - 0.5) * 720,
    };
  });
}

// ─── Component ────────────────────────────────────────────────────────────────
export const FrostedGlassCard = ({ onEnter }) => {
  const cardRef      = useRef(null);
  const flippedRef   = useRef(false);
  const animatingRef = useRef(false);

  const [flipped,    setFlipped]    = useState(false);
  const [animState,  setAnimState]  = useState('idle'); // 'idle' | 'flipping' | 'unflipping'
  const [particles,  setParticles]  = useState([]);
  const [backHovered,setBackHovered]= useState(false);
  const [ageInput,   setAgeInput]   = useState('');

  // ── 3D tilt on mouse move ──────────────────────────────────────────────────
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e) => {
      if (flippedRef.current || animatingRef.current) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const ry = ((x - cx) / cx) * 15;
      const rx = ((y - cy) / cy) * -15;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04) translateZ(10px)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      const lp = Math.abs(Math.floor((100 / rect.width)  * x) - 100);
      const tp = Math.abs(Math.floor((100 / rect.height) * y) - 100);
      card.style.setProperty('--holo-x', `${lp}%`);
      card.style.setProperty('--holo-y', `${tp}%`);
    };
    const onLeave = () => {
      if (flippedRef.current || animatingRef.current) return;
      card.style.transform = '';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // ── Flip click ─────────────────────────────────────────────────────────────
  const handleCardClick = () => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    if (cardRef.current) cardRef.current.style.transform = '';
    // Spawn particles
    setParticles(createParticles(26));
    setTimeout(() => setParticles([]), 1200);
    // Trigger bounce animation
    setAnimState(flipped ? 'unflipping' : 'flipping');
  };

  // ── Animation end → settle state ──────────────────────────────────────────
  const handleAnimEnd = () => {
    const next = !flipped;
    flippedRef.current  = next;
    setFlipped(next);
    setAnimState('idle');
    animatingRef.current = false;
  };

  // ── Wrapper 3D style (swap between animation and settled transform) ─────────
  const wrapperStyle = (() => {
    const base = { transformStyle: 'preserve-3d', position: 'relative' };
    if (animState === 'flipping')   return { ...base, animation: 'cardFlip 0.92s cubic-bezier(0.22, 1, 0.36, 1) forwards' };
    if (animState === 'unflipping') return { ...base, animation: 'cardUnflip 0.92s cubic-bezier(0.22, 1, 0.36, 1) forwards' };
    return { ...base, transform: flipped ? 'rotateY(180deg)' : undefined };
  })();

  return (
    <>
      {/* ── Keyframes injected so LightningCSS can't strip them ── */}
      <style>{`
        @keyframes cardFlip {
          0%   { transform: rotateY(0deg); }
          55%  { transform: rotateY(205deg); }
          72%  { transform: rotateY(168deg); }
          88%  { transform: rotateY(184deg); }
          100% { transform: rotateY(180deg); }
        }
        @keyframes cardUnflip {
          0%   { transform: rotateY(180deg); }
          55%  { transform: rotateY(-25deg); }
          72%  { transform: rotateY(12deg); }
          88%  { transform: rotateY(-4deg); }
          100% { transform: rotateY(0deg); }
        }
        @keyframes particleFly {
          0%   { transform: translate(-50%, -50%) scale(1.3) rotate(0deg); opacity: 1; }
          40%  { opacity: 0.9; }
          100% {
            transform: translate(calc(-50% + var(--ptx)), calc(-50% + var(--pty))) scale(0) rotate(var(--pspin));
            opacity: 0;
          }
        }
        @keyframes particlePop {
          0%   { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          20%  { transform: translate(-50%, -50%) scale(1.6); opacity: 1; }
          100% {
            transform: translate(calc(-50% + var(--ptx)), calc(-50% + var(--pty))) scale(0) rotate(var(--pspin));
            opacity: 0;
          }
        }
      `}</style>

      <div
        className="card-container flex items-center justify-center p-4"
        style={{ perspective: '1000px', position: 'relative' }}
      >
        {/* ── Particle burst (portal above card) ── */}
        <div
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          {particles.map((p) => (
            <span
              key={p.id}
              style={{
                position: 'absolute',
                fontSize: `${p.size}px`,
                color: p.color,
                '--ptx': `${p.tx}px`,
                '--pty': `${p.ty}px`,
                '--pspin': `${p.spin}deg`,
                animation: `particlePop ${p.duration}s ease-out ${p.delay}s both`,
                userSelect: 'none',
                lineHeight: 1,
                textShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}`,
                filter: `drop-shadow(0 0 5px ${p.color})`,
              }}
            >
              {p.shape}
            </span>
          ))}
        </div>

        {/* ── Rainbow border wrapper (3D flip root) ── */}
        <div
          ref={cardRef}
          onClick={handleCardClick}
          onAnimationEnd={handleAnimEnd}
          className="ludi-rainbow-wrap group w-full max-w-md cursor-pointer select-none"
          style={wrapperStyle}
        >
          <div className="ludi-rainbow-glow" />

          {/* Inner preserve-3d container */}
          <div style={{ position: 'relative', width: '100%', transformStyle: 'preserve-3d' }}>

            {/* ═══ FRONT ═══ */}
            <div
              className="card-ludi rounded-[2.45rem] p-10 text-white"
              style={{
                position: 'relative',
                width: '100%',
                background: 'rgba(9, 9, 11, 0.85)',
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)',
                transformStyle: 'preserve-3d',
                transition: 'background-color 0.3s ease',
                border: 'none',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {/* Holographic cursor-spotlight overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2.45rem]"
                style={{
                  backgroundImage: 'linear-gradient(115deg, transparent 0%, rgba(107,139,180,0.8) 30%, rgba(224,176,255,0.8) 70%, transparent 100%)',
                  backgroundPosition: 'var(--holo-x, 50%) var(--holo-y, 50%)',
                  backgroundSize: '250% 250%',
                  mixBlendMode: 'color-dodge',
                  zIndex: 1,
                  maskImage: 'radial-gradient(180px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 20%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(180px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 20%, transparent 100%)',
                }}
              />
              {/* Sparkles GIF overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-300 rounded-[2.45rem]"
                style={{
                  backgroundImage: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/13471/sparkles.gif")',
                  backgroundPosition: 'center',
                  backgroundSize: '180%',
                  mixBlendMode: 'color-dodge',
                  zIndex: 2,
                }}
              />
              {/* Content */}
              <div
                className="relative z-10 flex flex-col items-center text-center"
                style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}
              >
                <div
                  className="w-20 h-20 bg-gradient-to-tr from-[#6B8BB4] to-[#E0B0FF] rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(224,176,255,0.4)] transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <Sparkles className="w-10 h-10 text-white animate-pulse" />
                </div>
                <h2
                  className="text-3xl font-display font-black tracking-tight mb-4 bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#E0B0FF]"
                  style={{ transform: 'translateZ(45px)' }}
                >
                  ¡Bienvenido Luminauta!
                </h2>
                <div
                  className="ep-shine-btn w-full max-w-xs py-4 px-6 bg-gradient-to-r from-[#6B8BB4] to-[#91aed4] hover:from-[#E0B0FF] hover:to-[#dfc8ef] border-2 border-white/30 text-white rounded-full font-bold shadow-[0_10px_25px_rgba(107,139,180,0.3)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
                  style={{ transform: 'translateZ(60px)' }}
                >
                  <Pointer size={18} className="text-white animate-bounce" />
                  <span>Haz clic aquí</span>
                </div>
              </div>
            </div>

            {/* ═══ BACK ═══ */}
            <div
              className="card-ludi rounded-[2.45rem] p-10 text-white flex flex-col items-center justify-center text-center"
              onMouseEnter={() => setBackHovered(true)}
              onMouseLeave={() => setBackHovered(false)}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(9, 9, 11, 0.9)',
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)',
                transformStyle: 'preserve-3d',
                border: 'none',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div
                className="relative z-10 flex flex-col items-center text-center w-full"
                style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <RobotFaceIcon
                    state={(() => {
                      if (ageInput.trim() !== '') {
                        const n = parseInt(ageInput, 10);
                        if (ageInput.length > 3 || (!isNaN(n) && n > 30)) return 'surprised';
                        return 'happy';
                      }
                      return backHovered ? 'awake' : 'sleep';
                    })()}
                    className="w-20 h-20 text-white"
                  />
                </div>
                <h2
                  className="text-3xl font-display font-black tracking-tight mb-4 bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#E0B0FF]"
                  style={{ transform: 'translateZ(45px)' }}
                >
                  ¿Cuál es tu edad?
                </h2>
                <div className="flex flex-col gap-3 w-full max-w-xs" style={{ transform: 'translateZ(55px)' }}>
                  <input
                    type="text"
                    placeholder="Tu edad..."
                    value={ageInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val) && val.length <= 3) setAgeInput(val);
                    }}
                    className="w-full px-4 py-3 rounded-full bg-zinc-900 border-2 border-white/20 text-white text-center focus:outline-none focus:border-[#E0B0FF] transition-colors"
                  />
                  <button
                    onClick={onEnter}
                    className="py-3 px-6 bg-gradient-to-r from-[#6B8BB4] to-[#E0B0FF] text-white rounded-full font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
                  >
                    Enter
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
