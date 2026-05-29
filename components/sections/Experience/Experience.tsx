// src/components/sections/Experience/Experience.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { experiences, type Experience } from "@/lib/data";
import styles from "./experience.module.css";

// 2. Tambahkan ': Variants' di sini
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 }, // atau y: 36
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.12 },
  }),
};

// Konfigurasi warna yang disesuaikan dengan Dark Mode Ghibli
const typeConfig: Record<
  Experience["type"],
  { label: string; color: string; dot: string; glow: string }
> = {
  internship: {
    label: "Magang",
    color: "text-ghibli-babyblue bg-ghibli-babyblue/10 border-ghibli-babyblue/30",
    dot: "bg-ghibli-babyblue border-ghibli-white",
    glow: "group-hover:shadow-[0_0_35px_rgba(167,216,222,0.15)]",
  },
  project: {
    label: "Proyek",
    color: "text-ghibli-white bg-white/10 border-white/20",
    dot: "bg-ghibli-white border-ghibli-babyblue",
    glow: "group-hover:shadow-[0_0_35px_rgba(240,245,249,0.1)]",
  },
};

// Data tambahan untuk lencana teknologi per ID pengalaman
// (Ditulis di sini agar tidak perlu merombak file data.ts)
const techStacks: Record<string, { name: string; icon: string }[]> = {
  "exp-1": [
    { name: "Flowchart", icon: "📊" },
    { name: "DFD", icon: "🔄" },
    { name: "UML", icon: "📐" },
    { name: "Analisis Kebutuhan", icon: "🔍" },
  ],
  "exp-2": [
    { name: "Laravel 11", icon: "💻" },
    { name: "MySQL / Database", icon: "🗄️" },
    { name: "ERD", icon: "🔗" },
    { name: "Manajemen Tim", icon: "🤝" },
  ],
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 px-4 overflow-hidden z-10"
    >
      <div className="relative max-w-5xl mx-auto">
        
        {/* --- Section Heading --- */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="text-center mb-20"
        >
          <p className="text-ghibli-babyblue font-semibold tracking-widest uppercase text-sm mb-2 opacity-80">
            ✦ Perjalanan ✦
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-ghibli-white font-serif leading-tight">
            Pengalaman
          </h2>
          <div className="mt-4 mx-auto w-24 h-[1px] bg-gradient-to-r from-transparent via-ghibli-babyblue to-transparent opacity-50" />
          <p className="mt-4 text-ghibli-white/50 text-sm italic font-light">
            Seperti kereta laut — setiap stasiun adalah pelajaran baru.
          </p>
        </motion.div>

        {/* --- Timeline Container --- */}
        <div className="relative">
          
          {/* Garis Rel Tengah & Efek Cahaya Bergerak */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[40px] md:-translate-x-1/2 overflow-hidden pointer-events-none">
            <div className={styles.magicTrack} />
            <div className={styles.trackSpark} />
            
            {/* Bantalan Rel (Garis Horizontal) */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 w-6 h-[2px] bg-ghibli-babyblue/20 rounded-full"
                style={{ top: `${i * 5}%` }}
              />
            ))}
          </div>

          {/* Render Kartu Pengalaman */}
          <div className="space-y-12 md:space-y-20">
            {experiences.map((exp, index) => {
              const cfg = typeConfig[exp.type];
              const isRight = index % 2 === 0;
              const currentTechs = techStacks[exp.id] || [];

              return (
                <div
                  key={exp.id}
                  className={`relative flex items-start md:items-center gap-0 ${
                    isRight ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Titik Tengah untuk Mobile */}
                  <div className="relative z-10 flex-shrink-0 ml-[18px] md:hidden mt-2">
                    <div className={`w-4 h-4 rounded-full border-2 ${cfg.dot} shadow-[0_0_10px_rgba(167,216,222,0.5)]`} />
                  </div>

                  {/* Kartu Konten */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    custom={index * 0.2}
                    viewport={{ once: true, amount: 0.2 }}
                    className={`group ml-8 md:ml-0 w-full md:w-[calc(50%-3rem)] transition-all duration-500 ${cfg.glow}`}
                  >
                    <div className="bg-glass-card rounded-3xl p-6 md:p-8 overflow-hidden relative transform transition-transform duration-500 hover:-translate-y-2">
                      
                      {/* Aksen Pendaran di sudut */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-ghibli-babyblue/10 blur-[40px] rounded-full group-hover:bg-ghibli-babyblue/20 transition-colors" />

                      {/* Header Kartu */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 relative z-10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 flex-shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl filter drop-shadow-md">
                            {exp.icon}
                          </div>
                          <div>
                            <h3 className="text-ghibli-white font-bold text-xl font-serif leading-tight mb-1">
                              {exp.role}
                            </h3>
                            <p className="text-ghibli-babyblue/80 text-xs font-mono tracking-wide">
                              {exp.period}
                            </p>
                          </div>
                        </div>
                        <span className={`self-start flex-shrink-0 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </div>

                      {/* Daftar Tugas (Bulleted List) */}
                      <ul className="space-y-3 mb-8 relative z-10">
                        {exp.tasks.map((task, ti) => (
                          <li
                            key={ti}
                            className="flex items-start gap-3 text-ghibli-white/70 text-[14px] leading-relaxed"
                          >
                            <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-ghibli-babyblue/60 shadow-[0_0_5px_rgba(167,216,222,0.8)]" />
                            {task}
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Badges (Playful Section) */}
                      <div className="relative z-10 pt-5 border-t border-white/5">
                        <p className="text-[10px] text-ghibli-white/40 uppercase tracking-widest mb-3">
                          Teknologi & Konsep:
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {currentTechs.map((tech, i) => (
                            <div key={i} className={styles.techBadge}>
                              <span className="text-[14px]">{tech.icon}</span>
                              {tech.name}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>

                  {/* Titik Tengah untuk Desktop */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center w-12 h-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, delay: index * 0.2 + 0.1 }}
                      className={`w-5 h-5 rounded-full border-[3px] ${cfg.dot} shadow-[0_0_15px_rgba(167,216,222,0.6)] group-hover:scale-125 transition-transform duration-300`}
                    />
                  </div>

                  {/* Spacer Layout Desktop */}
                  <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}