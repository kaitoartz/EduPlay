import { Zap, BookOpen, FlaskConical, Brain, Code, Globe, Shield } from 'lucide-react';

export const MOCK_USER = {
  name: "Leo",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo&backgroundColor=ffdfbf",
  level: 12,
  xp: 4500,
  nextLevelXp: 5000,
  streak: 5,
  completedChallenges: 34,
  badges: [
    { id: 1, name: "Matemático Veloz", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-100" },
    { id: 2, name: "Lector Curioso", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-100" },
    { id: 3, name: "Científico Loco", icon: FlaskConical, color: "text-green-500", bg: "bg-green-100" }
  ]
};

export const MOCK_GAMES = [
  { id: "g1", title: "Aventura Matemática", subject: "Matemáticas", level: "8-10", duration: "10 min", points: 150, color: "from-blue-500 to-cyan-400", bg: "bg-blue-50", icon: Zap, image: "g1", description: "Resuelve acertijos matemáticos y sube de nivel entrenando tu cerebro.", tag: "Nuevo" },
  { id: "g2", title: "Memoria Espacial", subject: "Memoria", level: "5-7", duration: "5 min", points: 100, color: "from-purple-500 to-pink-400", bg: "bg-purple-50", icon: Brain, image: "g2", description: "Pon a prueba tu retención visual y memoriza los patrones en el espacio.", tag: "Trending" },
  { id: "g3", title: "Laboratorio Químico", subject: "Ciencias", level: "11-13", duration: "15 min", points: 200, color: "from-green-500 to-emerald-400", bg: "bg-green-50", icon: FlaskConical, image: "g3", description: "Combina elementos y experimenta en nuestro laboratorio virtual interactivo.", locked: true },
  { id: "g4", title: "Lógica de Bloques", subject: "Programación", level: "11-13", duration: "20 min", points: 250, color: "from-orange-500 to-yellow-400", bg: "bg-orange-50", icon: Code, image: "g4", description: "Aprende las bases de la programación ordenando bloques de código lógico.", locked: true },
  { id: "g5", title: "Palabras Mágicas", subject: "Lectura", level: "5-7", duration: "10 min", points: 120, color: "from-red-500 to-rose-400", bg: "bg-red-50", icon: BookOpen, image: "g5", description: "Completa oraciones y expande tu vocabulario de forma divertida.", tag: "Early Access" },
  { id: "g6", title: "Safari en Inglés", subject: "Inglés", level: "8-10", duration: "15 min", points: 180, color: "from-indigo-500 to-violet-400", bg: "bg-indigo-50", icon: Globe, image: "g6", description: "Explora la sabana y aprende los nombres de los animales en inglés." },
  { id: "g7", title: "Defensa de la Tierra", subject: "Ecología", level: "8-10", duration: "12 min", points: 160, color: "from-emerald-500 to-teal-400", bg: "bg-emerald-50", icon: Shield, image: "crehabitat_thumb.jpg", description: "Protege los hábitats de la Tierra y aprende a reciclar salvando especies.", locked: true }
];

export const PREVIEW_IMAGES = {
  "g1": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnBub3J5MTV1dTA2c3kzeHJ6azIwYXdoaXRlMjNjZmdpMnpiaGU3diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/71fMwwGrFRszyoHhUy/giphy_s.gif",
  "g2": "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2Q5MnNrY3Vxc3VkNGk3NXA5M21ubHhvbjJuazJ3enFqdHpuamNwcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f0Dy5NDc1jBzpcbff9/giphy_s.gif",
  "g3": "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamdvNDV2b3J1Y3Q2OHNpd3A1MWV3NnVtbW14d2tveTllOTkyb2gyZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/e9BAkE9fnOEHgddk15/giphy_s.gif",
  "g4": "https://i.vimeocdn.com/video/2111149424-80e3b2974f1fd674f85bde22bcccedd7b2f0d26312df70e42dd7273e55360976-d_640.jpg",
  "g5": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDlvZ2dleXJ5YXl6bWI2OWNsbDJvNzRuNTh3ZHFrc3BmNnY2d2xrMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qX9oszuvxWoMwmVl8x/giphy_s.gif",
  "g6": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnJ4cnFqczJwcjE4cmd4YnUwbTlmNjc5dDQ0cWxiMHNzcjhmZGVoMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2xD3RrcxB20kTDuWeY/giphy_s.gif",
  "crehabitat_thumb.jpg": "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExemgwZmJsNm5qc29qZnBrYnpiYWM0YXBoazc4YjhtejYwczI4bm82MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MbQPlY8F3nTuXldD4z/giphy_s.gif",
  "extintor_thumb.jpg": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWJlNTdzbGw3Mjg4c2p6M3V0ZnJjcGtvZzk3ZTdvaDR6enY5eHQ1ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vEHJ3rEPheP5JjpktJ/giphy.gif",
  "https://url-falsa.com/juego1.png": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnBub3J5MTV1dTA2c3kzeHJ6azIwYXdoaXRlMjNjZmdpMnpiaGU3diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/71fMwwGrFRszyoHhUy/giphy_s.gif",
  "https://url-falsa.com/juego2.png": "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2Q5MnNrY3Vxc3VkNGk3NXA5M21ubHhvbjJuazJ3enFqdHpuamNwcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f0Dy5NDc1jBzpcbff9/giphy_s.gif",
  "https://url-falsa.com/juego3.png": "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamdvNDV2b3J1Y3Q2OHNpd3A1MWV3NnVtbW14d2tveTllOTkyb2gyZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/e9BAkE9fnOEHgddk15/giphy_s.gif",
  "Aventura Matemática": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnBub3J5MTV1dTA2c3kzeHJ6azIwYXdoaXRlMjNjZmdpMnpiaGU3diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/71fMwwGrFRszyoHhUy/giphy_s.gif",
  "Letras Locas": "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2Q5MnNrY3Vxc3VkNGk3NXA5M21ubHhvbjJuazJ3enFqdHpuamNwcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f0Dy5NDc1jBzpcbff9/giphy_s.gif",
  "Explorador de Ciencias": "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamdvNDV2b3J1Y3Q2OHNpd3A1MWV3NnVtbW14d2tveTllOTkyb2gyZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/e9BAkE9fnOEHgddk15/giphy_s.gif"
};

export const getImageUrl = (imageVal, id, title, isHovered) => {
  let url = PREVIEW_IMAGES[imageVal] || PREVIEW_IMAGES[title] || PREVIEW_IMAGES[id] || imageVal;
  if (!url) return null;
  if (isHovered && url.includes('_s.gif')) {
    return url.replace('_s.gif', '.gif');
  }
  return url;
};

export const parseApiResponsePayload = (rawData) => {
  if (Array.isArray(rawData)) return rawData;
  if (typeof rawData !== 'string') return [];

  const normalized = rawData.trim();
  const parsed = [];
  const markdownRegex = /(?:\d+)?titulo"([^"]+)"descripcion"([^"]+)"imagen"\[([^\]]+)\]\(([^\)]+)\)"/g;
  let match;
  while ((match = markdownRegex.exec(normalized)) !== null) {
    parsed.push({ titulo: match[1], descripcion: match[2], imagen: match[4] || match[3] });
  }

  if (parsed.length) return parsed;

  const fallbackRegex = /(?:\d+)?titulo"([^"]+)"descripcion"([^"]+)"imagen"([^"]+)"/g;
  while ((match = fallbackRegex.exec(normalized)) !== null) {
    let imageUrl = match[3];
    const mdMatch = imageUrl.match(/\[([^\]]+)\]\(([^\)]+)\)/);
    if (mdMatch) imageUrl = mdMatch[2] || mdMatch[1];
    parsed.push({ titulo: match[1], descripcion: match[2], imagen: imageUrl });
  }

  return parsed;
};

export const MOCK_QUIZ = {
  title: "Aventura Matemática",
  questions: [
    { id: 1, question: "¿Cuánto es 7 + 8?", options: ["14", "15", "16", "13"], correct: 1 },
    { id: 2, question: "Si tienes 3 manzanas y te dan 4 más, ¿cuántas tienes?", options: ["6", "8", "7", "9"], correct: 2 },
    { id: 3, question: "¿Cuál es el doble de 6?", options: ["10", "12", "14", "18"], correct: 1 }
  ]
};
