import React from 'react';

const ShineButton = ({ children, onClick, className = '' }) => (
  <button className={`ep-shine-btn ${className}`} onClick={onClick}>
    {children}
    <svg className="ep-shine-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  </button>
);

export default ShineButton;
