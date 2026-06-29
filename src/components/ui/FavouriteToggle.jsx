import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FavouriteToggle = ({ id, className = '' }) => {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`ep_fav_${id}`)) || false; } catch { return false; }
  });
  const [isError, setIsError] = useState(false);

  const toggle = async (e) => {
    e.stopPropagation();
    if (isError) return;

    const next = !checked;
    
    // 1. Optimistic update (instant feedback)
    setChecked(next);
    localStorage.setItem(`ep_fav_${id}`, JSON.stringify(next));

    // 2. Fetch server status
    const apiUrl = localStorage.getItem('eduplay_api_url');
    if (apiUrl) {
      let cleanUrl = apiUrl.trim();
      if (!/^https?:\/\//i.test(cleanUrl)) {
        cleanUrl = 'http://' + cleanUrl;
      }
      cleanUrl = cleanUrl.replace(/\/$/, "");

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200); // 1.2s timeout

        const res = await fetch(`${cleanUrl}/juegos/favorito`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify({ gameId: id, favorite: next }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (!res.ok) throw new Error('Status check failed');
      } catch (err) {
        // Revert (TikTok/Instagram style) + shake animation
        setIsError(true);
        setTimeout(() => {
          setChecked(!next);
          localStorage.setItem(`ep_fav_${id}`, JSON.stringify(!next));
          setIsError(false);
        }, 600);
      }
    }
  };

  return (
    <motion.label 
      className={`ep-fav ${className}`} 
      onClick={toggle}
      animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      <input type="checkbox" checked={checked} readOnly />
      <motion.svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        animate={checked && !isError ? { scale: [1, 1.4, 1] } : {}}
        transition={{ duration: 0.3 }}
        style={{ fill: isError ? '#ef4444' : (checked ? '#ffeb49' : '#666') }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </motion.svg>
    </motion.label>
  );
};

export default FavouriteToggle;
