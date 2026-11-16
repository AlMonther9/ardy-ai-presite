"use client";

import {
  SatelliteRadarBeamLineArt,
  DielectricFresnelLineArt,
  WaterCloudModelLineArt,
  IoTProbeLineArt,
} from "./LineArt";

interface EquationsNotebookProps {
  lang: "en" | "ar";
}

export default function EquationsNotebook({ lang }: EquationsNotebookProps) {
  const isAr = lang === "ar";

  return (
    <section id="equations" className="w-full max-w-[1600px] mx-auto px-4 sm:px-12 lg:px-16 py-14 sm:py-24 border-t border-teal/15">
      {/* Editorial Fluid Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-teal/15">
        <div className="max-w-3xl">
          <span className="font-mono text-xs text-teal font-semibold uppercase tracking-widest block mb-2">
            {isAr ? "الأسس الفيزيائية والمعادلات الرياضية" : "RIGOROUS MATHEMATICAL & RF FORMULATIONS"}
          </span>
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-pine font-sans">
            {isAr ? "رياضيات الرادار ونماذج المعايرة العكسية" : "Radar Inversion & Canopy Decoupling Models"}
          </h2>
          <p className="text-sm sm:text-lg text-pine/75 mt-3 sm:mt-4 leading-relaxed font-sans max-w-2xl">
            {isAr
              ? "لا تعتمد الزراعة الدقيقة في مصر على الصور الضوئية التي تحجبها السحب وعواصف الغبار. ينفذ نظامنا معايرة عكسية دقيقة للموجات الكهرومغناطيسية مدعومة بنماذج فيزيائية أصيلة."
              : "Precision agriculture across Egyptian basins cannot rely on optical satellites blinded by dust or cloud cover. Our system executes rigorous physical electromagnetic wave inversion calibrated by ground IoT."}
          </p>
        </div>

        <div className="font-mono text-xs text-teal self-start lg:self-end text-left lg:text-right">
          <span className="text-pine font-bold block text-sm">Al-Azhar University ECE Research</span>
          <span className="text-pine/50">Microwave Remote Sensing Laboratory</span>
        </div>
      </div>

      {/* Bento Grid: Asymmetric Physical Formulations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
        {/* Bento Hero Tile (Span 7): Water Cloud Model (WCM) Decoupling */}
        <div className="lg:col-span-7 rounded-[36px] bg-[#002428] text-cream border border-teal/25 p-8 sm:p-12 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-teal/25 pb-4 mb-6">
              <div className="flex items-center gap-4">
                <WaterCloudModelLineArt className="w-10 h-10 text-lime" />
                <div>
                  <h3 className="font-bold text-xl sm:text-2xl text-cream font-sans">
                    {isAr ? "نموذج سحابة الماء (WCM) وفك التشتت" : "Water Cloud Model (WCM) Decoupling"}
                  </h3>
                  <span className="text-xs text-cream/60 font-mono">Attema & Ulaby Formulation on Google Earth Engine</span>
                </div>
              </div>
              <span className="font-mono text-xs text-lime font-bold uppercase">Core Model</span>
            </div>

            {/* Formula Equation Banner */}
            <div className="bg-[#00171a] border border-teal/35 p-6 rounded-2xl font-mono text-xs overflow-x-auto my-6 text-center leading-relaxed">
              <div className="text-lime font-bold text-base sm:text-lg mb-2">
                mᵥ = [ ( (σ⁰_total - σ⁰_veg) / τ² ) - C ] / D
              </div>
              <div className="text-[11px] text-cream/70 pt-2 border-t border-teal/30 mt-2 font-sans space-y-1">
                <div>σ⁰_total = σ⁰_veg + τ² · σ⁰_soil • τ² = exp(-2 · B · V₂ · sec(θᵢ))</div>
                <div>σ⁰_soil = C + D · mᵥ (Soil Dielectric & Roughness Component)</div>
              </div>
            </div>

            <p className="text-sm text-cream/80 leading-relaxed font-sans mt-4">
              {isAr
                ? "في الحقول المزروعة، يختلط صدى الرادار العائد من الأوراق والسيقان (σ⁰_veg) مع صدى التربة المباشر (σ⁰_soil). يعالج نموذج سحابة الماء هذه الظاهرة بعزل أثر التشتت النباتي باستخدام مؤشرات Sentinel-2 الطيفية (NDVI و LAI)، مما يتيح حساب رطوبة التربة الحجمية بدقة تفريق ١٠ أمتار."
                : "In vegetated agricultural fields, radar echoes mix direct leaf scattering (σ⁰_veg) with attenuated soil backscatter (σ⁰_soil). The WCM decouples canopy attenuation using multispectral Sentinel-2 NDVI and LAI metrics, enabling pure soil volumetric moisture inversion."}
            </p>
          </div>

          <div className="pt-6 mt-8 border-t border-teal/25 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-cream/60">
            <span>Canopy Attenuation Factor: τ² = exp(-2·B·V₂·sec(θᵢ))</span>
            <span className="text-lime">Calibrated on Egyptian Wheat & Corn</span>
          </div>
        </div>

        {/* Bento Tile 2 (Span 5): Radar Equation for Distributed Targets */}
        <div className="lg:col-span-5 rounded-[36px] bg-white/70 border border-teal/20 p-8 sm:p-12 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between border-b border-teal/15 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <SatelliteRadarBeamLineArt className="w-8 h-8 text-teal" />
                <div>
                  <h3 className="font-bold text-lg sm:text-xl text-pine font-sans">
                    {isAr ? "معادلة الرادار للأهداف الممتدة" : "Radar Distributed Targets Equation"}
                  </h3>
                  <span className="text-xs text-pine/60 font-mono">Sentinel-1 C-Band (5.405 GHz)</span>
                </div>
              </div>
            </div>

            <div className="bg-[#002428] text-cream p-5 rounded-2xl font-mono text-xs overflow-x-auto my-6 text-center leading-relaxed">
              <div className="text-lime font-bold text-sm sm:text-base mb-1">
                Pᵣ = [ Pₜ · G² · λ² · σ⁰ · A_res ] / [ (4π)³ · R⁴ ]
              </div>
              <div className="text-[11px] text-cream/70 pt-2 border-t border-teal/30 mt-2 font-sans">
                Pᵣ: Echo Power • G: Antenna Gain • σ⁰: Backscatter (dB) • R: Slant Range
              </div>
            </div>

            <p className="text-xs sm:text-sm text-pine/80 leading-relaxed font-sans mt-3">
              {isAr
                ? "تخضع الإشارة المرتدة من التربة الزراعية لمعادلة الرادار للأهداف الممتدة، حيث يتأثر معامل التشتت (σ⁰) برطوبة التربة وخشونة السطح وزاوية الورود والاستقطابين (VV و VH)."
                : "Agricultural soil acts as a continuous distributed scatterer. The differential backscattering coefficient (σ⁰) is modulated by soil dielectric permittivity (ε*), surface roughness height (s), and incident angle (θᵢ)."}
            </p>
          </div>

          <div className="pt-4 mt-6 border-t border-teal/15 text-xs text-pine/60 font-sans">
            Wavelength λ = 5.55 cm penetrates dust and clouds with zero atmospheric loss.
          </div>
        </div>

        {/* Bento Tile 3 (Span 5): Dielectric Permittivity & Fresnel Boundary Law */}
        <div className="lg:col-span-5 rounded-[36px] bg-white/70 border border-teal/20 p-8 sm:p-12 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between border-b border-teal/15 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <DielectricFresnelLineArt className="w-8 h-8 text-teal" />
                <div>
                  <h3 className="font-bold text-lg sm:text-xl text-pine font-sans">
                    {isAr ? "ثابت العزل وانعكاس فرينل" : "Dielectric & Fresnel Boundary Law"}
                  </h3>
                  <span className="text-xs text-pine/60 font-mono">ε_dry ≈ 3–5 vs ε_water ≈ 80 + j30</span>
                </div>
              </div>
            </div>

            <div className="bg-[#002428] text-cream p-5 rounded-2xl font-mono text-xs overflow-x-auto my-6 text-center leading-relaxed">
              <div className="text-lime font-bold text-sm sm:text-base mb-1">
                R₀ = | (1 - √(ε*)) / (1 + √(ε*)) |²
              </div>
              <div className="text-[11px] text-cream/70 pt-2 border-t border-teal/30 mt-2 font-sans">
                ε* = ε&apos; - jε&apos;&apos; • R₀: Normal Fresnel Power Reflection Coefficient
              </div>
            </div>

            <p className="text-xs sm:text-sm text-pine/80 leading-relaxed font-sans mt-3">
              {isAr
                ? "يرتكز القياس الراداري على التباين الشاسع في ثابت العزل بين حبيبات التربة الجافة والماء السائل، مما يرفع معامل الانعكاس لفرينل (R₀) كلما زادت الرطوبة الحجمية."
                : "Free water exhibits an exceptionally high dielectric constant compared to dry soil minerals. Moisture spikes elevate bulk dielectric permittivity (ε*), directly boosting Fresnel reflection back to space."}
            </p>
          </div>

          <div className="pt-4 mt-6 border-t border-teal/15 text-xs text-pine/60 font-sans">
            Dipolar relaxation of water molecules is the core active sensing mechanism.
          </div>
        </div>

        {/* Bento Tile 4 (Span 7): In-Situ IoT Calibration Objective */}
        <div className="lg:col-span-7 rounded-[36px] bg-[#002428] text-cream border border-teal/25 p-8 sm:p-12 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-teal/25 pb-4 mb-6">
              <div className="flex items-center gap-4">
                <IoTProbeLineArt className="w-10 h-10 text-lime" />
                <div>
                  <h3 className="font-bold text-xl sm:text-2xl text-cream font-sans">
                    {isAr ? "المعايرة الميدانية بإنترنت الأشياء" : "In-Situ IoT Calibration Objective"}
                  </h3>
                  <span className="text-xs text-cream/60 font-mono">Custom ECE PCB Telemetry Nodes (LoRaWAN / Cellular)</span>
                </div>
              </div>
              <span className="font-mono text-xs text-lime font-bold uppercase">Hardware Bridge</span>
            </div>

            <div className="bg-[#00171a] border border-teal/35 p-6 rounded-2xl font-mono text-xs overflow-x-auto my-6 text-center leading-relaxed">
              <div className="text-lime font-bold text-base sm:text-lg mb-2">
                Optimization: argmin(C, D) || mᵥ_radar(C, D) - mᵥ_IoT ||²
              </div>
              <div className="text-[11px] text-cream/70 pt-2 border-t border-teal/30 mt-2 font-sans">
                FDR 70MHz Capacitance Probes • Encrypted MQTT/TLS • Ground Truth Validation
              </div>
            </div>

            <p className="text-sm text-cream/80 leading-relaxed font-sans mt-4">
              {isAr
                ? "تتعرض النماذج الفضائية العالمية للانحراف عند تطبيقها على التربة الطميية والرملية في مصر. يصمم فريقنا عقد استشعار ميدانية مخصصة تنقل قراءات ثابت العزل والملوحة آنياً لتدريب خوارزميات التعلم الآلي وتحديث ثوابت C و D باستمرار."
                : "Global satellite models drift when applied to Egyptian clay and arid sandy loams. Our custom embedded hardware deployed across pilot farms streams ground-truth dielectric permittivity, EC, and moisture, continually calibrating empirical coefficients C and D."}
            </p>
          </div>

          <div className="pt-6 mt-8 border-t border-teal/25 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-cream/60">
            <span>LoRaWAN 868.1 MHz Telemetry Link</span>
            <span className="text-lime font-semibold">Toshka & Delta Pilot Networks</span>
          </div>
        </div>
      </div>
    </section>
  );
}
