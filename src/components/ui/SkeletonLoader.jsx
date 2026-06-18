import React from 'react';

const SkeletonLoader = ({ className = '' }) => (
  <div className={`ep-skeleton ${className}`}>
    <div className="ep-sk-head">
      <div className="ep-sk-icon"></div>
      <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
        <div className="ep-sk-bar ep-sk-title"></div>
        <div className="ep-sk-bar ep-sk-sub"></div>
      </div>
      <div className="ep-sk-pill">Cargando...</div>
    </div>
    <div className="ep-sk-mid">
      <div className="ep-sk-bar ep-sk-wide"></div>
      <div className="ep-sk-bar ep-sk-short"></div>
      <div className="ep-sk-bar ep-sk-wide"></div>
    </div>
    <div className="ep-sk-progress">
      <div className="ep-sk-flow"></div>
    </div>
  </div>
);

export default SkeletonLoader;
