# 🚀 Hero Section — GSAP Scroll Storytelling

Create a narrative scroll experience for the Hero section. Scrolling down should tell the story of the platform, locking the screen (pinning) while elements transition.

## 📐 Pinned Storyboard Layout (400vh scroll)
```
[HERO PINNED CONTAINER — 400vh of scroll]
  ├── Panel 1 (0-25%): Main title enters via split-text characters
  ├── Panel 2 (25-50%): Showcase images slide in from edges (left, right, bottom)
  ├── Panel 3 (50-75%): Feature stats fade in using stagger
  └── Panel 4 (75-100%): Final CTA scales in with a transition trigger to the Game Catalog
```

---

## 🛠️ GSAP Implementation Example

Configure a pinned container in ScrollTrigger with staggered timelines:

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; // or splitting.js fallback

gsap.registerPlugin(ScrollTrigger, SplitText);

// Pin the main hero container
ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  end: "+=400%",
  pin: true,
  pinSpacing: true,
});

// Panel 2: Images flying in from outside the screen
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
    trigger: ".hero",
    start: "25% top",
    end: "50% top",
    scrub: 1.5,
  },
});
```

---

## 🎨 Visual Effects
* **Ambient Background**: Subtle dark gradient loops or very faint floating ambient particles. It must not distract from readability.
* **Typography**: Split-text character-by-character animations (reveal on scroll).
* **Dynamic Images**: Game covers/screens fly in at angled rotations, settling into 0-rotation (straight) alignment as they land.
* **Parallax Layers**: Create 3 layers of scroll depth (Background, Midground, Foreground) scaling and shifting at different speed factors.

---

## 🔍 Inspiration Searches
* **21st Magic**: `"GSAP scroll animation hero"`, `"pinned scroll storytelling"`, `"pixel perfect hero"`, `"Display cards"`
* **CodePen**: `"GSAP ScrollTrigger pin hero"`, `"images fly in from edges scroll"`
