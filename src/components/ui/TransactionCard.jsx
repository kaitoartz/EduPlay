import React from 'react';
import { ArrowRight } from 'lucide-react';

const TransactionCard = ({ amount = '+50 XP', className = '' }) => (
  <div className={`ep-tx ${className}`} title="Núcleo de Energía XP">
    <div className="ep-tx-left">
      <div className="ep-tx-card">
        <div className="ep-tx-card-line"></div>
      </div>
      <span className="ep-tx-dollar">{amount}</span>
    </div>
    <div className="ep-tx-right">
      <span className="ep-tx-new">CRÉDITO XP</span>
      <ArrowRight size={16} style={{marginRight:'12px',color:'#10b981'}} />
    </div>
  </div>
);

export default TransactionCard;
