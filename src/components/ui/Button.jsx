import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', size = 'md', className = '', onClick, ...props }) => {
  const [ripples, setRipples] = useState([]);
  
  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size
    };
    
    setRipples(prev => [...prev, newRipple]);
  };

  const handleButtonClick = (e) => {
    createRipple(e);
    if (onClick) onClick(e);
  };

  const base = "inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-300 relative overflow-hidden group active:scale-[0.97] select-none";
  const variants = {
    primary: "bg-blue-600 text-white shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.5)] dark:shadow-[0_8px_30px_rgba(37,99,235,0.15)] hover:-translate-y-0.5",
    secondary: "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-650 hover:bg-zinc-50 dark:hover:bg-zinc-700 shadow-sm hover:-translate-y-0.5",
    ghost: "bg-transparent text-zinc-600 dark:text-zinc-550 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100",
    glow: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] border border-zinc-700 dark:border-zinc-300 hover:-translate-y-0.5"
  };
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" };
  
  return (
    <motion.button 
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} 
      onClick={handleButtonClick}
      {...props}
    >
      {variant === 'primary' && <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />}
      
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.45 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onAnimationComplete={() => {
            setRipples(prev => prev.filter(r => r.id !== ripple.id));
          }}
          style={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            borderRadius: "50%",
            backgroundColor: variant === 'primary' ? "rgba(255, 255, 255, 0.4)" : "rgba(37, 99, 235, 0.2)",
            pointerEvents: "none",
            zIndex: 0
          }}
        />
      ))}
      <span className="relative flex items-center justify-center gap-2 z-10">{children}</span>
    </motion.button>
  );
};

export default Button;
