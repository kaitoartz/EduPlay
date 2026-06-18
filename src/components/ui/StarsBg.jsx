import React from 'react';
import './StarsBg.css';

const StarsBg = ({ className = '', showBg = false }) => {
  return (
    <div className={`stars-bg-container ${showBg ? 'stars-bg-with-gradient' : ''} ${className}`}>
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />
    </div>
  );
};

export default StarsBg;
