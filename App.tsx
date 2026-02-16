
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { Terminal, Cpu, Database, Brain, Mail, Menu, X, Linkedin, ArrowUpRight, Github, Sparkles, Layers, Code, Zap, Search, Activity, Globe, Shield, Rocket } from 'lucide-react';
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
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    description: 'Spearheading the GenAI charter for high-impact gaming data solutions. Leading a cross-functional team in opportunity assessment and agile execution of LLM-based products.',
    tags: ['GenAI', 'Gaming Intelligence', 'Leadership']
  },
  { 
    id: '2', 
    title: 'Data Science Specialist', 
    company: 'Accenture', 
    period: '2021 - 2022', 
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop',
    description: 'Optimized Q&A systems by 15% using virtual agents and boosted query accuracy by 30% through advanced BERT-based transformer implementations.',
    tags: ['NLP', 'Transformers', 'Chatbots']
  },
  { 
    id: '3', 
    title: 'Senior Developer / Data Scientist', 
    company: 'Cognizant', 
    period: '2019 - 2021', 
    image: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=1200&auto=format&fit=crop',
    description: 'Architected Faster R-CNN models for accessibility detection at scale. Deployed globally with optimized inference pipelines for real-time processing.',
    tags: ['Deep Learning', 'Computer Vision', 'PyTorch']
  },
  { 
    id: 'affine', 
    title: 'Data Scientist', 
    company: 'Affine Analytics', 
    period: '2018 - 2019', 
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop',
    description: 'Engineered predictive models for retail giants, specializing in high-dimensional customer behavior analysis for the footwear and gaming console markets.',
    tags: ['Predictive Modeling', 'Retail Analytics', 'Behavioral Data']
  },
  { 
    id: '4', 
    title: 'Data Scientist', 
    company: 'Nielsen India', 
    period: '2016 - 2018', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    description: 'Automated categorization of millions of items using ML and NLP. Leveraged Hadoop/Impala for large-scale data querying and category classification.',
    tags: ['Big Data', 'Hadoop', 'Automation']
  }
];

