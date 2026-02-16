
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'EXPLORE' | 'CLICK' | 'CLOSE' | 'VIEW'>('EXPLORE');
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 35, stiffness: 450, mass: 0.6 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      
      if (target.closest('[data-cursor="close"]')) {
        setCursorType('CLOSE');
      } else if (target.closest('[data-cursor="view"]')) {
        setCursorType('VIEW');
      } else if (target.closest('button, a, input, textarea')) {
        setCursorType('CLICK');
      } else {
        setCursorType('EXPLORE');
      }
    };

    window.addEventListener('mousemove', updateCursor, { passive: true });
    return () => window.removeEventListener('mousemove', updateCursor);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* The Torch Reveal Effect - Revealing the background void */}
      {/* z-[5] sits between background (z-0) and content (z-10+) */}
      <motion.div 
        className="fixed inset-0 z-[5] pointer-events-none mix-blend-multiply hidden md:block"
        style={{
          background: `radial-gradient(450px circle at ${mouseX.get()}px ${mouseY.get()}px, transparent 0%, rgba(0,0,0,1) 85%)`
        }}
      />

      {/* The Interaction Cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference flex items-center justify-center hidden md:flex will-change-transform"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="relative rounded-full border border-red-500/60 flex items-center justify-center bg-transparent"
          animate={{
            width: cursorType === 'EXPLORE' ? 85 : 140,
            height: cursorType === 'EXPLORE' ? 85 : 140,
            backgroundColor: cursorType === 'CLICK' ? 'rgba(255, 0, 51, 0.1)' : 'rgba(0,0,0,0)',
            borderColor: cursorType === 'CLOSE' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 0, 51, 0.4)'
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Internal Glowing Pulse */}
          <motion.div 
            className="absolute w-1.5 h-1.5 bg-red-600 rounded-full" 
            animate={{ scale: cursorType !== 'EXPLORE' ? 2.5 : 1 }}
          />

          {/* Contextual Action Label */}
          <motion.span 
            key={cursorType}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="text-[10px] font-black text-white uppercase tracking-[0.35em] drop-shadow-sm select-none"
          >
            {cursorType}
          </motion.span>

          {/* Pulsating Sensor Ring */}
          <motion.div 
            className="absolute inset-[-10px] border border-red-500/5 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0, 0.4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
