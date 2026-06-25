import React from 'react';
import styled from 'styled-components';

const Button = () => {
return (
<StyledWrapper>
<div>
<svg className="sketchy-filter" xmlns="http://www.w3.org/2000/svg">
<defs>
<filter id="sketchy" x="-5%" y="-5%" width="110%" height="110%">
<feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves={3} seed={2} result="noise" />
<feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
</filter>
</defs>
</svg>
<div className="prismatic-btn-root">
<div className="prismatic-bg-grid" />
<svg className="doodle-deco" width={38} height={38} viewBox="0 0 38 38" fill="none">
<path d="M19 4l3.5 10.5L33 19l-10.5 4.5L19 34l-3.5-10.5L5 19l10.5-4.5z" stroke="#FF6B6B" strokeWidth="2.5" fill="rgba(255,107,107,0.15)" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<svg className="doodle-deco" width={32} height={32} viewBox="0 0 32 32" fill="none">
<circle cx={16} cy={16} r={12} stroke="#4D96FF" strokeWidth="2.5" strokeDasharray="4 3" fill="rgba(77,150,255,0.12)" />
<circle cx={16} cy={16} r={4} fill="#4D96FF" opacity="0.5" />
</svg>
<svg className="doodle-deco" width={34} height={28} viewBox="0 0 34 28" fill="none">
<path d="M2 14 Q8 2 17 14 Q26 26 32 14" stroke="#6BCB77" strokeWidth={3} fill="none" strokeLinecap="round" />
<circle cx={2} cy={14} r={3} fill="#6BCB77" />
<circle cx={32} cy={14} r={3} fill="#6BCB77" />
</svg>
<svg className="doodle-deco" width={36} height={36} viewBox="0 0 36 36" fill="none">
<path d="M18 3 L20.5 13 L30 10 L23 18 L30 26 L20 23 L18 33 L16 23 L6 26 L13 18 L6 10 L15.5 13Z" stroke="#FFD93D" strokeWidth="2.2" fill="rgba(255,217,61,0.2)" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<svg className="doodle-deco" width={30} height={30} viewBox="0 0 30 30" fill="none">
<path d="M15 3 C8 3 3 8 3 15 C3 22 8 27 15 27 C22 27 27 22 27 15" stroke="#C77DFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
<path d="M23 3 L27 7 M27 3 L23 7" stroke="#C77DFF" strokeWidth="2.5" strokeLinecap="round" />
</svg>
<svg className="doodle-deco" width={40} height={22} viewBox="0 0 40 22" fill="none">
<path d="M2 11 L8 4 L14 18 L20 2 L26 18 L32 4 L38 11" stroke="#FF6B6B" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<div className="prismatic-btn-wrap">
<div className="prismatic-glow" />
<button className="prismatic-btn" aria-label="Get Started">
<div className="feet-doodles" />
<div className="prismatic-shimmer" />
<div className="prismatic-reflection" />
<div className="doodle-underline" />
<span className="prismatic-label">Get Started ✏️</span>
</button>
</div>
<svg style={{position: 'absolute', top: 12, left: 12, opacity: '0.35'}} width={50} height={50} viewBox="0 0 50 50" fill="none">
<path d="M5 45 L5 5 L45 5" stroke="#1a1a1a" strokeWidth={2} strokeLinecap="round" fill="none" strokeDasharray="4 3" />
</svg>
<svg style={{position: 'absolute', bottom: 12, right: 12, opacity: '0.35'}} width={50} height={50} viewBox="0 0 50 50" fill="none">
<path d="M45 5 L45 45 L5 45" stroke="#1a1a1a" strokeWidth={2} strokeLinecap="round" fill="none" strokeDasharray="4 3" />
</svg>
</div>
</div>
</StyledWrapper>
);
}

