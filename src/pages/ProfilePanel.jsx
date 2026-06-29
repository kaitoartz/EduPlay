import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Star, Zap, Award, BookOpen, FlaskConical, Compass, Shirt, Heart, Layers, Lock, Calendar } from 'lucide-react';
import Button from '../components/ui/Button';
import PageSkeleton from '../components/ui/PageSkeleton';

const OUTFITS = [
  { id: 'standard', name: 'Traje Estándar', rarity: 'Común', unlocked: true, color: 'border-zinc-800 bg-zinc-900/40', text: 'text-zinc-400', image: 'https://api.dicebear.com/7.x/bottts/svg?seed=standard&backgroundColor=141923' },
  { id: 'titanium', name: 'Casco de Titanio', rarity: 'Raro', unlocked: true, color: 'border-cyan-500/30 bg-cyan-950/15', text: 'text-cyan-400', image: 'https://api.dicebear.com/7.x/bottts/svg?seed=titanium&backgroundColor=141923' },
  { id: 'halloween', name: 'Aspecto de Halloween', rarity: 'Festivo', unlocked: false, color: 'border-orange-500/30 bg-orange-950/15', text: 'text-orange-400', image: 'https://api.dicebear.com/7.x/bottts/svg?seed=halloween&backgroundColor=f97316', holiday: 'Halloween' },
  { id: 'christmas', name: 'Aspecto de Navidad', rarity: 'Festivo', unlocked: false, color: 'border-blue-500/30 bg-blue-950/15', text: 'text-blue-400', image: 'https://api.dicebear.com/7.x/bottts/svg?seed=christmas&backgroundColor=3b82f6', holiday: 'Navidad' },
  { id: 'gold', name: 'Armadura Dorada', rarity: 'Legendario', unlocked: false, color: 'border-yellow-500/30 bg-yellow-950/15', text: 'text-yellow-450', image: 'https://api.dicebear.com/7.x/bottts/svg?seed=gold&backgroundColor=eab308' }
];

const PETS = [
  { id: 'none', name: 'Sin Mascota', rarity: 'Común', unlocked: true, color: 'border-zinc-800 bg-zinc-900/40', text: 'text-zinc-400', image: '' },
  { id: 'robo', name: 'Robo-Copiloto', rarity: 'Raro', unlocked: true, color: 'border-cyan-500/30 bg-cyan-950/15', text: 'text-cyan-400', image: 'https://api.dicebear.com/7.x/bottts/svg?seed=Robo&backgroundColor=141923' },
  { id: 'phoenix', name: 'Fénix Estelar', rarity: 'Legendario', unlocked: false, color: 'border-purple-500/30 bg-purple-950/15', text: 'text-purple-400', image: 'https://api.dicebear.com/7.x/bottts/svg?seed=Phoenix&backgroundColor=141923' }
];

