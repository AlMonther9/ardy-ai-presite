"use client";

import { Radio, Waves, Cpu, Satellite, BookOpen, Layers } from "lucide-react";

interface EquationsSectionProps {
  lang: "en" | "ar";
}

export default function EquationsSection({ lang }: EquationsSectionProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16 md:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage/20 border border-teal/20 text-teal text-xs font-mono font-semibold mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{lang === "en" ? "PHYSICAL PRINCIPLES & FORMULATIONS" : "الأسس الفيزيائية والمعادلات الرياضية"}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-pine mb-4">
          {lang === "en" ? "Microwave Radar & Inversion Mathematics" : "رياضيات الرادار ونماذج المعايرة العكسية"}
        </h2>
        <p className="text-base sm:text-lg text-pine/80 leading-relaxed font-sans">
          {lang === "en"
            ? "Precision agriculture in Egypt cannot rely solely on optical satellites blinded by clouds or dust. Our system executes rigorous physical electromagnetic wave inversion calibrated by ground IoT."
            : "يعتمد النظام على تحويل معاملات التشتت الراداري والموجات الكهرومغناطيسية إلى مؤشرات رطوبة حجمية حقيقية للتربة المصرية عبر نماذج فيزيائية دقيقة."}
        </p>
      </div>

      {/* Grid of 4 Physical Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pillar 1: Radar Equation for Distributed Targets */}
        <div className="bg-white/80 border border-teal/20 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-4 border-b border-sage/40 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal text-cream">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-pine text-base sm:text-lg">
                  {lang === "en" ? "1. Radar Equation for Distributed Targets" : "١. معادلة الرادار للأهداف الممتدة"}
                </h3>
                <span className="text-xs font-mono text-teal">Sentinel-1 C-Band (f₀ = 5.405 GHz, λ = 5.55 cm)</span>
              </div>
            </div>
            <span className="text-[11px] font-mono bg-sage/30 text-pine px-2 py-1 rounded">Active RF</span>
          </div>

          <div className="bg-pine text-cream p-4 rounded-xl font-mono text-xs overflow-x-auto my-4 text-center leading-relaxed">
            <div className="text-lime font-bold text-sm mb-1">
              Pᵣ = [ Pₜ · G² · λ² · σ⁰ · A_res ] / [ (4π)³ · R⁴ ]
            </div>
            <div className="text-[11px] text-cream/70 pt-1 border-t border-teal/40 mt-2">
              Pᵣ: Echo Received Power • G: Antenna Gain • σ⁰: Backscatter Coefficient (dB) • R: Slant Range
            </div>
          </div>

          <p className="text-xs sm:text-sm text-pine/80 leading-relaxed">
            {lang === "en"
              ? "Agricultural soil acts as a continuous distributed scatterer. The differential backscattering coefficient (σ⁰) is modulated by soil dielectric permittivity (ε*), surface roughness height (s), correlation length (l), and incident angle (θᵢ) across co-polarized (VV) and cross-polarized (VH) channels."
              : "تخضع الإشارة المرتدة من التربة الزراعية لمعادلة الرادار للأهداف الممتدة، حيث يتأثر معامل التشتت (σ⁰) مباشرة برطوبة التربة وخشونة السطح وزاوية الورود والاستقطاب الراداري."}
          </p>
        </div>

        {/* Pillar 2: Dielectric Permittivity & Fresnel Reflection */}
        <div className="bg-white/80 border border-teal/20 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-4 border-b border-sage/40 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal text-cream">
                <Waves className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-pine text-base sm:text-lg">
                  {lang === "en" ? "2. Dielectric Permittivity & Fresnel Coupling" : "٢. ثابت العزل ومعامل انعكاس فرينل"}
                </h3>
                <span className="text-xs font-mono text-teal">Contrast: ε_dry ≈ 3–5 vs ε_water ≈ 80 + j30</span>
              </div>
            </div>
            <span className="text-[11px] font-mono bg-sage/30 text-pine px-2 py-1 rounded">EM Physics</span>
          </div>

          <div className="bg-pine text-cream p-4 rounded-xl font-mono text-xs overflow-x-auto my-4 text-center leading-relaxed">
            <div className="text-lime font-bold text-sm mb-1">
              R₀ = | (1 - √(ε*)) / (1 + √(ε*)) |²
            </div>
            <div className="text-[11px] text-cream/70 pt-1 border-t border-teal/40 mt-2">
              ε* = ε&apos; - jε&apos;&apos; • R₀: Normal Fresnel Power Reflection Coefficient
            </div>
          </div>

          <p className="text-xs sm:text-sm text-pine/80 leading-relaxed">
            {lang === "en"
              ? "Because free water has an exceptionally high dielectric constant compared to dry minerals, any increase in soil moisture triggers a steep rise in the composite dielectric constant (ε*). This elevates the surface reflection coefficient (R₀), bouncing more microwave power back to the satellite."
              : "يرتكز القياس الراداري على التباين الشاسع في ثابت العزل بين حبيبات التربة الجافة والماء السائل، مما يرفع معامل الانعكاس الكهرومغناطيسي لفرينل كلما زادت الرطوبة الحجمية."}
          </p>
        </div>

        {/* Pillar 3: Water Cloud Model (WCM) Inversion */}
        <div className="bg-white/80 border border-teal/20 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-4 border-b border-sage/40 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal text-cream">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-pine text-base sm:text-lg">
                  {lang === "en" ? "3. Water Cloud Model (WCM) Decoupling" : "٣. نموذج سحابة الماء وفك التشتت"}
                </h3>
                <span className="text-xs font-mono text-teal">Attanborough & Ulaby Incoherent Formulation</span>
              </div>
            </div>
            <span className="text-[11px] font-mono bg-sage/30 text-pine px-2 py-1 rounded">GEE Pipeline</span>
          </div>

          <div className="bg-pine text-cream p-4 rounded-xl font-mono text-xs overflow-x-auto my-4 text-center leading-relaxed">
            <div className="text-lime font-bold text-sm mb-1">
              mᵥ = [ ( (σ⁰_total - σ⁰_veg) / τ² ) - C ] / D
            </div>
            <div className="text-[11px] text-cream/70 pt-1 border-t border-teal/40 mt-2">
              σ⁰_total = σ⁰_veg + τ² · σ⁰_soil • τ² = exp(-2·B·V₂·sec(θᵢ)) • σ⁰_soil = C + D·mᵥ
            </div>
          </div>

          <p className="text-xs sm:text-sm text-pine/80 leading-relaxed">
            {lang === "en"
              ? "In vegetated canopies, radar returns mix leaf scatter (σ⁰_veg) with soil backscatter (σ⁰_soil). The WCM uses optical Sentinel-2 vegetation indices (V₁, V₂ via NDVI & LAI) to attenuate canopy noise, allowing our regression model to solve for volumetric soil moisture (mᵥ)."
              : "يعمل نموذج سحابة الماء على عزل التشتت النباتي للأوراق والسيقان بالاعتماد على مرئيات Sentinel-2 الطيفية، مما يتيح استخلاص إشارة التربة الخالصة وحساب الرطوبة بدقة."}
          </p>
        </div>

        {/* Pillar 4: In-Situ IoT Ground-Truth Calibration */}
        <div className="bg-white/80 border border-teal/20 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-4 border-b border-sage/40 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal text-cream">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-pine text-base sm:text-lg">
                  {lang === "en" ? "4. In-Situ IoT Ground-Truth Calibration" : "٤. شبكة المعايرة الميدانية بإنترنت الأشياء"}
                </h3>
                <span className="text-xs font-mono text-teal">Custom ECE PCB Telemetry Nodes (LoRaWAN/Cellular)</span>
              </div>
            </div>
            <span className="text-[11px] font-mono bg-sage/30 text-pine px-2 py-1 rounded">Hardware + Cloud</span>
          </div>

          <div className="bg-pine text-cream p-4 rounded-xl font-mono text-xs overflow-x-auto my-4 text-center leading-relaxed">
            <div className="text-lime font-bold text-sm mb-1">
              Optimization Target: argmin(C, D) || mᵥ_radar(C, D) - mᵥ_IoT ||²
            </div>
            <div className="text-[11px] text-cream/70 pt-1 border-t border-teal/40 mt-2">
              FDR High Frequency Soil Probes • Edge Firmware • Encrypted MQTT/TLS Telemetry
            </div>
          </div>

          <p className="text-xs sm:text-sm text-pine/80 leading-relaxed">
            {lang === "en"
              ? "Global satellite models drift when applied to Egyptian clay and arid sandy loams. Our custom embedded hardware deployed across pilot farms streams ground-truth dielectric permittivity, EC, and moisture, continually training and calibrating coefficients C and D."
              : "لمعايرة الثوابت الرياضية وضمان ملاءمتها للتربة المصرية، صمم فريق العمل عقد استشعار ميدانية مخصصة تنقل رطوبة وملوحة وحرارة التربة آنياً لتدريب خوارزميات التعلم الآلي."}
          </p>
        </div>
      </div>
    </section>
  );
}
