"use client";

// Handcrafted SVG Technical & Botanical Line Arts for ARDY-AI
// Replacing generic icons with domain-specific microwave remote sensing & root physics drawings

interface LineArtProps {
  className?: string;
  color?: string;
}

// 1. Root System & Topsoil Horizon (0 to 5 cm Skin Depth)
export function RootSystemLineArt({ className = "w-10 h-10", color = "currentColor" }: LineArtProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Ground Surface Line */}
      <line x1="4" y1="14" x2="44" y2="14" strokeWidth="1.8" />
      {/* Surface soil grain ticks */}
      <path d="M 6,11 L 8,14 M 16,11 L 18,14 M 30,11 L 32,14 M 40,11 L 42,14" opacity="0.6" />

      {/* Stem rising above ground */}
      <path d="M 24,14 V 6" strokeWidth="2" />
      <path d="M 24,10 C 27,8 31,9 33,6" />
      <path d="M 24,8 C 21,6 17,7 15,4" />

      {/* 5 cm Root Horizon marker dashed */}
      <line x1="8" y1="36" x2="40" y2="36" strokeDasharray="3 3" opacity="0.4" />

      {/* Main Taproot */}
      <path d="M 24,14 C 23,20 25,28 24,42" strokeWidth="2" />

      {/* Primary Lateral Root Branches */}
      <path d="M 24,18 C 20,22 14,24 10,27" />
      <path d="M 24,22 C 28,26 34,27 38,31" />
      <path d="M 24,28 C 19,32 15,36 12,41" />
      <path d="M 24,32 C 27,35 32,38 35,42" />

      {/* Fine Root Hair Fibers */}
      <path d="M 17,23 C 15,26 13,29 12,32" strokeWidth="1" opacity="0.8" />
      <path d="M 31,27 C 33,30 35,33 37,36" strokeWidth="1" opacity="0.8" />
      <path d="M 21,34 C 18,37 17,40 18,44" strokeWidth="1" opacity="0.8" />
      <path d="M 26,36 C 29,38 30,41 29,44" strokeWidth="1" opacity="0.8" />

      {/* Soil moisture droplet points in pore space */}
      <circle cx="16" cy="19" r="0.8" fill={color} />
      <circle cx="32" cy="22" r="0.8" fill={color} />
      <circle cx="21" cy="25" r="0.8" fill={color} />
      <circle cx="27" cy="30" r="0.8" fill={color} />
    </svg>
  );
}

// 2. Sentinel-1 SAR Satellite & Microwave Beam Wavefront
export function SatelliteRadarBeamLineArt({ className = "w-10 h-10", color = "currentColor" }: LineArtProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Satellite Main Body Bus */}
      <rect x="20" y="4" width="8" height="6" rx="1" />
      {/* SAR Planar Antenna */}
      <rect x="16" y="10" width="16" height="2" rx="0.5" strokeWidth="1.8" />

      {/* Left Solar Panel Array */}
      <rect x="4" y="5" width="14" height="4" rx="0.5" />
      <line x1="8.5" y1="5" x2="8.5" y2="9" opacity="0.5" />
      <line x1="13.5" y1="5" x2="13.5" y2="9" opacity="0.5" />

      {/* Right Solar Panel Array */}
      <rect x="30" y="5" width="14" height="4" rx="0.5" />
      <line x1="34.5" y1="5" x2="34.5" y2="9" opacity="0.5" />
      <line x1="39.5" y1="5" x2="39.5" y2="9" opacity="0.5" />

      {/* Transmitted Microwave Wavefront Rings (C-Band 5.405 GHz) */}
      <path d="M 21,15 C 23,17 25,17 27,15" strokeWidth="1.2" />
      <path d="M 18,20 C 22,23 26,23 30,20" strokeWidth="1.2" />
      <path d="M 14,26 C 20,30 28,30 34,26" strokeWidth="1.4" />
      <path d="M 9,33 C 18,39 30,39 39,33" strokeWidth="1.4" />
      <path d="M 4,41 C 16,48 32,48 44,41" strokeWidth="1.6" />

      {/* Backscatter return echo vector */}
      <path d="M 24,40 L 24,18" strokeDasharray="2 2" strokeWidth="1.2" />
      <path d="M 22,22 L 24,18 L 26,22" strokeWidth="1.2" />
    </svg>
  );
}

