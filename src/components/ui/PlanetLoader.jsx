import React from 'react';

const PlanetLoader = ({ text = 'Cargando', className = '' }) => (
  <div className={`ep-planet-wrap ${className}`}>
    <div className="ep-planet">
      <div className="ep-ring"></div>
      <div className="ep-cover-ring"></div>
      <div className="ep-spots">
        <span></span><span></span><span></span><span></span>
      </div>
    </div>
    <p>{text}</p>
  </div>
);

export default PlanetLoader;
