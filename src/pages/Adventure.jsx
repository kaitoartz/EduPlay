import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Compass, Key, Sparkles, Lock, CheckCircle2, ChevronRight, Play, Heart, Star, ShoppingBag, X } from 'lucide-react';
import Button from '../components/ui/Button';

// Mock data for rewards pathway
const PATH_NODES = [
  { id: 1, type: 'start', title: 'Puerto Estelar', status: 'completed', reward: '50 Monedas', rewardType: 'coins' },
  { id: 2, type: 'quiz', title: 'Aritmética Espacial', status: 'completed', reward: 'Insignia de Bronce', rewardType: 'badge' },
  { id: 3, type: 'chest', title: 'Cofre Galáctico Común', status: 'claimable', reward: 'Lootbox Común', rewardType: 'lootbox_common' },
  { id: 4, type: 'quiz', title: 'Gravedad Cero', status: 'locked', reward: '100 Monedas', rewardType: 'coins' },
  { id: 5, type: 'chest', title: 'Cofre Estelar Especial', status: 'locked', reward: 'Lootbox Rara', rewardType: 'lootbox_rare' },
  { id: 6, type: 'quiz', title: 'Geometría Nebular', status: 'locked', reward: 'Aspecto: Traje de Astronauta', rewardType: 'skin' },
  { id: 7, type: 'quiz', title: 'Fórmula de Velocidad', status: 'locked', reward: 'Mascot: Mini Astro', rewardType: 'pet' },
  { id: 8, type: 'boss', title: 'Supernova Final', status: 'locked', reward: 'Cofre Mega Legendario', rewardType: 'lootbox_legendary' }
];

