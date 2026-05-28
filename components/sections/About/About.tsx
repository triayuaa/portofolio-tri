"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { profileData, skills } from "@/lib/data";
import styles from "./about.module.css";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.12 },
  }),
};

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  design: "Desain Sistem",
  tools: "Tools",
};

const darkSkillColors: Record<string, string> = {
  frontend: "bg-ghibli-babyblue/10 text-ghibli-babyblue border-ghibli-babyblue/30",
  backend: "bg-white/5 text-ghibli-white border-white/20",
  database: "bg-ghibli-navy/50 text-ghibli-babyblue border-ghibli-babyblue/20",
  design: "bg-ghibli-babyblue/20 text-white border-ghibli-babyblue/40",
  tools: "bg-black/40 text-ghibli-white border-white/10",
};

export default function About() {
  const [isTrainDashing, setIsTrainDashing] = useState(false);

  const grouped = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>
  );

  const handleTrainClick = () => {
    if (isTrainDashing) return;
    setIsTrainDashing(true);
    setTimeout(() => setIsTrainDashing(false), 2000);
  };

  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden z-10 bg-ghibli-black">
      
      {/* Background Orbs & CSS Module Animations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-ghibli-babyblue/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-ghibli-white/5 blur-[80px]" />
        <div className={styles.waterReflection} />
        <div className={`${styles.shikigami} ${styles.paper1}`} />
        <div className={`${styles.shikigami} ${styles.paper2}`} />
        <div className={`${styles.shikigami} ${styles.paper3}`} />
      </div>

      <div className="relative max-w-7xl mx-auto z-10 mb-32 md:mb-48">
        
        {/* Section heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-ghibli-babyblue font-semibold tracking-widest uppercase text-sm mb-2 opacity-80">
            ✦ Tentang Saya ✦
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold font-serif leading-tight ${styles.glowingTitle}`}>
            Kenali Lebih Dekat
          </h2>
          <div className="mt-4 mx-auto w-24 h-[1px] bg-gradient-to-r from-transparent via-ghibli-babyblue to-transparent opacity-50" />
        </motion.div>

        {/* LAYOUT BARU: Top Profil, Bottom Lanterns */}
        <div className="flex flex-col gap-16 items-center">
          
          {/* Kartu Profil (Di Tengah, Melayang) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="w-full max-w-3xl bg-glass-card p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group hover:shadow-[0_0_50px_rgba(167,216,222,0.15)] transition-all duration-500"
          >
            {/* Animasi Cahaya Pindai */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ghibli-babyblue/5 to-transparent h-[200%] -top-[100%] group-hover:top-[100%] transition-all duration-1000 ease-in-out" />
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
              <div className="w-24 h-24 flex-shrink-0 rounded-full bg-ghibli-babyblue/10 border border-ghibli-babyblue/30 flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(167,216,222,0.5)]">
                <span className="text-5xl">🐉</span>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-ghibli-white font-serif mb-4">
                  Profil Singkat
                </h3>
                <p className="text-ghibli-white/80 leading-relaxed text-base md:text-lg font-light">
                  {profileData.summary}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Kartu Keahlian (Berjejer Seperti Lampion Gantung) */}
          <div className="w-full mt-10">
            <h3 className="text-xl font-bold text-ghibli-white text-center font-serif mb-12 opacity-80">
              ✦ Kemampuan Teknis ✦
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-8">
              {Object.entries(grouped).map(([cat, catSkills], gi) => (
                <motion.div
                  key={cat}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  custom={gi}
                  viewport={{ once: true }}
                  className={`${styles.lanternCard} p-6 flex flex-col items-center text-center mt-8`}
                >
                  <p className="text-xs font-semibold tracking-widest uppercase text-ghibli-babyblue/80 mb-6 pb-2 border-b border-ghibli-babyblue/20 w-full">
                    {categoryLabels[cat]}
                  </p>
                  <div className="flex flex-col gap-3 w-full">
                    {catSkills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`px-3 py-2 rounded-xl text-[13px] font-medium border backdrop-blur-sm transition-all hover:shadow-[0_0_15px_rgba(167,216,222,0.3)] ${styles.skillBadge} ${darkSkillColors[skill.category]}`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                  {/* Cahaya di bawah lampion */}
                  <div className="absolute -bottom-4 w-12 h-4 bg-ghibli-babyblue/20 blur-md rounded-full" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* --- INTERACTIVE SPIRITED AWAY SEA TRAIN --- */}
      <div className="absolute bottom-10 left-0 w-full h-24 pointer-events-auto overflow-hidden">
        
        {/* Rel Air / Horizon Line */}
        <div className="absolute bottom-6 w-full h-[1px] bg-gradient-to-r from-transparent via-ghibli-babyblue/40 to-transparent" />
        <div className="absolute bottom-6 w-full h-8 bg-gradient-to-t from-ghibli-babyblue/5 to-transparent blur-md" />

        {/* Gerbang Torii di Tengah Air */}
        <div className={styles.toriiGate}>
           <div className={styles.toriiTop} />
           <div className={styles.toriiPillars}>
             <div className={styles.toriiPillar} />
             <div className={styles.toriiPillar} />
           </div>
        </div>

        {/* Container Kereta dengan Animasi Berjalan */}
        <motion.div
          animate={{ x: ["-20vw", "120vw"] }}
          transition={{
            duration: isTrainDashing ? 3 : 30,
            ease: isTrainDashing ? "circIn" : "linear",
            repeat: Infinity,
          }}
          className="absolute bottom-6 flex items-end cursor-pointer group z-10"
          onClick={handleTrainClick}
          title="Klik untuk melaju!"
        >
          {/* Efek Riak Air di bawah kereta saat dash */}
          {isTrainDashing && (
            <motion.div 
              initial={{ opacity: 1, scaleX: 0 }}
              animate={{ opacity: 0, scaleX: 3 }}
              transition={{ duration: 1 }}
              className="absolute -bottom-1 -left-10 w-32 h-2 bg-ghibli-babyblue/60 blur-sm rounded-full" 
            />
          )}

          {/* Gerbong Penumpang 2 (Belakang) */}
          <div className="w-14 h-9 bg-ghibli-navy border border-ghibli-babyblue/20 rounded-t-sm relative flex items-center justify-center opacity-90 group-hover:border-ghibli-babyblue/60 transition-colors shadow-lg">
             <div className="w-6 h-4 bg-ghibli-babyblue/10 rounded-sm overflow-hidden flex items-end justify-center glow-babyblue">
               {/* Bayangan Penumpang */}
               <span className="text-[10px] opacity-40">👤</span>
             </div>
             <div className="absolute -bottom-1 left-2 w-2 h-2 rounded-full bg-ghibli-babyblue/30" />
             <div className="absolute -bottom-1 right-2 w-2 h-2 rounded-full bg-ghibli-babyblue/30" />
          </div>
          <div className="w-2 h-1 bg-ghibli-babyblue/20 mb-1" />

          {/* Gerbong Penumpang 1 (Tengah) */}
          <div className="w-14 h-9 bg-ghibli-navy border border-ghibli-babyblue/20 rounded-t-sm relative flex items-center justify-center opacity-90 group-hover:border-ghibli-babyblue/60 transition-colors shadow-lg">
             <div className="w-6 h-4 bg-ghibli-babyblue/10 rounded-sm overflow-hidden flex items-end justify-center glow-babyblue">
               {/* Bayangan Penumpang (No Face) */}
               <span className="text-[10px] opacity-60">👻</span>
             </div>
             <div className="absolute -bottom-1 left-2 w-2 h-2 rounded-full bg-ghibli-babyblue/30" />
             <div className="absolute -bottom-1 right-2 w-2 h-2 rounded-full bg-ghibli-babyblue/30" />
          </div>
          <div className="w-2 h-1 bg-ghibli-babyblue/20 mb-1" />

          {/* Kepala Kereta */}
          <div className="w-16 h-10 bg-black border border-ghibli-babyblue/40 rounded-tr-xl rounded-tl-sm relative flex flex-col justify-end opacity-90 group-hover:border-ghibli-babyblue transition-colors group-hover:shadow-[0_0_15px_rgba(167,216,222,0.5)] z-20">
            <div className="absolute top-2 right-2 w-5 h-4 bg-ghibli-babyblue/30 rounded-sm glow-babyblue" />
            <div className="absolute -top-3 left-2 w-3 h-3 bg-black border border-ghibli-babyblue/40 rounded-t-sm" />
            
            {!isTrainDashing && (
              <motion.div
                animate={{ y: [-5, -25], opacity: [0.6, 0], scale: [1, 2.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -top-5 left-2 w-3 h-3 bg-ghibli-white/20 rounded-full blur-[2px]"
              />
            )}

            <div className="absolute bottom-2 -right-1 w-2 h-2 bg-ghibli-white rounded-full shadow-[0_0_10px_2px_rgba(240,245,249,0.8)]" />
            <div className="absolute -bottom-1 left-2 w-3 h-3 rounded-full border border-ghibli-babyblue/60 bg-ghibli-navy" />
            <div className="absolute -bottom-1 right-3 w-3 h-3 rounded-full border border-ghibli-babyblue/60 bg-ghibli-navy" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}