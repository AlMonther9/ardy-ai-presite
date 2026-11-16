"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeRadarHeroProps {
  activeLayer: "radar" | "moisture" | "ndvi" | "iot";
  onLayerChange: (layer: "radar" | "moisture" | "ndvi" | "iot") => void;
  lang: "en" | "ar";
}

export default function ThreeRadarHero({
  activeLayer,
  onLayerChange,
  lang,
}: ThreeRadarHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAr = lang === "ar";

  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const worldGroupRef = useRef<THREE.Group | null>(null);

  const [telemetry, setTelemetry] = useState({
    sigma0_vv: -11.4,
    sigma0_vh: -18.2,
    permittivity: "26.4 - j9.1",
    moisture_mv: 0.284,
    skinDepth_cm: 3.8,
  });

  const resetView = (view: "orbit" | "beam" | "soil") => {
    if (!cameraRef.current || !worldGroupRef.current) return;
    const cam = cameraRef.current;
    if (view === "orbit") {
      cam.position.set(0, 15, 22);
      cam.lookAt(0, 0, 0);
      worldGroupRef.current.rotation.set(0.15, 0, 0);
    } else if (view === "beam") {
      cam.position.set(8, 12, 16);
      cam.lookAt(-0.5, 4.5, -0.5);
      worldGroupRef.current.rotation.set(0.1, 0.4, 0);
    } else if (view === "soil") {
      cam.position.set(0, 7, 12);
      cam.lookAt(0, 1, 0);
      worldGroupRef.current.rotation.set(0.25, -0.2, 0);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#002428");
    scene.fog = new THREE.FogExp2("#002428", 0.022);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 15, 22);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Warm Directional & Ambient Lighting
    const ambientLight = new THREE.AmbientLight("#f9f4ee", 0.95);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight("#fff5e6", 1.8);
    sunLight.position.set(16, 26, 12);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const rimLight = new THREE.PointLight("#3c756f", 1.6, 45);
    rimLight.position.set(-14, 10, -8);
    scene.add(rimLight);

    // Root World Group
    const worldGroup = new THREE.Group();
    worldGroup.rotation.x = 0.15;
    worldGroupRef.current = worldGroup;
    scene.add(worldGroup);

    // 1. Terrain Block with Soil Strata
    const terrainSize = 22;
    const terrainGeo = new THREE.BoxGeometry(terrainSize, 1.6, terrainSize, 64, 4, 64);
    terrainGeo.translate(0, -0.8, 0);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y >= -0.05) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const elevation =
          Math.sin(x * 0.28) * 0.4 +
          Math.cos(z * 0.28) * 0.35 +
          Math.sin(x * 0.65 + z * 0.45) * 0.18;
        pos.setY(i, elevation);
      }
    }
    terrainGeo.computeVertexNormals();

    // Procedural Agricultural Surface Texture
    const mapCanvas = document.createElement("canvas");
    mapCanvas.width = 1024;
    mapCanvas.height = 1024;
    const ctx = mapCanvas.getContext("2d");

    const updateTexture = (layer: string) => {
      if (!ctx) return;
      ctx.fillStyle = "#1e332d";
      ctx.fillRect(0, 0, 1024, 1024);

      // Subtle contour elevation rings
      ctx.strokeStyle = "rgba(194, 214, 200, 0.18)";
      ctx.lineWidth = 1.5;
      for (let r = 80; r < 900; r += 55) {
        ctx.beginPath();
        ctx.arc(512, 512, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Agricultural field boundaries
      ctx.strokeStyle = "rgba(60, 117, 111, 0.4)";
      ctx.lineWidth = 3;
      for (let x = 120; x < 950; x += 180) {
        ctx.beginPath();
        ctx.moveTo(x, 60);
        ctx.lineTo(x, 960);
        ctx.stroke();
      }
      for (let y = 120; y < 950; y += 180) {
        ctx.beginPath();
        ctx.moveTo(60, y);
        ctx.lineTo(960, y);
        ctx.stroke();
      }

      // Central Agricultural Parcel Gradient
      const grad = ctx.createRadialGradient(512, 512, 30, 512, 512, 320);
      if (layer === "moisture") {
        grad.addColorStop(0, "rgba(195, 219, 95, 0.95)");
        grad.addColorStop(0.35, "rgba(60, 117, 111, 0.85)");
        grad.addColorStop(0.7, "rgba(194, 214, 200, 0.6)");
        grad.addColorStop(1, "rgba(130, 98, 74, 0.35)");
      } else if (layer === "ndvi") {
        grad.addColorStop(0, "rgba(120, 210, 100, 0.95)");
        grad.addColorStop(0.5, "rgba(50, 140, 80, 0.8)");
        grad.addColorStop(1, "rgba(160, 150, 60, 0.3)");
      } else if (layer === "radar") {
        grad.addColorStop(0, "rgba(240, 248, 255, 0.95)");
        grad.addColorStop(0.3, "rgba(80, 170, 190, 0.8)");
        grad.addColorStop(0.7, "rgba(0, 41, 45, 0.85)");
        grad.addColorStop(1, "rgba(25, 55, 55, 0.4)");
      } else {
        grad.addColorStop(0, "rgba(195, 219, 95, 0.85)");
        grad.addColorStop(0.5, "rgba(60, 117, 111, 0.65)");
        grad.addColorStop(1, "rgba(30, 50, 45, 0.3)");
      }

      ctx.beginPath();
      ctx.moveTo(320, 310);
      ctx.bezierCurveTo(450, 240, 690, 270, 740, 370);
      ctx.bezierCurveTo(790, 480, 760, 680, 660, 750);
      ctx.bezierCurveTo(520, 800, 350, 770, 280, 650);
      ctx.bezierCurveTo(230, 530, 260, 370, 320, 310);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = "#c3db5f";
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.font = "500 24px system-ui, sans-serif";
      ctx.fillStyle = "rgba(249, 244, 238, 0.75)";
      ctx.fillText("Field 1 — Wheat Tillering (10m res)", 320, 280);
    };

    updateTexture(activeLayer);
    const terrainTexture = new THREE.CanvasTexture(mapCanvas);
    const terrainMat = new THREE.MeshStandardMaterial({
      map: terrainTexture,
      roughness: 0.85,
      metalness: 0.08,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.receiveShadow = true;
    worldGroup.add(terrainMesh);

    // 2. Subterranean Root Network in 3D (Physical Root Zone under parcel)
    const rootsGroup = new THREE.Group();
    const rootMat = new THREE.LineBasicMaterial({ color: 0xc3db5f, linewidth: 2, transparent: true, opacity: 0.85 });

    // Procedural root branching geometry
    const createRootBranch = (startX: number, startZ: number, depth: number, spread: number) => {
      const rootPoints = [
        new THREE.Vector3(startX, 0.4, startZ),
        new THREE.Vector3(startX + spread * 0.3, 0.1, startZ + spread * 0.2),
        new THREE.Vector3(startX + spread * 0.6, -0.3, startZ + spread * 0.5),
        new THREE.Vector3(startX + spread, -depth, startZ + spread * 0.8),
      ];
      const rootCurve = new THREE.CatmullRomCurve3(rootPoints);
      const rootGeo = new THREE.BufferGeometry().setFromPoints(rootCurve.getPoints(20));
      return new THREE.Line(rootGeo, rootMat);
    };

    // Plant clusters with root branches penetrating 0 to 5 cm soil horizon
    const plantCenters = [
      { x: 0, z: 0 },
      { x: 1.2, z: 0.8 },
      { x: -1.0, z: -0.6 },
      { x: 0.6, z: -1.2 },
      { x: -0.8, z: 1.0 },
    ];
    plantCenters.forEach((pt) => {
      rootsGroup.add(createRootBranch(pt.x, pt.z, 0.7, 0.4));
      rootsGroup.add(createRootBranch(pt.x, pt.z, 0.6, -0.35));
      rootsGroup.add(createRootBranch(pt.x, pt.z, 0.8, 0.2));
    });
    worldGroup.add(rootsGroup);

    // 3. Sentinel-1 SAR Satellite Model
    const satGroup = new THREE.Group();
    satGroup.position.set(-1.2, 9.8, -1.2);

    const satBodyGeo = new THREE.BoxGeometry(1.8, 0.9, 1.0);
    const satBodyMat = new THREE.MeshStandardMaterial({
      color: 0xd4a373,
      metalness: 0.85,
      roughness: 0.25,
    });
    const satBody = new THREE.Mesh(satBodyGeo, satBodyMat);
    satGroup.add(satBody);

    const sarAntennaGeo = new THREE.BoxGeometry(4.8, 0.18, 1.0);
    const sarAntennaMat = new THREE.MeshStandardMaterial({
      color: 0x3c756f,
      metalness: 0.9,
      roughness: 0.35,
    });
    const sarAntenna = new THREE.Mesh(sarAntennaGeo, sarAntennaMat);
    sarAntenna.position.set(0, -0.52, 0);
    satGroup.add(sarAntenna);

    const wingGeo = new THREE.BoxGeometry(3.6, 0.05, 1.2);
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0x122c44,
      metalness: 0.7,
      roughness: 0.2,
    });
    const leftWing = new THREE.Mesh(wingGeo, wingMat);
    leftWing.position.set(-3.8, 0.15, 0);
    satGroup.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo, wingMat);
    rightWing.position.set(3.8, 0.15, 0);
    satGroup.add(rightWing);

    scene.add(satGroup);

    // 4. Microwave Ripple Wavefronts
    const rippleCount = 5;
    const ripples: THREE.Mesh[] = [];
    for (let i = 0; i < rippleCount; i++) {
      const ringGeo = new THREE.RingGeometry(0.3, 0.45, 48);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xc3db5f,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(-1.2, 9.8 - i * 1.8, -1.2);
      scene.add(ring);
      ripples.push(ring);
    }

    // 5. In-Situ IoT Soil Probe Node
    const iotGroup = new THREE.Group();
    iotGroup.position.set(0.8, 0.75, 0.5);

    const stakeGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.5, 8);
    const stakeMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, metalness: 0.85 });
    const stake = new THREE.Mesh(stakeGeo, stakeMat);
    stake.position.y = 0.75;
    iotGroup.add(stake);

    const encGeo = new THREE.BoxGeometry(0.38, 0.38, 0.28);
    const encMat = new THREE.MeshStandardMaterial({ color: 0x00292d, roughness: 0.4 });
    const enclosure = new THREE.Mesh(encGeo, encMat);
    enclosure.position.y = 0.95;
    iotGroup.add(enclosure);

    worldGroup.add(iotGroup);

    // Drag Interaction
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotX = 0.15;
    let rotY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      rotY += dx * 0.005;
      rotX += dy * 0.004;
      rotX = Math.max(-0.35, Math.min(0.65, rotX));
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      satGroup.position.x = Math.sin(t * 0.3) * 1.8 - 1.2;
      satGroup.position.z = Math.cos(t * 0.22) * 1.4 - 1.2;
      satGroup.rotation.y = Math.sin(t * 0.15) * 0.08;

      ripples.forEach((ring, idx) => {
        const progress = ((t * 1.1 + idx * 0.4) % 2) / 2;
        ring.position.x = satGroup.position.x;
        ring.position.z = satGroup.position.z;
        ring.position.y = 9.8 - progress * 9.2;
        const s = 0.3 + progress * 5.6;
        ring.scale.set(s, s, s);
        (ring.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.75 - progress * 0.75);
      });

      worldGroup.rotation.y += (rotY - worldGroup.rotation.y) * 0.08;
      worldGroup.rotation.x += (rotX - worldGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeLayer]);

  return (
    <div
      id="physics-3d"
      className="relative w-full h-[520px] sm:h-[620px] md:h-[680px] rounded-3xl overflow-hidden border border-teal/25 shadow-xl bg-[#002428] text-cream"
    >
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Top Header (Clean technical typography, no badges) */}
      <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 pointer-events-none z-10 select-none">
        <div>
          <span className="font-mono text-xs text-lime font-semibold block uppercase tracking-wider">
            Sentinel-1 C-Band (5.405 GHz) + Soil Dielectric Inversion
          </span>
          <span className="text-xs text-cream/70 font-sans">
            {isAr
              ? "نبضات رادار تخترق الغطاء الخضري وتتفاعل مع منطقة الجذور (0 إلى 5 سم)"
              : "Active microwaves penetrate crop canopy to interact with root-zone moisture (0 - 5.0 cm)"}
          </span>
        </div>

        {/* Camera Preset Controls (Clean architectural buttons) */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => resetView("orbit")}
            className="px-3 py-1.5 rounded-lg border border-teal/30 bg-pine/80 hover:bg-teal text-xs font-sans text-cream/80 transition-colors cursor-pointer"
          >
            {isAr ? "مدار القمر" : "Orbit"}
          </button>
          <button
            onClick={() => resetView("beam")}
            className="px-3 py-1.5 rounded-lg border border-teal/30 bg-pine/80 hover:bg-teal text-xs font-sans text-cream/80 transition-colors cursor-pointer"
          >
            {isAr ? "حزمة الرادار" : "Wavefront"}
          </button>
          <button
            onClick={() => resetView("soil")}
            className="px-3 py-1.5 rounded-lg border border-teal/30 bg-pine/80 hover:bg-teal text-xs font-sans text-cream/80 transition-colors cursor-pointer"
          >
            {isAr ? "طبقة الجذور" : "Root Horizon"}
          </button>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-stretch md:items-end justify-between gap-4 z-10 pointer-events-auto">
        {/* Layer Mode Selector */}
        <div className="bg-pine/90 border border-teal/30 rounded-xl p-2.5 backdrop-blur-md shadow-lg flex flex-wrap items-center gap-1.5 text-xs font-sans">
          <span className="text-cream/60 px-2 text-[11px] font-mono uppercase">
            {isAr ? "الطبقة التحليلية:" : "Spectral layer:"}
          </span>
          {(
            [
              { id: "radar", labelEn: "SAR σ⁰ (dB)", labelAr: "التشتت الراداري σ⁰" },
              { id: "moisture", labelEn: "VSM mᵥ (Soil Moisture)", labelAr: "الرطوبة الحجمية mᵥ" },
              { id: "ndvi", labelEn: "S2 NDVI (Canopy)", labelAr: "مؤشر الغطاء الخضري" },
              { id: "iot", labelEn: "IoT In-Situ Probes", labelAr: "المعايرة الميدانية IoT" },
            ] as const
          ).map((layer) => (
            <button
              key={layer.id}
              onClick={() => onLayerChange(layer.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-xs font-medium ${
                activeLayer === layer.id
                  ? "bg-lime text-pine font-bold"
                  : "bg-teal/20 text-cream/80 hover:bg-teal/40"
              }`}
            >
              {isAr ? layer.labelAr : layer.labelEn}
            </button>
          ))}
        </div>

        {/* Live Dielectric Readout Card */}
        <div className="bg-pine/90 border border-teal/30 rounded-xl p-3.5 backdrop-blur-md shadow-lg text-xs font-mono text-cream/90 max-w-sm">
          <div className="flex items-center justify-between border-b border-teal/25 pb-1.5 mb-2 font-sans font-medium text-teal">
            <span className="text-lime font-bold text-xs uppercase font-mono">
              {isAr ? "معاملات العزل الكهرومغناطيسي" : "Soil Permittivity Variables"}
            </span>
            <span className="text-[11px] text-cream/60">{telemetry.skinDepth_cm} cm skin depth</span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
            <div>
              <span className="text-cream/60">σ⁰_VV: </span>
              <span className="text-lime font-bold">{telemetry.sigma0_vv} dB</span>
            </div>
            <div>
              <span className="text-cream/60">σ⁰_VH: </span>
              <span className="text-cream">{telemetry.sigma0_vh} dB</span>
            </div>
            <div>
              <span className="text-cream/60">ε* (Bulk): </span>
              <span className="text-teal font-semibold">{telemetry.permittivity}</span>
            </div>
            <div>
              <span className="text-cream/60">mᵥ (Moisture): </span>
              <span className="text-lime font-bold">{telemetry.moisture_mv} m³/m³</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
