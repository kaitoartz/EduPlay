import React, { useState } from 'react';

const FavouriteToggle = ({ id, className = '' }) => {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`ep_fav_${id}`)) || false; } catch { return false; }
  });
  const toggle = (e) => {
    e.stopPropagation();
    const next = !checked;
    setChecked(next);
    localStorage.setItem(`ep_fav_${id}`, JSON.stringify(next));
  };
  return (
    <label className={`ep-fav ${className}`} onClick={toggle}>
      <input type="checkbox" checked={checked} readOnly />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
    </label>
  );
};

export default FavouriteToggle;
