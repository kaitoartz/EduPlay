# 🎮 MASTER PROMPT — UI/UX Redesign: Hero Section + Game Catalog + Screens

## 🧠 CONTEXTO DEL PROYECTO

Antes de cualquier acción, **lee y analiza todos los documentos en la carpeta `/DOCS`**, especialmente:

- El **System Design** del proyecto
- Todos los archivos `.md` de documentación
- El **UI Kit** disponible (componentes, tokens de color, tipografía, espaciado)

---

## 🛠️ RECURSOS DISPONIBLES — ÚSALOS ACTIVAMENTE

### Uso de SKILLS

- **Skills disponibles**: `impeccable`, `emil kowalski`, `taste skill` — úsalas para guiar las decisiones de diseño y calidad estética

### URLs de referencia — visita estas páginas para inspiración y componentes

```
https://motionsites.ai/
https://amoshuke.github.io/flutter_tilt_book/en/v4/docs/examples/demo/
```

Extrae ideas concretas de efectos, timings, y comportamientos de componentes.

### Librerías de animación disponibles / a usar

- **GSAP** + **ScrollTrigger** — para scroll animations en el Hero
- **Framer Motion** — si el stack es React
- **three.js** / **@react-three/fiber** — para efectos de galaxia/espacio en las cards
- **lenis** — para smooth scroll
- **nano banana** — para generación de imágenes si es necesario (ver nota al pie)

---

## 🎯 PRIORIDADES DE REDESIGN (de mayor a menor)

### 1. 🖱️ HOVER MASK EFFECT — Cards del Catálogo de Juegos ⭐ PRIORIDAD MÁXIMA

Implementa un **cursor-tracking mask reveal** en cada card de juego:

**Comportamiento:**

- Al hacer hover, una máscara circular sigue al cursor y revela una capa oculta debajo
- La capa revelada debe contener una **galaxia / espacio estrellado animado** (partículas, nebulosas, estrellas con parallax sutil)
- El contenido de la card (título, rating, género) permanece visible sobre la máscara
- Transición suave de entrada/salida con `clip-path: circle(...)` o `radial-gradient` mask

**Implementación técnica sugerida:**

```css
/* Mask layer con cursor tracking */
.card-mask {
  --x: 50%;
  --y: 50%;
  mask-image: radial-gradient(
    circle 200px at var(--x) var(--y),
    black 0%,
    transparent 100%
  );
  -webkit-mask-image: radial-gradient(
    circle 200px at var(--x) var(--y),
    black 0%,
    transparent 100%
  );
}
```

```js
card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--x", `${e.clientX - rect.left}px`);
  card.style.setProperty("--y", `${e.clientY - rect.top}px`);
});
```

**Para la galaxia/espacio:**

- Usa `<canvas>` con partículas animadas (estrellas con velocidades variables)
- O usa Three.js con un `Points` mesh de baja resolución
- Colores: tonos púrpura profundo, azul índigo, destellos blancos/dorados
- Añade 2-3 "nebulosas" como gradientes radiales animados con `@keyframes`
- Efecto de **parallax sutil** dentro de la máscara al mover el cursor

**Busca en 21st Magic:** "cursor mask reveal card", "mouse tracking spotlight effect"
**Busca en CodePen:** "galaxy canvas stars hover", "mouse mask reveal"

---

### 2. 🚀 HERO SECTION — GSAP Scroll Animation

Diseña una experiencia de scroll narrativa para el Hero. El objetivo es que el scroll cuente la historia del producto.

**Estructura del Hero (pinned scroll):**

```
[HERO PINNED CONTAINER — 400vh de scroll]
  ├── Panel 1 (0-25%): Título principal aparece con split-text animation
  ├── Panel 2 (25-50%): Imágenes de juegos entran desde los bordes (left/right/bottom)
  ├── Panel 3 (50-75%): Stats / features aparecen con stagger
  └── Panel 4 (75-100%): CTA final + transición al catálogo
```

**Implementación GSAP:**

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; // o splitting.js como alternativa

