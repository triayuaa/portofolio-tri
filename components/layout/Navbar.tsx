// src/components/layout/Navbar.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Tentang", href: "#about" },
  { name: "Pengalaman", href: "#experience" },
  { name: "Pendidikan", href: "#education" },
  { name: "Kontak", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // OPTIMASI 1: Menggunakan useScroll dari Framer Motion (Lebih ringan dari window.addEventListener)
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-ghibli-navy/80 backdrop-blur-md border-ghibli-babyblue/20 py-3 shadow-[0_10px_30px_rgba(5,8,16,0.5)]"
            : "bg-transparent border-transparent py-5 md:py-6"
        }`}
        style={{ willChange: "background-color, padding" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo / Inisial */}
          <a
            href="#hero"
            className="text-xl md:text-2xl font-black tracking-tighter text-ghibli-white flex items-center gap-3 group relative z-50"
          >
            <span className="w-9 h-9 rounded-full bg-ghibli-babyblue/10 border border-ghibli-babyblue/30 text-ghibli-babyblue flex items-center justify-center group-hover:bg-ghibli-babyblue group-hover:text-ghibli-navy transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(167,216,222,0.6)]">
              T
            </span>
            <span className="opacity-90 group-hover:opacity-100 transition-opacity">Ayuaningsih.</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                // OPTIMASI 2: Menghapus JS State untuk hover, menggunakan class 'group' CSS murni
                className="relative px-5 py-2 text-sm font-semibold text-ghibli-white/70 hover:text-ghibli-white transition-colors duration-300 group"
              >
                {link.name}
                
                {/* Efek Hover: Titik Cahaya Roh (CSS Pure - Zero Lag) */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-ghibli-babyblue shadow-[0_0_10px_2px_rgba(167,216,222,0.7)] opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-ghibli-babyblue p-2 -mr-2 relative z-50 transition-transform active:scale-90"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu navigasi"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[45] flex justify-end bg-ghibli-black/80 backdrop-blur-md"
            style={{ willChange: "opacity" }}
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-[75%] max-w-sm h-full bg-gradient-to-b from-ghibli-navy to-ghibli-black border-l border-ghibli-babyblue/20 shadow-2xl flex flex-col pt-28 px-8"
              style={{ willChange: "transform" }}
            >
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    className="text-2xl font-serif font-bold text-ghibli-white/80 hover:text-ghibli-babyblue border-b border-ghibli-babyblue/10 pb-4 transition-colors flex items-center justify-between group"
                  >
                    {link.name}
                    <span className="text-ghibli-babyblue opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                      →
                    </span>
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto mb-10 flex flex-col items-center gap-3">
                <div className="w-8 h-px bg-ghibli-babyblue/30" />
                <p className="text-[10px] text-ghibli-babyblue/50 uppercase tracking-widest text-center font-bold">
                  ✦ Spirited Journey ✦
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}