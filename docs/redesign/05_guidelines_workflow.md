# 📐 Design Guidelines & Redesign Workflow

This document details the core guidelines, performance rules, and target deliverables for the EduPlay UI/UX redesign.

---

## 📐 Design & Quality Principles

### 1. UI Kit Consistency
* Retain the existing color tokens, typography hierarchy, and rounding parameters detailed in [DESIGN.md](file:///c:/Users/Carlos.Ortiz/Documents/GitHub/EduPlay/docs/DESIGN.md). Extend them via high-fidelity micro-interactions rather than breaking the core palette.

### 2. Performance First
* Avoid heavy CSS repaints or layouts. Drive animations using GPU-accelerated properties: `transform`, `opacity`, and `will-change`.
* Implement cursor tracking loops wrapped inside `requestAnimationFrame` to prevent stutter on standard monitors.

### 3. Accessible Design (A11y) & Reduced Motion
* Respect the system preferences: disable or simplify all motion if the user prefers reduced motion:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-delay: -1ms !important;
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;
      background-attachment: initial !important;
      scroll-behavior: auto !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }
  }
  ```

### 4. Mobile Adaptation
* Degradation on mobile viewports: hover triggers should fall back to static tap configurations.
* High-intensity effects like the Canvas galaxy spotlight should remain static or disabled on mobile to conserve battery life and processing power.

### 5. Interaction Density
* Restrict page clutter. Limit high-impact animations (such as the scroll pinned Hero and spotlight reveal cards) to 2 or 3 per viewport. All other elements should remain clean and secondary.

---

## 🔄 Redesign Workflow & Image Policy

1. **Information Architecture**: Study all specifications in `/docs`.
2. **References**: Benchmark and pull components from 21st Magic and CodePen as specified.
3. **Planning**: Present a functional roadmap (Implementation Plan) to the user before writing production code.
4. **Execution Sequence**:
   `Hover Mask Reveal` ➔ `GSAP Hero Timeline` ➔ `Card Tilt & Footer` ➔ `Magnetic Buttons` ➔ `Sliders` ➔ `Subpages`
5. **Image Asset Policy**:
   * **Do NOT use generic placeholder URLs** (`picsum.photos`, `placeholder.com`).
   * Compile a list of required assets and dimensions, then notify the user.
   * Use **nano banana** or similar generators to bundle high-quality visual content.

---

## ✅ Deliverables Checklist
* [ ] Code complete, production-ready files (no pseudo-code placeholders).
* [ ] Inline comments detailing the logic of complex animations/timelines.
* [ ] Clear installation/import setup commands if new npm packages are added.
* [ ] Documented performance and accessibility audit records.