gsap.registerPlugin(ScrollTrigger, SplitText);

// Pin el hero
ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  end: "+=400%",
  pin: true,
  pinSpacing: true,
});

// Panel 2: imágenes desde bordes
gsap.from(".hero-img-left", {
  x: "-100vw",
  rotation: -15,
  opacity: 0,
  scrollTrigger: {
    trigger: ".hero",
    start: "25% top",
    end: "50% top",
    scrub: 1.5,
  },
});

gsap.from(".hero-img-right", {
  x: "100vw",
  rotation: 15,
  opacity: 0,
  scrollTrigger: {
    /* idem, offset */
  },
});
```

**Efectos visuales del Hero:**

- **Fondo**: gradiente oscuro animado o partículas ambientes (muy sutiles, no distractoras)
- **Tipografía**: split-text con animación char-by-char en el título principal
- **Imágenes de juegos**: entran desde esquinas/bordes en ángulo, con ligera rotación que se corrige al llegar
- **Parallax layers**: 3 capas de profundidad (fondo, medio, frente) con velocidades diferentes
- Si las imágenes no están disponibles, **avísame y yo las genero** — no uses placeholders genéricos

**Busca en 21st Magic:** "GSAP scroll animation hero", "pinned scroll storytelling", "pixel perfect hero", "Display cards"
**Busca en CodePen:** "GSAP ScrollTrigger pin hero", "images fly in from edges scroll"

---

### 3. 🃏 CARDS DEL CATÁLOGO — Mejoras adicionales

Además del hover mask, enriquece las game cards con:

**Hover 3D tilt** (como flutter_tilt_book):

- Implementa You are given a task to integrate an existing React component in the codebase

The codebase should support:

- shadcn project structure
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles.
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:

```tsx
animated-3d-card.tsx
"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Code,
  Palette,
  Users,
  Zap,
  Globe,
  Heart,
  Star,
  Database,
  Shield,
} from "lucide-react";

const THEMES = {
  primary: "from-slate-700 via-slate-800 to-slate-900",
  secondary: "from-blue-600 via-blue-700 to-blue-800",
  accent: "from-purple-600 via-purple-700 to-purple-800",
  success: "from-emerald-600 via-emerald-700 to-emerald-800",
  warning: "from-amber-600 via-amber-700 to-amber-800",
  danger: "from-red-600 via-red-700 to-red-800",
  info: "from-cyan-600 via-cyan-700 to-cyan-800",
  neutral: "from-gray-600 via-gray-700 to-gray-800",
} as const;

type ThemeType = keyof typeof THEMES;

interface MousePos {
  readonly x: number;
  readonly y: number;
}

interface Card3DProps {
  title: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
  theme?: ThemeType;
  gradient?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "premium";
  disabled?: boolean;
  loading?: boolean;
}

interface CardData {
  id: string;
  title: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
  theme?: ThemeType;
  gradient?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

interface Card3DListProps {
  cards: CardData[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg" | "xl";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "premium";
  animated?: boolean;
  staggerDelay?: number;
}

const SIZES = {
  sm: "h-64",
  md: "h-80",
  lg: "h-96",
} as const;

const VARIANTS = {
  default: "shadow-lg hover:shadow-2xl",
  minimal: "shadow-md hover:shadow-lg border border-white/10",
  premium: "shadow-xl hover:shadow-2xl ring-1 ring-white/20",
} as const;

const GRIDS = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const;

const GAPS = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-10",
} as const;

const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12, mass: 0.7 },
  },
};

