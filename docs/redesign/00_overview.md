# 🎮 Redesign Overview & Context
This document serves as the master coordinator for the EduPlay UI/UX Redesign project. It breaks down the key goals, resources, and priority execution paths.

## 🧠 Project Context
EduPlay is a gamified educational portal. The primary goals of the redesign are to bridge the gap between high-fidelity educational gaming for children and clean dashboard management for parents and educators.

Before taking action, refer to:
* The core design system in [DESIGN.md](file:///c:/Users/Carlos.Ortiz/Documents/GitHub/EduPlay/docs/DESIGN.md)
* The UI Kit and branding specs in [brand-spec.md](file:///c:/Users/Carlos.Ortiz/Documents/GitHub/EduPlay/docs/brand-spec.md) and [Kit UI](file:///c:/Users/Carlos.Ortiz/Documents/GitHub/EduPlay/docs/Kit%20UI/code.html)

---

## 🛠️ Resources & Tech Stack
* **Vite + React (inline/CDN)**: Standard packages imported in `index.html`.
* **Tailwind CSS**: Currently configured inline in `index.html`.
* **Framer Motion**: Animations library.
* **Lucide Icons**: Iconography library.
* **GSAP + ScrollTrigger**: To be used for story-driven scroll animations in the Hero section.
* **Lenis**: Optional library for smooth scroll.

---

## 🎯 Redesign Priority Breakdown
The redesign is segmented into 5 major technical focus areas, each detailed in its respective reference document:

1. **🖱️ Hover Mask Effect (Priority Max)**: Circular spotlight tracking revealing a space/galaxy particle canvas.
   * *Detail Doc*: [01_hover_mask.md](file:///c:/Users/Carlos.Ortiz/Documents/GitHub/EduPlay/docs/redesign/01_hover_mask.md)
2. **🚀 Hero Section (GSAP Scroll)**: Multi-panel pinned scroll storytelling timeline.
   * *Detail Doc*: [02_hero_gsap.md](file:///c:/Users/Carlos.Ortiz/Documents/GitHub/EduPlay/docs/redesign/02_hero_gsap.md)
3. **🃏 Game Catalog Card Enhancements**: 3D tilt interaction, skeleton shimmer loading, status badges, and expandable footers.
   * *Detail Doc*: [03_animated_3d_card.md](file:///c:/Users/Carlos.Ortiz/Documents/GitHub/EduPlay/docs/redesign/03_animated_3d_card.md)
4. **🔘 Buttons, Sliders, & Navigation**: Magnetic button effects, momentum sliders, page transitions.
   * *Detail Doc*: [04_buttons_sliders_screens.md](file:///c:/Users/Carlos.Ortiz/Documents/GitHub/EduPlay/docs/redesign/04_buttons_sliders_screens.md)
5. **📐 Design System & QA guidelines**: Performance limits, reduced motion rules, and asset generation criteria.
   * *Detail Doc*: [05_guidelines_workflow.md](file:///c:/Users/Carlos.Ortiz/Documents/GitHub/EduPlay/docs/redesign/05_guidelines_workflow.md)
