
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { Terminal, Cpu, Database, Brain, Mail, Menu, X, Linkedin, ArrowUpRight, Github, Sparkles } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import AIChat from './components/AIChat';
import { Project } from './types';

const EXPERIENCE: Project[] = [
  { 
    id: '1', 
    title: 'Lead – Data Science / GenAI', 
    company: 'Gameopedia Data Solutions', 
    period: '2022 - Present', 
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    description: 'Spearheading the GenAI charter for high-impact gaming data solutions. Leading a cross-functional team in opportunity assessment and agile execution of LLM-based products.',
    tags: ['GenAI', 'Leadership', 'Agile']
  },
  { 
    id: '2', 
    title: 'Data Science Specialist', 
    company: 'Accenture', 
    period: '2021 - 2022', 
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    description: 'Optimized Q&A systems by 15% using virtual agents and boosted query accuracy by 30% through advanced BERT-based transformer implementations.',
    tags: ['BERT', 'Transformers', 'NLP']
  },
  { 
    id: '3', 
    title: 'Senior Developer / Data Scientist', 
    company: 'Cognizant Technology Solutions', 
    period: '2019 - 2021', 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    description: 'Architected Faster R-CNN models for accessibility detection at scale. Deployed globally with optimized inference pipelines for real-time processing.',
    tags: ['Deep Learning', 'Computer Vision', 'PyTorch']
  },
  { 
    id: '4', 
    title: 'Data Scientist', 
    company: 'Nielsen India', 
    period: '2016 - 2018', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    description: 'Automated categorization of millions of items using ML and NLP. Leveraged Hadoop/Impala for large-scale data querying and category classification.',
    tags: ['NLP', 'Hadoop', 'Big Data']
  }
];

const SKILLS = [
  { category: 'Intelligence', items: ['Prompt Engineering', 'NLP', 'Deep Learning', 'BERT'], icon: <Brain size={24}/> },
  { category: 'Engineering', items: ['Python', 'SQL', 'PyTorch', 'Hadoop'], icon: <Cpu size={24}/> },
  { category: 'Leadership', items: ['Cross-Functional Collaboration', 'Team Mentoring', 'Agile'], icon: <Terminal size={24}/> }
];

