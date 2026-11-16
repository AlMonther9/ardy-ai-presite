"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ArdyTreeArchLineArt } from "./LineArt";

interface HeroProps {
  lang: "en" | "ar";
}

export default function Hero({ lang }: HeroProps) {
  const isAr = lang === "ar";

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/almonther.art@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          _subject: `ARDY-AI Hero Inquiry from ${email}`,
          source: "Hero Quick Contact",
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setIsSubmitted(true);
    } catch {
      window.location.href = `mailto:almonther.art@gmail.com?subject=${encodeURIComponent(
        `ARDY-AI Inquiry from ${email}`
      )}&body=${encodeURIComponent(`Contact Email: ${email}\nSource: Hero Section`)}`;
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="hero" className="relative w-full max-w-[1600px] mx-auto px-3 sm:px-12 lg:px-16 pt-3 sm:pt-4 pb-8 sm:pb-12">
      {/* Editorial Panoramic Hero Stage */}
      <div className="relative min-h-[560px] sm:min-h-[680px] md:min-h-[760px] rounded-[28px] sm:rounded-[36px] md:rounded-[48px] overflow-hidden bg-[#0a2321] text-cream shadow-2xl flex flex-col justify-between">
        {/* Generated Golden-Hour Farmland Background */}
        <img
          src="/hero-farmland.jpg"
          alt={isAr ? "الأراضي الزراعية المصرية وترعة النيل عند الغروب" : "Egyptian Nile agricultural farmland at golden hour"}
          className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-[1.01]"
        />

        {/* Directional Vignette Overlay for Effortless Readability */}
        <div
          className={`absolute inset-0 z-1 pointer-events-none ${
            isAr
              ? "bg-gradient-to-l from-[#002226]/95 via-[#002226]/65 to-[#002226]/20 sm:to-transparent"
              : "bg-gradient-to-r from-[#002226]/95 via-[#002226]/65 to-[#002226]/20 sm:to-transparent"
          }`}
        />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#001d20]/85 to-transparent z-1 pointer-events-none" />

        {/* Main Middle Grid: Left Display Headline & Contact Field, Right Editorial Micro-Callout */}
        <div className="relative z-10 w-full px-5 sm:px-14 lg:px-20 pt-12 sm:pt-28 pb-6 sm:pb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12 my-auto">
          {/* Left Side: Clean Words + Proposal Summary + Contact Input */}
          <div className="max-w-xl lg:max-w-2xl space-y-5 sm:space-y-6">
            <h1 className="text-4xl sm:text-7xl md:text-8xl font-bold tracking-tight text-cream leading-[1.05] font-sans">
              {isAr ? (
                <>
                  استشعار أعمق. <br />
                  <span className="text-cream/80 font-cairo">ريّ أدق لمصر.</span>
                </>
              ) : (
                <>
                  Sense Deeper. <br />
                  <span className="text-cream/80">Irrigate Smarter.</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-cream/85 leading-relaxed font-sans max-w-lg">
              {isAr
                ? "منصة مصرية تدمج رادار Sentinel-1 (C-Band) وصور Sentinel-2 مع مجسات IoT الميدانية، لقياس رطوبة التربة عند الجذور وتحديد المحاصيل وترشيد مياه النيل بدقة ١٠ أمتار."
                : "An active microwave remote sensing & IoT platform fusing Sentinel-1 C-Band SAR with Sentinel-2 imagery to quantify root-zone soil moisture and conserve Nile water at 10m resolution."}
            </p>

            {/* Clean Contact & Partnership Input */}
            <div className="pt-1 sm:pt-2 max-w-md">
              {!isSubmitted ? (
                <form onSubmit={handlePartnerSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-cream/95 p-2 sm:p-1.5 rounded-2xl sm:rounded-full shadow-xl backdrop-blur-md">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isAr ? "أدخل بريدك للتواصل والشراكة" : "Enter email to connect with us"}
                      className="flex-grow bg-transparent px-4 sm:px-5 py-2.5 text-pine placeholder:text-pine/55 focus:outline-none text-sm font-sans"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-pine text-cream hover:bg-teal disabled:opacity-60 py-3 sm:py-2.5 px-6 rounded-xl sm:rounded-full transition-colors flex items-center justify-center gap-2 font-sans font-semibold text-xs sm:text-sm cursor-pointer whitespace-nowrap"
                    >
                      <span>
                        {isSubmitting
                          ? isAr
                            ? "جاري الإرسال..."
                            : "Sending..."
                          : isAr
                          ? "تواصل معنا"
                          : "Get in Touch"}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-lime" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-1 sm:px-2 text-xs font-sans text-cream/80">
                    <a
                      href="#physics-3d"
                      className="inline-flex items-center gap-1.5 hover:text-lime transition-colors font-medium"
                    >
                      <span>{isAr ? "استكشف النموذج ثلاثي الأبعاد" : "Explore 3D Simulation"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-cream/30">•</span>
                    <a
                      href="mailto:almonther.art@gmail.com"
                      className="hover:text-lime transition-colors font-mono text-[11px]"
                    >
                      almonther.art@gmail.com
                    </a>
                  </div>
                </form>
              ) : (
                <div className="bg-pine/90 border border-teal/40 rounded-2xl p-4 backdrop-blur-md flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime shrink-0" />
                  <div className="text-xs sm:text-sm text-cream font-sans">
                    <strong className="block">
                      {isAr ? "تم استلام بريدك بنجاح" : "Thank you — we’ll be in touch"}
                    </strong>
                    <span className="text-cream/75 text-xs">
                      {isAr
                        ? "سيتواصل معك فريق هندسة الاتصالات بجامعة الأزهر قريباً."
                        : "Our Al-Azhar ECE engineering team will reach out shortly."}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Editorial Project Callout with Vertical Hairline (Inspired by Serenly) */}
          <div className="hidden lg:flex flex-col items-start max-w-xs space-y-4 self-end mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cream/15 backdrop-blur-md border border-cream/25 flex items-center justify-center">
                <ArdyTreeArchLineArt className="w-5 h-5 text-lime" />
              </div>
              <span className="text-xs font-mono tracking-widest uppercase text-cream font-semibold leading-snug">
                {isAr ? "جامعة الأزهر • هندسة الاتصالات" : "AL-AZHAR UNIVERSITY ECE"}
              </span>
            </div>

            <div className="flex items-stretch gap-4 pl-4">
              <div className="w-px bg-cream/40 shrink-0" />
              <p className="text-xs text-cream/80 font-sans leading-relaxed">
                {isAr
                  ? "تقدير رطوبة التربة في الدلتا وتوشكى عبر دمج الرادار الفضائي مع عقد إنترنت الأشياء، بإشراف أ.د. محمد نور الدين."
                  : "Calibrating space-borne SAR backscatter with custom IoT soil probes across the Nile Delta and reclaimed desert fringes."}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Pillars + Subtle Cropped Brand Watermark */}
        <div className="relative z-10 w-full px-5 sm:px-14 lg:px-20 pt-4 pb-0 flex flex-col">
          {/* Bottom-left minimal pillars */}
          <div className="flex items-center gap-5 sm:gap-8 text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-cream/75 pb-5 sm:pb-6">
            <div className="space-y-1">
              <span className="block text-cream">SENTINEL-1 C-BAND</span>
              <span className="block text-cream/60">10M RESOLUTION</span>
              <div className="w-4 h-px bg-cream/40 pt-1" />
            </div>
            <div className="w-px h-8 bg-cream/25" />
            <div className="space-y-1">
              <span className="block text-cream">IOT GROUND TRUTH</span>
              <span className="block text-cream/60">NILE WATER SAVED</span>
              <div className="w-4 h-px bg-cream/40 pt-1" />
            </div>
          </div>

          {/* Giant Cropped Editorial Watermark Banner (Inspired by HEAL [leaf] BRIGHTER) */}
          <div
            aria-hidden="true"
            className="w-full flex items-end justify-between select-none pointer-events-none overflow-hidden -mb-3 sm:-mb-5 opacity-25"
          >
            <span className="text-[14vw] lg:text-[130px] font-extrabold tracking-tighter leading-[0.78] text-cream font-sans">
              ARDY
            </span>
            <div className="w-[10vw] h-[10vw] max-w-[104px] max-h-[104px] rounded-full bg-cream/90 flex items-center justify-center shrink-0 mb-2">
              <ArdyTreeArchLineArt className="w-3/5 h-3/5 text-pine" />
            </div>
            <span className="text-[14vw] lg:text-[130px] font-extrabold tracking-tighter leading-[0.78] text-cream font-sans">
              RADAR
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
