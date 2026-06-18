import React from 'react';

const AlertBanner = ({ type = 'info', children, className = '' }) => {
  const titles = {
    success: 'MISIÓN CUMPLIDA',
    info: 'SISTEMA DE LA NAVE',
    warning: 'REPORTE DE SENSORES',
    error: 'ALERTA DE SISTEMA'
  };
  const icons = {
    success: <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/></svg>,
    info: <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/></svg>,
    warning: <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/></svg>,
    error: <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/></svg>,
  };
  return (
    <div className={`ep-alert ep-alert--${type} ${className}`}>
      <div className="ep-alert-header">
        {icons[type]}
        <span className="ep-alert-tag">{titles[type]}</span>
      </div>
      <p className="ep-alert-body">{children}</p>
    </div>
  );
};

export default AlertBanner;
