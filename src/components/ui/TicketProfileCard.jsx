import React from 'react';
import { Gamepad2 } from 'lucide-react';

const TicketProfileCard = ({ user, className = '' }) => (
  <div className={`ep-ticket-wrap ${className}`}>
    <div className="ep-ticket">
      <div className="ep-t-main">
        <div className="ep-t-content">
          <div className="ep-t-header">
            <div className="ep-t-logo">
              <Gamepad2 size={15} />
              <span>EduPlay</span>
            </div>
            <span className="ep-t-type">Aventurero</span>
          </div>
          <div className="ep-t-title">{user.name}</div>
          <div className="ep-t-subtitle">Nivel {user.level} · {user.xp} XP</div>
          <div className="ep-t-details">
            <div><div className="ep-t-label">Racha</div><div className="ep-t-value">{user.streak} días</div></div>
            <div><div className="ep-t-label">Retos</div><div className="ep-t-value">{user.completedChallenges || 0}</div></div>
            <div><div className="ep-t-label">Insignias</div><div className="ep-t-value">{user.badges?.length || 0}</div></div>
            <div><div className="ep-t-label">Siguiente</div><div className="ep-t-value">Lvl {user.level + 1}</div></div>
          </div>
        </div>
      </div>
      <div className="ep-t-perf">
        <div style={{width:'1em',height:'1em',borderRadius:'50%',background:'var(--t-bg)',border:'2px solid rgba(255,255,255,.1)'}}></div>
        <div className="ep-t-perf-line"></div>
        <div style={{width:'1em',height:'1em',borderRadius:'50%',background:'var(--t-bg)',border:'2px solid rgba(255,255,255,.1)'}}></div>
      </div>
      <div className="ep-t-stub">
        <div>
          <div className="ep-t-barcode"></div>
          <div className="ep-t-barcode-id">EP-{String(user.level).padStart(3,'0')}-{user.xp}</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div className="ep-t-admit-text">Nivel</div>
          <div className="ep-t-admit-num">{user.level}</div>
        </div>
      </div>
    </div>
  </div>
);

export default TicketProfileCard;