const SKILLS = [
  { 
    category: 'Intelligence', 
    items: ['Prompt Engineering', 'NLP Architectures', 'Deep Learning', 'Transformers'], 
    icon: <Brain size={24}/>,
    description: 'Advanced cognitive modeling.',
    span: 'col-span-1 md:col-span-2'
  },
  { 
    category: 'Engineering', 
    items: ['Python', 'SQL', 'PyTorch', 'Cloud GPU'], 
    icon: <Cpu size={24}/>,
    description: 'Scale-ready neural foundations.',
    span: 'col-span-1'
  },
  { 
    category: 'Analysis', 
    items: ['Data Strategy', 'A/B Testing', 'Insight Mining'], 
    icon: <Activity size={24}/>,
    description: 'Mining the digital future.',
    span: 'col-span-1'
  },
  { 
    category: 'Security', 
    items: ['Responsible AI', 'Privacy', 'Model Ethics'], 
    icon: <Shield size={24}/>,
    description: 'Securing inference lines.',
    span: 'col-span-1 md:col-span-3'
  },
  { 
    category: 'Vision', 
    items: ['Object Detection', 'CNNs', 'OCR'], 
    icon: <Search size={24}/>,
    description: 'Machine sight at scale.',
    span: 'col-span-1'
  }
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

const SkillBentoCard: React.FC<{ skill: typeof SKILLS[0]; index: number }> = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`${skill.span} relative group p-6 md:p-8 border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden rounded-3xl flex flex-col justify-between h-full hover:border-red-600/50 transition-colors duration-500`}
    >
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px bg-red-600/20 z-10 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-20">
        <div className="flex items-center justify-between mb-8">
          <div className="text-red-600 p-3 bg-red-600/10 rounded-2xl group-hover:scale-110 transition-transform duration-500">
            {skill.icon}
          </div>
          <ArrowUpRight className="text-white/20 group-hover:text-red-600 transition-colors" size={20} />
        </div>
        <h4 className="text-xl md:text-2xl font-heading font-bold mb-2 tracking-tighter uppercase">{skill.category}</h4>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-6 font-mono">{skill.description}</p>
      </div>
      <div className="relative z-20 flex flex-wrap gap-2">
        {skill.items.map(item => (
          <span key={item} className="text-[9px] md:text-[10px] border border-white/5 px-3 py-1 rounded-full text-white/40 uppercase tracking-tighter group-hover:border-red-600/20 group-hover:text-white transition-all">
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const ExperienceTimelineItem: React.FC<{ exp: Project; index: number }> = ({ exp, index }) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative flex flex-col md:flex-row items-center justify-center mb-20 md:mb-40 gap-10 md:gap-20 ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Node Number Graphic */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center z-40">
        <div className="w-[1px] h-12 bg-white/10" />
        <div className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center text-[10px] font-mono text-white/40 group-hover:text-red-500 transition-colors">
          0{index + 1}
        </div>
        <div className="w-[1px] h-full bg-white/10" />
      </div>
      
      {/* Image Content */}
      <div className="w-full md:w-[45%] group perspective-1000">
        <motion.div 
          whileHover={{ rotateY: isEven ? -5 : 5, rotateX: 2, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 aspect-[16/11] shadow-2xl group-hover:border-red-600/40 transition-colors duration-500"
        >
          <motion.img 
            style={{ y: imgY, scale: 1.4 }}
            src={exp.image} 
            alt={exp.company} 
            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8">
             <span className="text-red-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-2 block">{exp.period}</span>
             <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase leading-none">{exp.company}</h3>
          </div>
        </motion.div>
      </div>

      {/* Text Content */}
      <div className={`w-full md:w-[45%] flex flex-col ${isEven ? 'md:text-right md:items-end' : 'md:text-left md:items-start'}`}>
        <div className="flex items-center gap-3 mb-4">
           {!isEven && <Code size={14} className="text-red-600" />}
           <p className="text-sm text-white/60 font-mono uppercase tracking-[0.4em]">{exp.title}</p>
           {isEven && <Code size={14} className="text-red-600" />}
        </div>
        <p className="text-gray-400 leading-relaxed text-base md:text-lg font-light mb-8 max-w-xl">
          {exp.description}
        </p>
        <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
          {exp.tags.map(tag => (
            <span key={tag} className="text-[10px] border border-white/10 bg-white/[0.02] px-4 py-2 rounded-full text-white/40 uppercase tracking-widest hover:text-red-500 hover:border-red-500/30 transition-all">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const { scrollY } = useScroll();
  const yTranslate = useTransform(scrollY, [0, 1000], [0, -100]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      if (!navHidden) setNavHidden(true);
    } else {
      if (navHidden) setNavHidden(false);
    }
  });

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
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      <motion.nav 
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={navHidden && !mobileMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-8 mix-blend-difference"
      >
        <div className="flex items-center gap-4">
          <a href="https://github.com/ManideepBangaru" target="_blank" rel="noreferrer" className="text-white hover:text-red-500 transition-colors cursor-none p-1">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/manideepbangaru" target="_blank" rel="noreferrer" className="text-white hover:text-red-500 transition-colors cursor-none p-1">
            <Linkedin size={20} />
          </a>
        </div>

        <div className="hidden md:flex gap-12 text-xs font-bold tracking-[0.3em] uppercase">
          {['Journey', 'Arsenal', 'Connect'].map((item) => (
            <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-red-500 transition-colors text-white cursor-none bg-transparent border-none">
              {item}
            </button>
          ))}
        </div>
        
        <div className="md:hidden">
          <button className="text-white z-50 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
             {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      <header className="relative h-[100svh] flex flex-col items-center justify-center overflow-visible px-4 z-20">
        <motion.div style={{ y: yTranslate }} className="text-center flex flex-col items-center w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 px-6 py-1.5 border border-red-500/30 rounded-full backdrop-blur-md flex items-center gap-3 bg-black/40"
          >
             <Sparkles size={14} className="text-red-500 animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono text-red-500 tracking-[0.5em] uppercase">Neural Inference Active</span>
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

      <main className="relative z-20">
        {/* Journey Section */}
        <section id="journey" className="relative py-32 md:py-60 px-6 overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col mb-40 items-center md:items-start">
              <span className="text-red-500 font-mono text-xs uppercase tracking-[0.6em] mb-4">Chronicle / 01</span>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-fit cursor-none"
              >
                <GradientText 
                  text="JOURNEY" 
                  as="h2" 
                  className="text-7xl md:text-[10vw] font-heading font-bold uppercase leading-none" 
                />
              </motion.div>
            </div>
            
            <div className="relative">
              {/* Timeline Center Line */}
              <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-red-600/40 via-white/5 to-transparent hidden md:block" />
              
              <div className="space-y-0">
                {EXPERIENCE.map((exp, i) => (
                  <ExperienceTimelineItem key={exp.id} exp={exp} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Arsenal Section */}
        <section id="arsenal" className="relative py-32 md:py-48 px-6 bg-black">
          <div className="max-w-7xl mx-auto">
             <div className="flex flex-col mb-32 items-center md:items-end text-center md:text-right">
              <span className="text-red-500 font-mono text-xs uppercase tracking-[0.6em] mb-4">Core Systems / 02</span>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-fit cursor-none"
              >
                <GradientText 
                  text="ARSENAL" 
                  as="h2" 
                  className="text-7xl md:text-[10vw] font-heading font-bold uppercase leading-none" 
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
              {SKILLS.map((skill, i) => (
                <SkillBentoCard key={skill.category} skill={skill} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section id="connect" className="relative py-32 md:py-60 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-20">
              <h2 className="text-5xl md:text-[10vw] font-heading font-bold uppercase mb-8 leading-none">Reach <GradientText text="OUT" /></h2>
              <p className="text-gray-500 tracking-[0.5em] uppercase text-[10px] max-w-lg mx-auto leading-loose">Opening Secure Communication Lines for Future Neural Projects</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'LinkedIn', icon: <Linkedin size={20}/>, url: 'https://www.linkedin.com/in/manideepbangaru' },
                { label: 'GitHub', icon: <Github size={20}/>, url: 'https://github.com/ManideepBangaru' },
                { label: 'Mail', icon: <Mail size={20}/>, url: 'mailto:bmd994@gmail.com' }
              ].map((link) => (
                <a 
                  key={link.label} 
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-12 border border-white/5 bg-white/[0.02] flex flex-col items-center gap-6 group hover:border-red-600/40 transition-all rounded-3xl cursor-none"
                >
                  <div className="text-gray-600 group-hover:text-red-500 transition-colors p-4 bg-white/5 rounded-full">
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

      <footer className="relative z-30 py-20 px-12 border-t border-white/5 bg-black">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono text-white/20 tracking-[0.3em] uppercase">
          <div>© 2025 MANIDEEP BANGARU / NEURAL PORTFOLIO V1.9</div>
          <div className="flex gap-12">
            <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="hover:text-red-500 transition-colors cursor-none">Surface Navigation</button>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
             <span className="text-red-600/50">Systems Optimal</span>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[1001] bg-black flex flex-col items-center justify-center gap-12"
          >
            <button className="absolute top-8 right-8 text-white p-4" onClick={() => setMobileMenuOpen(false)}><X size={32}/></button>
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