// 3. Water Cloud Model (WCM) Canopy & Soil Decoupling
export function WaterCloudModelLineArt({ className = "w-10 h-10", color = "currentColor" }: LineArtProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Downward Incident Radar Beam */}
      <path d="M 8,4 L 17,14" strokeWidth="1.6" />
      <path d="M 13,13 L 17,14 L 16,10" strokeWidth="1.4" />

      {/* Canopy Vegetative Layer (Leaves) */}
      <path d="M 12,20 C 16,15 26,15 30,20 C 34,16 42,18 40,24 C 38,28 32,28 28,26 C 24,29 16,28 12,24 Z" strokeWidth="1.4" />
      {/* Leaf veins inside canopy */}
      <path d="M 18,21 C 21,19 24,20 26,23" opacity="0.6" />
      <path d="M 30,21 C 33,20 35,22 36,24" opacity="0.6" />

      {/* Canopy Backscatter Component (sigma0_veg) bouncing away */}
      <path d="M 22,17 L 31,8" strokeDasharray="2 2" strokeWidth="1.3" />
      <path d="M 28,8 L 31,8 L 31,11" strokeWidth="1.3" />

      {/* Soil Surface Line */}
      <line x1="4" y1="36" x2="44" y2="36" strokeWidth="1.8" />

      {/* Attenuated Beam reaching Soil (tau^2 * sigma0_soil) */}
      <path d="M 24,27 L 27,36" strokeWidth="1.4" />
      <path d="M 27,36 L 36,27" strokeWidth="1.4" />
      <path d="M 33,27 L 36,27 L 36,30" strokeWidth="1.4" />

      {/* Soil moisture dots under surface */}
      <circle cx="14" cy="41" r="1" fill={color} />
      <circle cx="28" cy="42" r="1" fill={color} />
      <circle cx="38" cy="40" r="1" fill={color} />
    </svg>
  );
}

// 4. Dielectric Permittivity & Fresnel Reflection Interface
export function DielectricFresnelLineArt({ className = "w-10 h-10", color = "currentColor" }: LineArtProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Soil-Air Boundary Interface */}
      <line x1="4" y1="24" x2="44" y2="24" strokeWidth="2" />
      {/* Air medium indicator label line */}
      <line x1="24" y1="4" x2="24" y2="44" strokeDasharray="3 3" opacity="0.4" />

      {/* Incident Electromagnetic Wave Ray */}
      <path d="M 8,8 L 24,24" strokeWidth="1.8" />
      <path d="M 19,22 L 24,24 L 22,19" strokeWidth="1.4" />

      {/* Reflected Wave (Fresnel Reflection R0) */}
      <path d="M 24,24 L 40,8" strokeWidth="1.8" />
      <path d="M 35,9 L 40,8 L 39,13" strokeWidth="1.4" />

      {/* Refracted Wave penetrating into Wet Soil (m_v) */}
      <path d="M 24,24 L 32,42" strokeWidth="1.8" />
      <path d="M 28,38 L 32,42 L 32,37" strokeWidth="1.4" />

      {/* Incident angle arc theta_i */}
      <path d="M 20,16 C 22,17 24,17 24,17" opacity="0.7" />

      {/* Permittivity symbols below interface */}
      <circle cx="12" cy="32" r="1.5" fill={color} />
      <circle cx="20" cy="38" r="1.5" fill={color} />
      <circle cx="38" cy="34" r="1.5" fill={color} />
      <path d="M 12,32 Q 16,35 20,38" opacity="0.4" />
    </svg>
  );
}

