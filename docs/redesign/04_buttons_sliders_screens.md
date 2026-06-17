# 🔘 Buttons, Sliders, & Screen Navigation

This document contains visual animation details for interactive UI elements: buttons, slider variations, page transitions, and secondary viewports.

---

## 🔘 Buttons (Efectos Premium)

### 1. Magnetic Hover Effect
Implement cursor magnetism for key action buttons:
```javascript
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

### 2. Ripple Click Effect
* Generate dynamic SVG/CSS circles spreading outwards from the pointer click coordinates inside the button container.

### 3. Rotating Gradient Border (Conic Gradient)
* Apply a custom `@property --angle` transition to rotate a conic-gradient border on primary CTAs.

---

## 🎠 Slider Patterns (Carousel Options)

### Opción A — Momentum Drag Slider
* Integrate `embla-carousel` or write custom touch/drag inertia math.
* Keep the 3D tilt active during drag states.

### Opción B — Infinitely Scrolling Marquee
* A continuous scrolling list (ticker) of game categories or partner institutions.
* Bidirectional, pauses automatically when the user hovers over it.

### Opción C — Stacked 3D Cards
* Stack cards on top of each other. The active card sits at `z-index` front-and-center, while back cards are scaled down and faded (`opacity: 0.4`, `scale: 0.8`) at subtle angle deviations.

---

## 🌐 Secondary Screen Details

### 1. Game Details Page (`vr.html`, `rayosx.html`, etc.)
* **Parallax Background**: Hero video or banner sliding slower than the content container on scroll.
* **Galeria Lightbox**: Screenshots grid. Clicking an item launches a modal with the circular spotlight galaxy hover mask.
* **Similar Games**: Showcase relative 3D tilt cards.

### 2. Smooth Page Transitions
* Implement smooth slide/fade animations between views.
* Propose the browser-native **View Transitions API** where appropriate.
