import React from 'react';

const EarthLoader = ({ className = '' }) => {
  const land = <svg fill="#7cc133" viewBox="0 0 100 50"><ellipse cx="50" cy="25" rx="40" ry="22"/></svg>;
  return (
    <div className={`ep-earth-loader ${className}`}>
      {land}{land}{land}{land}
    </div>
  );
};

export default EarthLoader;
