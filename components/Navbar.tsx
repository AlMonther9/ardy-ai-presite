"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { ArdyTreeArchLineArt } from "./LineArt";

interface NavbarProps {
  lang: "en" | "ar";
  onToggleLang: () => void;
}

export default function Navbar({ lang, onToggleLang }: NavbarProps) {
  const isAr = lang === "ar";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#physics-3d", en: "3D Radar System", ar: "النموذج ثلاثي الأبعاد" },
    { href: "#monitor", en: "Field Telemetry", ar: "المراقبة الميدانية" },
    { href: "#research-lab", en: "Dielectric Lab", ar: "مختبر العزل" },
    { href: "#equations", en: "WCM Equations", ar: "المعادلات الفيزيائية" },
    { href: "#impact", en: "National Impact", ar: "الأثر القومي" },
    { href: "#team", en: "ECE Engineers", ar: "فريق الهندسة" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-cream/95 backdrop-blur-md border-b border-teal/15 transition-all">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-12 lg:px-16 py-3 flex items-center justify-between gap-4">
        {/* Pure Brand Logo — Unboxed, Natural & Visible */}
        <a href="#hero" className="inline-flex items-center shrink-0" aria-label="ARDY-AI Home">
          <Image
            src="/ardy-logo.png"
            alt="أرضي ARDY-AI"
            width={150}
            height={60}
            priority
            className="h-9 sm:h-12 w-auto object-contain"
          />
        </a>

        {/* Center Editorial Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-10 text-xs font-medium text-pine/80 shrink-0">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-teal transition-colors py-1">
              {isAr ? link.ar : link.en}
            </a>
          ))}
        </nav>

        {/* Right Actions: Language, Contact & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleLang}
            className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-teal/25 bg-sage/20 text-teal text-xs font-semibold hover:bg-sage/40 transition-colors cursor-pointer"
            aria-label="Toggle language"
          >
            <span className={isAr ? "font-sans" : "font-cairo"}>
              {lang === "en" ? "عربي" : "EN"}
            </span>
          </button>

          <a
            href="mailto:almonther.art@gmail.com?subject=Inquiry:%20ARDY-AI%20Research%20&%20Partnership"
            className="hidden sm:inline-flex btn-primary items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-medium tracking-wide uppercase shadow-sm cursor-pointer whitespace-nowrap"
          >
            <ArdyTreeArchLineArt className="w-4 h-4 text-lime" />
            <span>{isAr ? "تواصل معنا" : "Partner with us"}</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg border border-teal/25 bg-cream text-pine hover:bg-sage/25 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-teal/15 bg-cream/98 backdrop-blur-md px-5 py-5 space-y-4">
          <nav className="grid grid-cols-2 gap-3 text-sm font-medium text-pine">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl bg-sage/15 hover:bg-sage/35 text-pine transition-colors"
              >
                {isAr ? link.ar : link.en}
              </a>
            ))}
          </nav>

          <a
            href="mailto:almonther.art@gmail.com?subject=Inquiry:%20ARDY-AI%20Research%20&%20Partnership"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold tracking-wide uppercase shadow-sm"
          >
            <ArdyTreeArchLineArt className="w-4 h-4 text-lime" />
            <span>{isAr ? "تواصل معنا للشراكة" : "Partner with us"}</span>
          </a>
        </div>
      )}
    </header>
  );
}
