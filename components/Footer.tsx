"use client";

import {
  SatelliteRadarBeamLineArt,
  WaterCloudModelLineArt,
  IoTProbeLineArt,
  ArdyTreeArchLineArt,
} from "./LineArt";

interface FooterProps {
  lang: "en" | "ar";
}

export default function Footer({ lang }: FooterProps) {
  const isAr = lang === "ar";

  return (
    <footer className="relative z-10 w-full border-t border-teal/15 bg-cream/70 backdrop-blur-xs font-sans">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-xs sm:text-sm">
        {/* Col 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <SatelliteRadarBeamLineArt className="w-5 h-5 text-teal" />
            <h4 className="font-bold text-teal font-sans uppercase tracking-wider text-xs">
              {isAr ? "التقنية الفضائية" : "Satellite & Radar Engine"}
            </h4>
          </div>
          <p className="text-pine/75 leading-relaxed text-xs">
            Sentinel-1 C-Band SAR (f₀ = 5.405 GHz)
            <br />
            Sentinel-2 Multi-Spectral Optical Fusion
            <br />
            Google Earth Engine Cloud Ingestion
            <br />
            10m × 10m Spatial Resolution Matrix
          </p>
        </div>

        {/* Col 2 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <WaterCloudModelLineArt className="w-5 h-5 text-teal" />
            <h4 className="font-bold text-teal font-sans uppercase tracking-wider text-xs">
              {isAr ? "القدرات التحليلية" : "Agronomy Diagnostics"}
            </h4>
          </div>
          <p className="text-pine/75 leading-relaxed text-xs">
            Volumetric Soil Moisture (mᵥ, 0–5 cm depth)
            <br />
            Crop Classification (Wheat, Corn, Rice)
            <br />
            Water Stress (NDWI) & Canopy Vigor (NDVI)
            <br />
            Water Cloud Model (WCM) Decoupling
          </p>
        </div>

        {/* Col 3 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <ArdyTreeArchLineArt className="w-5 h-5 text-teal" />
            <h4 className="font-bold text-teal font-sans uppercase tracking-wider text-xs">
              {isAr ? "الجهة الأكاديمية" : "Academic Entity"}
            </h4>
          </div>
          <p className="text-pine/75 leading-relaxed text-xs">
            Al-Azhar University, Faculty of Engineering
            <br />
            Dept. of Electrical Communications & Electronics
            <br />
            Supervised by Prof. Dr. Mohamed NourElDin shaaban
            <br />
            Graduation Project Class of 2026
          </p>
        </div>

        {/* Col 4 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <IoTProbeLineArt className="w-5 h-5 text-teal" />
            <h4 className="font-bold text-teal font-sans uppercase tracking-wider text-xs">
              {isAr ? "المعايرة الميدانية" : "In-Situ Ground Truth"}
            </h4>
          </div>
          <p className="text-pine/75 leading-relaxed text-xs">
            Custom ECE Dielectric Soil PCB Nodes
            <br />
            FDR 70MHz 3-Tine Stainless Probes
            <br />
            LoRaWAN 868.1 MHz & Cellular Telemetry
            <br />
            Direct GEE Machine Learning Calibration
          </p>
        </div>
      </div>

      {/* Bottom Legal & Location */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 pb-10 border-t border-teal/15 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-pine/60">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="font-sans font-semibold text-teal">
            {isAr
              ? "أرضي (ARDY-AI) — الزراعة الدقيقة بالموجات الميكروية"
              : "ARDY-AI — Precision Agriculture Powered by Microwave Radar"}
          </span>
          <span className="hidden sm:inline text-pine/30">|</span>
          <span className="font-mono text-[11px] text-pine/50">
            Coordinates: 26.1551° N, 32.7160° E (Qena, Egypt)
          </span>
        </div>

        <p className="font-mono text-[11px]">
          © 2026 ARDY-AI (أرضي) • Al-Azhar University ECE • Copernicus Open Data
          (ESA).
        </p>
      </div>
    </footer>
  );
}
