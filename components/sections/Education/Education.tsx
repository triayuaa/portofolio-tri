// src/components/sections/Education/Education.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { education, type Education } from "@/lib/data";
import styles from "./education.module.css";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.15 },
  }),
};

// Ikon lucu bernuansa Ghibli / Alam
const levelIcon: Record<string, string> = {
  SMK: "🎒",
  SMP: "🎐",
  SD: "🌱",
};

function EducationTicket({ edu, index }: { edu: Education; index: number }) {
  // Membuat layout zigzag (Kiri untuk genap, Kanan untuk ganjil)
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className={`relative w-full md:w-[85%] lg:w-[70%] flex ${
        isEven ? "md:mr-auto" : "md:ml-auto"
      }`}
    >
      <div className={`w-full ${styles.ticketCard} p-8 md:p-10 group`}>
        
        {/* Latar pendar saat di hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-ghibli-babyblue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-20">
          
          {/* Ikon Lingkaran Kiri */}
          <div className="w-16 h-16 flex-shrink-0 rounded-full flex items-center justify-center text-3xl bg-ghibli-navy/50 border border-ghibli-babyblue/30 shadow-[0_0_15px_rgba(167,216,222,0.2)] group-hover:scale-110 transition-transform duration-300">
            {levelIcon[edu.level] ?? "🎓"}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header / Tahun */}
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-ghibli-babyblue/10 text-ghibli-babyblue border border-ghibli-babyblue/20">
                Tingkat {edu.level}
              </span>
              <span className="text-xs text-ghibli-white/40 font-mono tracking-wider">
                {edu.period}
              </span>
            </div>

            {/* Nama Institusi & Jurusan */}
            <h3 className="text-2xl font-bold text-ghibli-white font-serif leading-tight">
              {edu.institution}
            </h3>

            {edu.major && (
              <p className="text-sm text-ghibli-babyblue mt-1 font-medium tracking-wide">
                Jurusan: {edu.major}
              </p>
            )}

            {/* Prestasi (Achievements) - Playful Badge */}
            {edu.achievements && edu.achievements.length > 0 && (
              <div className="mt-6 pt-5 border-t border-white/5">
                {edu.achievements.map((ach, i) => (
                  <div
                    key={i}
                    className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-ghibli-babyblue/20 to-transparent border border-ghibli-babyblue/30 ${styles.achievementBadge}`}
                  >
                    <span className="text-xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                      {ach.isGold ? "🏆" : "🎖️"}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-ghibli-white">
                        {ach.title}
                      </span>
                      <span className="text-[10px] text-ghibli-babyblue/80 uppercase tracking-widest">
                        {ach.level} • {ach.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stempel Berputar (Dekorasi Lucu) */}
        <div className={styles.spinningStamp}>
          Passed
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section
      id="education"
      className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-ghibli-black z-10"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-ghibli-babyblue/5 blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-ghibli-navy/40 blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto z-10">
        
        {/* Section Heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-ghibli-babyblue font-semibold tracking-widest uppercase text-sm mb-2 opacity-80">
            ✦ Pendidikan ✦
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-ghibli-white font-serif leading-tight">
            Jejak Langkah
          </h2>
          <div className="mt-4 mx-auto w-24 h-[1px] bg-gradient-to-r from-transparent via-ghibli-babyblue to-transparent opacity-50" />
        </motion.div>

        {/* Layout Tiket & Benang */}
        <div className="relative">
          {/* Benang Putus-putus di tengah (Desktop only) */}
          <div className={`hidden md:block ${styles.magicThread}`} />

          {/* Wrapper Kartu-kartu */}
          <div className="flex flex-col gap-12">
            {education.map((edu, i) => (
              <EducationTicket key={edu.id} edu={edu} index={i} />
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}