"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-ghibli-black border-t border-ghibli-babyblue/10 py-12 overflow-hidden text-center z-20">
      
      {/* Animasi Garis Pendar (Glow) Bergerak di border atas */}
      <motion.div 
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-ghibli-babyblue to-transparent opacity-60"
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
        
        {/* Ikon / Ornamen Kecil */}
        <div className="mb-6 w-8 h-8 rounded-full bg-ghibli-babyblue/5 border border-ghibli-babyblue/20 flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(167,216,222,0.3)]">
          <span className="text-sm">🎐</span>
        </div>

        <p className="text-ghibli-white/50 text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-3">
          &copy; {new Date().getFullYear()} Tri Ayuaningsih.
        </p>
        
        <p className="text-ghibli-babyblue/60 text-[11px] sm:text-xs font-serif italic max-w-md leading-relaxed">
          "Once you do something, you never forget. Even if you can't remember."
        </p>

        {/* Ambient background glow untuk footer */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-ghibli-babyblue/5 blur-[60px] rounded-full pointer-events-none" />
      </div>
    </footer>
  );
}