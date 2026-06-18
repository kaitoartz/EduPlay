const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf-8');

const scriptRegex = /<script type="text\/babel">([\s\S]*?)<\/script>/;
const scriptMatch = indexHtml.match(scriptRegex);

if (!scriptMatch) {
  console.error('Could not find React script block.');
  process.exit(1);
}

let reactCode = scriptMatch[1];

// Remove destructuring from React, Motion, Lucide precisely
reactCode = reactCode.replace(/const { useState, useEffect } = React;\n/g, '');
reactCode = reactCode.replace(/const { motion, AnimatePresence, useMotionValue, useTransform, useSpring } = window\.Motion;\n/g, '');
reactCode = reactCode.replace(/const { ChevronRight, Star, Play, Award, Zap, BookOpen, FlaskConical, Trophy, User, ArrowRight, CheckCircle2, XCircle, Gamepad2, Brain, Compass, Users, Sparkles, Code, Globe, Shield, Lock, Plus, Trash2, Check, Sun, Moon, Heart } = window\.LucideReact;\n/g, '');

// Replace Mock Data
const mockDataRegex = /\/\/ --- MOCK DATA ---[\s\S]*?\/\/ --- UTILITIES ---[\s\S]*?(?=\/\/ ═══ UI COMPONENT WRAPPERS ═══)/;
reactCode = reactCode.replace(mockDataRegex, "import { MOCK_USER, MOCK_GAMES, getImageUrl } from './data/mockData';\n\n");

// If it says `const root = ReactDOM...` replace it
reactCode = reactCode.replace(/const root = ReactDOM\.createRoot\(document\.getElementById\('root'\)\);[\s\S]*?root\.render\([\s\S]*?<\/React\.StrictMode>[\s\S]*?\);/g, '');
reactCode = reactCode.replace(/const root = ReactDOM\.createRoot\(document\.getElementById\('root'\)\);[\s\S]*?root\.render\(<App \/>\);/g, 'export default App;');


const imports = `import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronRight, Star, Play, Award, Zap, BookOpen, FlaskConical, Trophy, User, ArrowRight, CheckCircle2, XCircle, Gamepad2, Brain, Compass, Users, Sparkles, Code, Globe, Shield, Lock, Plus, Trash2, Check, Sun, Moon, Heart } from 'lucide-react';
import './styles/main.css';

`;

reactCode = imports + reactCode;

fs.writeFileSync('src/App.jsx', reactCode);

let newHtml = indexHtml.replace(/<style>[\s\S]*?<\/style>/g, '');
newHtml = newHtml.replace(/<script src="https:\/\/unpkg\.com\/react[\s\S]*?<\/script>/g, '');
newHtml = newHtml.replace(/<script src="https:\/\/unpkg\.com\/lucide[\s\S]*?<\/script>/g, '');
newHtml = newHtml.replace(/<script src="https:\/\/unpkg\.com\/framer-motion[\s\S]*?<\/script>/g, '');
newHtml = newHtml.replace(/<script src="https:\/\/unpkg\.com\/@babel[\s\S]*?<\/script>/g, '');
newHtml = newHtml.replace(/<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/gsap[\s\S]*?<\/script>/g, '');
newHtml = newHtml.replace(/<script src="https:\/\/unpkg\.com\/gsap[\s\S]*?<\/script>/g, '');
newHtml = newHtml.replace(scriptRegex, '');
newHtml = newHtml.replace(/<div id="root"><\/div>/, '<div id="root"></div>\n  <script type="module" src="/src/main.jsx"></script>');

fs.writeFileSync('index.html', newHtml);

console.log('Extraction completed successfully!');