const StyledWrapper = styled.div`
.prismatic-btn-root,
.prismatic-btn-root _,
.prismatic-btn-root _::before,
.prismatic-btn-root \*::after {
box-sizing: border-box;
margin: 0;
padding: 0;
}

/_ ── ROOT ── _/
.prismatic-btn-root {
min-height: 260px;
display: flex;
align-items: center;
justify-content: center;
background: transparent;
font-family: "Caveat", cursive;
padding: 80px 60px;
position: relative;
overflow: hidden;
}

/_ ── PAPER GRID (graph-paper style) ── _/
.prismatic-btn-root .prismatic-bg-grid {
position: absolute;
inset: 0;
background-image: linear-gradient(
rgba(100, 160, 220, 0.18) 1px,
transparent 1px
),
linear-gradient(90deg, rgba(100, 160, 220, 0.18) 1px, transparent 1px);
background-size: 36px 36px;
pointer-events: none;
}
.prismatic-btn-root .prismatic-bg-grid::after {
content: "";
position: absolute;
inset: 0;
background-image: linear-gradient(
rgba(100, 160, 220, 0.07) 1px,
transparent 1px
),
linear-gradient(90deg, rgba(100, 160, 220, 0.07) 1px, transparent 1px);
background-size: 9px 9px;
}

/_ ── FLOATING DOODLE DECORATIONS ── _/
.doodle-deco {
position: absolute;
pointer-events: none;
animation: doodle-float 3s ease-in-out infinite;
}
.doodle-deco:nth-child(1) {
top: 12%;
left: 8%;
animation-delay: 0s;
}
.doodle-deco:nth-child(2) {
top: 20%;
right: 10%;
animation-delay: 0.6s;
}
.doodle-deco:nth-child(3) {
bottom: 14%;
left: 14%;
animation-delay: 1.2s;
}
.doodle-deco:nth-child(4) {
bottom: 10%;
right: 8%;
animation-delay: 0.9s;
}
.doodle-deco:nth-child(5) {
top: 50%;
left: 3%;
animation-delay: 1.8s;
}
.doodle-deco:nth-child(6) {
top: 50%;
right: 3%;
animation-delay: 0.3s;
}

@keyframes doodle-float {
0%,
100% {
transform: translateY(0) rotate(0deg);
}
33% {
transform: translateY(-8px) rotate(6deg);
}
66% {
transform: translateY(5px) rotate(-4deg);
}
}

/_ ── BUTTON WRAPPER ── _/
.prismatic-btn-root .prismatic-btn-wrap {
position: relative;
display: inline-block;
border-radius: 60px;
padding: 5px;
background: conic-gradient(
from 200deg,
#ff6b6b,
#ffd93d,
#6bcb77,
#4d96ff,
#c77dff,
#ff6b6b,
#ffd93d,
#6bcb77
);
box-shadow:
5px 5px 0px #1a1a1a,
0 0 0 3px #1a1a1a;
animation:
doodle-border-spin 5s linear infinite,
doodle-wobble 4s ease-in-out infinite;
transition:
transform 0.15s ease,
box-shadow 0.2s ease;
cursor: pointer;
}

/_ ANIMATION 1 — rotating doodle border _/
@keyframes doodle-border-spin {
0% {
background: conic-gradient(
from 0deg,
#ff6b6b,
#ffd93d,
#6bcb77,
#4d96ff,
#c77dff,
#ff6b6b,
#ffd93d,
#6bcb77
);
}
25% {
background: conic-gradient(
from 90deg,
#ff6b6b,
#ffd93d,
#6bcb77,
#4d96ff,
#c77dff,
#ff6b6b,
#ffd93d,
#6bcb77
);
}
50% {
background: conic-gradient(
from 180deg,
#ff6b6b,
#ffd93d,
#6bcb77,
#4d96ff,
#c77dff,
#ff6b6b,
#ffd93d,
#6bcb77
);
}
75% {
background: conic-gradient(
from 270deg,
#ff6b6b,
#ffd93d,
#6bcb77,
#4d96ff,
#c77dff,
#ff6b6b,
#ffd93d,
#6bcb77
);
}
100% {
background: conic-gradient(
from 360deg,
#ff6b6b,
#ffd93d,
#6bcb77,
#4d96ff,
#c77dff,
#ff6b6b,
#ffd93d,
#6bcb77
);
}
}

/_ ANIMATION 2 — doodle wobble (organic morph) _/
@keyframes doodle-wobble {
0%,
100% {
border-radius: 60px;
transform: rotate(-0.5deg);
}
25% {
border-radius: 55px 65px 60px 58px/62px 58px 65px 55px;
transform: rotate(0.5deg);
}
50% {
border-radius: 62px 56px 64px 58px/58px 64px 56px 62px;
transform: rotate(-0.3deg);
}
75% {
border-radius: 58px 62px 58px 64px/64px 56px 62px 58px;
transform: rotate(0.4deg);
}
}

.prismatic-btn-root .prismatic-btn-wrap:hover {
box-shadow:
7px 7px 0px #1a1a1a,
0 0 0 3px #1a1a1a;
transform: translateY(-3px) scale(1.02) rotate(0deg) !important;
animation:
doodle-border-spin 2s linear infinite,
doodle-wobble-fast 0.5s ease-in-out infinite;
}
@keyframes doodle-wobble-fast {
0%,
100% {
border-radius: 60px;
}
50% {
border-radius: 55px 65px 62px 58px/58px 64px 56px 62px;
}
}
.prismatic-btn-root .prismatic-btn-wrap:active {
transform: translateY(3px) scale(0.97) !important;
box-shadow:
2px 2px 0px #1a1a1a,
0 0 0 3px #1a1a1a;
}

/_ ── INNER BUTTON ── _/
.prismatic-btn-root .prismatic-btn {
position: relative;
display: flex;
align-items: center;
justify-content: center;
width: 280px;
height: 72px;
border-radius: 55px;
overflow: hidden;
background: radial-gradient(
ellipse 80% 50% at 30% 20%,
rgba(255, 217, 61, 0.55) 0%,
transparent 60%
),
radial-gradient(
ellipse 60% 40% at 75% 70%,
rgba(107, 203, 119, 0.4) 0%,
transparent 55%
),
radial-gradient(
ellipse 50% 40% at 60% 20%,
rgba(77, 150, 255, 0.35) 0%,
transparent 55%
),
#fff8e7;
border: none;
outline: none;
cursor: pointer;
user-select: none;
filter: url(#sketchy);
}

/_ diagonal hatch lines (doodle style) _/
.prismatic-btn-root .prismatic-btn::before {
content: "";
position: absolute;
inset: 0;
background: repeating-linear-gradient(
-45deg,
transparent 0px,
transparent 10px,
rgba(26, 26, 26, 0.035) 10px,
rgba(26, 26, 26, 0.035) 11px
);
border-radius: 55px;
pointer-events: none;
z-index: 1;
}

/_ top gloss highlight _/
.prismatic-btn-root .prismatic-btn::after {
content: "";
position: absolute;
top: 0;
left: 8%;
width: 84%;
height: 40%;
background: linear-gradient(
180deg,
rgba(255, 255, 255, 0.5) 0%,
rgba(255, 255, 255, 0.1) 70%,
transparent 100%
);
border-radius: 55px 55px 100% 100%;
pointer-events: none;
z-index: 2;
}

/_ ── SHIMMER SWEEP (ANIMATION 3) ── _/
.prismatic-btn-root .prismatic-shimmer {
position: absolute;
inset: 0;
border-radius: 55px;
overflow: hidden;
z-index: 3;
pointer-events: none;
}
.prismatic-btn-root .prismatic-shimmer::after {
content: "";
position: absolute;
top: -100%;
left: -60%;
width: 35%;
height: 300%;
background: linear-gradient(
105deg,
transparent 25%,
rgba(255, 255, 255, 0.5) 50%,
transparent 75%
);
transform: skewX(-15deg);
animation: doodle-shimmer-sweep 3.5s ease-in-out infinite;
}
@keyframes doodle-shimmer-sweep {
0% {
left: -60%;
opacity: 0;
}
10% {
opacity: 1;
}
45% {
left: 130%;
opacity: 1;
}
55% {
opacity: 0;
}
100% {
left: 130%;
opacity: 0;
}
}
.prismatic-btn-root .prismatic-btn-wrap:hover .prismatic-shimmer::after {
animation: doodle-shimmer-sweep-fast 1.2s ease-in-out infinite;
}
@keyframes doodle-shimmer-sweep-fast {
0% {
left: -60%;
opacity: 0;
}
8% {
opacity: 1;
}
48% {
left: 130%;
opacity: 1;
}
58% {
opacity: 0;
}
100% {
left: 130%;
opacity: 0;
}
}

/_ ── GLOW PULSE (ANIMATION 4) ── _/
.prismatic-btn-root .prismatic-glow {
position: absolute;
inset: -10px;
border-radius: 70px;
background: conic-gradient(
from 0deg,
rgba(255, 107, 107, 0.6),
rgba(255, 217, 61, 0.6),
rgba(107, 203, 119, 0.6),
rgba(77, 150, 255, 0.6),
rgba(199, 125, 255, 0.6),
rgba(255, 107, 107, 0.6)
);
filter: blur(14px);
opacity: 0;
z-index: -1;
animation: doodle-glow-pulse 2.5s ease-in-out infinite;
pointer-events: none;
}
@keyframes doodle-glow-pulse {
0%,
100% {
opacity: 0.4;
transform: scale(1);
}
50% {
opacity: 0.7;
transform: scale(1.05);
}
}
.prismatic-btn-root .prismatic-btn-wrap:hover .prismatic-glow {
opacity: 1;
animation: doodle-glow-intense 1.2s ease-in-out infinite;
}
@keyframes doodle-glow-intense {
0%,
100% {
opacity: 0.8;
transform: scale(1);
filter: blur(14px);
}
50% {
opacity: 1;
transform: scale(1.08);
filter: blur(20px);
}
}

/_ ── LABEL ── _/
.prismatic-btn-root .prismatic-label {
position: relative;
z-index: 10;
color: #1a1a1a;
font-size: 26px;
font-weight: 700;
letter-spacing: 0.03em;
text-shadow: 2px 2px 0px rgba(255, 255, 255, 0.8);
animation: doodle-ink-pulse 2s ease-in-out infinite;
}

/_ ANIMATION 5 — ink pulse on label _/
@keyframes doodle-ink-pulse {
0%,
100% {
text-shadow:
2px 2px 0px rgba(255, 255, 255, 0.8),
0 0 0px transparent;
}
50% {
text-shadow:
2px 2px 0px rgba(255, 255, 255, 0.9),
0 0 12px rgba(77, 150, 255, 0.4);
}
}

/_ ── SCRIBBLE UNDERLINE (ANIMATION 6) ── _/
.doodle-underline {
position: absolute;
bottom: 12px;
left: 50%;
transform: translateX(-50%);
width: 0;
height: 3px;
background: linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcb77);
border-radius: 2px;
z-index: 10;
animation: doodle-scribble 3s ease-in-out infinite;
}
@keyframes doodle-scribble {
0%,
15% {
width: 0;
left: 50%;
}
45%,
55% {
width: 140px;
left: calc(50% - 70px);
}
85%,
100% {
width: 0;
left: 50%;
}
}

/_ ── REFLECTION (ANIMATION 7 — ink wash) ── _/
.prismatic-btn-root .prismatic-reflection {
position: absolute;
bottom: 0;
left: 8%;
width: 84%;
height: 32%;
background: linear-gradient(
0deg,
rgba(77, 150, 255, 0.2) 0%,
transparent 100%
);
border-radius: 0 0 55px 55px;
z-index: 2;
pointer-events: none;
animation: doodle-ink-wash 4s ease-in-out infinite;
}
@keyframes doodle-ink-wash {
0%,
100% {
opacity: 0.6;
background: linear-gradient(
0deg,
rgba(77, 150, 255, 0.2) 0%,
transparent 100%
);
}
33% {
opacity: 1;
background: linear-gradient(
0deg,
rgba(255, 107, 107, 0.25) 0%,
transparent 100%
);
}
66% {
opacity: 0.8;
background: linear-gradient(
0deg,
rgba(107, 203, 119, 0.22) 0%,
transparent 100%
);
}
}

/_ ── SVG FILTER FOR SKETCHY EDGES ── _/
.sketchy-filter {
position: absolute;
width: 0;
height: 0;
overflow: hidden;
}

/_ hide outside background elements _/
.prismatic-btn-root .prismatic-bg-grid,
.doodle-deco {
display: none;
}

/_ small feet doodles inside button _/
.prismatic-btn-root .prismatic-btn .feet-doodles {
position: absolute;
inset: 0;
z-index: 2;
pointer-events: none;
opacity: 0.22;
background-image: radial-gradient(
ellipse 5px 8px at 35px 25px,
#1a1a1a 45%,
transparent 48%
),
radial-gradient(ellipse 5px 8px at 48px 32px, #1a1a1a 45%, transparent 48%),
radial-gradient(ellipse 5px 8px at 105px 45px, #1a1a1a 45%, transparent 48%),
radial-gradient(ellipse 5px 8px at 118px 38px, #1a1a1a 45%, transparent 48%),
radial-gradient(ellipse 5px 8px at 185px 26px, #1a1a1a 45%, transparent 48%),
radial-gradient(ellipse 5px 8px at 198px 34px, #1a1a1a 45%, transparent 48%),
radial-gradient(ellipse 5px 8px at 240px 48px, #1a1a1a 45%, transparent 48%),
radial-gradient(ellipse 5px 8px at 253px 40px, #1a1a1a 45%, transparent 48%);
transform: rotate(-8deg);
}`;

export default Button;
