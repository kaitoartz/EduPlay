# 🎮 MASTER PROMPT — UI/UX Redesign: Hero Section + Game Catalog + Screens

## 🧠 CONTEXTO DEL PROYECTO

Antes de cualquier acción, **lee y analiza todos los documentos en la carpeta `/DOCS`**, especialmente:
- El **System Design** del proyecto
- Todos los archivos `.md` de documentación
- El **UI Kit** disponible (componentes, tokens de color, tipografía, espaciado)
- Lee `docs/DESIGN.md`, `docs/brand-spec.md` y cualquier archivo relevante.
- Explora el contenido del directorio `docs/Kit UI/` para conocer los estilos, colores, tipografías y el kit de componentes base.

Con esa información responde internamente:
- ¿Qué tipo de aplicación es? (plataforma de juegos educativos.)
- ¿Cuál es la audiencia objetivo?
- ¿Qué stack frontend usa? (React, Next.js, Vue, etc.)
- ¿Qué librería de componentes/UI Kit tienen?
- ¿Cuáles son los colores, tipografías y tokens del sistema?

**No avances hasta tener claro el contexto del proyecto.**

---

## 🛠️ RECURSOS DISPONIBLES — ÚSALOS ACTIVAMENTE

### MCPs conectados
- **21st Magic** → busca componentes UI premium, efectos de hover, animaciones
- **CodePen** → busca demos, snippets y referencias de efectos específicos
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
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--x', `${e.clientX - rect.left}px`);
  card.style.setProperty('--y', `${e.clientY - rect.top}px`);
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
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText'; // o splitting.js como alternativa

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
  }
});

gsap.from(".hero-img-right", {
  x: "100vw",
  rotation: 15,
  opacity: 0,
  scrollTrigger: { /* idem, offset */ }
});
```

**Efectos visuales del Hero:**
- **Fondo**: gradiente oscuro animado o partículas ambientes (muy sutiles, no distractoras)
- **Tipografía**: split-text con animación char-by-char en el título principal
- **Imágenes de juegos**: entran desde esquinas/bordes en ángulo, con ligera rotación que se corrige al llegar
- **Parallax layers**: 3 capas de profundidad (fondo, medio, frente) con velocidades diferentes
- Si las imágenes no están disponibles, **avísame y yo las genero** — no uses placeholders genéricos

**Busca en 21st Magic:** "GSAP scroll animation hero", "pinned scroll storytelling"
**Busca en CodePen:** "GSAP ScrollTrigger pin hero", "images fly in from edges scroll"

---

### 3. 🃏 CARDS DEL CATÁLOGO — Mejoras adicionales

Además del hover mask, enriquece las game cards con:

**Hover 3D tilt** (como flutter_tilt_book):
- Implementa `transform: perspective(800px) rotateX() rotateY()` tracking del cursor
- Máximo 15° de rotación en cada eje
- Añade un highlight de "brillo especular" que sigue al cursor (pseudo-elemento)

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
button.addEventListener('mousemove', (e) => {
  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});
button.addEventListener('mouseleave', () => {
  button.style.transform = 'translate(0, 0)';
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

1. **Consistencia con el UI Kit existente** — no romper los tokens de color/tipografía del sistema, *extenderlos* con los efectos
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

*Prompt generado para redesign de plataforma gaming — junio 2026*