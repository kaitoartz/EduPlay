import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { getImageUrl } from '../../data/mockData';
import CardContentLayout from './CardContentLayout';
import InkReveal from './InkReveal';

const PremiumGameCard = ({ id, title, subject, level, duration, points, color, bg, icon: Icon, image, description, locked, tag, onClick, isDark }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [localMouse, setLocalMouse] = useState({ x: null, y: null });
  
  const mX = useMotionValue(150);
  const mY = useMotionValue(200);
  const mXSpring = useSpring(mX, { stiffness: 80, damping: 15 });
  const mYSpring = useSpring(mY, { stiffness: 80, damping: 15 });

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Specular shine speculative angle & Tilt angle capped to max 15deg (was 7.5deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    
    mX.set(rawX);
    mY.set(rawY);
    setLocalMouse({ x: rawX, y: rawY });

    const xPct = rawX / width - 0.5;
    const yPct = rawY / height - 0.5;
    x.set(xPct);
    y.set(yPct);

    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    setLocalMouse({ x: null, y: null });
  };

  const finalImageUrl = getImageUrl(image, id, title, isHovered);

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d",
        "--mouse-x": useTransform(mXSpring, (v) => `${v}px`),
        "--mouse-y": useTransform(mYSpring, (v) => `${v}px`),
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative w-full rounded-[2rem] p-1 cursor-pointer group bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl transition-shadow duration-500 ${locked ? 'opacity-85' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Specular Shine Highlight Overlay */}
      <div 
        className="absolute inset-0 rounded-[1.8rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30 mix-blend-overlay"
        style={{
          background: `radial-gradient(circle 120px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.45) 0%, transparent 80%)`
        }}
      />

      <div className="relative bg-white dark:bg-zinc-900 rounded-[1.8rem] h-full flex flex-col z-10 overflow-hidden">
        {/* Base Card Content */}
        <CardContentLayout
          id={id}
          title={title}
          subject={subject}
          level={level}
          duration={duration}
          points={points}
          bg={bg}
          icon={Icon}
          finalImageUrl={finalImageUrl}
          description={description}
          locked={locked}
          isDarkTheme={isDark}
          tag={tag}
        />

        {/* Spotlight Mask Overlay Layer (Dark Card Content) */}
        <div className="card-spotlight-overlay" style={{ maskImage: "none", WebkitMaskImage: "none" }}>
          <CardContentLayout
            id={id}
            title={title}
            subject={subject}
            level={level}
            duration={duration}
            points={points}
            bg={bg}
            icon={Icon}
            finalImageUrl={finalImageUrl}
            description={description}
            locked={locked}
            isDarkTheme={true}
            tag={tag}
          />
          <InkReveal
            mouseX={localMouse.x}
            mouseY={localMouse.y}
            active={isHovered}
            maskColor={isDark ? [9, 9, 11] : [255, 255, 255]}
            brushSize={100}
            className="absolute inset-0 z-10 pointer-events-none"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumGameCard;