const PhysicalChar: React.FC<{ char: string, index: number, mouseX: any, mouseY: any }> = ({ char, index, mouseX, mouseY }) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 400, damping: 25, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 400, damping: 25, mass: 0.8 });

  useEffect(() => {
    const unsubscribeX = mouseX.on("change", (latestX: number) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dist = Math.sqrt(Math.pow(latestX - centerX, 2) + Math.pow(mouseY.get() - centerY, 2));
      const maxDist = 200;
      
      if (dist < maxDist) {
        const force = (1 - dist / maxDist) * 50;
        const dirX = (centerX - latestX) / dist;
        const dirY = (centerY - mouseY.get()) / dist;
        x.set(dirX * force);
        y.set(dirY * force);
      } else {
        x.set(0);
        y.set(0);
      }
    });

    return () => unsubscribeX();
  }, [mouseX, mouseY]);

  return (
    <motion.span
      ref={ref}
      style={{ x: springX, y: springY }}
      className="inline-block text-[15vw] md:text-[12vw] leading-[0.8] font-black cursor-none select-none relative px-[0.02em] transition-colors duration-500 hover:text-red-600"
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

const InteractiveName: React.FC<{ name: string }> = ({ name }) => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="flex flex-wrap justify-center overflow-visible py-4">
      {name.split('').map((char, i) => (
        <PhysicalChar key={i} char={char} index={i} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState<Project | null>(null);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-red-600 selection:text-white cursor-none overflow-x-hidden bg-black">
      {/* Background and Torch reside at lower Z-indices to reveal only the void */}
      <CustomCursor />
      <FluidBackground />
      
      {/* AIChat and top-level interaction elements */}
      <AIChat />
      
      {/* Content Layer (z-10+) ensures text information appears "as it is" and bright */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-8 mix-blend-difference">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white">M.BANGARU</div>
        
        <div className="hidden md:flex gap-12 text-xs font-bold tracking-[0.3em] uppercase">
          {['Journey', 'Arsenal', 'Connect'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())} 
              className="hover:text-red-500 transition-colors text-white cursor-none bg-transparent border-none outline-none"
            >
              {item}
            </button>
          ))}
        </div>
        
        <div className="hidden md:flex gap-4">
          <a href="#" className="border border-white/10 px-6 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-red-600 hover:border-red-600 transition-all">
            CV / RESUME
          </a>
        </div>

        <button className="md:hidden text-white z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Hero Content - Layered at z-20 to stay perfectly readable above the torch mask */}
      <header className="relative h-[100svh] flex flex-col items-center justify-center overflow-visible px-4 z-20">
        <motion.div style={{ y }} className="text-center flex flex-col items-center w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 px-6 py-1.5 border border-red-500/30 rounded-full backdrop-blur-md flex items-center gap-3 bg-black/40"
          >
             <Sparkles size={14} className="text-red-500 animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono text-red-500 tracking-[0.5em] uppercase">Systems Operational</span>
          </motion.div>

          <div className="relative w-full overflow-visible">
            <InteractiveName name="MANIDEEP" />
            <div className="mt-[-2vw]">
              <InteractiveName name="BANGARU" />
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex flex-col items-center gap-6"
          >
            <p className="text-xs md:text-sm font-light max-w-xl mx-auto text-white/60 tracking-[0.4em] leading-relaxed uppercase">
              Lead Data Scientist — Shaping Global AI Charters
            </p>
            <motion.div 
              className="h-24 w-px bg-gradient-to-b from-red-600 to-transparent"
              animate={{ height: [96, 120, 96] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </header>

      {/* Main Sections - Layered at z-20 for clarity */}
      <main className="relative z-20">
        {/* Experience Section */}
        <section id="journey" className="relative py-32 md:py-48 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col mb-24">
              <h2 className="text-7xl md:text-[10vw] font-heading font-bold uppercase leading-none text-white/[0.05] select-none">Experience</h2>
              <div className="flex items-center gap-6 mt-[-2rem] md:mt-[-4rem] ml-4">
                <span className="text-red-500 font-mono uppercase tracking-[0.5em] text-sm">The Milestone Map</span>
                <div className="h-px flex-1 bg-red-900/20" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden">
              {EXPERIENCE.map((exp) => (
                <motion.div
                  key={exp.id}
                  data-cursor="view"
                  className="group relative h-[450px] md:h-[650px] overflow-hidden bg-black transition-all"
                  onClick={() => setSelectedExp(exp)}
                >
                  <div className="absolute inset-0 grayscale opacity-25 group-hover:opacity-70 transition-all duration-1000">
                    <img src={exp.image} alt={exp.company} className="h-full w-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[3s]" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-16 left-12 right-12 z-20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-px w-8 bg-red-600" />
                      <span className="text-red-500 font-mono text-[10px] uppercase tracking-[0.3em]">{exp.period}</span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-[1.1] mb-4 group-hover:text-red-500 transition-colors">{exp.company}</h3>
                    <p className="text-sm text-gray-400 font-medium tracking-widest uppercase mb-8">{exp.title}</p>
                    <div className="flex flex-wrap gap-3">
                      {exp.tags.map(tag => (
                        <span key={tag} className="text-[9px] border border-white/10 px-4 py-1.5 rounded-sm text-white/40 uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="arsenal" className="relative py-32 md:py-48 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-4 sticky top-32">
                <h2 className="text-5xl md:text-8xl font-heading font-bold mb-8 text-white/[0.05]">Arsenal</h2>
                <div className="h-px w-24 bg-red-600 mb-8" />
                <p className="text-lg text-gray-400 font-light leading-relaxed uppercase tracking-wider">
                  Precision engineering and cognitive modeling at the intersection of data and strategy.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {SKILLS.map((skill, i) => (
                  <div key={i} className={`p-10 border border-white/5 bg-white/[0.01] backdrop-blur-md group hover:border-red-500/30 transition-all duration-500 ${i === 2 ? 'md:col-span-2' : ''}`}>
                    <div className="text-red-700 mb-8 group-hover:text-red-500 group-hover:scale-110 transition-all origin-left">
                      {skill.icon}
                    </div>
                    <h4 className="text-2xl font-bold mb-8 font-heading tracking-widest uppercase">{skill.category}</h4>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                      {skill.items.map(item => (
                        <div key={item} className="flex items-center gap-2 group/item">
                          <div className="w-1 h-1 bg-red-900/50 group-hover/item:bg-red-500 transition-colors" />
                          <span className="text-xs text-gray-500 group-hover/item:text-white transition-colors tracking-widest uppercase">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section id="connect" className="relative py-32 md:py-60 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="mb-12"
            >
              <h2 className="text-5xl md:text-[10vw] font-heading font-bold uppercase mb-8 leading-none">Reach <GradientText text="OUT" /></h2>
              <p className="text-gray-500 tracking-[0.5em] uppercase text-[10px] mb-16">Opening Secure Communication Lines</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
              {[
                { label: 'LinkedIn', icon: <Linkedin size={20}/>, url: 'https://linkedin.com' },
                { label: 'GitHub', icon: <Github size={20}/>, url: 'https://github.com' },
                { label: 'Mail', icon: <Mail size={20}/>, url: 'mailto:bmd994@gmail.com' }
              ].map((link) => (
                <a 
                  key={link.label} 
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-12 bg-black flex flex-col items-center gap-6 group hover:bg-red-950/20 transition-all"
                >
                  <div className="text-gray-600 group-hover:text-red-500 transition-colors">
                    {link.icon}
                  </div>
                  <span className="font-heading text-xs uppercase font-bold tracking-[0.4em] text-white/40 group-hover:text-white">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-30 py-12 px-12 border-t border-white/5 bg-black">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono text-white/20 tracking-[0.3em] uppercase">
          <div>© 2025 MANIDEEP BANGARU / NEURAL PORTFOLIO V1.3</div>
          <div className="flex gap-12">
            <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="hover:text-red-500 transition-colors">Surface Navigation</button>
          </div>
        </div>
      </footer>

      {/* Detailed Modal with Highest Z-index */}
      <AnimatePresence>
        {selectedExp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExp(null)}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/98 backdrop-blur-3xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-black border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(255,0,0,0.1)]"
            >
              <button 
                onClick={() => setSelectedExp(null)} 
                data-cursor="close"
                className="absolute top-8 right-8 z-[1100] text-white/50 hover:text-white transition-colors cursor-none p-3 bg-white/5 rounded-full"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-2/5 h-80 md:h-auto relative">
                <img src={selectedExp.image} alt={selectedExp.company} className="absolute inset-0 w-full h-full object-cover grayscale opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black" />
              </div>

              <div className="w-full md:w-3/5 p-12 md:p-20 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px w-12 bg-red-600" />
                  <span className="text-red-500 font-mono text-xs uppercase tracking-[0.3em]">{selectedExp.period}</span>
                </div>
                <h3 className="text-5xl font-heading font-bold uppercase mb-4 leading-none">{selectedExp.company}</h3>
                <p className="text-xl text-white/40 font-light mb-12 tracking-widest uppercase">{selectedExp.title}</p>
                <p className="text-gray-400 leading-relaxed text-lg font-light mb-12">
                  {selectedExp.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {selectedExp.tags.map(tag => (
                    <span key={tag} className="text-[10px] border border-white/10 px-6 py-2 rounded-full text-white/30 tracking-[0.2em] uppercase">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            className="fixed inset-0 z-[1001] bg-black flex flex-col items-center justify-center gap-12"
          >
            <button data-cursor="close" className="absolute top-8 right-8 text-white" onClick={() => setMobileMenuOpen(false)}><X size={32}/></button>
            {['Journey', 'Arsenal', 'Connect'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-5xl font-heading font-bold text-white hover:text-red-500 transition-colors uppercase">
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
