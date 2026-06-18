import React from 'react';
import { Sun, Moon } from 'lucide-react';

const PremiumThemeToggle = ({ isDark, onToggle }) => (
  <div className={`ep-theme-toggle ${isDark ? 'ep-checked' : ''}`} onClick={onToggle} title={isDark ? 'Modo día' : 'Modo noche'}>
    <input type="checkbox" className="ep-toggle-input" checked={isDark} readOnly />
    <label className="ep-toggle-label">
      <div className="ep-cont-icon">
        {isDark ? (
          <Sun size={14} className="ep-icon-inner" style={{fill:'var(--light)'}} />
        ) : (
          <Moon size={14} className="ep-icon-inner" style={{fill:'var(--light)'}} />
        )}
      </div>
    </label>
  </div>
);

export default PremiumThemeToggle;
