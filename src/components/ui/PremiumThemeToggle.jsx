import React from 'react';
import { Sun, Moon } from 'lucide-react';

const PremiumThemeToggle = ({ isDark, onToggle }) => {
  const sparkles = [
    { deg: 0, duration: 4 },
    { deg: 45, duration: 3 },
    { deg: 90, duration: 5 },
    { deg: 135, duration: 4 },
    { deg: 180, duration: 3 },
    { deg: 225, duration: 5 },
    { deg: 270, duration: 4 },
    { deg: 315, duration: 3 }
  ];

  return (
    <div className={`ep-theme-toggle ${isDark ? 'ep-checked' : ''}`} onClick={onToggle} title={isDark ? 'Modo día' : 'Modo noche'}>
      <input type="checkbox" className="ep-toggle-input" checked={isDark} readOnly />
      <label className="ep-toggle-label">
        <div className="ep-cont-icon">
          {sparkles.map((sp, i) => (
            <span 
              key={i} 
              className="ep-sparkle" 
              style={{ '--deg': sp.deg, '--duration': sp.duration }} 
            />
          ))}
          {isDark ? (
            <Sun size={14} className="ep-icon-inner" style={{fill:'var(--light)'}} />
          ) : (
            <Moon size={14} className="ep-icon-inner" style={{fill:'var(--light)'}} />
          )}
        </div>
      </label>
    </div>
  );
};

export default PremiumThemeToggle;