const Card3D = React.forwardRef<HTMLDivElement, Card3DProps>(
  (
    {
      title,
      description,
      image,
      icon,
      theme = "primary",
      gradient,
      onClick,
      className,
      size = "md",
      variant = "default",
      disabled = false,
      loading = false,
      ...props
    },
    ref
  ) => {
    const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    const finalGradient = useMemo(
      () => gradient || THEMES[theme],
      [gradient, theme]
    );
    const patternId = useMemo(
      () => `pattern-${theme}-${title.replace(/\s+/g, "-").toLowerCase()}`,
      [theme, title]
    );

    const handleMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({
          x: (x / rect.width - 0.5) * 25,
          y: (y / rect.height - 0.5) * -25,
        });
      },
      [disabled]
    );

    const handleEnter = useCallback(() => {
      if (disabled) return;
      setHovered(true);
    }, [disabled]);

    const handleLeave = useCallback(() => {
      if (disabled) return;
      setHovered(false);
      setMousePos({ x: 0, y: 0 });
    }, [disabled]);

    const handleClick = useCallback(() => {
      if (disabled || loading || !onClick) return;
      onClick();
    }, [disabled, loading, onClick]);

    return (
      <motion.div
        ref={ref}
        className={cn(
          "group relative w-full overflow-hidden rounded-2xl transform-gpu transition-all duration-500 ease-out",
          SIZES[size],
          VARIANTS[variant],
          onClick && !disabled && !loading && "cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
          loading && "pointer-events-none",
          className
        )}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        animate={{
          rotateX: disabled ? 0 : mousePos.y,
          rotateY: disabled ? 0 : mousePos.x,
          z: disabled ? 0 : hovered ? 30 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.8 }}
        whileTap={
          disabled || !onClick
            ? {}
            : {
                scale: 0.98,
                rotateX: mousePos.y + 3,
                rotateY: mousePos.x + 3,
              }
        }
        onClick={handleClick}
        style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
        role={onClick ? "button" : "article"}
        tabIndex={onClick && !disabled ? 0 : -1}
        {...props}
      >
        <motion.div
          className={cn(
            "absolute inset-0 rounded-2xl",
            image ? "" : `bg-gradient-to-br ${finalGradient}`
          )}
          animate={{ scale: hovered ? 1.02 : 1 }}
          transition={{ duration: 0.4 }}
          style={{ transform: "translateZ(-10px)" }}
        >
          {image && (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500"
              loading="lazy"
            />
          )}
        </motion.div>

        <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-20">
          <svg
            className="absolute -top-4 -right-4 w-32 h-32 text-white/30"
            viewBox="0 0 100 100"
          >
            <defs>
              <pattern
                id={patternId}
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="1"
                  fill="currentColor"
                  opacity="0.3"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill={`url(#${patternId})`} />
          </svg>

          <motion.div
            className="absolute -bottom-4 -left-4 w-24 h-24 opacity-30"
            animate={{ rotate: hovered ? 180 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-white/40">
              <rect
                x="20"
                y="20"
                width="60"
                height="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                rx="8"
              />
              <rect
                x="35"
                y="35"
                width="30"
                height="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                rx="4"
              />
            </svg>
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)`,
            transform: "translateZ(5px)",
          }}
          animate={{ opacity: hovered ? 0.5 : 0.7 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
          style={{ transform: "translateZ(15px)" }}
        >
          <motion.div
            className="absolute -inset-full"
            animate={{
              background: hovered
                ? `linear-gradient(${mousePos.x + 135}deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)`
                : "transparent",
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="relative z-20 flex h-full flex-col justify-between p-6 text-white"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="flex justify-between items-start">
            {icon && (
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="text-3xl opacity-90 filter drop-shadow-lg"
                  animate={{
                    rotateZ: hovered ? 5 : 0,
                    y: hovered ? -2 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {icon}
                </motion.div>
              </motion.div>
            )}

            <motion.div
              className="relative"
              animate={{ scale: hovered ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-2.5 w-2.5 rounded-full bg-white/40 backdrop-blur-sm" />
              {!disabled && (
                <motion.div
                  className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-white/70"
                  animate={{
                    scale: hovered ? [1, 1.4, 1] : 1,
                    opacity: hovered ? [0.7, 0.3, 0.7] : 0.7,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: hovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>
          </div>

          <motion.div
            className="space-y-3"
            animate={{ y: hovered ? -3 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className="text-xl font-semibold tracking-tight drop-shadow-md"
              animate={{ scale: hovered ? 1.02 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>

            <motion.p
              className="text-sm text-white/85 leading-relaxed drop-shadow-sm line-clamp-3"
              animate={{ opacity: hovered ? 1 : 0.85 }}
              transition={{ duration: 0.3 }}
            >
              {description}
            </motion.p>

            {onClick && !disabled && (
              <motion.div
                className="flex items-center space-x-2 opacity-0"
                animate={{
                  x: hovered ? 0 : -8,
                  opacity: hovered ? 1 : 0,
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="h-0.5 w-4 bg-white/70 rounded-full" />
                <div className="text-xs font-medium opacity-90">
                  {loading ? "Loading..." : "Explore"}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.1) 100%)`,
            transform: "translateZ(25px)",
          }}
          animate={{ opacity: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        />

        {!disabled && (
          <motion.div
            className="absolute -inset-0.5 rounded-2xl opacity-0 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${finalGradient})`,
              filter: "blur(15px)",
              transform: "translateZ(-5px)",
            }}
            animate={{ opacity: hovered ? 0.2 : 0 }}
            transition={{ duration: 0.4 }}
          />
        )}

        {loading && (
          <motion.div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
            style={{ transform: "translateZ(30px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </motion.div>
    );
  }
);

Card3D.displayName = "Card3D";

const Card3DList: React.FC<Card3DListProps> = ({
  cards,
  className,
  columns = 3,
  gap = "md",
  size = "md",
  variant = "default",
  animated = true,
  staggerDelay = 0.08,
}) => {
  const gridClass = useMemo(() => GRIDS[columns], [columns]);
  const gapClass = useMemo(() => GAPS[gap], [gap]);

  const customVariants = useMemo(
    () => ({
      ...containerVariants,
      visible: {
        ...containerVariants.visible,
        transition: {
          ...containerVariants.visible.transition,
          staggerChildren: staggerDelay,
        },
      },
    }),
    [staggerDelay]
  );

  const elements = useMemo(
    () =>
      cards.map((card, index) => (
        <motion.div
          key={card.id}
          variants={animated ? itemVariants : undefined}
          custom={index}
          whileInView={animated ? "visible" : undefined}
          initial={animated ? "hidden" : undefined}
          viewport={
            animated ? { once: true, margin: "-50px", amount: 0.2 } : undefined
          }
          style={{ transformStyle: "preserve-3d" }}
        >
          <Card3D
            title={card.title}
            description={card.description}
            image={card.image}
            icon={card.icon}
            theme={card.theme}
            gradient={card.gradient}
            onClick={card.onClick}
            size={size}
            variant={variant}
            disabled={card.disabled}
            loading={card.loading}
          />
        </motion.div>
      )),
    [cards, size, variant, animated]
  );

  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.015]">
          <svg
            width="100%"
            height="100%"
            className="text-slate-900 dark:text-white"
          >
            <defs>
              <pattern
                id="grid"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 32 0 L 0 0 0 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <motion.div
          className="absolute top-10 right-10 w-64 h-64 opacity-[0.03]"
          animate={{ rotate: [0, 360], scale: [1, 1.05, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full text-slate-600 dark:text-slate-400"
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle
              cx="100"
              cy="100"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-10 w-48 h-48 opacity-[0.02]"
          animate={{ rotate: [360, 0], y: [-10, 10, -10] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 150 150"
            className="w-full h-full text-slate-600 dark:text-slate-400"
          >
            <rect
              x="25"
              y="25"
              width="100"
              height="100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              rx="8"
            />
            <rect
              x="40"
              y="40"
              width="70"
              height="70"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              rx="4"
            />
            <rect
              x="55"
              y="55"
              width="40"
              height="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              rx="2"
            />
          </svg>
        </motion.div>
      </div>

      <motion.div
        className={cn("relative grid w-full", gridClass, gapClass, className)}
        variants={animated ? customVariants : undefined}
        initial={animated ? "hidden" : undefined}
        animate={animated ? "visible" : undefined}
        style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
      >
        {elements}
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/20 to-transparent dark:from-black/20 pointer-events-none" />
    </div>
  );
};

export const Component = () => {
   const cards: CardData[] = [
    {
      id: "web-dev",
      title: "Web Development",
      description:
        "Master modern web technologies with React, Next.js, and TypeScript. Build scalable applications with cutting-edge tools and best practices.",
      icon: <Code />,
      theme: "primary",
    },
    {
      id: "ui-ux",
      title: "UI/UX Design",
      description:
        "Create beautiful and intuitive user experiences that delight users and drive engagement through thoughtful design principles.",
      icon: <Palette />,
      theme: "secondary",
    },
    {
      id: "data",
      title: "Data Science",
      description:
        "Analyze complex data sets and build powerful machine learning models to extract meaningful insights from big data.",
      icon: <Database />,
      theme: "info",
    },
    {
      id: "security",
      title: "Cybersecurity",
      description:
        "Protect digital assets and infrastructure with advanced security protocols and threat detection methodologies.",
      icon: <Shield />,
      theme: "danger",
    },
    {
      id: "leadership",
      title: "Team Leadership",
      description:
        "Build and manage high-performing teams that collaborate effectively and achieve exceptional results through strategic guidance.",
      icon: <Users />,
      theme: "success",
    },
    {
      id: "innovation",
      title: "Innovation",
      description:
        "Drive innovation in your organization by fostering creativity and implementing breakthrough solutions for complex challenges.",
      icon: <Zap />,
      theme: "accent",
    },
    {
      id: "impact",
      title: "Global Impact",
      description:
        "Create solutions that make a meaningful difference worldwide and contribute to positive social change at scale.",
      icon: <Globe />,
      theme: "neutral",
    },
    {
      id: "community",
      title: "Community",
      description:
        "Connect with like-minded professionals, share knowledge, and build lasting relationships in your industry network.",
      icon: <Heart />,
      theme: "warning",
    },
    {
      id: "excellence",
      title: "Excellence",
      description:
        "Strive for excellence in everything you do and continuously improve your skills, capabilities, and professional expertise.",
      icon: <Star />,
      theme: "secondary",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 opacity-[0.03]"
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full text-slate-600 dark:text-slate-400"
          >
            <defs>
              <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="150" fill="url(#grad1)" />
            <circle
              cx="200"
              cy="200"
              r="100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.1"
            />
            <circle
              cx="200"
              cy="200"
              r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeOpacity="0.15"
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 opacity-[0.02]"
          animate={{ rotate: [360, 0], y: [-20, 20, -20] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 320 320"
            className="w-full h-full text-slate-600 dark:text-slate-400"
          >
            <rect
              x="60"
              y="60"
              width="200"
              height="200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.1"
              rx="20"
            />
            <rect
              x="90"
              y="90"
              width="140"
              height="140"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeOpacity="0.1"
              rx="10"
            />
            <rect
              x="120"
              y="120"
              width="80"
              height="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeOpacity="0.15"
              rx="5"
            />
          </svg>
        </motion.div>

        <div className="absolute inset-0 opacity-[0.01]">
          <svg
            width="100%"
            height="100%"
            className="text-slate-900 dark:text-slate-100"
          >
            <defs>
              <pattern
                id="mainGrid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mainGrid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Card3DList
              cards={cards}
              columns={3}
              gap="lg"
              size="md"
              variant="premium"
              className="mb-20"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}


demo.tsx
import { Component } from "@/components/ui/animated-3d-card";

export default function DemoOne() {
  return <Component />;
}

```

Install NPM dependencies:

```bash
lucide-react, framer-motion
```

Implementation Guidelines

1.  Analyze the component structure and identify all required dependencies
2.  Review the component's argumens and state
3.  Identify any required context providers or hooks and install them
4.  Questions to Ask

- What data/props will be passed to this component?
- Are there any specific state management requirements?
- Are there any required assets (images, icons, etc.)?
- What is the expected responsive behavior?
- What is the best place to use this component in the app?

Steps to integrate 0. Copy paste all the code above in the correct directories

1.  Install external dependencies
2.  Fill image assets with Unsplash stock images you know exist
3.  Use lucide-react icons for svgs or logos if component requires them

**Shimmer/skeleton loading:**

- Mientras cargan los juegos, muestra skeletons con shimmer animation

**Badge de estado:**

- "Nuevo", "Trending", "Early Access" con microanimaciones de entrada

**Footer de card expandible:**

- Al hover, el área inferior de la card se expande suavemente revelando tags/descripción corta

---

### 4. 🔘 BOTONES — Efectos premium

Para todos los CTAs y botones del sistema:

**Efecto magnético:**

```js
button.addEventListener("mousemove", (e) => {
  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});
button.addEventListener("mouseleave", () => {
  button.style.transform = "translate(0, 0)";
});
```

**Ripple effect** en click con animación de onda

**Botón primario (CTA):** borde con gradiente animado que rota (`@property --angle` + conic-gradient)

---

### 5. 🎠 SLIDERS — Si los hay en el proyecto

Si el proyecto tiene sliders/carousels:

**Opción A — Slider con momentum:**

- Usa `embla-carousel` o implementa drag con inercia
- Cards con el 3D tilt activo mientras se arrastra

**Opción B — Marquee/ticker infinito:**

- Para secciones de "juegos destacados" o "publishers"
- Bidireccional, pausar en hover

**Opción C — Stacked cards slider:**

- Cards apiladas en 3D, la activa al frente, las demás visibles atrás con scale/opacity reducidos

---

### 6. 🌐 OTRAS PANTALLAS

Para pantallas secundarias (detalle de juego, perfil, biblioteca):

**Página de Detalle de Juego:**

- Hero con video/imagen de fondo con parallax
- Galería de screenshots con lightbox que usa el hover mask de galaxia
- Sección de "juegos similares" con el hover mask activado

**Transiciones de página:**

- Si el router lo permite, implementa transiciones suaves entre páginas
- Sugiere View Transitions API si es compatible con el stack

---

## 📐 PRINCIPIOS DE DISEÑO A RESPETAR

1. **Consistencia con el UI Kit existente** — no romper los tokens de color/tipografía del sistema, _extenderlos_ con los efectos
2. **Performance primero** — todos los efectos deben usar `will-change`, `transform` y `opacity` (no propiedades que generen reflow). Usar `requestAnimationFrame` para cursor tracking
3. **Reduced motion** — todos los efectos deben respetar `prefers-reduced-motion: reduce`
4. **Mobile graceful degradation** — hover effects se convierten en tap effects en mobile; la galaxia puede ser estática en mobile
5. **No sobrecargar** — máximo 2-3 efectos llamativos por pantalla; el resto debe ser sutil

---

## 🔄 FLUJO DE TRABAJO ESPERADO

1. **Lee la carpeta DOCS** → entiende el proyecto y el UI Kit
2. **Visita las URLs de referencia** para inspiración concreta
3. **Busca en 21st Magic y CodePen** los efectos clave
4. **Presenta un plan** antes de codificar: qué efectos implementarás, en qué componentes, y cómo se integran con el stack existente
5. **Implementa por prioridad**: Hover Mask → Hero GSAP → Card enhancements → Botones → Sliders → Otras pantallas
6. **Para imágenes**: si necesitas assets de juegos específicos o placeholders de alta calidad, **dímelo antes de usar placeholders genéricos** — los puedo generar

---

## ⚠️ NOTA SOBRE IMÁGENES

Si en algún punto de la implementación necesitas imágenes de juegos, screenshots, covers de arte, o assets visuales:

- **No uses `picsum.photos` ni `placeholder.com`**
- **Avísame** con una lista de qué imágenes necesitas y las dimensiones requeridas
- Usaré **nano banana** u otras herramientas para generarlas y dártelas

---

## ✅ ENTREGABLES ESPERADOS

Por cada sección/componente:

- [ ] Código completo e integrable (no pseudocódigo)
- [ ] Comentarios explicando la lógica de animación
- [ ] Instrucciones de instalación si hay dependencias nuevas
- [ ] Notas de performance y accesibilidad

---

_Prompt generado para redesign de plataforma gaming — junio 2026_
