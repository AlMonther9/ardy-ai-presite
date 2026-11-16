"use client";

import { useState } from "react";
import {
  RootSystemLineArt,
  SatelliteRadarBeamLineArt,
  WaterCloudModelLineArt,
  IoTProbeLineArt,
} from "./LineArt";

interface FieldMonitorProps {
  lang: "en" | "ar";
}

export default function FieldMonitor({ lang }: FieldMonitorProps) {
  const [selectedSector, setSelectedSector] = useState<"toshka" | "qena" | "delta">("toshka");
  const isAr = lang === "ar";

  const sectors = {
    toshka: {
      nameEn: "Toshka Oasis Basin (Sector 4)",
      nameAr: "حوض توشكى للاستصلاح (قطاع ٤)",
      region: "Upper Egypt (Desert Reclamation)",
      cropEn: "Wheat (Strategic Winter Crop)",
      cropAr: "قمح (محصول استراتيجي شتوي)",
      area: "134.5 Hectares",
      revisit: "Sentinel-1 Orbit 142 (Every 6 Days)",
      moistureMv: 0.162,
      soilKpa: 18.4,
      pwpLimit: 0.145,
      tempC: 31.8,
      ecSalinity: "1.4 dS/m (Normal)",
      stressIndex: 68,
      sigma0_vv: -14.2,
      sigma0_vh: -21.6,
      ndvi: 0.42,
      ndwi: -0.12,
      noteEn: "Sandy crust penetration confirmed at 4.2 cm. Moisture dropping toward Permanent Wilting Point (PWP).",
      noteAr: "تم تأكيد اختراق القشرة الرملية حتى عمق ٤.٢ سم. الرطوبة تقترب من نقطة الذبول الدائم (PWP).",
      recommendationEn: "Recommended replenishment: 18.5 mm within 14 hours. Saves 24% water vs flood irrigation schedules.",
      recommendationAr: "الري الموصى به: ١٨.٥ مم خلال ١٤ ساعة لتجنب إجهاد الجذور وتوفير ٢٤٪ من مياه النيل مقارنة بالري بالغمر.",
    },
    qena: {
      nameEn: "Qena Nile Basin (Sector 11)",
      nameAr: "حوض وادي قنا (قطاع ١١)",
      region: "Nile Alluvial Valley",
      cropEn: "Corn (Maize - Mid Vegetative)",
      cropAr: "ذرة شامية (مرحلة النمو الخضري)",
      area: "48.2 Hectares",
      revisit: "Sentinel-1 Orbit 73 (Every 6 Days)",
      moistureMv: 0.325,
      soilKpa: 52.6,
      pwpLimit: 0.18,
      tempC: 28.4,
      ecSalinity: "0.8 dS/m (Optimal)",
      stressIndex: 24,
      sigma0_vv: -9.8,
      sigma0_vh: -16.4,
      ndvi: 0.76,
      ndwi: 0.22,
      noteEn: "Water Cloud Model (WCM) decoupled canopy noise (LAI = 3.6). Soil dielectric constant reflects optimal moisture reservoir.",
      noteAr: "نجح نموذج سحابة الماء في عزل تشتت الأوراق والسيقان. رطوبة التربة الحجمية في النطاق المثالي.",
      recommendationEn: "Irrigation paused. Soil moisture reservoir sufficient for next 48 hours without extraction.",
      recommendationAr: "تأجيل الري: المخزون الرطوبي كافٍ لمدة ٤٨ ساعة قادمة دون حاجة للسحب من مياه الري.",
    },
    delta: {
      nameEn: "Kafr El-Sheikh Coastal Delta",
      nameAr: "دلتا كفر الشيخ (حوض ٧)",
      region: "Lower Egypt Delta Fringe",
      cropEn: "Rice Paddies (Flooded & Intermittent)",
      cropAr: "أرز (ري بالترطيب والتجفيف)",
      area: "92.0 Hectares",
      revisit: "Sentinel-1 Orbit 116 (Every 6 Days)",
      moistureMv: 0.442,
      soilKpa: 78.1,
      pwpLimit: 0.22,
      tempC: 25.1,
      ecSalinity: "3.2 dS/m (Salinity Watch)",
      stressIndex: 42,
      sigma0_vv: -6.4,
      sigma0_vh: -13.8,
      ndvi: 0.68,
      ndwi: 0.48,
      noteEn: "High dielectric response indicates shallow saline water table pooling beneath root zone.",
      noteAr: "ارتفاع حاد في ثابت العزل يشير إلى تجمع المياه الجوفية المالحة تحت الجذور.",
      recommendationEn: "Calibrated drainage cycle recommended to suppress deep capillary salts and prevent salinization.",
      recommendationAr: "دورة صرف ومعايرة موصى بها لمنع صعود الأملاح وحماية خصوبة الدلتا الزراعية.",
    },
  };

  const curr = sectors[selectedSector];

  return (
    <section id="monitor" className="w-full max-w-[1600px] mx-auto px-4 sm:px-12 lg:px-16 py-14 sm:py-24 border-t border-teal/15">
      {/* Editorial Fluid Header — Breathable & Uncontained */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-teal/15">
        <div className="max-w-3xl">
          <span className="font-mono text-xs text-teal font-semibold uppercase tracking-widest block mb-2">
            {isAr ? "المراقبة الرادارية الحقلية • أحواض مصر الزراعية" : "RADAR AGRONOMY & FIELD TELEMETRY HUD"}
          </span>
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-pine font-sans">
            {isAr ? "مراقبة الرطوبة الحجمية والإجهاد المائي للحقول" : "Field Telemetry & Volumetric Moisture HUD"}
          </h2>
          <p className="text-sm sm:text-lg text-pine/75 mt-3 sm:mt-4 leading-relaxed font-sans max-w-2xl">
            {isAr
              ? "تحليل راداري حي ومباشر للمحاصيل الاستراتيجية في مصر عبر دمج إشارات Sentinel-1 مع مرئيات Sentinel-2 الطيفية ومعايرة مجسات إنترنت الأشياء."
              : "Live analytical radar diagnostics across Egyptian agricultural basins showing SAR backscatter gradients, canopy vigor, and actionable root moisture thresholds."}
          </p>
        </div>

        {/* Basin Selector Switcher — Minimal, Borderless */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-end">
          {(
            [
              { id: "toshka", labelEn: "Toshka Desert", labelAr: "توشكى" },
              { id: "qena", labelEn: "Qena Nile Basin", labelAr: "وادي قنا" },
              { id: "delta", labelEn: "Nile Delta", labelAr: "دلتا النيل" },
            ] as const
          ).map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSector(s.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
                selectedSector === s.id
                  ? "bg-pine text-cream shadow-sm"
                  : "bg-sage/20 text-pine/70 hover:bg-sage/40 hover:text-pine"
              }`}
            >
              {isAr ? s.labelAr : s.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Fluid Panoramic Satellite HUD Viewport (Inspired by AeroCrop & Agricolus) */}
      <div className="mt-8 sm:mt-12 rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#002428] text-cream border border-teal/25 p-5 sm:p-10 lg:p-12 shadow-2xl relative">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(194, 214, 200, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(194, 214, 200, 0.2) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Top Telemetry Header inside Viewport */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-teal/25 pb-6">
          <div className="flex items-center gap-4">
            <SatelliteRadarBeamLineArt className="w-8 h-8 text-lime shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg sm:text-xl text-cream font-sans">
                  {isAr ? curr.nameAr : curr.nameEn}
                </span>
                <span className="text-xs font-mono text-lime bg-pine/90 px-2.5 py-0.5 rounded-md border border-teal/30">
                  {curr.cropEn.split(" ")[0]}
                </span>
              </div>
              <span className="text-xs text-cream/60 font-mono block mt-0.5">
                {curr.region} • Area: {curr.area}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs text-right">
            <div>
              <span className="text-lime font-bold block">{curr.revisit}</span>
              <span className="text-[11px] text-cream/50">10m × 10m Ground Pixel Grid</span>
            </div>
            <div className="hidden sm:block pl-6 border-l border-teal/25 text-left">
              <span className="text-cream/60 block text-[11px]">COPERNICUS S1/S2</span>
              <span className="text-lime font-bold">ACTIVE SCAN</span>
            </div>
          </div>
        </div>

        {/* Center Panoramic Landscape with Handcrafted Vector Radar Heatmap & Pointer Pins */}
        <div className="relative my-8 h-[340px] sm:h-[420px] lg:h-[460px] rounded-2xl overflow-hidden flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 1000 480" preserveAspectRatio="none">
            <defs>
              <radialGradient id={`heatGradFluid-${selectedSector}`} cx="50%" cy="50%" r="50%">
                {selectedSector === "toshka" ? (
                  <>
                    <stop offset="0%" stopColor="#e76f51" stopOpacity="0.95" />
                    <stop offset="45%" stopColor="#f4a261" stopOpacity="0.75" />
                    <stop offset="85%" stopColor="#c3db5f" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#3c756f" stopOpacity="0.2" />
                  </>
                ) : selectedSector === "qena" ? (
                  <>
                    <stop offset="0%" stopColor="#c3db5f" stopOpacity="0.95" />
                    <stop offset="45%" stopColor="#3c756f" stopOpacity="0.8" />
                    <stop offset="90%" stopColor="#1e4e4a" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#0a2a2c" stopOpacity="0.2" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#4da6ff" stopOpacity="0.9" />
                    <stop offset="45%" stopColor="#3c756f" stopOpacity="0.75" />
                    <stop offset="85%" stopColor="#c3db5f" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#00292d" stopOpacity="0.2" />
                  </>
                )}
              </radialGradient>
            </defs>

            {/* Surrounding Agricultural Parcels (Grid Divisions) */}
            <rect x="50" y="30" width="220" height="190" fill="rgba(60,117,111,0.08)" stroke="rgba(194,214,200,0.2)" strokeWidth="1.5" />
            <rect x="730" y="40" width="220" height="180" fill="rgba(60,117,111,0.08)" stroke="rgba(194,214,200,0.2)" strokeWidth="1.5" />
            <rect x="60" y="260" width="240" height="180" fill="rgba(60,117,111,0.08)" stroke="rgba(194,214,200,0.2)" strokeWidth="1.5" />
            <rect x="710" y="260" width="240" height="180" fill="rgba(60,117,111,0.08)" stroke="rgba(194,214,200,0.2)" strokeWidth="1.5" />

            {/* Central Agricultural Target Parcel (Expansive Organic Radar Polygon) */}
            <polygon
              points="340,70 660,95 720,350 580,430 310,390 270,220"
              fill={`url(#heatGradFluid-${selectedSector})`}
              stroke="#c3db5f"
              strokeWidth="4"
              strokeDasharray="8 4"
            />

            {/* Internal Moisture Contour Rings */}
            <path d="M 380,140 Q 520,130 620,170 Q 660,280 580,360 Q 420,370 340,300 Z" fill="none" stroke="rgba(249, 244, 238, 0.3)" strokeWidth="1.5" />
            <path d="M 430,190 Q 520,180 580,210 Q 610,280 540,320 Q 440,330 400,270 Z" fill="none" stroke="rgba(249, 244, 238, 0.45)" strokeWidth="1.5" />

            {/* Aerospace Pointer Pins & Vector Lead Lines (Inspired by AeroCrop & Agricolus) */}
            {/* Pointer 1: Top-Right to Parcel Core */}
            <polyline points="500,230 680,140 820,140" fill="none" stroke="#c3db5f" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="500" cy="230" r="4" fill="#c3db5f" />
            <circle cx="820" cy="140" r="3" fill="#c3db5f" />

            {/* Pointer 2: Bottom-Left to Root Penetration */}
            <polyline points="440,340 320,340 210,370" fill="none" stroke="#c2d6c8" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="440" cy="340" r="4" fill="#c2d6c8" />
            <circle cx="210" cy="370" r="3" fill="#c2d6c8" />
          </svg>

          {/* Floating Spatial HUD Tag 1: Top-Right (Pinned to Pointer 1) */}
          <div className="absolute top-6 right-6 bg-pine/90 border border-teal/40 rounded-2xl p-4 backdrop-blur-md shadow-xl text-left max-w-xs pointer-events-none hidden md:block">
            <span className="font-mono text-xs text-lime font-bold uppercase block mb-1">
              SAR Backscatter Vector
            </span>
            <div className="text-xs font-mono text-cream/80 space-y-1">
              <div>σ⁰_VV: <strong className="text-lime">{curr.sigma0_vv} dB</strong></div>
              <div>Cross-pol σ⁰_VH: <strong className="text-cream">{curr.sigma0_vh} dB</strong></div>
              <div className="text-[11px] text-cream/50">Water Cloud Model Decoupled</div>
            </div>
          </div>

          {/* Floating Spatial HUD Tag 2: Bottom-Left (Pinned to Pointer 2) */}
          <div className="absolute bottom-6 left-6 bg-pine/90 border border-teal/40 rounded-2xl p-4 backdrop-blur-md shadow-xl text-left max-w-xs pointer-events-none hidden md:block">
            <span className="font-mono text-xs text-teal font-bold uppercase block mb-1">
              Root-Zone Dielectric
            </span>
            <div className="text-xs font-mono text-cream/80 space-y-1">
              <div>Skin Depth: <strong className="text-lime">4.2 cm</strong></div>
              <div>Water Tension: <strong className="text-cream">{curr.soilKpa} kPa</strong></div>
              <div className="text-[11px] text-cream/50">Penetrates Arid Sand Crust</div>
            </div>
          </div>

          {/* Center Mobile HUD Callout */}
          <div className="absolute top-4 left-4 bg-pine/90 border border-teal/40 rounded-xl p-3 backdrop-blur-md shadow-lg text-left pointer-events-none md:hidden">
            <span className="font-mono text-xs text-lime font-bold block">
              mᵥ: {curr.moistureMv} m³/m³
            </span>
            <span className="text-[11px] text-cream/70 font-mono">
              σ⁰: {curr.sigma0_vv} dB • {curr.soilKpa} kPa
            </span>
          </div>

          {/* Stress Index Meter (Bottom-Right) */}
          <div className="absolute bottom-6 right-6 bg-pine/90 border border-teal/40 rounded-2xl p-4 backdrop-blur-md shadow-xl max-w-xs text-left">
            <div className="flex items-center justify-between text-xs font-sans mb-1.5 gap-4">
              <span className="text-cream/80 font-medium">Crop Stress Index:</span>
              <span className={`font-mono font-bold ${curr.stressIndex > 50 ? "text-[#f4a261]" : "text-lime"}`}>
                {curr.stressIndex} / 100
              </span>
            </div>
            <div className="w-44 h-2 bg-teal/30 rounded-full overflow-hidden flex">
              <div
                className={`h-full transition-all duration-500 ${
                  curr.stressIndex > 50 ? "bg-[#f4a261]" : "bg-lime"
                }`}
                style={{ width: `${curr.stressIndex}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Viewport Control Strip */}
        <div className="relative z-10 pt-4 border-t border-teal/25 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-cream/75">
          <div className="flex items-center gap-3">
            <span className="text-lime font-semibold">Active Frequency: 5.405 GHz (λ = 5.55 cm)</span>
            <span className="text-cream/40">•</span>
            <span>Zero atmospheric attenuation</span>
          </div>
          <div className="text-cream/60">
            PWP Threshold: <strong className="text-cream">{curr.pwpLimit} m³/m³</strong>
          </div>
        </div>
      </div>

      {/* Fluid Unboxed Telemetry Ribbon (No Box Clumping — Pure Editorial Flow) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 mt-16 pt-8 border-t border-teal/15">
        {/* Metric 1: Volumetric Soil Moisture & Water Tension */}
        <div className="space-y-4">
          <span className="font-mono text-xs text-teal font-semibold uppercase tracking-wider block">
            01 // VOLUMETRIC MOISTURE (mᵥ)
          </span>
          <div className="text-5xl sm:text-6xl font-bold font-mono text-pine tracking-tight">
            {curr.moistureMv} <span className="text-lg font-sans font-normal text-teal">m³/m³</span>
          </div>
          <p className="text-sm text-pine/75 font-sans leading-relaxed">
            {isAr
              ? `الرطوبة الحجمية للتربة في عمق الجذور. حد الذبول الدائم (PWP) عند ${curr.pwpLimit} م³/م³.`
              : `Volumetric water content derived via C-band dielectric coupling. Permanent Wilting Point at ${curr.pwpLimit} m³/m³.`}
          </p>
          <div className="pt-4 border-t border-teal/15 flex items-center justify-between text-xs font-mono text-pine/70">
            <span>Soil Tension: <strong>{curr.soilKpa} kPa</strong></span>
            <span>Soil Temp: <strong>{curr.tempC} °C</strong></span>
          </div>
        </div>

        {/* Metric 2: Canopy Decoupling & Optical Fusion */}
        <div className="space-y-4">
          <span className="font-mono text-xs text-teal font-semibold uppercase tracking-wider block">
            02 // CANOPY FUSION (NDVI & NDWI)
          </span>
          <div className="flex items-baseline gap-4">
            <div className="text-5xl sm:text-6xl font-bold font-mono text-pine tracking-tight">
              {curr.ndvi}
            </div>
            <span className="text-xs font-mono text-teal">NDVI Vigor</span>
          </div>
          <p className="text-sm text-pine/75 font-sans leading-relaxed">
            {isAr ? curr.noteAr : curr.noteEn}
          </p>
          <div className="pt-4 border-t border-teal/15 flex items-center justify-between text-xs font-mono text-pine/70">
            <span>Water Stress NDWI: <strong>{curr.ndwi}</strong></span>
            <span className="text-teal font-semibold">Sentinel-2 B8/B11</span>
          </div>
        </div>

        {/* Metric 3: Agronomy Action & Nile Water Saving */}
        <div className="space-y-4">
          <span className="font-mono text-xs text-teal font-semibold uppercase tracking-wider block">
            03 // REPLENISHMENT ACTION
          </span>
          <div className="flex items-center gap-4">
            <RootSystemLineArt className="w-12 h-12 text-teal shrink-0" />
            <div className="text-sm font-semibold text-pine font-sans">
              {isAr ? "توصية الري الميداني الدقيق" : "Precision Root Replenishment"}
            </div>
          </div>
          <p className="text-sm text-pine/80 font-sans leading-relaxed">
            {isAr ? curr.recommendationAr : curr.recommendationEn}
          </p>
          <div className="pt-4 border-t border-teal/15 text-xs font-sans text-teal font-medium">
            ✓ Rationalizing Nile allocation through calibrated soil horizons
          </div>
        </div>
      </div>
    </section>
  );
}
