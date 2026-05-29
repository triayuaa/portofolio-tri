"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Trail } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { motion, Variants } from "framer-motion";
import styles from "./hero.module.css";

// --- 3D INTERACTIVE WATER SPIRIT ---
function InteractiveSpirit() {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 6;
      const targetY = (state.pointer.y * Math.PI) / 6;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    }
    
    if (sphereRef.current) {
      sphereRef.current.rotation.x += delta * 0.2;
      sphereRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <Trail width={2} color="#A7D8DE" length={4} decay={1} attenuation={(t) => t * t}>
          {/* OPTIMASI 1: Menurunkan segmen bola dari 64x64 menjadi 32x32 agar GPU tidak menangis */}
          <Sphere ref={sphereRef} args={[1.5, 32, 32]} scale={1.2}>
            <MeshDistortMaterial 
              color="#A7D8DE" 
              emissive="#162635" 
              attach="material" 
              distort={0.5} 
              speed={2} 
              roughness={0.1}
              metalness={0.8}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </Sphere>
        </Trail>
      </Float>
      
      <Float speed={3} rotationIntensity={2} floatIntensity={3}>
         <mesh position={[2.5, 1, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#F0F5F9" />
         </mesh>
         <mesh position={[-2, -1.5, 1]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#A7D8DE" />
         </mesh>
      </Float>
    </group>
  );
}

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden flex items-center bg-ghibli-navy/20">
      
      {/* --- BACKGROUND & SEA RAILWAY --- */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-ghibli-black via-ghibli-navy/30 to-ghibli-black" />
      <div className="absolute inset-0 z-0 glow-babyblue opacity-30 mix-blend-screen" />
      
      {/* Animasi Rel Kereta Laut */}
      <div className={styles.seaRailway} />

      {/* --- CANVAS 3D --- */}
      {/* Gambar Naga Haku Dihapus. Hanya menyisakan 3D yang sudah dioptimasi */}
      <div className="absolute right-0 w-full md:w-3/5 h-full z-10 pointer-events-none md:pointer-events-auto opacity-70">
        {/* OPTIMASI 2: Membatasi DPR (Device Pixel Ratio) agar performa mulus saat di-scroll */}
        <Canvas 
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.5]} 
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.5} color="#F0F5F9" />
          <directionalLight position={[5, 10, 5]} intensity={2} color="#A7D8DE" />
          <pointLight position={[-10, -10, -5]} intensity={1} color="#162635" />
          <InteractiveSpirit />
        </Canvas>
      </div>

      {/* --- UI OVERLAY (TICKET DESIGN) --- */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start pointer-events-none">
        
        {/* Kontainer Tiket */}
        <motion.div 
          initial={{ opacity: 0, y: 100, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className={`w-full md:max-w-3xl p-8 md:p-12 pointer-events-auto shadow-[0_20px_50px_rgba(5,8,16,0.8)] ${styles.ticketShape} overflow-hidden`}
        >
          {/* Latar Belakang Gradasi Navy & Gambar di dalam Tiket */}
          <div className={styles.ticketInnerBg} />

          {/* Garis putus-putus tiket */}
          <div className={`hidden md:block ${styles.ticketDivider}`} />

          <motion.div variants={containerVariants} initial="hidden" animate="show" className="pr-0 md:pr-[25%] relative z-10">
            
            {/* Stamp / Label Tiket */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-ghibli-babyblue/10 border border-ghibli-babyblue/30 text-ghibli-babyblue rounded-full text-[10px] uppercase tracking-widest font-bold backdrop-blur-sm">
                🎫 Tiket Perjalanan
              </span>
              <span className="text-ghibli-white/60 text-[10px] font-mono tracking-widest uppercase bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
                Keberangkatan: Sekarang
              </span>
            </motion.div>

            {/* Nama & Peran */}
            <motion.h1 variants={itemVariants} className={`text-5xl md:text-7xl font-black tracking-tighter mb-2 ${styles.shimmerText} drop-shadow-lg`}>
              Tri Ayuaningsih
            </motion.h1>
            
            <motion.h2 variants={itemVariants} className="text-lg md:text-xl text-ghibli-babyblue font-medium mb-8 max-w-sm leading-relaxed opacity-100 font-serif drop-shadow-md">
              Analis Persyaratan & Pemimpin Proyek IT
            </motion.h2>
            
            {/* Barcode/Dekorasi Tiket */}
            <motion.div variants={itemVariants} className="flex items-center gap-1 mb-8 opacity-60">
               {Array.from({ length: 15 }).map((_, i) => (
                 <div key={i} className={`h-6 bg-ghibli-white ${i % 3 === 0 ? 'w-2' : 'w-1'}`} />
               ))}
               <span className="ml-3 text-xs font-mono tracking-[0.3em] font-bold text-white">TR-287</span>
            </motion.div>

            {/* Tombol Interaktif */}
            <motion.div variants={itemVariants} className="flex gap-4">
              <a href="#about" className="px-7 py-3.5 bg-ghibli-babyblue text-ghibli-navy rounded-full font-bold transition-all duration-300 hover:bg-ghibli-white hover:scale-105 hover:shadow-[0_0_20px_rgba(167,216,222,0.8)] flex items-center gap-2">
                Naik Kereta <span className="text-xl">🚂</span>
              </a>
            </motion.div>

          </motion.div>
          
          {/* Bagian Sobekan Tiket Kanan (Desktop) */}
          <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-[25%] flex-col items-center justify-center p-6 text-center border-l border-transparent z-10 bg-black/10 backdrop-blur-sm">
             <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(167,216,222,0.8)] mb-2 text-ghibli-babyblue">🌊</span>
             <p className="text-[10px] font-bold text-ghibli-white/70 uppercase tracking-[0.2em] mb-1">Tujuan</p>
             <p className="text-sm font-serif text-ghibli-babyblue font-bold italic drop-shadow-md">Masa Depan</p>
          </div>

        </motion.div>
      </div>
      
      {/* Transisi Gradasi Halus ke Section Berikutnya */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-ghibli-black to-transparent z-20 pointer-events-none" />
    </section>
  );
}