import { Button } from "./button.tsx";
import { 
  Zap, FlaskConical, BookOpen, Brain, Code, Globe, Star, 
  Sparkles, Compass, Music, Heart, Award, Cpu, Shield, 
  Rocket, Target, HelpCircle
} from "lucide-react";

const iconConfigs = [
  { Icon: Zap, color: "#f59e0b" },          // Rayos/Física
  { Icon: FlaskConical, color: "#10b981" }, // Ciencia/Laboratorio
  { Icon: BookOpen, color: "#3b82f6" },     // Lectura/Bitácoras
  { Icon: Brain, color: "#E0B0FF" },        // Memoria/Sistemas Estelares
  { Icon: Code, color: "#ec4899" },         // Programación/Código
  { Icon: Globe, color: "#06b6d4" },        // Cartografía
  { Icon: Star, color: "#eab308" },         // Misiones/Estrellas
  { Icon: Sparkles, color: "#a855f7" },     // Magia/Creatividad
  { Icon: Compass, color: "#14b8a6" },      // Exploración
  { Icon: Music, color: "#f43f5e" },        // Frecuencias Cósmicas
  { Icon: Heart, color: "#ef4444" },        // Salud/Vida
  { Icon: Award, color: "#f59e0b" },        // Premios/Rachas
  { Icon: Cpu, color: "#6366f1" },          // Tecnología/IA
  { Icon: Shield, color: "#3b82f6" },       // Seguridad/Padres
  { Icon: Rocket, color: "#6B8BB4" },       // Navegación
  { Icon: Target, color: "#ef4444" },       // Retos diarios
  { Icon: HelpCircle, color: "#a855f7" }    // Acertijos
];

export default function FeatureSection({ onNavigate }) {
  const orbitCount = 3;
  const orbitGap = 7; // spacing in rem
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <section className="relative w-full max-w-6xl mx-auto my-20 flex flex-col md:flex-row items-center justify-between min-h-[30rem] border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl overflow-hidden rounded-3xl p-8 md:p-12 shadow-xl dark:shadow-none">
      
      {/* Background gradients for premium feel */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      {/* Left side: Heading and Text */}
      <div className="w-full md:w-1/2 z-10 flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-6">
          <Sparkles size={12} className="animate-pulse" /> Aprendizaje Activo
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 tracking-tight leading-[1.15] text-zinc-900 dark:text-white">
          Expande tu mente
        </h2>
        <p className="text-zinc-550 dark:text-zinc-400 mb-8 max-w-md text-base sm:text-lg font-medium leading-relaxed">
          Navega por múltiples disciplinas diseñadas especialmente para mentes curiosas. Matemáticas, ciencias, programación y lectura en un solo universo.
        </p>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => onNavigate('catalog')}
            className="rounded-full shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5"
          >
            Explorar Mapa
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onNavigate('pricing')}
            className="rounded-full border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white font-bold px-6 py-2.5"
          >
            Suscripción
          </Button>
        </div>
      </div>

      {/* Right side: Orbit animation cropped to 1/4 */}
      <div className="relative w-full md:w-1/2 h-80 md:h-[28rem] flex items-center justify-center md:justify-start overflow-hidden">
        <div className="relative w-[36rem] h-[36rem] md:w-[48rem] md:h-[48rem] translate-y-12 md:translate-y-0 md:translate-x-[40%] flex items-center justify-center">
          
          {/* Center Circle */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-zinc-50 dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center z-20">
            <Rocket className="w-10 h-10 md:w-12 md:h-12 text-[#6B8BB4] animate-pulse" />
          </div>

          {/* Generate Orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${10 + orbitGap * (orbitIdx + 1)}rem`;
            const angleStep = (2 * Math.PI) / iconsPerOrbit;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border border-dashed border-zinc-250 dark:border-zinc-800"
                style={{
                  width: size,
                  height: size,
                  animation: `spin ${15 + orbitIdx * 8}s linear infinite`,
                }}
              >
                {iconConfigs
                  .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                  .map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    const x = 50 + 50 * Math.cos(angle);
                    const y = 50 + 50 * Math.sin(angle);

                    return (
                      <div
                        key={iconIdx}
                        className="absolute bg-white dark:bg-zinc-900 rounded-full p-2 border border-zinc-150 dark:border-zinc-800 shadow-lg cursor-pointer hover:scale-110 transition-transform"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {cfg.Icon && (
                          <cfg.Icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: cfg.color }} />
                        )}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
