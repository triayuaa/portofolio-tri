// src/components/sections/Contact/Contact.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { contactInfo, type ContactInfo } from "@/lib/data";
import styles from "./contact.module.css";

// Map contact type to Lucide icon
const icons: Record<ContactInfo["type"], React.ElementType> = {
  address: MapPin,
  phone: Phone,
  email: Mail,
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.12 },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function ContactCard({ info }: { info: ContactInfo }) {
  const Icon = icons[info.type];

  const content = (
    <motion.div
      variants={fadeUp}
      className={`flex items-center gap-5 p-5 md:p-6 cursor-pointer group ${styles.contactCard}`}
    >
      {/* Icon Container */}
      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${styles.iconWrapper}`}>
        <Icon className="w-5 h-5 text-ghibli-babyblue" />
      </div>

      {/* Text Info */}
      <div className="flex flex-col">
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-ghibli-babyblue/60 mb-1 transition-colors group-hover:text-ghibli-babyblue/90">
          {info.label}
        </p>
        <p className="text-sm md:text-base text-ghibli-white font-medium leading-relaxed group-hover:text-ghibli-babyblue transition-colors">
          {info.value}
        </p>
      </div>

      {/* Dekorasi Panah Kecil (muncul saat hover) */}
      <div className="ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <span className="text-ghibli-babyblue text-xl">→</span>
      </div>
    </motion.div>
  );

  return info.href ? (
    <a href={info.href} target="_blank" rel="noopener noreferrer" className="block outline-none">
      {content}
    </a>
  ) : (
    content
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-ghibli-black overflow-hidden z-10"
    >
      {/* --- Background Ambience --- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Deep blue/black gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-ghibli-black via-ghibli-navy/20 to-black" />
        
        {/* Glow orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-ghibli-babyblue/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-ghibli-navy/30 blur-[150px]" />
      </div>

      {/* --- Elemen Playful: No-Face & Lampion Roh --- */}
      <div className={styles.noFaceSilhouette}>
        {/* Menggunakan emoji topeng sebagai siluet abstrak No-Face */}
        🎭
      </div>
      <div className={`${styles.spiritLantern} ${styles.lantern1}`} />
      <div className={`${styles.spiritLantern} ${styles.lantern2}`} />

      <div className="relative max-w-4xl mx-auto z-10">
        {/* --- Section Heading --- */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-ghibli-babyblue font-semibold tracking-[0.2em] uppercase text-sm mb-3 opacity-80">
            ✦ Jalin Koneksi ✦
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-ghibli-white font-serif">
            Hubungi Saya
          </h2>
          <div className="mt-5 mx-auto w-24 h-[1px] bg-gradient-to-r from-transparent via-ghibli-babyblue to-transparent opacity-50" />
          
          <p className="mt-6 text-ghibli-white/60 text-sm md:text-base max-w-md mx-auto font-light leading-relaxed">
            Seperti <span className="text-ghibli-babyblue font-medium">No-Face</span> yang menunggu di jembatan losmen — saya selalu terbuka untuk kolaborasi dan percakapan baru.
          </p>
        </motion.div>

        {/* --- Contact Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-center">
          
          {/* Kolom Kiri: Visual Dekoratif (Hanya di Desktop) */}
          <div className="hidden md:flex md:col-span-4 flex-col items-center justify-center p-8">
             <div className="w-48 h-48 rounded-full border border-ghibli-babyblue/20 bg-ghibli-babyblue/5 flex items-center justify-center relative">
                {/* Lingkaran pendar di belakang */}
                <div className="absolute inset-0 rounded-full bg-ghibli-babyblue/10 blur-2xl animate-pulse" />
                <span className="text-6xl filter drop-shadow-[0_0_15px_rgba(167,216,222,0.8)]">🎐</span>
             </div>
          </div>

          {/* Kolom Kanan: List Kartu Kontak */}
          <motion.div
            className="md:col-span-6 flex flex-col gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {contactInfo.map((info) => (
              <ContactCard key={info.type} info={info} />
            ))}
          </motion.div>
        </div>

        {/* --- Footer Hint --- */}
        <motion.div
          className="mt-20 text-center flex flex-col items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="w-1 h-8 bg-gradient-to-b from-ghibli-babyblue/50 to-transparent rounded-full" />
          <p className="text-xs text-ghibli-babyblue/50 tracking-[0.2em] uppercase">
            Siap untuk perjalanan selanjutnya
          </p>
        </motion.div>
      </div>
    </section>
  );
}