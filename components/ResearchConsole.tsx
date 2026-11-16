"use client";

import { useState } from "react";
import {
  Satellite,
  Waves,
  Radio,
  Cpu,
  AlertTriangle,
  Droplets,
  Thermometer,
  Activity,
  Layers,
  ChevronRight,
  TrendingDown,
  Info,
} from "lucide-react";

interface ResearchConsoleProps {
  lang: "en" | "ar";
}

export default function ResearchConsole({ lang }: ResearchConsoleProps) {
  const [selectedSector, setSelectedSector] = useState<"toshka" | "qena" | "delta">("toshka");
  const [activeTab, setActiveTab] = useState<"telemetry" | "wcm_math" | "salinity">("telemetry");

  const sectors = {
    toshka: {
      nameEn: "Toshka Oasis Basin (Sector 4)",
      nameAr: "حوض توشكى للاستصلاح (قطاع ٤)",
      region: "Upper Egypt (Desert Reclamation)",
      cropEn: "Wheat (Strategic Winter Crop)",
      cropAr: "قمح (محصول استراتيجي شتوي)",
      area: "134.5 Hectares",
      revisit: "Sentinel-1 Orbit 142 (Every 6 Days)",
      soilType: "Sandy Arid Crust with Clay Substratum",
      moistureMv: 0.162, // m3/m3
      soilKpa: 18.4,
      pwpLimit: 0.145, // Permanent wilting point threshold
      tempC: 31.8,
      ecSalinity: "1.4 dS/m (Normal)",
      stressIndex: 68, // High stress
      sigma0_vv: -14.2,
      sigma0_vh: -21.6,
      ndvi: 0.42,
      ndwi: -0.12,
      statusEn: "Water Deficit Alert: Approaching Permanent Wilting Point (PWP)",
      statusAr: "تنبيه إجهاد مائي: اقتراب الرطوبة من نقطة الذبول الدائم (PWP)",
      waterSavings: "Estimated 24% water extraction reduction vs flood schedule",
      irrigationAction: "Recommended replenishment: 18.5 mm within 14 hours",
    },
    qena: {
      nameEn: "Qena Nile Basin (Sector 11)",
      nameAr: "حوض وادي قنا (قطاع ١١)",
      region: "Nile Alluvial Valley",
      cropEn: "Corn (Maize - Mid Vegetative)",
      cropAr: "ذرة شامية (مرحلة النمو الخضري)",
      area: "48.2 Hectares",
      revisit: "Sentinel-1 Orbit 73 (Every 6 Days)",
      soilType: "Fine Nile Alluvial Silt Loam",
      moistureMv: 0.325,
      soilKpa: 52.6,
      pwpLimit: 0.18,
      tempC: 28.4,
      ecSalinity: "0.8 dS/m (Optimal)",
      stressIndex: 24, // Low stress
      sigma0_vv: -9.8,
      sigma0_vh: -16.4,
      ndvi: 0.76,
      ndwi: 0.22,
      statusEn: "Optimal Hydration: WCM Decoupled Canopy Interference",
      statusAr: "ترطيب مثالي: تم عزل التشتت النباتي بنموذج سحابة الماء",
      waterSavings: "Irrigation paused. Soil moisture adequate for 48 hours",
      irrigationAction: "Next window: Wednesday 05:00 AM (Drip system)",
    },
    delta: {
      nameEn: "Kafr El-Sheikh Coastal Delta",
      nameAr: "دلتا كفر الشيخ (حوض ٧)",
      region: "Lower Egypt Delta Fringe",
      cropEn: "Rice Paddies (Flooded & Intermittent)",
      cropAr: "أرز (ري بالترطيب والتجفيف)",
      area: "92.0 Hectares",
      revisit: "Sentinel-1 Orbit 116 (Every 6 Days)",
      soilType: "Heavy Clay Loam / High Salinity Aquifer",
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
      statusEn: "Saline Upwelling Watch: Shallow Saline Water Table Warning",
      statusAr: "مراقبة الصرف: تحذير من تجمع المياه الجوفية المالحة عند الجذور",
      waterSavings: "Prevents secondary salinization through calibrated drainage",
      irrigationAction: "Flush cycle recommended to suppress deep capillary salts",
    },
  };

  const curr = sectors[selectedSector];

  return (
    <div className="w-full bg-[#001e22] text-cream rounded-3xl border border-teal/40 shadow-2xl p-6 sm:p-8 md:p-10 font-sans">
      {/* Console Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-teal/30">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" />
            <h3 className="text-xl md:text-2xl font-bold text-cream tracking-tight flex items-center gap-2">
              <span>{lang === "en" ? "Microwave Precision Agriculture Console" : "لوحة المراقبة الرادارية للزراعة الدقيقة"}</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-teal/30 text-lime border border-teal/40">
                ECE-GEE ENGINE v1.4
              </span>
            </h3>
          </div>
          <p className="text-xs text-cream/70 font-mono">
            AL-AZHAR UNIVERSITY ECE LAB • COPENICUS SENTINEL-1/2 ACTIVE SENSING • EGYPT BASINS
          </p>
        </div>

        {/* Basin Sector Switcher */}
        <div className="flex items-center gap-1.5 bg-pine/90 p-1.5 rounded-xl border border-teal/30 self-start lg:self-auto">
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
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedSector === s.id
                  ? "bg-lime text-pine font-bold shadow-xs"
                  : "text-cream/70 hover:text-cream hover:bg-teal/20"
              }`}
            >
              {lang === "en" ? s.labelEn : s.labelAr}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Vector Parcel Display, Right Telemetry and Equations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Simulated High-Resolution Satellite Parcel HUD (Inspired by AeroCrop.ai & Laptop Monitor) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative h-[340px] sm:h-[400px] rounded-2xl overflow-hidden border border-teal/40 bg-[#00171a] p-4 flex flex-col justify-between">
            {/* Background Grid & Agricultural Matrix */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#3c756f 1px, transparent 1px), linear-gradient(to right, rgba(60,117,111,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(60,117,111,0.15) 1px, transparent 1px)",
                backgroundSize: "24px 24px, 48px 48px, 48px 48px",
              }}
            />

            {/* Stylized Satellite Aerial Parcel with Thermal Heatmap Gradient */}
            <div className="absolute inset-6 rounded-2xl border border-dashed border-teal/40 overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="none">
                <defs>
                  <radialGradient id={`heatGrad-${selectedSector}`} cx="50%" cy="50%" r="50%">
                    {selectedSector === "toshka" ? (
                      <>
                        <stop offset="0%" stopColor="#ff4d4d" stopOpacity="0.85" />
                        <stop offset="45%" stopColor="#ffa64d" stopOpacity="0.65" />
                        <stop offset="85%" stopColor="#c3db5f" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#3c756f" stopOpacity="0.2" />
                      </>
                    ) : selectedSector === "qena" ? (
                      <>
                        <stop offset="0%" stopColor="#c3db5f" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#3c756f" stopOpacity="0.75" />
                        <stop offset="90%" stopColor="#1e4e4a" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#0a2a2c" stopOpacity="0.2" />
                      </>
                    ) : (
                      <>
                        <stop offset="0%" stopColor="#4da6ff" stopOpacity="0.85" />
                        <stop offset="40%" stopColor="#3c756f" stopOpacity="0.7" />
                        <stop offset="80%" stopColor="#c3db5f" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#00292d" stopOpacity="0.2" />
                      </>
                    )}
                  </radialGradient>
                </defs>

                {/* Surrounding Field Boundaries */}
                <rect x="20" y="20" width="160" height="150" fill="rgba(60,117,111,0.08)" stroke="rgba(60,117,111,0.25)" strokeWidth="1.5" />
                <rect x="420" y="30" width="150" height="140" fill="rgba(60,117,111,0.08)" stroke="rgba(60,117,111,0.25)" strokeWidth="1.5" />
                <rect x="40" y="220" width="180" height="150" fill="rgba(60,117,111,0.08)" stroke="rgba(60,117,111,0.25)" strokeWidth="1.5" />
                <rect x="390" y="220" width="180" height="150" fill="rgba(60,117,111,0.08)" stroke="rgba(60,117,111,0.25)" strokeWidth="1.5" />

                {/* Central Target Agricultural Parcel Polygon */}
                <polygon
                  points="210,70 390,95 430,280 340,340 180,310 160,180"
                  fill={`url(#heatGrad-${selectedSector})`}
                  stroke="#c3db5f"
                  strokeWidth="3"
                  strokeDasharray="6 3"
                />

                {/* Target Pin in Field */}
                <circle cx="290" cy="200" r="5" fill="#f9f4ee" />
                <circle cx="290" cy="200" r="14" fill="none" stroke="#c3db5f" strokeWidth="2" className="animate-ping" />
              </svg>

              {/* In-Field Floating HUD Metric Badge */}
              <div className="absolute top-8 left-8 bg-pine/90 border border-teal/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-left pointer-events-none">
                <div className="flex items-center gap-1.5 text-lime text-xs font-bold font-mono mb-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{curr.cropEn.split(" ")[0]} Target Parcel</span>
                </div>
                <div className="text-[11px] font-mono text-cream/80 space-y-0.5">
                  <div>Soil Moisture: <span className="text-lime font-bold">{curr.moistureMv} m³/m³</span></div>
                  <div>Tension: <span className="text-cream font-semibold">{curr.soilKpa} kPa</span></div>
                  <div>Salinity: <span className="text-cream font-semibold">{curr.ecSalinity}</span></div>
                </div>
              </div>

              {/* Stress Level Indicator (Image 2 style) */}
              <div className="absolute bottom-6 right-6 bg-pine/90 border border-teal/40 rounded-xl p-3 backdrop-blur-md shadow-xl max-w-xs text-left">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-cream/80">Crop Stress Index:</span>
                  <span className={`font-bold ${curr.stressIndex > 50 ? "text-red-400" : "text-lime"}`}>
                    {curr.stressIndex} / 100
                  </span>
                </div>
                <div className="w-44 h-2 bg-teal/30 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full transition-all duration-500 ${
                      curr.stressIndex > 50 ? "bg-red-400" : "bg-lime"
                    }`}
                    style={{ width: `${curr.stressIndex}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Top Bar of Map HUD */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-cream/70">
              <span className="text-teal font-semibold flex items-center gap-1.5">
                <Satellite className="w-3.5 h-3.5 text-lime" />
                <span>POLYGON: {curr.nameEn}</span>
              </span>
              <span className="bg-pine/80 px-2 py-0.5 rounded border border-teal/30 text-[10px]">
                {curr.area} • 10m Ground Res
              </span>
            </div>

            {/* Bottom Bar of Map HUD */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-teal/30 text-[11px] font-mono">
              <span className="text-cream/80">
                SAR Revisit: <strong className="text-lime">{curr.revisit}</strong>
              </span>
              <span className="text-teal">
                C-Band λ=5.55cm Skin Depth: <strong className="text-cream">0 - 5.0 cm</strong>
              </span>
            </div>
          </div>

          {/* Actionable Precision Irrigation Advisory Box */}
          <div className="bg-pine/80 border border-teal/40 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-teal/20 text-lime border border-teal/40 shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cream text-sm">
                    {lang === "en" ? "Actionable Nile Water Optimization Directive" : "توجيه إدارة مياه النيل الميداني"}
                  </span>
                  <span className="text-[10px] text-lime font-bold uppercase tracking-wider">
                    {curr.waterSavings.includes("24%") ? "HIGH SAVINGS" : "ACTIVE"}
                  </span>
                </div>
                <p className="text-cream/80 leading-relaxed font-sans text-xs">
                  {lang === "en" ? curr.statusEn : curr.statusAr}. {curr.irrigationAction}.
                </p>
                <div className="text-teal font-semibold text-[11px] pt-1">
                  ✓ {curr.waterSavings}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Physical Variables, WCM Math & Ground Truth Verification */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Diagnostic Mode Tabs */}
          <div className="flex rounded-xl bg-pine p-1 border border-teal/30 text-xs font-mono">
            {(
              [
                { id: "telemetry", labelEn: "Radar Echo Telemetry", labelAr: "القياسات الرادارية" },
                { id: "wcm_math", labelEn: "WCM Model Decoupling", labelAr: "معادلات WCM" },
                { id: "salinity", labelEn: "Salinity & Salinization", labelAr: "مكافحة التملح" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex-1 py-2 px-2 rounded-lg transition-all cursor-pointer font-medium text-[11px] ${
                  activeTab === t.id
                    ? "bg-teal text-cream font-bold shadow-xs"
                    : "text-cream/70 hover:text-cream hover:bg-teal/20"
                }`}
              >
                {lang === "en" ? t.labelEn : t.labelAr}
              </button>
            ))}
          </div>

          {activeTab === "telemetry" && (
            <div className="space-y-4">
              {/* Telemetry Metric Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-pine/70 border border-teal/30 rounded-xl p-3.5">
                  <span className="text-[10px] font-mono text-cream/60 uppercase block mb-1">
                    Volumetric Moisture (mᵥ)
                  </span>
                  <div className="text-2xl font-bold font-mono text-lime">
                    {curr.moistureMv} <span className="text-xs text-cream/70 font-normal">m³/m³</span>
                  </div>
                  <div className="text-[10px] font-mono text-cream/50 mt-1">
                    Threshold: {curr.pwpLimit} (PWP)
                  </div>
                </div>

                <div className="bg-pine/70 border border-teal/30 rounded-xl p-3.5">
                  <span className="text-[10px] font-mono text-cream/60 uppercase block mb-1">
                    Differential Backscatter
                  </span>
                  <div className="text-2xl font-bold font-mono text-cream">
                    {curr.sigma0_vv} <span className="text-xs text-teal font-normal">dB (VV)</span>
                  </div>
                  <div className="text-[10px] font-mono text-cream/50 mt-1">
                    Cross-pol: {curr.sigma0_vh} dB (VH)
                  </div>
                </div>

                <div className="bg-pine/70 border border-teal/30 rounded-xl p-3.5">
                  <span className="text-[10px] font-mono text-cream/60 uppercase block mb-1">
                    Canopy Vigor (NDVI)
                  </span>
                  <div className="text-2xl font-bold font-mono text-lime">
                    {curr.ndvi} <span className="text-xs text-cream/70 font-normal">Index</span>
                  </div>
                  <div className="text-[10px] font-mono text-cream/50 mt-1">
                    Sentinel-2 B4/B8 Ratio
                  </div>
                </div>

                <div className="bg-pine/70 border border-teal/30 rounded-xl p-3.5">
                  <span className="text-[10px] font-mono text-cream/60 uppercase block mb-1">
                    Water Stress (NDWI)
                  </span>
                  <div className="text-2xl font-bold font-mono text-cream">
                    {curr.ndwi} <span className="text-xs text-teal font-normal">Index</span>
                  </div>
                  <div className="text-[10px] font-mono text-cream/50 mt-1">
                    Sentinel-2 B8/B11 SWIR
                  </div>
                </div>
              </div>

              {/* Radar In-Situ Verification Box */}
              <div className="bg-pine/80 border border-teal/30 rounded-xl p-4 text-xs font-mono text-cream/80 space-y-2">
                <div className="flex items-center justify-between text-teal border-b border-teal/20 pb-1.5 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-lime" />
                    <span>In-Situ IoT Ground-Truth Node</span>
                  </span>
                  <span className="text-lime text-[10px]">SYNCED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/60">Node ID:</span>
                  <span className="text-cream">NODE-EGY-AZHAR-07</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/60">Telemetry Link:</span>
                  <span className="text-cream">LoRaWAN 868.1 MHz (SF7/BW125)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/60">Dielectric Probe Sensor:</span>
                  <span className="text-lime font-bold">High Precision FDR 70MHz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/60">Soil Temperature:</span>
                  <span className="text-cream">{curr.tempC} °C</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "wcm_math" && (
            <div className="bg-pine/80 border border-teal/30 rounded-xl p-4 text-xs font-mono text-cream/85 space-y-3">
              <div className="flex items-center gap-2 text-lime font-bold text-sm border-b border-teal/25 pb-2">
                <Waves className="w-4 h-4 text-lime" />
                <span>Water Cloud Model (WCM) Equations</span>
              </div>
              <p className="text-[11px] text-cream/70 font-sans leading-relaxed">
                Direct radar backscatter is decoupled on Google Earth Engine to remove leaf canopy scattering:
              </p>
              <div className="bg-[#00171a] border border-teal/30 rounded-lg p-3 text-[11px] text-lime space-y-1.5">
                <div>σ⁰_total = σ⁰_veg + τ² · σ⁰_soil</div>
                <div className="text-cream/80">σ⁰_veg = A · V₁ · cos(θᵢ) · (1 - τ²)</div>
                <div className="text-cream/80">τ² = exp(-2 · B · V₂ · sec(θᵢ))</div>
                <div className="text-lime font-bold">mᵥ = [ (σ⁰_total - σ⁰_veg)/τ² - C ] / D</div>
              </div>
              <div className="text-[11px] text-cream/70 space-y-1">
                <div><span className="text-teal font-bold">V₁, V₂:</span> Sentinel-2 derived NDVI & LAI canopy metrics</div>
                <div><span className="text-teal font-bold">C, D:</span> Empirical calibration coefficients fitted with Egyptian IoT ground-truth</div>
                <div><span className="text-teal font-bold">θᵢ:</span> Sentinel-1 local incidence angle (39.2°)</div>
              </div>
            </div>
          )}

          {activeTab === "salinity" && (
            <div className="bg-pine/80 border border-teal/30 rounded-xl p-4 text-xs font-mono text-cream/85 space-y-3">
              <div className="flex items-center gap-2 text-lime font-bold text-sm border-b border-teal/25 pb-2">
                <AlertTriangle className="w-4 h-4 text-lime" />
                <span>Nile Delta Soil Salinization Mitigation</span>
              </div>
              <p className="text-[11px] text-cream/70 font-sans leading-relaxed">
                In low-lying Nile Delta sectors, excessive flood irrigation raises saline water tables towards root zones, causing permanent soil degradation:
              </p>
              <div className="bg-[#00171a] border border-teal/30 rounded-lg p-3 text-[11px] space-y-2">
                <div className="flex justify-between">
                  <span className="text-cream/60">Relative Permittivity (ε*):</span>
                  <span className="text-lime font-bold">ε* = ε&apos; - j(ε&apos;&apos; + σ_ionic / (2πfε₀))</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/60">Ionic Loss Factor:</span>
                  <span className="text-cream">Elevated by saline groundwater</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/60">Radar Detection:</span>
                  <span className="text-lime font-bold">Identifies water-table pooling before root damage</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-teal/20 border border-teal/30 text-[11px] text-cream/90 font-sans">
                By replacing static calendar irrigation with SAR dielectric alerts, water tables remain stable, preventing secondary salinization in Kafr El-Sheikh and Beheira.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

