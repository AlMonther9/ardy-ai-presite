"use client";

import { useState } from "react";
import { DielectricFresnelLineArt, RootSystemLineArt } from "./LineArt";

interface ResearchLabProps {
  lang: "en" | "ar";
}

export default function ResearchLab({ lang }: ResearchLabProps) {
  const [moisture, setMoisture] = useState(0.24);
  const isAr = lang === "ar";

  const epsReal = +(3.5 + moisture * 75.0).toFixed(1);
  const epsImag = +(0.3 + moisture * 28.1).toFixed(1);

  const sqrtEpsReal = Math.sqrt(Math.max(1, epsReal));
  const r0 = +(
    Math.pow(1 - sqrtEpsReal, 2) / Math.pow(1 + sqrtEpsReal, 2)
  ).toFixed(3);

  const sigma0_dB = +(-18.2 + 26.5 * moisture).toFixed(1);
  const skinDepth_cm = +(Math.max(0.8, 5.5 / Math.sqrt(epsReal * 0.4))).toFixed(1);

  return (
    <section id="research-lab" className="w-full max-w-[1600px] mx-auto px-4 sm:px-12 lg:px-16 py-14 sm:py-24 border-t border-teal/15">
      {/* Editorial Fluid Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-teal/15">
        <div className="max-w-3xl">
          <span className="font-mono text-xs text-teal font-semibold uppercase tracking-widest block mb-2">
            {isAr ? "مختبر المحاكاة التفاعلي • فيزياء العزل الكهربائي" : "INTERACTIVE DIELECTRIC PERMITTIVITY BENCH"}
          </span>
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-pine font-sans">
            {isAr ? "محاكاة التفاعل الكهرومغناطيسي مع رطوبة التربة" : "Electromagnetic Microwave & Soil Moisture Coupling"}
          </h2>
          <p className="text-sm sm:text-lg text-pine/75 mt-3 sm:mt-4 leading-relaxed font-sans max-w-2xl">
            {isAr
              ? "حرك مؤشر الرطوبة الحجمية لتشهد كيف يؤدي قطب الماء السائل إلى قفزة هائلة في ثابت العزل للتربة، مما يضاعف معامل انعكاس فرينل وقدرة الصدى الراداري العائد إلى القمر الصناعي."
              : "Adjust the volumetric soil moisture slider to observe the stark dielectric contrast between dry mineral matrix and liquid water at C-band, governing Fresnel reflection and radar backscatter returned to Sentinel-1."}
          </p>
        </div>

        {/* Live Formula Callout */}
        <div className="font-mono text-xs text-teal self-start lg:self-end text-left lg:text-right">
          <span className="text-pine font-bold block text-sm">σ⁰ = C + D · mᵥ</span>
          <span className="text-pine/50">C ≈ -18.2 dB • D ≈ 26.5 dB/(m³/m³)</span>
        </div>
      </div>

      {/* Fluid Interactive Workbench Console (Uncontained & Screen-Filling) */}
      <div className="mt-12 space-y-12">
        {/* Grand Full-Width Slider Section — Unboxed, Clean & Fluid */}
        <div className="py-8 border-b border-teal/15">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-mono text-teal font-semibold block uppercase tracking-wider mb-1">
                VARIABLE CONTROL // VOLUMETRIC SOIL MOISTURE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-pine font-sans">
                {isAr ? "مؤشر الرطوبة الحجمية للتربة (mᵥ):" : "Root-Zone Volumetric Moisture Slider (mᵥ)"}
              </h3>
              <p className="text-xs sm:text-sm text-pine/60 font-sans mt-1">
                {isAr
                  ? "النطاق الطبيعي للتربة الزراعية في مصر: 0.05 إلى 0.45 م³/م³"
                  : "Field capacity spectrum: 0.05 (hyper-arid sand) to 0.45 (saturated clay loam)"}
              </p>
            </div>

            <div className="text-6xl sm:text-7xl font-mono font-bold text-pine tracking-tight">
              {moisture.toFixed(2)} <span className="text-xl font-sans font-normal text-teal">m³/m³</span>
            </div>
          </div>

          <input
            type="range"
            min="0.05"
            max="0.45"
            step="0.01"
            value={moisture}
            onChange={(e) => setMoisture(parseFloat(e.target.value))}
            className="w-full h-3.5 bg-sage/35 rounded-lg appearance-none cursor-pointer accent-pine"
          />

          <div className="flex justify-between text-xs font-mono text-pine/50 mt-4">
            <span>0.05 m³/m³ (Hyper-Arid Toshka Sand)</span>
            <span className="text-teal font-semibold">0.25 m³/m³ (Optimal Field Capacity)</span>
            <span>0.45 m³/m³ (Saturated Nile Delta Clay)</span>
          </div>
        </div>

        {/* Fluid 4-Column Physical Telemetry Readout (No Box Borders — Breathable Hairlines) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 py-4">
          {/* Readout 1: Complex Permittivity */}
          <div className="space-y-3 lg:pr-8 lg:border-r border-teal/15">
            <span className="text-xs font-mono text-teal uppercase font-semibold block">
              01 // PERMITTIVITY (ε*)
            </span>
            <div className="text-4xl sm:text-5xl font-mono font-bold text-pine tracking-tight">
              {epsReal} <span className="text-base font-normal text-teal">- j{epsImag}</span>
            </div>
            <p className="text-xs sm:text-sm text-pine/75 font-sans leading-relaxed">
              {isAr
                ? "يرتفع الجزء الحقيقي والخيالي بشدة مع زيادة الماء السائل عالي القطبية."
                : "Bulk relative complex permittivity jumps sharply as dipolar liquid water molecules dominate pore space."}
            </p>
            <div className="pt-3 border-t border-teal/15 text-[11px] font-mono text-pine/50">
              ε_dry ≈ 3–5 vs ε_water ≈ 80 + j30
            </div>
          </div>

          {/* Readout 2: Fresnel Power Reflection */}
          <div className="space-y-3 lg:pr-8 lg:border-r border-teal/15">
            <span className="text-xs font-mono text-teal uppercase font-semibold block">
              02 // FRESNEL RATIO (R₀)
            </span>
            <div className="text-4xl sm:text-5xl font-mono font-bold text-pine tracking-tight">
              {r0} <span className="text-base font-normal text-teal">ratio</span>
            </div>
            <p className="text-xs sm:text-sm text-pine/75 font-sans leading-relaxed">
              {isAr
                ? "نسبة القدرة الكهرومغناطيسية المرتدة مباشرة عند السطح الفاصل."
                : "Fraction of incident normal microwave power reflected directly at the dielectric soil-air boundary."}
            </p>
            <div className="pt-3 border-t border-teal/15 text-[11px] font-mono text-pine/50">
              R₀ = |(1 - √ε*)/(1 + √ε*)|²
            </div>
          </div>

          {/* Readout 3: Sentinel-1 Radar Backscatter */}
          <div className="space-y-3 lg:pr-8 lg:border-r border-teal/15">
            <span className="text-xs font-mono text-teal uppercase font-semibold block">
              03 // RADAR BACKSCATTER (σ⁰)
            </span>
            <div className="text-4xl sm:text-5xl font-mono font-bold text-pine tracking-tight">
              {sigma0_dB} <span className="text-base font-normal text-teal">dB (VV)</span>
            </div>
            <p className="text-xs sm:text-sm text-pine/75 font-sans leading-relaxed">
              {isAr
                ? "شدة صدى النبضة الرادارية العائدة إلى هوائي القمر الصناعي."
                : "Normalized radar cross section in linear decibel scale returned to Sentinel-1 satellite antenna."}
            </p>
            <div className="pt-3 border-t border-teal/15 text-[11px] font-mono text-pine/50">
              Calibrated for Egyptian Loams
            </div>
          </div>

          {/* Readout 4: Microwave Skin Depth */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-teal uppercase font-semibold block">
              04 // SKIN DEPTH (δ)
            </span>
            <div className="text-4xl sm:text-5xl font-mono font-bold text-pine tracking-tight">
              {skinDepth_cm} <span className="text-base font-normal text-teal">cm</span>
            </div>
            <p className="text-xs sm:text-sm text-pine/75 font-sans leading-relaxed">
              {isAr
                ? "تتلاشى الموجة الرادارية أسرع مع زيادة البلل، لتركز القياس في أعلى 5 سم."
                : "Dielectric attenuation confines direct volumetric measurement strictly to the top 0–5 cm root zone."}
            </p>
            <div className="pt-3 border-t border-teal/15 text-[11px] font-mono text-pine/50">
              C-Band Operating Wavelength λ = 5.55 cm
            </div>
          </div>
        </div>

        {/* Large Architectural Physical Diagram Bar (Fluid & Panoramic) */}
        <div className="rounded-[36px] bg-[#002428] text-cream border border-teal/25 p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="flex items-center gap-6">
            <DielectricFresnelLineArt className="w-16 h-16 text-lime shrink-0" />
            <div className="space-y-1">
              <span className="font-mono text-xs text-lime uppercase tracking-wider font-semibold block">
                {isAr ? "الأساس الفيزيائي للاستشعار" : "FOUNDATIONAL DIELECTRIC AXIOM"}
              </span>
              <p className="text-sm sm:text-base text-cream/85 font-sans leading-relaxed max-w-2xl">
                {isAr
                  ? "المعادلة الحاكمة: ترفع جزيئات الماء الحر ثابت العزل الكلي للتربة بـ ٢٠ ضعفاً مقارنة بالحبيبات الرملية الجافة، مما يمنح الرادار حساسية استثنائية لرصد الرطوبة دون تأثر بالغيوم أو عواصف الغبار."
                  : "Free liquid water molecules elevate bulk soil permittivity by more than 20x compared to dry mineral particles, granting C-band radar extreme sensitivity to moisture without degradation from clouds or atmospheric aerosols."}
              </p>
            </div>
          </div>

          <div className="font-mono text-xs text-cream/70 text-right shrink-0">
            <span className="text-lime font-bold text-sm block">Copernicus Sentinel-1 SAR</span>
            <span>Google Earth Engine Pipeline</span>
          </div>
        </div>
      </div>
    </section>
  );
}
