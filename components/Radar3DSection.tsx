"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import {
  Layers,
  Sun,
  Sunset,
  Moon,
  RotateCw,
  Sliders,
  Maximize2,
  Minimize2,
  Activity,
} from "lucide-react";

interface Radar3DSectionProps {
  lang: "en" | "ar";
}

export default function Radar3DSection({ lang }: Radar3DSectionProps) {
  const isAr = lang === "ar";

  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const worldGroupRef = useRef<THREE.Group | null>(null);

  const [activeLayer, setActiveLayer] = useState<"natural" | "radar" | "moisture" | "ndvi" | "xray">("natural");
  const [lightingMode, setLightingMode] = useState<"day" | "golden" | "night">("day");
  const [moistureValue, setMoistureValue] = useState<number>(0.28);
  const [cropStage, setCropStage] = useState<"tillering" | "jointing" | "heading">("jointing");
  const [surfaceRoughness, setSurfaceRoughness] = useState<"smooth" | "plowed" | "rough">("plowed");
  const [cameraView, setCameraView] = useState<"orbit" | "field" | "roots" | "isometric">("isometric");
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const telemetry = useMemo(() => {
    const roughnessOffset = surfaceRoughness === "smooth" ? -1.8 : surfaceRoughness === "rough" ? 2.4 : 0;
    const epsR = +(3.5 + moistureValue * 75.0).toFixed(1);
    const epsI = +(0.3 + moistureValue * 28.1).toFixed(1);
    const sigVV = +(-18.2 + 26.5 * moistureValue + roughnessOffset).toFixed(1);
    const sigVH = +(-24.8 + 22.0 * moistureValue + roughnessOffset * 0.7).toFixed(1);
    const skin = +(Math.max(0.8, 5.5 / Math.sqrt(epsR * 0.4))).toFixed(1);
    const r0 = +(Math.pow(1 - Math.sqrt(epsR), 2) / Math.pow(1 + Math.sqrt(epsR), 2)).toFixed(3);
    const ndviVal = +(
      Math.min(
        0.88,
        Math.max(0.18, (cropStage === "tillering" ? 0.35 : cropStage === "jointing" ? 0.65 : 0.52) + (moistureValue - 0.15) * 0.6)
      )
    ).toFixed(2);
    return {
      permittivity: `${epsR} - j${epsI}`,
      sigma0_vv: sigVV,
      sigma0_vh: sigVH,
      skinDepth_cm: skin,
      fresnel_r0: r0,
      ndvi: ndviVal,
    };
  }, [moistureValue, surfaceRoughness, cropStage]);

  const layerLegend = useMemo(() => {
    switch (activeLayer) {
      case "natural":
        return {
          titleEn: "True-Color Egyptian Farmland • Corn & Nile Canal",
          titleAr: "البيئة الحقيقية • حقول الذرة وترعة النيل",
          gradient: "linear-gradient(90deg, #8c6d46 0%, #4f8f3c 55%, #24737a 100%)",
          minLabel: isAr ? "تربة جافة" : "Arid Sand",
          maxLabel: isAr ? "ذرة مروية / نيل" : "Irrigated Corn & Canal",
        };
      case "radar":
        return {
          titleEn: "Sentinel-1 C-Band SAR (5.405 GHz) • Active Backscatter σ⁰",
          titleAr: "رادار Sentinel-1 (٥.٤٠٥ جيجاهرتز) • التشتت الخلفي σ⁰",
          gradient: "linear-gradient(90deg, #061417 0%, #3c756f 45%, #c3db5f 75%, #e6fbff 100%)",
          minLabel: "-20 dB (Smooth/Dry)",
          maxLabel: "-5 dB (Rough/Wet)",
        };
      case "moisture":
        return {
          titleEn: "Volumetric Soil Moisture (mᵥ) • Root-Zone Water Content",
          titleAr: "الرطوبة الحجمية للتربة (mᵥ) • محتوى الماء بالجذور",
          gradient: "linear-gradient(90deg, #d95f3b 0%, #f4a261 30%, #c3db5f 60%, #00a8e8 100%)",
          minLabel: "0.05 m³/m³ (PWP)",
          maxLabel: "0.45 m³/m³ (Saturated)",
        };
      case "ndvi":
        return {
          titleEn: "Sentinel-2 Passive Optical • Canopy Vigor (NDVI B4/B8)",
          titleAr: "المستشعر الضوئي Sentinel-2 • كثافة الغطاء الخضري",
          gradient: "linear-gradient(90deg, #b83b2b 0%, #e09f3e 35%, #d9ed92 65%, #1b7a3d 100%)",
          minLabel: "-0.1 (Bare Soil)",
          maxLabel: "+0.85 (Dense Canopy)",
        };
      case "xray":
        return {
          titleEn: "Subsurface Dielectric X-Ray • 0–5 cm SAR Skin Depth Slice",
          titleAr: "مقطع تحت التربة • عمق نفاذ الرادار (٠–٥ سم) والجذور",
          gradient: "linear-gradient(90deg, #1b3a3f 0%, #3c756f 50%, #c3db5f 100%)",
          minLabel: "0 cm Surface",
          maxLabel: "5.0 cm Skin Depth",
        };
    }
  }, [activeLayer, isAr]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  const resetView = (view: "orbit" | "field" | "roots" | "isometric") => {
    setCameraView(view);
    if (!cameraRef.current || !worldGroupRef.current) return;
    const cam = cameraRef.current;
    if (view === "orbit") {
      cam.position.set(0, 18, 22);
      cam.lookAt(0, 4, 0);
      worldGroupRef.current.rotation.set(0.12, 0.25, 0);
    } else if (view === "field") {
      cam.position.set(0, 5.2, 13.5);
      cam.lookAt(0, 1.5, 0);
      worldGroupRef.current.rotation.set(0.08, 0.42, 0);
    } else if (view === "roots") {
      cam.position.set(0, 2.0, 11.5);
      cam.lookAt(0, -0.5, 0);
      worldGroupRef.current.rotation.set(0.28, -0.15, 0);
    } else {
      cam.position.set(0, 14, 21);
      cam.lookAt(0, 1, 0);
      worldGroupRef.current.rotation.set(0.18, 0.3, 0);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();

    const layerBgMap: Record<string, string> = {
      natural: lightingMode === "golden" ? "#1f1518" : lightingMode === "night" ? "#010d12" : "#011c21",
      radar: "#020b0e",
      moisture: "#03121a",
      ndvi: "#081710",
      xray: "#020e12",
    };
    const bgHex = layerBgMap[activeLayer] || "#011c21";
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 120);
    camera.position.set(0, 14, 21);
    camera.lookAt(0, 1, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const ambientIntensity =
      activeLayer === "radar" || activeLayer === "xray"
        ? 0.7
        : lightingMode === "night"
        ? 0.45
        : 1.2;
    const ambientLight = new THREE.AmbientLight(
      lightingMode === "golden" && activeLayer === "natural" ? "#fcd5b5" : "#f9f4ee",
      ambientIntensity
    );
    scene.add(ambientLight);

    const sunColor =
      activeLayer === "radar"
        ? "#b8f2e6"
        : lightingMode === "golden"
        ? "#ff964f"
        : lightingMode === "night"
        ? "#4a7a96"
        : "#fff8eb";
    const sunIntensity =
      activeLayer === "radar" ? 1.5 : lightingMode === "golden" ? 2.5 : lightingMode === "night" ? 0.7 : 2.1;
    const sunLight = new THREE.DirectionalLight(sunColor, sunIntensity);
    sunLight.position.set(lightingMode === "golden" ? 24 : 18, lightingMode === "golden" ? 8 : 26, 14);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const rimLight = new THREE.PointLight(
      activeLayer === "moisture" ? "#00a8e8" : activeLayer === "radar" ? "#c3db5f" : "#3c756f",
      1.8,
      60
    );
    rimLight.position.set(-16, 14, -10);
    scene.add(rimLight);

    // Centered World Group (now that 3D has its own full-width dedicated stage!)
    const worldGroup = new THREE.Group();
    worldGroup.position.set(0, 0, 0);
    worldGroup.rotation.x = 0.18;
    worldGroup.rotation.y = 0.3;
    worldGroupRef.current = worldGroup;
    scene.add(worldGroup);

    const furrowFactor = surfaceRoughness === "rough" ? 0.08 : surfaceRoughness === "plowed" ? 0.04 : 0.015;
    const getCanalZ = (x: number) => 0.35 * x + 4.2;
    const getElevation = (x: number, z: number) => {
      let el =
        Math.sin(x * 0.28) * 0.32 +
        Math.cos(z * 0.28) * 0.28 +
        Math.sin(x * 0.65 + z * 0.5) * 0.12;
      el += Math.sin(x * 3.2) * furrowFactor;
      const distToCanal = Math.abs(z - getCanalZ(x));
      if (distToCanal < 1.35) {
        el -= Math.cos((distToCanal / 1.35) * (Math.PI / 2)) * 0.65;
      }
      return el;
    };

    const terrainSize = 20;
    const terrainHeight = 2.4;
    const terrainGeo = new THREE.BoxGeometry(terrainSize, terrainHeight, terrainSize, 80, 6, 80);
    terrainGeo.translate(0, -terrainHeight / 2, 0);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y >= -0.08) {
        pos.setY(i, getElevation(pos.getX(i), pos.getZ(i)));
      }
    }
    terrainGeo.computeVertexNormals();

    const mapCanvas = document.createElement("canvas");
    mapCanvas.width = 1024;
    mapCanvas.height = 1024;
    const ctx = mapCanvas.getContext("2d");

    if (ctx) {
      if (activeLayer === "natural") {
        ctx.fillStyle = "#5c4a35";
      } else if (activeLayer === "radar") {
        ctx.fillStyle = "#061417";
      } else if (activeLayer === "moisture") {
        ctx.fillStyle = "#8a3a24";
      } else if (activeLayer === "ndvi") {
        ctx.fillStyle = "#8f2d22";
      } else {
        ctx.fillStyle = "#0a2026";
      }
      ctx.fillRect(0, 0, 1024, 1024);

      ctx.strokeStyle =
        activeLayer === "radar"
          ? "rgba(195, 219, 95, 0.18)"
          : activeLayer === "xray"
          ? "rgba(194, 214, 200, 0.2)"
          : "rgba(0, 0, 0, 0.16)";
      ctx.lineWidth = 2;
      for (let y = 40; y < 984; y += 14) {
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(984, y);
        ctx.stroke();
      }

      ctx.strokeStyle =
        activeLayer === "radar"
          ? "rgba(79, 209, 197, 0.35)"
          : activeLayer === "xray"
          ? "rgba(195, 219, 95, 0.3)"
          : "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = activeLayer === "radar" ? 2 : 1;
      for (let g = 64; g < 1024; g += 64) {
        ctx.beginPath();
        ctx.moveTo(g, 0);
        ctx.lineTo(g, 1024);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, g);
        ctx.lineTo(1024, g);
        ctx.stroke();
      }

      const grad = ctx.createRadialGradient(512, 490, 30, 512, 490, 340);
      if (activeLayer === "natural") {
        const loamDarkness = moistureValue > 0.25 ? "rgba(38, 58, 32, 0.98)" : "rgba(72, 82, 44, 0.95)";
        grad.addColorStop(0, loamDarkness);
        grad.addColorStop(0.6, "rgba(56, 74, 40, 0.9)");
        grad.addColorStop(1, "rgba(92, 74, 53, 0.5)");
      } else if (activeLayer === "radar") {
        const intensity = Math.min(1, 0.4 + moistureValue * 1.4);
        grad.addColorStop(0, `rgba(230, 251, 255, ${intensity})`);
        grad.addColorStop(0.3, "rgba(195, 219, 95, 0.9)");
        grad.addColorStop(0.65, "rgba(60, 117, 111, 0.8)");
        grad.addColorStop(1, "rgba(6, 20, 23, 0.4)");
      } else if (activeLayer === "moisture") {
        if (moistureValue < 0.16) {
          grad.addColorStop(0, "rgba(244, 162, 97, 0.98)");
          grad.addColorStop(0.5, "rgba(217, 95, 59, 0.92)");
          grad.addColorStop(1, "rgba(138, 58, 36, 0.6)");
        } else if (moistureValue < 0.32) {
          grad.addColorStop(0, "rgba(0, 168, 232, 0.95)");
          grad.addColorStop(0.45, "rgba(195, 219, 95, 0.92)");
          grad.addColorStop(0.8, "rgba(244, 162, 97, 0.85)");
          grad.addColorStop(1, "rgba(217, 95, 59, 0.5)");
        } else {
          grad.addColorStop(0, "rgba(0, 95, 153, 0.98)");
          grad.addColorStop(0.4, "rgba(0, 168, 232, 0.95)");
          grad.addColorStop(0.8, "rgba(195, 219, 95, 0.88)");
          grad.addColorStop(1, "rgba(60, 117, 111, 0.5)");
        }
      } else if (activeLayer === "ndvi") {
        grad.addColorStop(0, "rgba(27, 122, 61, 0.98)");
        grad.addColorStop(0.45, "rgba(82, 183, 136, 0.92)");
        grad.addColorStop(0.75, "rgba(217, 237, 146, 0.88)");
        grad.addColorStop(1, "rgba(224, 159, 62, 0.65)");
      } else {
        grad.addColorStop(0, "rgba(195, 219, 95, 0.35)");
        grad.addColorStop(1, "rgba(10, 32, 38, 0.15)");
      }

      ctx.beginPath();
      ctx.moveTo(280, 260);
      ctx.lineTo(740, 280);
      ctx.lineTo(790, 690);
      ctx.lineTo(250, 720);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = activeLayer === "radar" ? "#ffffff" : activeLayer === "moisture" ? "#00a8e8" : "#c3db5f";
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.strokeStyle = activeLayer === "radar" ? "#040d10" : "#175e66";
      ctx.lineWidth = 64;
      ctx.beginPath();
      ctx.moveTo(0, 548);
      ctx.lineTo(1024, 906);
      ctx.stroke();
    }

    const terrainTexture = new THREE.CanvasTexture(mapCanvas);
    terrainTexture.anisotropy = 4;

    const isXray = activeLayer === "xray";
    const terrainMat = new THREE.MeshStandardMaterial({
      map: terrainTexture,
      roughness: activeLayer === "radar" ? 0.35 : 0.88,
      metalness: activeLayer === "radar" ? 0.4 : 0.06,
      transparent: isXray,
      opacity: isXray ? 0.28 : 1.0,
      depthWrite: !isXray,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.receiveShadow = true;
    terrainMesh.castShadow = !isXray;
    worldGroup.add(terrainMesh);

    const skinPlaneGeo = new THREE.PlaneGeometry(19.6, 19.6);
    skinPlaneGeo.rotateX(-Math.PI / 2);
    const skinPlaneMat = new THREE.MeshBasicMaterial({
      color: activeLayer === "moisture" ? 0x00a8e8 : 0xc3db5f,
      transparent: true,
      opacity: activeLayer === "xray" ? 0.22 : activeLayer === "moisture" ? 0.12 : 0.0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const skinPlane = new THREE.Mesh(skinPlaneGeo, skinPlaneMat);
    skinPlane.position.y = -0.35;
    skinPlane.visible = activeLayer === "xray" || activeLayer === "moisture";
    worldGroup.add(skinPlane);

    // Row-Planted 3D Corn Field
    const cornPositions: { x: number; y: number; z: number; scale: number; rot: number }[] = [];
    for (let rx = -3.8; rx <= 3.8; rx += 0.65) {
      for (let rz = -3.2; rz <= 3.2; rz += 0.48) {
        const cx = rx + (Math.random() - 0.5) * 0.12;
        const cz = rz + (Math.random() - 0.5) * 0.12;
        const distToCanal = Math.abs(cz - getCanalZ(cx));
        if (distToCanal < 1.6) continue;

        const cy = getElevation(cx, cz);
        cornPositions.push({
          x: cx,
          y: cy,
          z: cz,
          scale: (0.75 + Math.random() * 0.35) * (cropStage === "tillering" ? 0.6 : cropStage === "jointing" ? 1.0 : 1.25),
          rot: Math.random() * Math.PI * 2,
        });
      }
    }

    const cornCount = cornPositions.length;
    const isMutedCrops = activeLayer === "moisture" || activeLayer === "xray";

    const stalkGeo = new THREE.CylinderGeometry(0.022, 0.038, 1.0, 5);
    stalkGeo.translate(0, 0.5, 0);
    const stalkColor =
      activeLayer === "radar"
        ? 0x4fd1c5
        : activeLayer === "ndvi"
        ? 0x2dc653
        : cropStage === "heading"
        ? 0x9c8c42
        : 0x3b6e34;
    const stalkMat = new THREE.MeshStandardMaterial({
      color: stalkColor,
      roughness: 0.75,
      transparent: isMutedCrops,
      opacity: isMutedCrops ? 0.25 : 1.0,
    });
    const stalksMesh = new THREE.InstancedMesh(stalkGeo, stalkMat, cornCount);
    stalksMesh.castShadow = !isMutedCrops;

    const leafGeo = new THREE.BoxGeometry(0.055, 0.012, 0.44);
    leafGeo.translate(0, 0, 0.22);
    const leafColor =
      activeLayer === "radar"
        ? 0xc3db5f
        : activeLayer === "ndvi"
        ? moistureValue < 0.15
          ? 0xe07a5f
          : 0x40e068
        : cropStage === "heading"
        ? 0xc2a84e
        : 0x569e43;
    const leafMat = new THREE.MeshStandardMaterial({
      color: leafColor,
      roughness: 0.65,
      transparent: isMutedCrops,
      opacity: isMutedCrops ? 0.22 : 1.0,
    });
    const leavesMesh = new THREE.InstancedMesh(leafGeo, leafMat, cornCount * 4);
    leavesMesh.castShadow = !isMutedCrops;

    const tasselGeo = new THREE.ConeGeometry(0.035, 0.2, 4);
    tasselGeo.translate(0, 0.1, 0);
    const tasselColor = activeLayer === "radar" ? 0xffffff : activeLayer === "ndvi" ? 0x9ef01a : 0xe5b842;
    const tasselMat = new THREE.MeshStandardMaterial({
      color: tasselColor,
      roughness: 0.6,
      transparent: isMutedCrops,
      opacity: isMutedCrops ? 0.2 : 1.0,
    });
    const tasselsMesh = new THREE.InstancedMesh(tasselGeo, tasselMat, cornCount);

    const dummy = new THREE.Object3D();
    const leafDummy = new THREE.Object3D();
    let leafIdx = 0;

    cornPositions.forEach((p, idx) => {
      const hScale = p.scale * (0.9 + moistureValue * 0.4);

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(0, p.rot, 0);
      dummy.scale.set(1, hScale, 1);
      dummy.updateMatrix();
      stalksMesh.setMatrixAt(idx, dummy.matrix);

      dummy.position.set(p.x, p.y + hScale * 0.98, p.z);
      dummy.scale.set(1, p.scale, 1);
      dummy.updateMatrix();
      tasselsMesh.setMatrixAt(idx, dummy.matrix);

      for (let l = 0; l < 4; l++) {
        const tierHeight = l < 2 ? 0.45 : 0.72;
        const azim = p.rot + l * (Math.PI / 2) + (l % 2 === 0 ? 0.2 : -0.2);
        leafDummy.position.set(p.x, p.y + hScale * tierHeight, p.z);
        leafDummy.rotation.set(0.45 + (l % 2) * 0.15, azim, 0);
        leafDummy.scale.set(1, 1, p.scale);
        leafDummy.updateMatrix();
        leavesMesh.setMatrixAt(leafIdx++, leafDummy.matrix);
      }
    });

    stalksMesh.instanceMatrix.needsUpdate = true;
    leavesMesh.instanceMatrix.needsUpdate = true;
    tasselsMesh.instanceMatrix.needsUpdate = true;

    const cornGroup = new THREE.Group();
    cornGroup.add(stalksMesh);
    cornGroup.add(leavesMesh);
    cornGroup.add(tasselsMesh);
    worldGroup.add(cornGroup);

    // Recessed Nile Canal Water Surface
    const canalLength = 21.0;
    const waterGeo = new THREE.PlaneGeometry(canalLength, 1.35, 24, 1);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMat = new THREE.MeshStandardMaterial({
      color: activeLayer === "radar" ? 0x051316 : activeLayer === "moisture" ? 0x00a8e8 : 0x1d7885,
      roughness: 0.1,
      metalness: 0.85,
      transparent: true,
      opacity: isXray ? 0.35 : 0.9,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.position.set(0, -0.18, 4.2);
    waterMesh.rotation.y = -Math.atan(0.35);
    worldGroup.add(waterMesh);

    // Subterranean 3D Root Network & Pore-Water Particles
    const rootsGroup = new THREE.Group();
    const rootMat = new THREE.LineBasicMaterial({
      color: activeLayer === "xray" ? 0xe9ff70 : 0xc3db5f,
      transparent: true,
      opacity: activeLayer === "xray" ? 0.95 : 0.75,
    });

    const createRootBranch = (startX: number, startZ: number, depth: number, spread: number) => {
      const rootPoints = [
        new THREE.Vector3(startX, 0.25, startZ),
        new THREE.Vector3(startX + spread * 0.25, -0.05, startZ + spread * 0.15),
        new THREE.Vector3(startX + spread * 0.55, -depth * 0.55, startZ + spread * 0.45),
        new THREE.Vector3(startX + spread, -depth, startZ + spread * 0.75),
      ];
      const curve = new THREE.CatmullRomCurve3(rootPoints);
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(14));
      return new THREE.Line(geo, rootMat);
    };

    const plantCenters = [
      { x: 0.2, z: 0.1 },
      { x: 1.4, z: 0.9 },
      { x: -1.1, z: -0.5 },
      { x: 0.8, z: -1.3 },
      { x: -0.7, z: 1.1 },
      { x: 2.1, z: -0.3 },
      { x: -2.0, z: 0.6 },
    ];
    plantCenters.forEach((pt) => {
      rootsGroup.add(createRootBranch(pt.x, pt.z, 0.9, 0.48));
      rootsGroup.add(createRootBranch(pt.x, pt.z, 0.8, -0.42));
      rootsGroup.add(createRootBranch(pt.x, pt.z, 1.15, 0.25));
    });
    worldGroup.add(rootsGroup);

    const particleCount = 240;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 7.5;
      particlePos[i * 3 + 1] = -0.08 - Math.random() * 1.5;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 7.5;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleColor =
      activeLayer === "moisture" || moistureValue > 0.3
        ? 0x38bdf8
        : moistureValue < 0.15
        ? 0xf4a261
        : 0xc3db5f;
    const particleMat = new THREE.PointsMaterial({
      color: particleColor,
      size: activeLayer === "moisture" || activeLayer === "xray" ? 0.18 : 0.11,
      transparent: true,
      opacity: activeLayer === "moisture" || activeLayer === "xray" ? 0.95 : 0.65,
    });
    const moistureParticles = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(moistureParticles);

    // Sentinel-1 SAR Satellite
    const satGroup = new THREE.Group();
    satGroup.position.set(-1.0, 10.2, -1.0);

    const satBodyGeo = new THREE.CylinderGeometry(1.0, 1.0, 1.6, 8);
    satBodyGeo.rotateZ(Math.PI / 2);
    const satBodyMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.22,
    });
    const satBody = new THREE.Mesh(satBodyGeo, satBodyMat);
    satBody.castShadow = true;
    satGroup.add(satBody);

    const sarAntennaGeo = new THREE.BoxGeometry(5.8, 0.22, 1.1);
    const sarAntennaMat = new THREE.MeshStandardMaterial({
      color: 0x224446,
      metalness: 0.92,
      roughness: 0.28,
    });
    const sarAntenna = new THREE.Mesh(sarAntennaGeo, sarAntennaMat);
    sarAntenna.position.set(0, -0.65, 0);
    satGroup.add(sarAntenna);

    for (let f = -2.4; f <= 2.4; f += 1.2) {
      const hornGeo = new THREE.ConeGeometry(0.08, 0.25, 6);
      hornGeo.rotateX(Math.PI);
      const hornMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9 });
      const horn = new THREE.Mesh(hornGeo, hornMat);
      horn.position.set(f, -0.8, 0);
      satGroup.add(horn);
    }

    const wingGeo = new THREE.BoxGeometry(4.2, 0.05, 1.4);
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0x0c2540,
      metalness: 0.78,
      roughness: 0.18,
    });
    const leftWing = new THREE.Mesh(wingGeo, wingMat);
    leftWing.position.set(-4.5, 0.12, 0);
    satGroup.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo, wingMat);
    rightWing.position.set(4.5, 0.12, 0);
    satGroup.add(rightWing);

    const thrusterMat = new THREE.MeshStandardMaterial({ color: 0xb87333, metalness: 0.9 });
    [-0.9, 0.9].forEach((tx) => {
      const thruster = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 6), thrusterMat);
      thruster.position.set(tx, 0.5, 0.5);
      satGroup.add(thruster);
    });

    scene.add(satGroup);

    // Active Microwave Radar Beam Cone & Wavefronts
    const isRadarActive = activeLayer !== "ndvi";
    const beamGeo = new THREE.CylinderGeometry(0.4, 4.4, 9.8, 4, 1, true);
    beamGeo.translate(0, -4.9, 0);
    beamGeo.rotateY(Math.PI / 4);
    const beamMat = new THREE.MeshBasicMaterial({
      color: activeLayer === "radar" ? 0x4fd1c5 : 0xc3db5f,
      transparent: true,
      opacity: activeLayer === "radar" ? 0.22 : activeLayer === "natural" ? 0.05 : 0.12,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const radarBeam = new THREE.Mesh(beamGeo, beamMat);
    radarBeam.visible = isRadarActive;
    satGroup.add(radarBeam);

    const rippleCount = 5;
    const ripples: THREE.Mesh[] = [];
    for (let i = 0; i < rippleCount; i++) {
      const ringGeo = new THREE.RingGeometry(0.35, 0.52, 48);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: activeLayer === "radar" ? 0x4fd1c5 : 0xc3db5f,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(-1.0, 10.2 - i * 1.8, -1.0);
      ring.visible = isRadarActive;
      scene.add(ring);
      ripples.push(ring);
    }

    // In-Situ IoT Ground-Truth Telemetry Station
    const iotGroup = new THREE.Group();
    iotGroup.position.set(2.8, 0.5, 1.8);

    const mastGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.6, 8);
    const mastMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, metalness: 0.9, roughness: 0.3 });
    const mast = new THREE.Mesh(mastGeo, mastMat);
    mast.position.y = 0.8;
    iotGroup.add(mast);

    const solarGeo = new THREE.BoxGeometry(0.42, 0.03, 0.32);
    solarGeo.rotateX(-Math.PI / 5);
    const solarMesh = new THREE.Mesh(solarGeo, wingMat);
    solarMesh.position.set(0, 1.5, 0.1);
    iotGroup.add(solarMesh);

    const encGeo = new THREE.BoxGeometry(0.42, 0.45, 0.32);
    const encMat = new THREE.MeshStandardMaterial({ color: 0x00292d, roughness: 0.4 });
    const enclosure = new THREE.Mesh(encGeo, encMat);
    enclosure.position.y = 1.0;
    iotGroup.add(enclosure);

    const antGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.6, 6);
    const antMesh = new THREE.Mesh(antGeo, mastMat);
    antMesh.position.set(0.12, 1.45, 0);
    iotGroup.add(antMesh);

    const probeGroup = new THREE.Group();
    probeGroup.position.set(0, -0.6, 0);
    const tineMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95 });
    [-0.08, 0, 0.08].forEach((tx) => {
      const tine = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.75, 6), tineMat);
      tine.position.set(tx, 0, 0);
      probeGroup.add(tine);
    });
    iotGroup.add(probeGroup);

    worldGroup.add(iotGroup);

    // Drag & Orbit
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotX = 0.18;
    let rotY = 0.3;

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "BUTTON" || target.closest(".no-drag")) return;
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

    const onTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "BUTTON" || target.closest(".no-drag")) return;
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMouse.x;
      const dy = e.touches[0].clientY - prevMouse.y;
      rotY += dx * 0.006;
      rotX += dy * 0.005;
      rotX = Math.max(-0.35, Math.min(0.65, rotX));
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      satGroup.position.x = Math.sin(t * 0.25) * 2.2 - 1.0;
      satGroup.position.z = Math.cos(t * 0.18) * 1.8 - 1.0;
      satGroup.rotation.y = Math.sin(t * 0.12) * 0.12;

      if (isRadarActive) {
        const maxRippleOp = activeLayer === "radar" ? 0.9 : activeLayer === "natural" ? 0.35 : 0.65;
        ripples.forEach((ring, idx) => {
          const progress = ((t * 1.1 + idx * 0.38) % 2) / 2;
          ring.position.x = satGroup.position.x;
          ring.position.z = satGroup.position.z;
          ring.position.y = 10.2 - progress * 9.5;
          const s = 0.35 + progress * 5.8;
          ring.scale.set(s, s, s);
          (ring.material as THREE.MeshBasicMaterial).opacity = Math.max(0, maxRippleOp - progress * maxRippleOp);
        });
      }

      cornGroup.rotation.z = Math.sin(t * 1.5) * 0.012;
      waterMesh.position.y = -0.18 + Math.sin(t * 1.6) * 0.012;

      if (autoRotate && !isDragging) {
        rotY += 0.0014;
      }

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
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      renderer.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      terrainTexture.dispose();
      skinPlaneGeo.dispose();
      skinPlaneMat.dispose();
      stalkGeo.dispose();
      stalkMat.dispose();
      leafGeo.dispose();
      leafMat.dispose();
      tasselGeo.dispose();
      tasselMat.dispose();
      waterGeo.dispose();
      waterMat.dispose();
      satBodyGeo.dispose();
      satBodyMat.dispose();
      sarAntennaGeo.dispose();
      sarAntennaMat.dispose();
      beamGeo.dispose();
      beamMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeLayer, lightingMode, moistureValue, cropStage, surfaceRoughness, autoRotate]);

  return (
    <section id="physics-3d" className="w-full max-w-[1600px] mx-auto px-4 sm:px-12 lg:px-16 py-12 sm:py-20">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-10 border-b border-teal/15">
        <div className="max-w-3xl">
          <span className="font-mono text-xs text-teal font-semibold uppercase tracking-widest block mb-2">
            {isAr ? "التوأم الرقمي ثلاثي الأبعاد • محاكاة الفيزياء الرادارية" : "INTERACTIVE 3D DIGITAL TWIN • C-BAND SAR PHYSICS"}
          </span>
          <h2 className="text-2xl sm:text-5xl font-bold tracking-tight text-pine font-sans">
            {isAr ? "نموذج المحاكاة ثلاثي الأبعاد للتربة والرادار" : "3D Microwave Radar & Corn Field Simulation"}
          </h2>
          <p className="text-sm sm:text-lg text-pine/75 mt-3 leading-relaxed font-sans max-w-2xl">
            {isAr
              ? "استكشف تفاعل موجات Sentinel-1 الميكروية (٥.٤٠٥ جيجاهرتز) مع حقول الذرة ومنطقة الجذور (٠–٥ سم)، مع معايرة مجسات إنترنت الأشياء الميدانية."
              : "Drag to orbit, switch spectral & radar layers, and adjust root-zone moisture to observe Sentinel-1 C-band penetration across Egyptian corn plots."}
          </p>
        </div>

        <div className="font-mono text-xs text-teal self-start lg:self-end text-left lg:text-right">
          <span className="text-pine font-bold block text-sm">f₀ = 5.405 GHz • λ = 5.55 cm</span>
          <span className="text-pine/50">{isAr ? "اسحب للدوران • عرض ملء الشاشة" : "Drag or Touch to Rotate • Full-Screen Studio"}</span>
        </div>
      </div>

      {/* Dedicated Full-Width 3D Interactive Stage */}
      <div
        className={`relative mt-6 sm:mt-10 transition-all duration-300 ${
          isExpanded
            ? "fixed inset-0 z-[100] w-screen h-screen m-0 rounded-none overflow-hidden bg-[#001c21] text-cream flex flex-col justify-between"
            : "min-h-[540px] sm:min-h-[680px] md:min-h-[740px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#001c21] text-cream border border-teal/25 shadow-2xl flex flex-col justify-between"
        }`}
      >
        {/* 3D WebGL Canvas */}
        <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none z-0" />

        {/* Top Bar Controls */}
        <div className="relative z-10 w-full p-3.5 sm:p-8 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-2.5 sm:gap-4 pointer-events-none select-none">
          {/* Agronomy Phenology & Roughness Quick Pills */}
          <div className="flex flex-wrap items-center gap-2 pointer-events-auto no-drag">
            <div className="bg-pine/85 border border-teal/35 rounded-xl p-1 backdrop-blur-md flex items-center gap-1 text-[11px] font-sans">
              {(
                [
                  { id: "tillering", labelEn: "Early Shoot", labelAr: "بداية الإنبات" },
                  { id: "jointing", labelEn: "Vegetative", labelAr: "النمو الخضري" },
                  { id: "heading", labelEn: "Tasseling", labelAr: "الإزهار والحصاد" },
                ] as const
              ).map((stg) => (
                <button
                  key={stg.id}
                  onClick={() => setCropStage(stg.id)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    cropStage === stg.id ? "bg-lime text-pine font-bold" : "text-cream/75 hover:text-cream"
                  }`}
                >
                  {isAr ? stg.labelAr : stg.labelEn}
                </button>
              ))}
            </div>

            <div className="bg-pine/85 border border-teal/35 rounded-xl p-1 backdrop-blur-md flex items-center gap-1 text-[11px] font-sans">
              {(
                [
                  { id: "smooth", labelEn: "Smooth Soil", labelAr: "تربة ناعمة" },
                  { id: "plowed", labelEn: "Plowed", labelAr: "محروثة" },
                  { id: "rough", labelEn: "Rough", labelAr: "خشنة" },
                ] as const
              ).map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSurfaceRoughness(r.id)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    surfaceRoughness === r.id ? "bg-lime text-pine font-bold" : "text-cream/75 hover:text-cream"
                  }`}
                >
                  {isAr ? r.labelAr : r.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Lighting, Camera Views & Expand */}
          <div className="flex flex-wrap items-center gap-2 pointer-events-auto no-drag">
            <div className="flex items-center bg-pine/85 border border-teal/35 rounded-xl p-1 backdrop-blur-md">
              <button
                onClick={() => setLightingMode("day")}
                title="Egyptian Noon Sun"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  lightingMode === "day" ? "bg-lime text-pine" : "text-cream/70 hover:text-cream"
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLightingMode("golden")}
                title="Golden Hour Sunset"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  lightingMode === "golden" ? "bg-lime text-pine" : "text-cream/70 hover:text-cream"
                }`}
              >
                <Sunset className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLightingMode("night")}
                title="Night Radar Penetration"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  lightingMode === "night" ? "bg-lime text-pine" : "text-cream/70 hover:text-cream"
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center bg-pine/85 border border-teal/35 rounded-xl p-1 backdrop-blur-md text-xs font-sans">
              <button
                onClick={() => resetView("isometric")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  cameraView === "isometric" ? "bg-lime text-pine font-bold" : "text-cream/70 hover:text-cream"
                }`}
              >
                {isAr ? "شامل" : "Overview"}
              </button>
              <button
                onClick={() => resetView("orbit")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  cameraView === "orbit" ? "bg-lime text-pine font-bold" : "text-cream/70 hover:text-cream"
                }`}
              >
                {isAr ? "مدار" : "Orbit"}
              </button>
              <button
                onClick={() => resetView("field")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  cameraView === "field" ? "bg-lime text-pine font-bold" : "text-cream/70 hover:text-cream"
                }`}
              >
                {isAr ? "الحقل" : "Corn Field"}
              </button>
              <button
                onClick={() => resetView("roots")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  cameraView === "roots" ? "bg-lime text-pine font-bold" : "text-cream/70 hover:text-cream"
                }`}
              >
                {isAr ? "الجذور" : "Roots"}
              </button>
            </div>

            <button
              onClick={() => setAutoRotate(!autoRotate)}
              title="Toggle Slow Orbit Drift"
              className={`p-2 rounded-xl border border-teal/35 backdrop-blur-md transition-colors cursor-pointer ${
                autoRotate ? "bg-teal/40 text-lime" : "bg-pine/85 text-cream/50"
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Exit Fullscreen (Esc)" : "Expand Full-Screen 3D"}
              className="p-2 rounded-xl border border-teal/35 bg-pine/85 text-lime hover:bg-teal transition-colors cursor-pointer backdrop-blur-md"
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Floating Live Telemetry Readout (Top-Right) */}
        <div className="hidden md:flex flex-col gap-2.5 absolute top-24 right-8 z-10 pointer-events-none select-none font-mono text-xs">
          <div className="bg-pine/85 border border-teal/35 px-4 py-3 rounded-xl backdrop-blur-md text-cream shadow-lg space-y-1.5">
            <div className="flex items-center gap-2 text-lime font-bold text-[11px] uppercase border-b border-teal/25 pb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>Live Physical Telemetry</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
              <div>
                <span className="text-cream/60">ε* Bulk: </span>
                <span className="text-teal font-semibold">{telemetry.permittivity}</span>
              </div>
              <div>
                <span className="text-cream/60">σ⁰_VV: </span>
                <span className="text-lime font-bold">{telemetry.sigma0_vv} dB</span>
              </div>
              <div>
                <span className="text-cream/60">Skin δ: </span>
                <span className="text-cream font-bold">{telemetry.skinDepth_cm} cm</span>
              </div>
              <div>
                <span className="text-cream/60">NDVI: </span>
                <span className="text-lime font-bold">{telemetry.ndvi}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom HUD: Legend + 5 Layer Switcher + Moisture Slider */}
        <div className="relative z-10 p-3.5 sm:p-8 flex flex-col xl:flex-row items-stretch xl:items-end justify-between gap-3 sm:gap-4 pointer-events-auto no-drag mt-auto">
          <div className="flex flex-col gap-2">
            {/* Dynamic Color & Physics Legend */}
            <div className="bg-pine/90 border border-teal/35 rounded-xl px-3.5 py-2 backdrop-blur-md shadow-lg max-w-2xl">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-[10px] sm:text-[11px] font-mono text-lime font-bold uppercase tracking-wide">
                  {isAr ? layerLegend.titleAr : layerLegend.titleEn}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-mono text-cream/75">
                <span className="shrink-0">{layerLegend.minLabel}</span>
                <div
                  className="h-2 flex-grow rounded-full border border-white/15"
                  style={{ background: layerLegend.gradient }}
                />
                <span className="shrink-0">{layerLegend.maxLabel}</span>
              </div>
            </div>

            {/* 5 Layer Selector Buttons (horizontally scrollable on small phones) */}
            <div className="bg-pine/90 border border-teal/35 rounded-2xl p-1.5 sm:p-2 backdrop-blur-md shadow-xl flex items-center gap-1.5 text-xs font-sans overflow-x-auto max-w-full">
              <span className="text-cream/60 px-2 text-[11px] font-mono uppercase hidden sm:flex items-center gap-1.5 shrink-0">
                <Layers className="w-3.5 h-3.5 text-lime" />
                {isAr ? "الطبقة:" : "3D Layer:"}
              </span>
              {(
                [
                  { id: "natural", labelEn: "🌾 True Biome", labelAr: "🌾 الحقل الطبيعي" },
                  { id: "radar", labelEn: "🛰️ SAR Radar σ⁰", labelAr: "🛰️ التشتت الراداري σ⁰" },
                  { id: "moisture", labelEn: "💧 VSM mᵥ", labelAr: "💧 الرطوبة mᵥ" },
                  { id: "ndvi", labelEn: "🌿 S2 NDVI", labelAr: "🌿 الغطاء الخضري" },
                  { id: "xray", labelEn: "🔬 Roots X-Ray", labelAr: "🔬 الجذور والعزل" },
                ] as const
              ).map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer text-[11px] sm:text-xs font-medium whitespace-nowrap shrink-0 ${
                    activeLayer === layer.id
                      ? "bg-lime text-pine font-bold shadow-xs"
                      : "bg-teal/20 text-cream/80 hover:bg-teal/40"
                  }`}
                >
                  {isAr ? layer.labelAr : layer.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Live 3D Moisture Slider */}
          <div className="bg-pine/90 border border-teal/35 rounded-2xl p-3 sm:p-4 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 max-w-xl text-xs font-mono text-cream/90">
            <div className="space-y-1 w-full sm:w-auto">
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="text-lime font-bold uppercase flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5" />
                  {isAr ? "تحكم بالرطوبة الحية" : "Live 3D Moisture"}
                </span>
                <span className="text-cream/80 font-bold font-mono">
                  mᵥ: {moistureValue.toFixed(2)} m³/m³
                </span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.45"
                step="0.01"
                value={moistureValue}
                onChange={(e) => setMoistureValue(parseFloat(e.target.value))}
                className="w-full sm:w-52 h-2 bg-teal/40 rounded-lg appearance-none cursor-pointer accent-lime"
              />
            </div>

            <div className="hidden sm:block border-l border-teal/25 pl-4 text-[11px] space-y-0.5 shrink-0">
              <div>
                <span className="text-cream/60">Fresnel R₀: </span>
                <span className="text-cream font-semibold">{telemetry.fresnel_r0}</span>
              </div>
              <div>
                <span className="text-cream/60">σ⁰_VH: </span>
                <span className="text-lime font-bold">{telemetry.sigma0_vh} dB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

