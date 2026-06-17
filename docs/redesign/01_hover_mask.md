# 🖱️ Hover Mask Effect — Game Catalog Cards (Max Priority)

Implement a cursor-tracking mask reveal on each game card in the catalog.

## 🌟 Comportamiento (Behavior)
* **Reveal Spotlight**: When hovering over a card, a circular mask follows the cursor and reveals a hidden canvas/layer underneath.
* **Underlying Layer**: The revealed layer contains an animated space/galaxy (particles, nebulas, stars with a subtle parallax effect).
* **Card Content Visibility**: All foreground content of the card (title, subject, difficulty, rating, buttons) remains fully visible and legible on top of the mask.
* **Transitions**: Smooth fade-in/fade-out of the mask using `clip-path: circle(...)` or `radial-gradient` masks.

---

## 🛠️ Technical Implementation Blueprint

### 1. Spotlight Tracking (CSS + JS)
Configure custom CSS properties on mouse movement to dynamically adjust the radial gradient mask center coordinates:

```css
/* Mask layer with cursor tracking */
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

```javascript
card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--x", `${e.clientX - rect.left}px`);
  card.style.setProperty("--y", `${e.clientY - rect.top}px`);
});
```

### 2. Space/Galaxy Layer (Canvas or ThreeJS)
* **Canvas Particles**: Use a `<canvas>` element containing stars rotating or moving at varying speeds to create depth.
* **Alternate/Three.js**: Use Three.js with a low-res `Points` mesh for rendering high-performance starfields.
* **Palette**: Deep purple shades, indigo blue backgrounds, sparkling white/gold stars.
* **Nebulas**: Generate 2 or 3 nebulas via animated radial gradients using CSS `@keyframes`.
* **Parallax**: Introduce a subtle offset in the star/nebula coordinate space based on cursor distance from center, creating a 3D-like depth illusion inside the spotlight mask.

---

## 🔍 Inspiration Searches
* **21st Magic**: `"cursor mask reveal card"`, `"mouse tracking spotlight effect"`
* **CodePen**: `"galaxy canvas stars hover"`, `"mouse mask reveal"`