const CARDS = [
  { id: 'card1', title: 'Carta: Aritmética Espacial', category: 'Matemáticas', rarity: 'Común', desc: 'Suma estelar a velocidad de luz.', color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20' },
  { id: 'card2', title: 'Carta: Gravedad Cero', category: 'Ciencias', rarity: 'Raro', desc: 'Dominio de leyes físicas en órbita.', color: 'from-purple-500/10 to-pink-500/10 border-purple-500/20' }
];

const ProfilePanel = ({ onNavigate, user, onSaveUser, isLoading }) => {
  if (isLoading) {
    return <PageSkeleton view="profile" />;
  }
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [avatarSeed, setAvatarSeed] = useState(() => {
    const match = user.avatar.match(/seed=([^&]+)/);
    return match ? match[1] : user.name;
  });
  const [avatarBg, setAvatarBg] = useState(() => {
    const match = user.avatar.match(/backgroundColor=([^&]+)/);
    return match ? match[1] : 'ffdfbf';
  });

  // Gamification tab selection
  const [activeSubTab, setActiveSubTab] = useState('outfits'); // 'outfits' | 'pets' | 'cards'
  
  // Customization selection state
  const [selectedOutfit, setSelectedOutfit] = useState(() => localStorage.getItem('ep_selected_outfit') || 'standard');
  const [selectedPet, setSelectedPet] = useState(() => localStorage.getItem('ep_selected_pet') || 'none');

  const PRESET_BG = [
    { label: "Naranja", value: "ffdfbf", color: "bg-[#ffdfbf]" },
    { label: "Celeste", value: "b6e3f4", color: "bg-[#b6e3f4]" },
    { label: "Morado", value: "c0aede", color: "bg-[#c0aede]" },
    { label: "Cian", value: "d1f4ff", color: "bg-[#d1f4ff]" },
    { label: "Rosado", value: "ffd5dc", color: "bg-[#ffd5dc]" }
  ];

  const previewAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}&backgroundColor=${avatarBg}`;

  const handleRandomize = () => {
    const randomWords = ["Leo", "Mia", "Paco", "Lola", "Gatito", "Panda", "Zorro", "Sparky", "Nacho", "Sofi", "Max", "Luna", "Astro", "Rayo", "Coco"];
    const random = randomWords[Math.floor(Math.random() * randomWords.length)] + Math.floor(Math.random() * 100);
    setAvatarSeed(random);
  };

  const handleSave = () => {
    onSaveUser({
      ...user,
      name: name.trim() || user.name,
      avatar: previewAvatar
    });
    setIsEditing(false);
  };

  const handleOutfitSelect = (outfitId) => {
    setSelectedOutfit(outfitId);
    localStorage.setItem('ep_selected_outfit', outfitId);
    const outfit = OUTFITS.find(o => o.id === outfitId);
    if (outfit) {
      onSaveUser({
        ...user,
        avatar: outfit.image
      });
    }
  };

  const handlePetSelect = (petId) => {
    setSelectedPet(petId);
    localStorage.setItem('ep_selected_pet', petId);
  };

  const activePetInfo = PETS.find(p => p.id === selectedPet);

  return (
    <div className="min-h-screen pt-32 px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white pb-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-12">
        {isEditing ? (
          <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row gap-10 relative overflow-hidden w-full">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-blue-500/10 to-purple-500/10 rounded-full blur-[80px] -z-0 pointer-events-none"></div>
            <div className="flex flex-col items-center gap-4 flex-shrink-0 z-10">
              <div className="w-40 h-40 bg-zinc-50 dark:bg-zinc-850 rounded-[2.5rem] border-[6px] border-white dark:border-zinc-800 shadow-xl overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                <img src={previewAvatar} alt="Preview Avatar" className="w-full h-full object-cover" />
              </div>
              <Button variant="secondary" size="sm" onClick={handleRandomize} className="rounded-xl flex items-center gap-1 shadow-sm">
                <Sparkles size={14} className="text-yellow-500"/> Aleatorio
              </Button>
            </div>
            
            <div className="flex-grow space-y-6 z-10 w-full">
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Tu Nombre de Aventurero</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="SuperPanda99" 
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none font-medium transition-colors text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Semilla de Avatar (Escribe palabras para cambiarlo)</label>
                <input 
                  type="text" 
                  value={avatarSeed} 
                  onChange={(e) => setAvatarSeed(e.target.value)}
                  placeholder="seed" 
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none font-medium transition-colors text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Color de Fondo</label>
                <div className="flex gap-3 mt-1">
                  {PRESET_BG.map(bg => (
                    <button 
                      key={bg.value} 
                      onClick={() => setAvatarBg(bg.value)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${bg.color} ${avatarBg === bg.value ? 'border-zinc-850 scale-110 shadow-md' : 'border-white dark:border-zinc-800 hover:scale-105'}`}
                      title={bg.label}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <Button variant="secondary" onClick={() => setIsEditing(false)} className="px-6 py-3.5 rounded-2xl">Cancelar</Button>
                <Button variant="primary" onClick={handleSave} className="flex-1 py-3.5 rounded-2xl shadow-blue-500/20">Guardar Cambios</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-blue-500/10 to-purple-500/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
            
            {/* Avatar & Pet Side Display */}
            <div className="relative flex flex-col items-center">
              <div className="relative z-10 w-40 h-40 bg-orange-100 dark:bg-zinc-850 rounded-[2.5rem] border-[6px] border-white dark:border-zinc-800 shadow-xl overflow-hidden flex-shrink-0 rotate-3">
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              
              {/* Floating Pet Companion Display */}
              {activePetInfo && activePetInfo.id !== 'none' && (
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="absolute -bottom-4 -right-4 w-16 h-16 bg-zinc-800 border-2 border-indigo-500 rounded-2xl p-1 shadow-lg z-20 overflow-hidden"
                >
                  <img src={activePetInfo.image} alt={activePetInfo.name} className="w-full h-full object-contain" />
                </motion.div>
              )}
            </div>

            <div className="relative z-10 flex-grow text-center md:text-left">
              <h2 className="text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">{user.name}</h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400 font-bold text-sm border border-yellow-250 dark:border-yellow-900/30"><Trophy size={18}/> Nivel {user.level}</span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 font-bold text-sm border border-blue-250 dark:border-blue-900/30"><Star size={18}/> {user.xp} XP</span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 font-bold text-sm border border-orange-250 dark:border-orange-900/30"><Zap size={18}/> Racha {user.streak} días</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3 mb-3 shadow-inner">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full" style={{width: `${(user.xp / user.nextLevelXp) * 100}%`}}></div>
              </div>
              <p className="text-sm font-bold text-zinc-450 dark:text-zinc-550 text-right uppercase tracking-wider">{user.nextLevelXp - user.xp} XP para subir de nivel</p>
            </div>
            <div className="relative z-10">
              <Button className="rounded-2xl shadow-md" onClick={() => setIsEditing(true)}>Editar Perfil</Button>
            </div>
          </div>
        )}

        {/* Customization & Inventory Section (Gamification Board) */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6 gap-6">
            <button 
              onClick={() => setActiveSubTab('outfits')}
              className={`flex items-center gap-2 pb-2 text-base font-black transition-colors ${activeSubTab === 'outfits' ? 'border-b-2 border-indigo-500 text-indigo-500 dark:text-white' : 'text-zinc-400 hover:text-zinc-650'}`}
            >
              <Shirt size={18} /> Trajes
            </button>
            <button 
              onClick={() => setActiveSubTab('pets')}
              className={`flex items-center gap-2 pb-2 text-base font-black transition-colors ${activeSubTab === 'pets' ? 'border-b-2 border-indigo-500 text-indigo-500 dark:text-white' : 'text-zinc-400 hover:text-zinc-650'}`}
            >
              <Heart size={18} /> Mascotas
            </button>
            <button 
              onClick={() => setActiveSubTab('cards')}
              className={`flex items-center gap-2 pb-2 text-base font-black transition-colors ${activeSubTab === 'cards' ? 'border-b-2 border-indigo-500 text-indigo-500 dark:text-white' : 'text-zinc-400 hover:text-zinc-650'}`}
            >
              <Layers size={18} /> Cartas
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeSubTab === 'outfits' && (
              <motion.div 
                key="outfits"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-2 md:grid-cols-5 gap-4"
              >
                {OUTFITS.map(outfit => {
                  const isSelected = selectedOutfit === outfit.id;
                  return (
                    <div 
                      key={outfit.id}
                      onClick={() => outfit.unlocked && handleOutfitSelect(outfit.id)}
                      className={`relative rounded-3xl border-2 p-4 flex flex-col items-center justify-between text-center transition-all ${
                        outfit.unlocked ? 'cursor-pointer hover:scale-102 hover:shadow-md' : 'opacity-60 cursor-not-allowed'
                      } ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-500/20' : outfit.color}`}
                    >
                      <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700/50 flex items-center justify-center relative overflow-hidden mb-3">
                        <img src={outfit.image} alt={outfit.name} className="w-full h-full object-cover" />
                        {!outfit.unlocked && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                            <Lock size={16} />
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-zinc-800 dark:text-white leading-tight">{outfit.name}</h4>
                        <span className={`text-[10px] uppercase font-black tracking-widest ${outfit.text}`}>
                          {outfit.rarity}
                        </span>
                      </div>

                      {/* Holiday Badge */}
                      {outfit.holiday && (
                        <div className="absolute top-2 right-2 text-orange-500" title={`Especial de ${outfit.holiday}`}>
                          <Calendar size={14} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            )}

            {activeSubTab === 'pets' && (
              <motion.div 
                key="pets"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {PETS.map(pet => {
                  const isSelected = selectedPet === pet.id;
                  return (
                    <div 
                      key={pet.id}
                      onClick={() => pet.unlocked && handlePetSelect(pet.id)}
                      className={`relative rounded-3xl border-2 p-4 flex flex-col items-center justify-between text-center transition-all ${
                        pet.unlocked ? 'cursor-pointer hover:scale-102 hover:shadow-md' : 'opacity-60 cursor-not-allowed'
                      } ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-500/20' : pet.color}`}
                    >
                      <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700/50 flex items-center justify-center relative overflow-hidden mb-3">
                        {pet.id !== 'none' ? (
                          <img src={pet.image} alt={pet.name} className="w-full h-full object-contain" />
                        ) : (
                          <X size={24} className="text-zinc-500" />
                        )}
                        {!pet.unlocked && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                            <Lock size={16} />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-zinc-800 dark:text-white leading-tight">{pet.name}</h4>
                        <span className={`text-[10px] uppercase font-black tracking-widest ${pet.text}`}>
                          {pet.rarity}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {activeSubTab === 'cards' && (
              <motion.div 
                key="cards"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid md:grid-cols-2 gap-4"
              >
                {CARDS.map(card => (
                  <div key={card.id} className={`rounded-3xl border-2 p-6 bg-gradient-to-br ${card.color} flex flex-col justify-between shadow-sm relative overflow-hidden`}>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-lg">
                          {card.category}
                        </span>
                        <span className="text-xs text-zinc-400 font-bold">
                          {card.rarity}
                        </span>
                      </div>
                      <h4 className="text-xl font-black text-zinc-850 dark:text-white">{card.title}</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-550 leading-relaxed font-medium">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Existing Badges Section */}
        <div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3"><Award className="text-purple-500" size={28}/> Insignias Desbloqueadas</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {user.badges && user.badges.map(b => {
              const BadgeIcon = b.name.includes("Matem") ? Zap : b.name.includes("Lector") ? BookOpen : b.name.includes("Cient") ? FlaskConical : b.name.includes("Aprendiz") ? Award : Trophy;
              return (
                <motion.div key={b.id} whileHover={{y:-8, scale: 1.02}} className={`${b.bg} dark:bg-zinc-150/40 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center cursor-pointer border border-white/50 dark:border-zinc-200 shadow-sm hover:shadow-lg transition-all`}>
                  <BadgeIcon size={40} className={`${b.color} mb-4`} />
                  <span className={`font-bold text-base ${b.color}`}>{b.name}</span>
                </motion.div>
              );
            })}
            <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center border-2 border-zinc-200 dark:border-zinc-800 border-dashed opacity-60">
              <Compass size={40} className="text-zinc-400 mb-4" />
              <span className="font-bold text-base text-zinc-500">Bloqueado</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePanel;
