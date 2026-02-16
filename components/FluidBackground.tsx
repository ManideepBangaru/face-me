
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const NeuralConnections = () => {
  const lines = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 200 + 100,
      rotate: Math.random() * 360,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * -10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent origin-left"
          style={{
            left: `${line.left}%`,
            top: `${line.top}%`,
            width: line.width,
            rotate: `${line.rotate}deg`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleX: [0, 1.5, 0],
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            delay: line.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const DataStreams = () => {
  const streams = useMemo(() => {
    const chars = "010101110101010101";
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${(i * 5) + 2}%`,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.1 + 0.05,
      content: chars.split('').sort(() => Math.random() - 0.5).join('')
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute top-0 text-[10px] font-mono text-red-700/30 writing-vertical select-none"
          style={{ left: stream.left, opacity: stream.opacity }}
          animate={{ y: ['-50vh', '150vh'] }}
          transition={{ duration: stream.duration, repeat: Infinity, ease: "linear", delay: stream.delay }}
        >
          {stream.content}
        </motion.div>
      ))}
    </div>
  );
};

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* The Sub-Grid */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />
      
      <DataStreams />
      <NeuralConnections />

      {/* Atmospheric Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-red-950/5 rounded-full filter blur-[150px]"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default FluidBackground;
