"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Radar3DSection from "@/components/Radar3DSection";
import FieldMonitor from "@/components/FieldMonitor";
import ResearchLab from "@/components/ResearchLab";
import EquationsNotebook from "@/components/EquationsNotebook";
import StrategicImpact from "@/components/StrategicImpact";
import AcademicTeam from "@/components/AcademicTeam";
import WaitlistStudio from "@/components/WaitlistStudio";
import Footer from "@/components/Footer";

export default function Home() {
  const [lang, setLang] = useState<"en" | "ar">("en");

  const toggleLang = () => setLang((prev) => (prev === "en" ? "ar" : "en"));
  const isAr = lang === "ar";

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-cream text-pine overflow-x-hidden relative flex flex-col justify-between selection:bg-lime selection:text-pine font-sans"
    >
      {/* Background Subtle Contour Grid */}
      <div
        className="fixed inset-0 opacity-[0.035] pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(#00292d 1px, transparent 1px), linear-gradient(to right, #00292d 1px, transparent 1px), linear-gradient(to bottom, #00292d 1px, transparent 1px)",
          backgroundSize: "32px 32px, 64px 64px, 64px 64px",
        }}
      />

      {/* 1. Header & Navigation */}
      <Navbar lang={lang} onToggleLang={toggleLang} />

      {/* 2. Clean Editorial Hero with Golden-Hour Farmland Background & Contact */}
      <Hero lang={lang} />

      {/* 3. Interactive 3D C-Band SAR & Corn Field Digital Twin */}
      <Radar3DSection lang={lang} />

      {/* 3. Tactical Field Telemetry & Agronomy Monitor */}
      <FieldMonitor lang={lang} />

      {/* 4. Interactive Dielectric Permittivity Laboratory */}
      <ResearchLab lang={lang} />

      {/* 5. Rigorous Mathematical Formulations & WCM Decoupling */}
      <EquationsNotebook lang={lang} />

      {/* 6. Strategic Nile Water Conservation & National Projects */}
      <StrategicImpact lang={lang} />

      {/* 7. Department of ECE & Academic Engineering Team */}
      <AcademicTeam lang={lang} />

      {/* 8. Accelerator & Pilot Farm Studio Briefing */}
      <WaitlistStudio lang={lang} />

      {/* 9. Warm Editorial Footer */}
      <Footer lang={lang} />
    </main>
  );
}
