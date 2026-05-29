// src/lib/data.ts

// --- ABOUT SECTION DATA ---
export const profileData = {
  name: "Tri Ayuaningsih",
  title: "Requirements Analyst & IT Project Manager",
  summary:
    "Individu yang proaktif, adaptif, dan mampu belajar dengan cepat. Berpengalaman sebagai Requirements Analyst (RA) saat magang dan mantan Ketua Proyek dengan kemampuan pengendalian emosi dan problem-solving yang tinggi. Menguasai analisis produk, perancangan sistem (Flowchart, DFD), dan programming dasar. Dilengkapi dengan literasi digital yang kuat (Ms. Word & Excel).",
};

export type Skill = {
  name: string;
  category: "frontend" | "backend" | "database" | "design" | "tools";
};

export const skills: Skill[] = [
  { name: "HTML", category: "frontend" },
  { name: "CSS", category: "frontend" },
  { name: "PHP", category: "backend" },
  { name: "Laravel", category: "backend" },
  { name: "MySQL", category: "database" },
  { name: "MariaDB", category: "database" },
  { name: "Flowchart", category: "design" },
  { name: "DFD", category: "design" },
  { name: "UML", category: "design" },
  { name: "Analisis Produk", category: "tools" },
];

export const skillCategoryColors: Record<Skill["category"], string> = {
  frontend: "bg-sky-400/20 text-sky-200 border-sky-400/40",
  backend: "bg-blue-500/20 text-blue-200 border-blue-400/40",
  database: "bg-indigo-500/20 text-indigo-200 border-indigo-400/40",
  design: "bg-amber-400/20 text-amber-200 border-amber-400/40",
  tools: "bg-teal-400/20 text-teal-200 border-teal-400/40",
};

// --- EXPERIENCE SECTION DATA ---
export type Experience = {
  id: string;
  role: string;
  type: "internship" | "project";
  period: string;
  tasks: string[];
  icon: string;
};

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Requirements Analyst (RA)",
    type: "internship",
    period: "Juli – November 2025",
    tasks: [
      "Menganalisis kebutuhan pengguna dan klien secara mendalam",
      "Merancang alur sistem yang efisien dan terstruktur",
      "Membuat dokumentasi Flowchart & DFD sebagai acuan pengembangan",
    ],
    icon: "🔍",
  },
  {
    id: "exp-2",
    role: "Ketua Proyek Aplikasi",
    type: "project",
    period: "Agustus – Desember 2024",
    tasks: [
      "Memimpin tim yang terdiri dari 7 anggota secara kolaboratif",
      "Melakukan resolusi konflik tim dengan pendekatan komunikatif",
      "Mengatur pembagian tugas dan timeline proyek secara terstruktur",
      "Mengembangkan aplikasi menggunakan Laravel 11 & MySQL",
    ],
    icon: "🚀",
  },
];

// --- EDUCATION SECTION DATA ---
// Menambahkan tipe Achievement dan level agar sesuai dengan Education.tsx
export type Achievement = {
  title: string;
  level: string;
  year: string;
  isGold: boolean;
  certificate?: string;
};

export type Education = {
  id: string;
  institution: string;
  level: string; 
  major?: string;
  period: string;
  achievements?: Achievement[];
};

export const education: Education[] = [
  {
    id: "edu-1",
    institution: "SMK Telkom Banjarbaru",
    level: "SMK",
    major: "Rekayasa Perangkat Lunak",
    period: "2023 – 2026",
    achievements: [
    {
      title: "Terbaik 2 Prestasi Akademik KK RPL",
      level: "Sekolah",
      year: "2026",
      isGold: true,
      // TAMBAHKAN BARIS INI:
      certificate: "/assets/sertif.webp" // Pastikan gambar ada di folder public/assets
    }
  ]
  },
  {
    id: "edu-2",
    institution: "SMP Plus Murung Pudak",
    level: "SMP",
    period: "2020 – 2023",
    achievements: [
      {
        title: "Juara 3 Karate",
        level: "O2SN Tingkat Kabupaten",
        year: "2022",
        isGold: false, // Disetel false agar menggunakan ikon medali (🎖️) sesuai komponen
      },
    ],
  },
];

// --- CONTACT SECTION DATA ---
// Mengubah dari object tunggal menjadi array agar bisa di-map di Contact.tsx
export type ContactInfo = {
  type: "address" | "phone" | "email";
  label: string;
  value: string;
  href?: string;
};

export const contactInfo: ContactInfo[] = [
  {
    type: "address",
    label: "Alamat",
    value: "Jl. Cindai Alus Komplek Damai Sejahtera 8",
    href: "https://maps.google.com/?q=Jl.+Cindai+Alus+Komplek+Damai+Sejahtera+8",
  },
  {
    type: "phone",
    label: "Telepon",
    value: "+62 852 5415 8407",
    href: "https://wa.me/6285254158407",
  },
  {
    type: "email",
    label: "Email",
    value: "triayuaningsih287@gmail.com",
    href: "mailto:triayuaningsih287@gmail.com",
  },
];