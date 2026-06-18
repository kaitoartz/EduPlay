import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Button from './ui/Button';

const ModalWaitlistForm = ({ gameTitle, onFinish }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      localStorage.setItem('eduplay_subscribed_email', email);
    }, 1000);
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-2xl text-green-800 text-sm font-semibold flex items-center gap-3 justify-center">
          <CheckCircle2 size={18} className="text-green-500" />
          <span>¡Te has registrado con éxito!</span>
        </div>
        <Button variant="secondary" className="w-full py-3.5 rounded-xl font-bold" onClick={onFinish}>Entendido</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="text-left">
        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Regístrate para Acceso Anticipado</label>
        <input 
          type="email" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu email (papá o profesor)..." 
          className="w-full px-5 py-3.5 rounded-2xl border-2 border-zinc-200 focus:border-purple-500 focus:outline-none font-medium text-base"
          disabled={status === 'loading'}
        />
      </div>
      <div className="flex gap-3 w-full">
        <Button type="button" variant="secondary" className="flex-1 py-3.5 rounded-2xl" onClick={onFinish} disabled={status === 'loading'}>Cancelar</Button>
        <Button type="submit" className="flex-1 py-3.5 bg-purple-600 text-white rounded-2xl shadow-purple-500/20" disabled={status === 'loading'}>
          {status === 'loading' ? 'Registrando...' : 'Notificarme'}
        </Button>
      </div>
    </form>
  );
};

export default ModalWaitlistForm;
