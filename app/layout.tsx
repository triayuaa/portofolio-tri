import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tri Ayuaningsih | IT Project Manager",
  description: "Portofolio profesional Tri Ayuaningsih, Requirements Analyst & IT Project Manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-ghibli-cloud text-ghibli-navy antialiased`}>
        {/* Navbar ditempatkan di layout agar persisten */}
        <Navbar /> 
        <main>{children}</main>
      </body>
    </html>
  );
}