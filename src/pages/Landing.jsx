import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gamepad2, Brain, FlaskConical, Shield, BookOpen, Star, ArrowRight, Globe, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../components/ui/SplitText';
import Button from '../components/ui/Button';
import ShineButton from '../components/ui/ShineButton';
import PremiumGameCard from '../components/ui/PremiumGameCard';
import GitHubStarButton from '../components/ui/GitHubStarButton';
import StarsBg from '../components/ui/StarsBg';

gsap.registerPlugin(ScrollTrigger);

const Landing = ({ onNavigate, onLockClick, games = [], theme }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(() => {
    const saved = localStorage.getItem('eduplay_subscribed_email');
    return saved ? 'success' : 'idle';
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus('success');
      localStorage.setItem('eduplay_subscribed_email', email);
    }, 1200);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      // Stagger reveal character entries in Hero Scroll trigger
      tl.to(".panel-1 h1 .split-char", { y: "0%", opacity: 1, stagger: 0.03, ease: "power2.out", duration: 1.5 })
        .to(".panel-1", { opacity: 0, scale: 0.9, duration: 1.2 })
        
        // Panel 2: Showcase Images fly in
        .to(".panel-2", { opacity: 1, pointerEvents: "auto", duration: 1.2 }, "<")
        .from(".hero-img-left", { x: "-100vw", rotation: -45, ease: "power2.out", duration: 1.5 }, "<")
        .from(".hero-img-right", { x: "100vw", rotation: 45, ease: "power2.out", duration: 1.5 }, "<")
        .from(".hero-img-center", { y: "100vh", rotation: 0, ease: "power2.out", duration: 1.5 }, "<")
        
        // Panel 2: Out of view
        .to(".panel-2", { opacity: 0, pointerEvents: "none", duration: 1, delay: 0.5 })
        
        // Panel 3: Stats appear
        .to(".panel-3", { opacity: 1, pointerEvents: "auto", duration: 1.2 }, "<")
        .from(".hero-stat-card", { y: 60, opacity: 0, stagger: 0.2, ease: "back.out(1.7)", duration: 1.2 }, "<")
        
        // Panel 3: Out of view
        .to(".panel-3", { opacity: 0, pointerEvents: "none", duration: 1, delay: 0.5 })
        
        // Panel 4: Final CTA appears
        .to(".panel-4", { opacity: 1, pointerEvents: "auto", duration: 1.2 }, "<")
        .from(".panel-4 h2, .panel-4 p, .panel-4 .flex-container", { y: 40, opacity: 0, stagger: 0.15, ease: "power3.out", duration: 1.2 }, "<");
    });

    return () => ctx.revert();
  }, []);

  const isAppDark = theme === 'dark';

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
      {/* Scroll Container wrapper (400vh height to trigger scroll timeline) */}
      <div className="relative h-[400vh] w-full hero-scroll-container">
        {/* Sticky Stage (pinned container) */}
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-center items-center bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white z-10 transition-colors duration-300">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 via-white to-purple-50/10 dark:from-blue-950/20 dark:via-zinc-950 dark:to-purple-950/20 z-0 pointer-events-none overflow-hidden">
            <StarsBg className="opacity-40 dark:opacity-100" />
          </div>
          
          {/* Panel 1: Title & Eyebrow */}
          <div className="panel-1 absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-650 dark:text-zinc-300 font-bold text-sm shadow-sm mb-6 uppercase tracking-wider transition-colors">
              <Sparkles size={16} className="text-yellow-500"/> Nueva forma de aprender
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] max-w-5xl mb-6 text-zinc-900 dark:text-white">
              <SplitText text="Descubre un" /> <span className="gradient-text bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-400 inline-block"><SplitText text="universo" /></span> <SplitText text="de conocimiento." />
            </h1>
            <p className="text-lg sm:text-xl text-zinc-655 dark:text-zinc-400 max-w-2xl font-medium leading-relaxed transition-colors">
              Plataforma premium de aprendizaje gamificado. Retos diarios, medallas y un catálogo infinito para entrenar tu mente de forma interactiva.
            </p>
          </div>

          {/* Panel 2: Showcase Cards */}
          <div className="panel-2 absolute inset-0 flex justify-center items-center z-10 pointer-events-none opacity-0">
            <div className="relative w-full max-w-6xl h-full flex justify-between items-center px-12">
              <div className="hero-img-left absolute left-10 w-72 h-[340px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-3xl overflow-hidden shadow-2xl rotate-[-12deg] p-6 flex flex-col justify-between transition-colors duration-300">
                <div className="h-40 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 dark:text-blue-400">
                  <Gamepad2 size={56} />
                </div>
                <div className="text-left mt-4">
                  <div className="font-bold text-xl text-zinc-900 dark:text-white">Aventura Matemática</div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Resuelve acertijos matemáticos y sube de nivel.</div>
                </div>
              </div>
              
              <div className="hero-img-center absolute bottom-12 left-1/2 -translate-x-1/2 w-80 h-[360px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-3xl overflow-hidden shadow-2xl p-6 flex flex-col justify-between transition-colors duration-300">
                <div className="h-44 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 dark:text-purple-400">
                  <Brain size={64} />
                </div>
                <div className="text-left mt-4">
                  <div className="font-bold text-xl text-zinc-900 dark:text-white">Memoria Espacial</div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Pon a prueba tu retención visual y memoriza.</div>
                </div>
              </div>

              <div className="hero-img-right absolute right-10 w-72 h-[340px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-3xl overflow-hidden shadow-2xl rotate-[12deg] p-6 flex flex-col justify-between transition-colors duration-300">
                <div className="h-40 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 dark:text-green-400">
                  <FlaskConical size={56} />
                </div>
                <div className="text-left mt-4">
                  <div className="font-bold text-xl text-zinc-900 dark:text-white">Laboratorio Químico</div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Combina elementos en el lab virtual.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 3: Stats */}
          <div className="panel-3 absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10 opacity-0 pointer-events-none">
            <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-zinc-900 dark:text-white">
              Aprendizaje que <span className="gradient-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">engancha.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
              <div className="hero-stat-card bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/60 p-8 rounded-3xl backdrop-blur-sm transition-colors duration-300">
                <div className="text-5xl font-black text-blue-600 dark:text-blue-400 mb-2">+10k</div>
                <div className="font-bold text-zinc-900 dark:text-white text-lg mb-1">Estudiantes Activos</div>
                <div className="text-zinc-500 dark:text-zinc-400 text-sm">Entrenando su mente a diario en todo el mundo.</div>
              </div>
              <div className="hero-stat-card bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/60 p-8 rounded-3xl backdrop-blur-sm transition-colors duration-300">
                <div className="text-5xl font-black text-purple-650 dark:text-purple-400 mb-2">98%</div>
                <div className="font-bold text-zinc-900 dark:text-white text-lg mb-1">Retención Escolar</div>
                <div className="text-zinc-500 dark:text-zinc-400 text-sm">Altamente motivados con rachas y medallas.</div>
              </div>
              <div className="hero-stat-card bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/60 p-8 rounded-3xl backdrop-blur-sm transition-colors duration-300">
                <div className="text-5xl font-black text-cyan-600 dark:text-cyan-400 mb-2">+50</div>
                <div className="font-bold text-zinc-900 dark:text-white text-lg mb-1">Juegos Premium</div>
                <div className="text-zinc-500 dark:text-zinc-400 text-sm">Desarrollados por pedagogos y diseñadores.</div>
              </div>
            </div>
          </div>

          {/* Panel 4: Final CTA */}
          <div className="panel-4 absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10 opacity-0 pointer-events-none">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-zinc-900 dark:text-white">¿Listo para la aventura?</h2>
            <p className="text-lg md:text-xl text-zinc-650 dark:text-zinc-400 mb-8 max-w-2xl">
              Únete hoy a la comunidad educativa líder. Demostrativo disponible o regístrate para obtener novedades.
            </p>
            <div className="flex-container w-full max-w-lg z-20 pointer-events-auto">
              {status === 'success' ? (
                <motion.div 
                  className="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/50 text-green-800 dark:text-green-200 p-6 rounded-3xl w-full shadow-lg text-center"
                >
                  <CheckCircle2 className="mx-auto text-green-500 dark:text-green-400 mb-3" size={32} />
                  <h3 className="font-extrabold text-xl mb-1">¡Suscrito con éxito!</h3>
                  <p className="text-sm font-medium text-green-600 dark:text-green-300 mb-4">Te enviaremos actualizaciones cuando lancemos más contenido.</p>
                  <div className="flex gap-3">
                    <Button size="md" onClick={() => onNavigate('catalog')} className="flex-1 shadow-green-500/10">Probar Juegos Demo <Play size={16} className="ml-1"/></Button>
                    <Button variant="secondary" size="md" onClick={() => onNavigate('dashboard')} className="bg-zinc-800 dark:bg-zinc-700 text-white border-zinc-700 hover:bg-zinc-700 dark:hover:bg-zinc-600 flex-1">Dashboard</Button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full bg-white dark:bg-zinc-900/80 backdrop-blur-md p-2 rounded-[22px] border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-300">
                  <input 
                    type="email" 
                    required 
                    placeholder="Correo de papá, mamá o profesor..." 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent px-5 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 font-semibold focus:outline-none text-sm sm:text-base"
                    disabled={loading}
                  />
                  <Button type="submit" disabled={loading} className="py-3 px-6 shadow-blue-500/10 whitespace-nowrap text-sm sm:text-base rounded-2xl">
                    {loading ? 'Registrando...' : 'Unirse a la lista'}
                  </Button>
                </form>
              )}
              <div className="flex justify-center gap-6 mt-4">
                <ShineButton onClick={() => onNavigate('catalog')} className="text-sm">
                  Probar Demo Gratuita
                </ShineButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-zinc-900 dark:text-white">Aprendizaje que <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">engancha.</span></h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-xl font-medium">Diseñado con principios de ciencias cognitivas para mantener la motivación al máximo nivel.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Gamificación Real", desc: "No solo puntos. Una economía de XP real, niveles, rachas y recompensas que importan.", icon: Gamepad2, color: "text-purple-500 dark:text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
              { title: "Seguimiento Detallado", desc: "Panel para padres y profesores con métricas de precisión, tiempo y áreas de mejora.", icon: Shield, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
              { title: "Contenido Premium", desc: "Juegos desarrollados por educadores, abarcando desde matemáticas hasta lógica computacional.", icon: BookOpen, color: "text-green-500 dark:text-green-400", bg: "bg-green-500/10 border-green-500/20" }
            ].map((b, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 p-10 rounded-[2rem] backdrop-blur-sm relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300">
                <div className={`absolute top-0 right-0 w-32 h-32 ${b.bg} rounded-full blur-3xl -mr-10 -mt-10 transition-opacity opacity-50 group-hover:opacity-100`}></div>
                <div className={`w-14 h-14 rounded-2xl ${b.bg} flex items-center justify-center mb-8`}>
                  <b.icon size={28} className={b.color}/>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">{b.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-6 lg:px-8 py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Explora por Categorías</h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium">Aprende lo que más te apasiona.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Matemáticas", icon: Zap, color: "text-blue-500", bg: "bg-blue-50 hover:bg-blue-100/80 dark:bg-blue-950/10 dark:hover:bg-blue-950/20" },
              { name: "Ciencias", icon: FlaskConical, color: "text-green-500", bg: "bg-green-50 hover:bg-green-100/80 dark:bg-green-950/10 dark:hover:bg-green-950/20" },
              { name: "Lectura", icon: BookOpen, color: "text-red-500", bg: "bg-red-50 hover:bg-red-100/80 dark:bg-red-950/10 dark:hover:bg-red-950/20" },
              { name: "Lógica", icon: Brain, color: "text-purple-500", bg: "bg-purple-50 hover:bg-purple-100/80 dark:bg-purple-950/10 dark:hover:bg-purple-950/20" }
            ].map((cat, i) => (
              <div key={i} onClick={() => onNavigate('catalog')} className={`cursor-pointer rounded-[2rem] p-8 text-center transition-colors duration-300 ${cat.bg}`}>
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center mb-4 shadow-sm ${cat.color}`}>
                  <cat.icon size={32} />
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="px-6 lg:px-8 py-32 bg-zinc-50 dark:bg-zinc-900/40 text-zinc-900 dark:text-white relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 text-center md:text-left">
            <div>
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Juegos Destacados</h2>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium">Empieza tu aventura con los favoritos.</p>
            </div>
            <Button variant="secondary" onClick={() => onNavigate('catalog')} className="gap-2">Ver todo el catálogo <ArrowRight size={18}/></Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.slice(0, 3).map((game, i) => (
              <motion.div key={game.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <PremiumGameCard {...game} isDark={isAppDark} onClick={() => game.locked ? onLockClick(game) : onNavigate('game', { gameId: game.id })} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-zinc-950 px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Lo que dicen de nosotros</h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium">Familias y educadores que ya disfrutan EduPlay.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "Mi hijo por fin disfruta practicar matemáticas. ¡La gamificación hace toda la diferencia!", author: "María P.", role: "Madre" },
              { text: "Excelente herramienta para asignar retos adicionales en clase. Muy intuitiva.", author: "Carlos R.", role: "Profesor" },
              { text: "Me encanta ganar insignias cada vez que completo los retos de ciencia.", author: "Sofi (10 años)", role: "Estudiante" }
            ].map((test, i) => (
              <div key={i} className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
                <div className="flex text-yellow-400 mb-4">
                  {[1,2,3,4,5].map(star => <Star key={star} size={20} fill="currentColor" />)}
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 italic mb-6">"{test.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">{test.author[0]}</div>
                  <div>
                    <div className="font-bold text-zinc-900 dark:text-white">{test.author}</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">{test.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parents/Teachers CTA */}
      <section className="py-24 bg-blue-600 px-6 lg:px-8 text-center overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 rounded-full blur-[80px] opacity-50 mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[80px] opacity-50 mix-blend-screen"></div>
        
        <div className="max-w-3xl mx-auto relative z-10 text-white">
          <Shield size={64} className="mx-auto mb-8 text-blue-200" />
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">¿Eres padre o profesor?</h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed font-medium">
            Descubre nuestro panel de control. Haz seguimiento del progreso, detecta áreas de mejora y asigna retos personalizados en tiempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ShineButton onClick={() => onNavigate('parents')} className="bg-white text-blue-600 hover:bg-zinc-50">
              Ir al Panel de Control
            </ShineButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-20 pb-10 px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6 text-zinc-900 dark:text-white">
                <Gamepad2 size={28} className="text-blue-600"/> <span className="font-extrabold text-2xl tracking-tight">EduPlay</span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-sm mb-6">El portal donde la educación y la diversión convergen para crear la mejor experiencia de aprendizaje.</p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Plataforma</h4>
              <ul className="space-y-4 text-zinc-500 dark:text-zinc-400 font-medium flex flex-col items-start">
                <li><button onClick={() => onNavigate('catalog')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Juegos</button></li>
                <li><button onClick={() => onNavigate('parents')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Padres</button></li>
                <li><button onClick={() => onNavigate('pricing')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Precios</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Legal</h4>
              <ul className="space-y-4 text-zinc-500 dark:text-zinc-400 font-medium">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contacto</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-400 dark:text-zinc-500 font-medium">
            <p>© 2026 EduPlay Inc. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <GitHubStarButton />
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"><Globe size={18}/></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
