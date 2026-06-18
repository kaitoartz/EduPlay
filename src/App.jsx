import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, BookOpen, FlaskConical, Shield, Globe, XCircle, Lock } from 'lucide-react';
import './styles/main.css';

// Data
import { MOCK_GAMES, parseApiResponsePayload } from './data/mockData';

// UI Components
import Button from './components/ui/Button';
import AstronautLoader from './components/ui/AstronautLoader';

// Layout Components
import Navbar from './components/Navbar';
import ModalWaitlistForm from './components/ModalWaitlistForm';

// Page Views
import Landing from './pages/Landing';
import Catalog from './pages/Catalog';
import Dashboard from './pages/Dashboard';
import QuizGame from './pages/QuizGame';
import ParentsPanel from './pages/ParentsPanel';
import ProfilePanel from './pages/ProfilePanel';
import PricingPanel from './pages/PricingPanel';

const App = () => {
  const [view, setView] = useState('landing');
  const [params, setParams] = useState({});
  const [lockedGame, setLockedGame] = useState(null);
  const [appLoading, setAppLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  
  // Estado de Tema Día / Noche (Tema Día/Light es por defecto)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('eduplay_theme');
    return saved || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('eduplay_theme', theme);
  }, [theme]);

  // Estado del Usuario (Caché del navegador)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('eduplay_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error al cargar perfil, reiniciando al invitado", e);
      }
    }
    return {
      name: "Aventurero",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aventurero&backgroundColor=ffdfbf",
      level: 1,
      xp: 0,
      nextLevelXp: 100,
      streak: 1,
      completedChallenges: 0,
      badges: [
        { id: 1, name: "Matemático Veloz", color: "text-yellow-500", bg: "bg-yellow-100" }
      ]
    };
  });

  const saveUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('eduplay_user', JSON.stringify(updatedUser));
  };

  const addXp = (amount) => {
    let newXp = user.xp + amount;
    let newLevel = user.level;
    let newNextLevelXp = user.nextLevelXp;

    while (newXp >= newNextLevelXp) {
      newXp -= newNextLevelXp;
      newLevel += 1;
      newNextLevelXp = newLevel * 200; // Incremento progresivo de XP requerida
    }

    let newBadges = [...(user.badges || [])];
    if (newLevel >= 2 && !newBadges.some(b => b.id === 4)) {
      newBadges.push({ id: 4, name: "Super Aprendiz", color: "text-purple-500", bg: "bg-purple-100" });
    }
    if (newLevel >= 5 && !newBadges.some(b => b.id === 5)) {
      newBadges.push({ id: 5, name: "Héroe Educativo", color: "text-amber-500", bg: "bg-amber-100" });
    }

    const updated = {
      ...user,
      xp: newXp,
      level: newLevel,
      nextLevelXp: newNextLevelXp,
      completedChallenges: (user.completedChallenges || 0) + 1,
      badges: newBadges
    };
    saveUser(updated);
  };

  // Estado de la API
  const [apiUrl, setApiUrl] = useState(() => localStorage.getItem('eduplay_api_url') || '');
  const [inputUrl, setInputUrl] = useState(() => localStorage.getItem('eduplay_api_url') || '');
  const [apiStatus, setApiStatus] = useState('disconnected'); // 'disconnected' | 'connecting' | 'connected'
  const [games, setGames] = useState(MOCK_GAMES);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navigate = (newView, newParams = {}) => {
    setPageLoading(true);
    
    // Check connection speed
    const connection = navigator.connection;
    const isSlow = connection && (connection.saveData || ['slow-2g', '2g', '3g'].includes(connection.effectiveType));
    const delay = isSlow ? 1600 : 900; // Premium astronaut delay

    setTimeout(() => {
      setParams(newParams);
      setView(newView);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setPageLoading(false);
    }, delay);
  };

  // Función para conectar y cargar juegos de la API
  const loadApiGames = async (urlToTest) => {
    if (!urlToTest) {
      setGames(MOCK_GAMES);
      setApiStatus('disconnected');
      return false;
    }

    setApiStatus('connecting');
    
    // Limpiar URL y agregar protocolo si falta
    let cleanUrl = urlToTest.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = 'http://' + cleanUrl;
    }

    try {
      // Remover diagonal final si la tiene
      cleanUrl = cleanUrl.replace(/\/$/, "");
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

      const res = await fetch(`${cleanUrl}/juegos`, { 
        mode: 'cors',
        headers: {
          "ngrok-skip-browser-warning": "true"
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error("Error en respuesta del servidor");
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = parseApiResponsePayload(text);
      }
      if (!Array.isArray(data)) throw new Error("Formato de datos inesperado");

      const apiGamesMapped = data.map((g, index) => {
        const title = g.titulo || g.title || `Juego ${index + 1}`;
        const normalizedTitle = title.toLowerCase();
        const subject = normalizedTitle.includes('matem') ? 'Matemáticas'
          : normalizedTitle.includes('letras') ? 'Lectura'
          : normalizedTitle.includes('ciencia') || normalizedTitle.includes('explorador') ? 'Ciencias'
          : 'General';
        const icon = normalizedTitle.includes('matem') ? Zap
          : normalizedTitle.includes('letras') ? BookOpen
          : normalizedTitle.includes('ciencia') || normalizedTitle.includes('explorador') ? FlaskConical
          : Shield;

        return {
          id: `api-${g.id ?? index}`,
          title,
          subject,
          level: 'Todas',
          duration: g.duracion || '5 min',
          points: g.puntos ?? 100,
          color: subject === 'Matemáticas' ? 'from-blue-500 to-cyan-400' : subject === 'Lectura' ? 'from-red-500 to-pink-400' : 'from-green-500 to-emerald-400',
          bg: subject === 'Matemáticas' ? 'bg-blue-50' : subject === 'Lectura' ? 'bg-red-50' : 'bg-green-50',
          icon,
          image: g.imagen || g.image,
          description: g.descripcion || g.description || 'Explora este juego educativo.',
          isApi: true
        };
      });

      setGames([...apiGamesMapped, ...MOCK_GAMES]);
      setApiStatus('connected');
      return true;
    } catch (err) {
      console.error("Error al conectar con la API:", err);
      setGames(MOCK_GAMES);
      setApiStatus('disconnected');
      return false;
    }
  };

  // Intentar cargar al iniciar si hay una URL guardada
  useEffect(() => {
    const init = async () => {
      const start = performance.now();
      if (apiUrl) {
        await loadApiGames(apiUrl);
      }
      const end = performance.now();
      const loadTime = end - start;
      // Buffer dynamically adjusted to load speed (min 1500ms)
      const buffer = Math.max(1500, loadTime + 200);
      setTimeout(() => setAppLoading(false), buffer);
    };
    init();
  }, [apiUrl]);

  const handleTestConnection = async () => {
    await loadApiGames(inputUrl);
  };

  const handleSaveSettings = async () => {
    await loadApiGames(inputUrl);
    localStorage.setItem('eduplay_api_url', inputUrl.trim());
    setApiUrl(inputUrl.trim());
    setIsSettingsOpen(false);
  };

  const views = {
    landing: <Landing onNavigate={navigate} onLockClick={setLockedGame} games={games} theme={theme} />,
    catalog: <Catalog onNavigate={navigate} onLockClick={setLockedGame} games={games} theme={theme} />,
    dashboard: <Dashboard onNavigate={navigate} user={user} />,
    game: <QuizGame onNavigate={navigate} onAddXp={addXp} gameId={params.gameId} />,
    parents: <ParentsPanel onNavigate={navigate} />,
    profile: <ProfilePanel onNavigate={navigate} user={user} onSaveUser={saveUser} />,
    pricing: <PricingPanel onNavigate={navigate} />
  };

  if (appLoading) {
    return <AstronautLoader text="Iniciando Sistemas de Navegación..." />;
  }

  return (
    <div className="w-full min-h-screen relative font-sans text-zinc-900 dark:text-white selection:bg-blue-200 dark:selection:bg-blue-800">
      <Navbar 
        currentView={view} 
        onNavigate={navigate} 
        apiStatus={apiStatus} 
        theme={theme}
        onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        onOpenSettings={() => {
          setInputUrl(apiUrl);
          setIsSettingsOpen(true);
        }} 
      />
      
      <AnimatePresence mode="wait">
        {pageLoading ? (
          <motion.div
            key="page-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
          >
            <AstronautLoader text="Viajando por el espacio..." />
          </motion.div>
        ) : (
          <motion.div key={view} initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, filter: 'blur(10px)' }} transition={{ duration: 0.4 }}>
            {views[view]}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Configuración de API */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
            style={{ zIndex: 100 }}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white rounded-[2.5rem] border border-zinc-100 p-8 md:p-10 w-full max-w-lg shadow-2xl relative"
            >
              <button 
                onClick={() => setIsSettingsOpen(false)} 
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 flex items-center justify-center transition-colors"
              >
                <XCircle size={20} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-zinc-900">Configuración de API</h3>
                  <p className="text-sm text-zinc-500 font-medium">Conecta el portal con el servidor FastAPI local</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2">URL del Túnel Ngrok / Localhost</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={inputUrl} 
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="https://xxxx-xxxx.ngrok-free.app" 
                      className="w-full px-5 py-4 rounded-2xl border-2 border-zinc-200 focus:border-blue-500 focus:outline-none font-medium transition-colors text-base"
                    />
                  </div>
                  <p className="text-xs text-zinc-400 mt-2 font-medium">Pega la URL pública generada por Ngrok (ej: `ngrok http 8000`).</p>
                </div>

                {/* Detalles de Estado de Conexión */}
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-zinc-500">Estado de Conexión:</span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${apiStatus === 'connected' ? 'bg-green-100 text-green-700' : apiStatus === 'connecting' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {apiStatus === 'connected' ? 'Conectado' : apiStatus === 'connecting' ? 'Probando...' : 'Desconectado'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                    {apiStatus === 'connected' 
                      ? '¡Excelente! Los juegos de la API han sido cargados e integrados al catálogo con éxito.' 
                      : apiStatus === 'connecting' 
                      ? 'Intentando contactar al servidor...' 
                      : 'Utilizando juegos locales (MOCK_GAMES) como respaldo por defecto.'}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="secondary" 
                    onClick={handleTestConnection}
                    className="flex-1 py-4"
                    disabled={apiStatus === 'connecting'}
                  >
                    Probar Conexión
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleSaveSettings}
                    className="flex-1 py-4 shadow-blue-500/20"
                    disabled={apiStatus === 'connecting'}
                  >
                    Guardar y Cerrar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Juego Bloqueado / Waitlist */}
      <AnimatePresence>
        {lockedGame && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
            style={{ zIndex: 110 }}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] border border-zinc-100 p-8 md:p-10 w-full max-w-lg shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/10 to-purple-500/10 rounded-full blur-[40px] -z-0"></div>
              
              <button 
                onClick={() => setLockedGame(null)} 
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 flex items-center justify-center transition-colors"
              >
                <XCircle size={20} />
              </button>

              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                  <Lock size={32} />
                </div>
                
                <h3 className="text-3xl font-black text-zinc-900 mb-2">¡Próximamente en EduPlay Pro!</h3>
                <p className="text-zinc-650 font-medium text-base mb-6">
                  El juego <strong className="text-zinc-950 font-bold">"{lockedGame.title}"</strong> y más de 30 aventuras interactivas avanzadas estarán disponibles muy pronto en nuestra versión completa.
                </p>

                <ModalWaitlistForm gameTitle={lockedGame.title} onFinish={() => setLockedGame(null)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;