const LOOTBOX_REWARDS = {
  lootbox_common: [
    { name: 'Monedas Espaciales', amount: 150, type: 'coins', rarity: 'common', color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20' },
    { name: 'Cristal Azul', amount: 10, type: 'gems', rarity: 'rare', color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/20' }
  ],
  lootbox_rare: [
    { name: 'Monedas Espaciales', amount: 400, type: 'coins', rarity: 'common', color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20' },
    { name: 'Cristal Purpura', amount: 25, type: 'gems', rarity: 'rare', color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/20' },
    { name: 'Insignia del Explorador', amount: 1, type: 'badge', rarity: 'epic', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' }
  ],
  lootbox_legendary: [
    { name: 'Monedas Espaciales', amount: 1000, type: 'coins', rarity: 'common', color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20' },
    { name: 'Cristal Cósmico', amount: 100, type: 'gems', rarity: 'legendary', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' },
    { name: 'Skin: Casco de Titanio', amount: 1, type: 'skin', rarity: 'legendary', color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/20' },
    { name: 'Mascota: Fénix Estelar', amount: 1, type: 'pet', rarity: 'legendary', color: 'text-violet-500 bg-violet-50 dark:bg-violet-950/20' }
  ]
};

const Adventure = ({ onNavigate, user }) => {
  const [nodes, setNodes] = useState(PATH_NODES);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeBox, setActiveBox] = useState(null); // 'common' | 'rare' | 'legendary' | null
  const [boxState, setBoxState] = useState('closed'); // 'closed' | 'shaking' | 'bursting' | 'revealing'
  const [remainingItems, setRemainingItems] = useState(0);
  const [rewardIndex, setRewardIndex] = useState(0);
  const [unlockedRewards, setUnlockedRewards] = useState([]);
  const [activePetMsg, setActivePetMsg] = useState('¡Hola! Soy tu asistente estelar. ¡Abramos ese cofre!');

  // Mascot quotes
  const petQuotes = [
    '¡Increíble! Cada vez estás más cerca de la Supernova Final.',
    '¿Sabías que ganar estrellas te da más llaves para abrir cofres?',
    '¡Ese cofre azul tiene pinta de contener gemas raras!',
    '¡Sigamos aprendiendo! Tu racha está al máximo.',
    '¡Tu traje de astronauta se ve genial hoy!'
  ];

  const triggerPetQuote = () => {
    const randomQuote = petQuotes[Math.floor(Math.random() * petQuotes.length)];
    setActivePetMsg(randomQuote);
  };

  // Open lootbox handler
  const handleOpenLootbox = (boxType) => {
    setActiveBox(boxType);
    setBoxState('closed');
    const rewardList = LOOTBOX_REWARDS[boxType] || LOOTBOX_REWARDS.lootbox_common;
    setUnlockedRewards(rewardList);
    setRemainingItems(rewardList.length);
    setRewardIndex(0);
  };

  const handleBoxTap = () => {
    if (boxState === 'closed') {
      setBoxState('shaking');
      setTimeout(() => {
        setBoxState('shaking');
      }, 300);
    } else if (boxState === 'shaking') {
      setBoxState('bursting');
      setTimeout(() => {
        setBoxState('revealing');
      }, 500);
    } else if (boxState === 'revealing') {
      if (remainingItems > 1) {
        setRemainingItems(prev => prev - 1);
        setRewardIndex(prev => prev + 1);
      } else {
        // Complete lootbox opening
        setBoxState('closed');
        setActiveBox(null);
        // Mark node as claimed
        if (selectedNode) {
          setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, status: 'completed' } : n));
          setSelectedNode(null);
        }
        triggerPetQuote();
      }
    }
  };

  const currentReward = unlockedRewards[rewardIndex];

  return (
    <main className="overflow-x-hidden w-full max-w-full min-h-screen pt-32 pb-20 px-6 lg:px-8 bg-zinc-950 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Artistic Asymmetry Top Hero Section */}
        <section className="relative w-full max-w-5xl mx-auto rounded-[2.5rem] bg-gradient-to-r from-zinc-900 to-zinc-900/50 p-8 md:p-12 border border-zinc-800 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-wider">
              <Compass size={14} /> Camino Estelar
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-2xl bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Desbloquea recompensas cósmicas
            </h1>
            <p className="dark:text-zinc-550 text-lg font-medium leading-relaxed">
              Completa misiones de matemáticas, ciencias y letras para obtener llaves espaciales. Abre cofres legendarios con increíbles skins, mascotas y cristales.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => onNavigate('catalog')} className="rounded-full shadow-lg shadow-indigo-500/25 px-8">
                Iniciar Aventura
              </Button>
            </div>
          </div>

          {/* Interactive Mascot Area */}
          <div className="relative flex flex-col items-center gap-4 bg-zinc-900/80 border border-zinc-800 p-6 rounded-3xl w-full md:max-w-xs shadow-xl backdrop-blur-md">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              onClick={triggerPetQuote}
              className="cursor-pointer relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <img 
                src="https://api.dicebear.com/7.x/bottts/svg?seed=AstroMascot&backgroundColor=141923" 
                alt="Mascota Estelar" 
                className="w-24 h-24 rounded-full relative z-10 border-2 border-zinc-800"
              />
            </motion.div>
            <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-2xl text-center relative w-full">
              <p className="text-xs text-zinc-300 font-semibold leading-relaxed">
                {activePetMsg}
              </p>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-zinc-950"></div>
            </div>
          </div>
        </section>

        {/* Bento Grid Stats Tracker */}
        <section className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card 1: Keys */}
          <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-3xl flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Llaves Disponibles</span>
              <p className="text-3xl font-black text-white">3 / 5</p>
            </div>
            <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Key size={28} />
            </div>
          </div>

          {/* Card 2: Star progress */}
          <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-3xl flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Estrellas Ganadas</span>
              <p className="text-3xl font-black text-white">{user.xp * 5 || 120}</p>
            </div>
            <div className="w-14 h-14 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 flex items-center justify-center text-yellow-400">
              <Star size={28} fill="currentColor" />
            </div>
          </div>

          {/* Card 3: Next Box */}
          <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-3xl flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Siguiente Cofre</span>
              <p className="text-lg font-black text-white flex items-center gap-1">
                Nivel 3 <ChevronRight size={16} className="text-zinc-500" /> Cofre Común
              </p>
            </div>
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Trophy size={28} />
            </div>
          </div>
        </section>

        {/* Duolingo-style Pathway Section */}
        <section className="relative max-w-2xl mx-auto py-16 flex flex-col items-center">
          {/* Vertical Path Connector SVG */}
          <div className="absolute top-20 bottom-20 w-4 -z-10 flex justify-center">
            <svg className="w-8 h-full stroke-zinc-800" fill="none" viewBox="0 0 32 800" preserveAspectRatio="none">
              <path 
                d="M 16 0 C 40 100, -8 200, 16 300 C 40 400, -8 500, 16 600 C 40 700, -8 800, 16 800" 
                strokeWidth="6" 
                strokeDasharray="10, 8"
                className="stroke-indigo-500/30"
              />
            </svg>
          </div>

          {/* Path nodes map */}
          <div className="space-y-16 w-full relative z-10 flex flex-col items-center">
            {nodes.map((node, index) => {
              // Alternating layout offsets (Duolingo style)
              const aligns = ['translate-x-0', 'translate-x-12', 'translate-x-0', '-translate-x-12'];
              const alignClass = aligns[index % aligns.length];

              const isCompleted = node.status === 'completed';
              const isClaimable = node.status === 'claimable';
              const isLocked = node.status === 'locked';

              return (
                <div key={node.id} className={`flex flex-col items-center justify-center transition-all ${alignClass}`}>
                  <motion.div 
                    whileHover={!isLocked ? { scale: 1.1 } : {}}
                    whileTap={!isLocked ? { scale: 0.95 } : {}}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-emerald-500/20 border-4 border-zinc-900' 
                        : isClaimable 
                        ? 'bg-gradient-to-tr from-indigo-600 to-purple-500 text-white shadow-indigo-500/40 border-4 border-white animate-pulse' 
                        : 'bg-zinc-800 text-zinc-500 border-4 border-zinc-900 shadow-none'
                    }`}
                    onClick={() => {
                      if (!isLocked) {
                        setSelectedNode(node);
                      }
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={32} />
                    ) : isLocked ? (
                      <Lock size={24} />
                    ) : node.type === 'chest' ? (
                      <ShoppingBag size={28} className="animate-bounce" />
                    ) : (
                      <Play size={28} fill="currentColor" className="ml-1" />
                    )}

                    {/* Outer glowing ring for claimable node */}
                    {isClaimable && (
                      <div className="absolute inset-0 rounded-full border-4 border-indigo-400 animate-ping opacity-75" />
                    )}
                  </motion.div>

                  <div className="mt-3 text-center">
                    <p className={`font-bold text-sm tracking-wide ${isLocked ? 'text-zinc-650' : 'text-white'}`}>
                      {node.title}
                    </p>
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">
                      {node.type.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Node interaction Details Modal */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative"
              >
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mx-auto border border-indigo-500/20">
                    {selectedNode.type === 'chest' ? <ShoppingBag size={32} /> : <Compass size={32} />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">{selectedNode.title}</h3>
                    <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mt-1">{selectedNode.type}</p>
                  </div>
                  <p className="dark:text-zinc-550 text-sm font-medium">
                    Recompensa: <strong className="text-white">{selectedNode.reward}</strong>
                  </p>
                  
                  <div className="pt-4 flex flex-col gap-3">
                    {selectedNode.status === 'claimable' && selectedNode.rewardType.startsWith('lootbox') ? (
                      <Button 
                        onClick={() => handleOpenLootbox(selectedNode.rewardType)}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-black"
                      >
                        Abrir Cofre
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => {
                          setSelectedNode(null);
                          onNavigate('catalog');
                        }}
                        className="w-full py-4 rounded-2xl"
                      >
                        Comenzar Nivel
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Brawl Stars style Lootbox Opening Overlay */}
        <AnimatePresence>
          {activeBox && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 bg-gradient-to-b from-indigo-950/20 via-zinc-950 to-zinc-950"
            >
              {/* Star Particle Backing */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse"></div>
              </div>

              {/* Items Counter inside Brawl Stars Opening */}
              {boxState === 'revealing' && (
                <div className="absolute top-12 right-12 bg-zinc-900/80 border border-zinc-800 px-6 py-3 rounded-full flex items-center gap-3">
                  <span className="text-sm dark:text-zinc-550 font-bold">Restantes:</span>
                  <span className="text-2xl font-black text-indigo-400 animate-bounce">{remainingItems}</span>
                </div>
              )}

              {/* Lootbox Main Container */}
              <div 
                className="relative flex flex-col items-center justify-center max-w-md w-full p-8 text-center cursor-pointer select-none"
                onClick={handleBoxTap}
              >
                {/* Closed / Shaking state */}
                {boxState === 'closed' && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative flex flex-col items-center"
                  >
                    <div className="w-48 h-48 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 rounded-[2.5rem] shadow-[0_0_50px_rgba(99,102,241,0.4)] border-4 border-white flex items-center justify-center relative">
                      <ShoppingBag size={80} className="text-white drop-shadow-md" />
                      <div className="absolute -bottom-4 bg-white text-zinc-950 text-xs font-black uppercase px-4 py-1.5 rounded-full border-2 border-indigo-600">
                        TOCA PARA ABRIR
                      </div>
                    </div>
                  </motion.div>
                )}

                {boxState === 'shaking' && (
                  <motion.div 
                    animate={{ 
                      x: [-6, 6, -6, 6, 0],
                      y: [-2, 2, -2, 2, 0],
                      rotate: [-3, 3, -3, 3, 0]
                    }}
                    transition={{ duration: 0.25, repeat: 1 }}
                    className="relative flex flex-col items-center"
                  >
                    <div className="w-48 h-48 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 rounded-[2.5rem] shadow-[0_0_60px_rgba(99,102,241,0.6)] border-4 border-white flex items-center justify-center">
                      <ShoppingBag size={80} className="text-white drop-shadow-md" />
                    </div>
                  </motion.div>
                )}

                {/* Bursting state (Flash overlay) */}
                {boxState === 'bursting' && (
                  <motion.div 
                    initial={{ opacity: 1, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 2 }}
                    className="absolute inset-0 bg-white rounded-full blur-2xl z-30"
                  />
                )}

                {/* Revealing Rewards state */}
                {boxState === 'revealing' && currentReward && (
                  <motion.div 
                    key={rewardIndex}
                    initial={{ scale: 0.3, rotate: -15, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="flex flex-col items-center gap-6"
                  >
                    {/* Glowing Aura depending on rarity */}
                    <div className="relative">
                      <div className="absolute inset-0 rounded-[2rem] bg-indigo-500/20 blur-xl animate-pulse"></div>
                      <div className={`w-64 h-80 rounded-[2.5rem] border-4 border-white ${currentReward.color} p-8 flex flex-col items-center justify-between shadow-2xl relative z-10`}>
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                          {currentReward.type === 'coins' ? (
                            <Star size={44} className="text-yellow-400 fill-yellow-400" />
                          ) : currentReward.type === 'gems' ? (
                            <Sparkles size={44} className="text-cyan-400" />
                          ) : currentReward.type === 'skin' ? (
                            <ShoppingBag size={44} className="text-rose-400" />
                          ) : (
                            <Heart size={44} className="text-purple-400 fill-purple-400" />
                          )}
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] tracking-widest uppercase font-black px-3 py-1 rounded-full bg-white/10">
                            {currentReward.rarity}
                          </span>
                          <h4 className="text-2xl font-black text-white leading-tight">{currentReward.name}</h4>
                          {currentReward.amount > 1 && (
                            <p className="text-3xl font-black text-white mt-2">+{currentReward.amount}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-zinc-500 font-bold uppercase tracking-wider text-xs animate-pulse">
                      TOCA PARA CONTINUAR
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
};

export default Adventure;