// 5. IoT Ground-Truth FDR Dielectric Soil Probe
export function IoTProbeLineArt({ className = "w-10 h-10", color = "currentColor" }: LineArtProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Antenna mast rising into air */}
      <line x1="24" y1="4" x2="24" y2="16" strokeWidth="1.8" />
      <circle cx="24" cy="4" r="1.5" fill={color} />
      {/* RF signal radiation waves from antenna */}
      <path d="M 20,7 C 18,9 18,12 20,14" opacity="0.6" />
      <path d="M 28,7 C 30,9 30,12 28,14" opacity="0.6" />
      <path d="M 17,5 C 14,8 14,13 17,16" opacity="0.4" />
      <path d="M 31,5 C 34,8 34,13 31,16" opacity="0.4" />

      {/* Sensor Enclosure / Housing */}
      <rect x="18" y="16" width="12" height="10" rx="1.5" strokeWidth="1.8" />
      {/* Solar cell top on enclosure */}
      <line x1="20" y1="19" x2="28" y2="19" strokeWidth="1.2" />

      {/* Soil Surface */}
      <line x1="6" y1="28" x2="42" y2="28" strokeWidth="1.8" />

      {/* 3 Stainless Steel FDR Dielectric Probe Tines inserted in root soil */}
      <line x1="20" y1="26" x2="20" y2="44" strokeWidth="1.8" />
      <line x1="24" y1="26" x2="24" y2="44" strokeWidth="1.8" />
      <line x1="28" y1="26" x2="28" y2="44" strokeWidth="1.8" />

      {/* Dielectric fringing fields between tines */}
      <path d="M 20,34 C 22,33 22,33 24,34" strokeWidth="1" strokeDasharray="1 1" opacity="0.7" />
      <path d="M 24,34 C 26,33 26,33 28,34" strokeWidth="1" strokeDasharray="1 1" opacity="0.7" />
      <path d="M 20,39 C 22,38 22,38 24,39" strokeWidth="1" strokeDasharray="1 1" opacity="0.7" />
      <path d="M 24,39 C 26,38 26,38 28,39" strokeWidth="1" strokeDasharray="1 1" opacity="0.7" />
    </svg>
  );
}

// 6. Nile Basin & River Valley Line Art
export function NileRiverBasinLineArt({ className = "w-10 h-10", color = "currentColor" }: LineArtProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Nile River meandering channel */}
      <path
        d="M 24,44 C 22,38 26,32 23,26 C 20,20 28,14 24,4"
        strokeWidth="2.4"
      />
      {/* Secondary irrigation canal branch */}
      <path d="M 23,26 C 29,24 35,22 38,18" strokeWidth="1.4" strokeDasharray="3 2" />
      <path d="M 22,34 C 16,33 12,30 8,28" strokeWidth="1.4" strokeDasharray="3 2" />

      {/* Delta fan at upper outlet */}
      <path d="M 24,10 C 20,8 15,6 12,4" strokeWidth="1.4" />
      <path d="M 24,10 C 28,8 33,6 36,4" strokeWidth="1.4" />

      {/* Field boundary quadrilaterals flanking the river */}
      <rect x="7" y="14" width="8" height="6" rx="0.5" strokeWidth="1.2" opacity="0.7" />
      <rect x="33" y="26" width="9" height="7" rx="0.5" strokeWidth="1.2" opacity="0.7" />
      <rect x="9" y="36" width="7" height="6" rx="0.5" strokeWidth="1.2" opacity="0.7" />
    </svg>
  );
}

// 7. ARDY Tree in Arch (Matching brand logo identity)
export function ArdyTreeArchLineArt({ className = "w-10 h-10", color = "currentColor" }: LineArtProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Arch Outline */}
      <path d="M 12,42 V 22 C 12,14 18,8 24,8 C 30,8 36,14 36,22 V 42" strokeWidth="1.6" />

      {/* Tree Trunk */}
      <path d="M 24,42 V 24" strokeWidth="2.2" />
      <path d="M 21,42 H 27" strokeWidth="2" />

      {/* Branches & Foliage Leaves */}
      <path d="M 24,28 C 21,25 18,25 16,23" strokeWidth="1.5" />
      <path d="M 24,28 C 27,25 30,25 32,23" strokeWidth="1.5" />
      <path d="M 24,22 C 20,18 20,15 22,12" strokeWidth="1.5" />
      <path d="M 24,22 C 28,18 28,15 26,12" strokeWidth="1.5" />

      {/* Leaves / Seeds */}
      <ellipse cx="16" cy="21" rx="2" ry="1.2" transform="rotate(-30 16 21)" fill={color} />
      <ellipse cx="32" cy="21" rx="2" ry="1.2" transform="rotate(30 32 21)" fill={color} />
      <ellipse cx="20" cy="14" rx="2" ry="1.2" transform="rotate(-45 20 14)" fill={color} />
      <ellipse cx="28" cy="14" rx="2" ry="1.2" transform="rotate(45 28 14)" fill={color} />
      <ellipse cx="24" cy="10" rx="1.5" ry="2" fill={color} />
    </svg>
  );
}

