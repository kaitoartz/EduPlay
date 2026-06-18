import React from 'react';
import StarsBg from './StarsBg';

const AstronautLoader = ({ text = 'Cargando', className = '' }) => {
  return (
    <div className={`ep-astro-container ${className}`}>
      <StarsBg showBg={true} />
      <div className="ep-astro-box-1">
        <div className="ep-astro-star ep-astro-star-pos1" />
        <div className="ep-astro-star ep-astro-star-pos2" />
        <div className="ep-astro-star ep-astro-star-pos3" />
        <div className="ep-astro-star ep-astro-star-pos4" />
        <div className="ep-astro-star ep-astro-star-pos5" />
        <div className="ep-astro-star ep-astro-star-pos6" />
        <div className="ep-astro-star ep-astro-star-pos7" />
      </div>
      <div className="ep-astro-box-2">
        <div className="ep-astro-star ep-astro-star-pos1" />
        <div className="ep-astro-star ep-astro-star-pos2" />
        <div className="ep-astro-star ep-astro-star-pos3" />
        <div className="ep-astro-star ep-astro-star-pos4" />
        <div className="ep-astro-star ep-astro-star-pos5" />
        <div className="ep-astro-star ep-astro-star-pos6" />
        <div className="ep-astro-star ep-astro-star-pos7" />
      </div>
      <div className="ep-astro-box-3">
        <div className="ep-astro-star ep-astro-star-pos1" />
        <div className="ep-astro-star ep-astro-star-pos2" />
        <div className="ep-astro-star ep-astro-star-pos3" />
        <div className="ep-astro-star ep-astro-star-pos4" />
        <div className="ep-astro-star ep-astro-star-pos5" />
        <div className="ep-astro-star ep-astro-star-pos6" />
        <div className="ep-astro-star ep-astro-star-pos7" />
      </div>
      <div className="ep-astro-box-4">
        <div className="ep-astro-star ep-astro-star-pos1" />
        <div className="ep-astro-star ep-astro-star-pos2" />
        <div className="ep-astro-star ep-astro-star-pos3" />
        <div className="ep-astro-star ep-astro-star-pos4" />
        <div className="ep-astro-star ep-astro-star-pos5" />
        <div className="ep-astro-star ep-astro-star-pos6" />
        <div className="ep-astro-star ep-astro-star-pos7" />
      </div>
      <div className="ep-astro-float-wrapper">
        <div className="ep-astro-astronaut">
          <div className="ep-astro-head" />
          <div className="ep-astro-arm ep-astro-arm-left" />
          <div className="ep-astro-arm ep-astro-arm-right" />
          <div className="ep-astro-body">
            <div className="ep-astro-panel" />
          </div>
          <div className="ep-astro-leg ep-astro-leg-left" />
          <div className="ep-astro-leg ep-astro-leg-right" />
          <div className="ep-astro-schoolbag" />
        </div>
      </div>
      <div className="ep-astro-status">{text}</div>
    </div>
  );
};

export default AstronautLoader;
