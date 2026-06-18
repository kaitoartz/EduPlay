import React from 'react';

const StarExplosionBtn = ({ children, onClick, className = '' }) => {
  const starSvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 784.11 815.53"><path className="ep-fil0" d="M392.05 0c-20.9 210.08-184.06 378.41-392.05 407.78 207.96 29.37 371.12 197.68 392.05 407.74 20.93-210.06 184.09-378.37 392.05-407.74-207.98-29.38-371.13-197.69-392.05-407.78z"/></svg>;
  return (
    <button className={`ep-star-btn ${className}`} onClick={onClick}>
      {children}
      <div className="ep-s1">{starSvg}</div>
      <div className="ep-s2">{starSvg}</div>
      <div className="ep-s3">{starSvg}</div>
      <div className="ep-s4">{starSvg}</div>
      <div className="ep-s5">{starSvg}</div>
      <div className="ep-s6">{starSvg}</div>
    </button>
  );
};

export default StarExplosionBtn;
