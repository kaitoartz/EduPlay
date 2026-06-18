import React from 'react';

const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${className}`}>
    {children}
  </span>
);

export default Badge;
