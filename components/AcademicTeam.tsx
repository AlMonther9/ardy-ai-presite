"use client";

import { ExternalLink } from "lucide-react";
import { ArdyTreeArchLineArt } from "./LineArt";

interface AcademicTeamProps {
  lang: "en" | "ar";
}

export default function AcademicTeam({ lang }: AcademicTeamProps) {
  const isAr = lang === "ar";

  const teamMembers = [
    {
      id: "01",
      nameEn: "AlMonther Abdulhafeez",
      nameAr: "المنذر عبد الحفيظ",
      roleEn: "Product Designer & Software Engineer",
      roleAr: "مهندس برمجيات وتصميم منتجات",
      discipline: "System Architecture & 3D WebGL",
      descEn: "Frontend UI/UX, interactive 3D WebGL diorama, platform system architecture, and API integration.",
      descAr: "تطوير واجهة المستخدم وبناء لوحة التحكم التفاعلية ثلاثية الأبعاد وتصميم هيكلة المنصة السحابية.",
    },
    {
      id: "02",
      nameEn: "Hassan Rada",
      nameAr: "حسن رضا",
      roleEn: "ML & Remote Sensing Engineer",
      roleAr: "مهندس ذكاء اصطناعي واستشعار عن بعد",
      discipline: "Radar Inversion & GEE",
      descEn: "Google Earth Engine pipeline, Water Cloud Model inversion, and satellite regression training.",
      descAr: "إدارة خطوط معالجة GEE وتدريب نماذج الانحدار لتقدير الرطوبة وفك التشتت النباتي.",
    },
    {
      id: "03",
      nameEn: "Mohammed Samir",
      nameAr: "محمد سمير",
      roleEn: "ML & Crop Phenology Engineer",
      roleAr: "مهندس تعلم آلة وتصنيف محاصيل",
      discipline: "Crop Phenology & SAR ML",
      descEn: "Multi-temporal SAR/optical crop classification algorithms (wheat, corn, rice) and phenology tracking.",
      descAr: "تطوير خوارزميات التصنيف الراداري لأنواع المحاصيل ومراقبة مراحل النمو الفينولوجية.",
    },
    {
      id: "04",
      nameEn: "Hamed Bassam",
      nameAr: "حامد بسام",
      roleEn: "ML & Geospatial Data Engineer",
      roleAr: "مهندس بيانات جغرافية وذكاء اصطناعي",
      discipline: "Optical/SAR Data Fusion",
      descEn: "Sentinel-1/2 data fusion, speckle filtering, radiometric calibration, and dataset pipelines.",
      descAr: "معالجة وتحسين الصور الرادارية ودمج البيانات الطيفية وتنسيق مصفوفات البيانات الضخمة.",
    },
    {
      id: "05",
      nameEn: "Mostafa Kamel",
      nameAr: "مصطفى كامل",
      roleEn: "Cloud Systems & Infrastructure Engineer",
      roleAr: "مهندس نظم وحوسبة سحابية",
      discipline: "Cloud Microservices & GEE",
      descEn: "GEE cloud authentication, microservices architecture, serverless APIs, and distributed database.",
      descAr: "إدارة التكامل السحابي مع Google Earth Engine وبرمجة واجهات التطبيقات وقواعد البيانات.",
    },
    {
      id: "06",
      nameEn: "Mohammed Sobhi",
      nameAr: "محمد صبحي",
      roleEn: "Cybersecurity & Comms Engineer",
      roleAr: "مهندس أمن سيبراني واتصالات",
      discipline: "Encrypted Telemetry & TLS",
      descEn: "End-to-end telemetry encryption (TLS/DTLS), secure API gateways, and edge hardware integrity.",
      descAr: "تأمين نقل البيانات وتشفير الاتصالات بين عقد إنترنت الأشياء والخوادم السحابية.",
    },
    {
      id: "07",
      nameEn: "Yousef Hussien",
      nameAr: "يوسف حسين",
      roleEn: "IoT & Embedded Systems Engineer",
      roleAr: "مهندس أنظمة مدمجة وإنترنت الأشياء",
      discipline: "Custom PCB & FDR Probes",
      descEn: "Custom PCB design, dielectric sensor calibration, low-power telemetry (LoRaWAN/Cellular) firmware.",
      descAr: "تصميم الدوائر المطبوعة (PCB) لعقد الاستشعار ومعايرة المجسات الميدانية وكتابة الفيرموير.",
    },
  ];

  return (
    <section id="team" className="w-full max-w-[1600px] mx-auto px-4 sm:px-12 lg:px-16 py-14 sm:py-24 border-t border-teal/15">
      {/* Editorial Fluid Header & Department Leadership Banner (Uncontained, Seamless) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-teal/15">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-teal font-semibold uppercase tracking-widest block">
              {isAr
                ? "جامعة الأزهر • كلية الهندسة بقنا • قسم هندسة الاتصالات والإلكترونيات"
                : "AL-AZHAR UNIVERSITY • FACULTY OF ENGINEERING • DEPT. OF ECE"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-pine font-sans">
            {isAr ? "فريق مهندسي الاتصالات والإلكترونيات" : "Department of ECE Engineering Team"}
          </h2>

          <p className="text-base sm:text-lg text-pine/80 font-sans leading-relaxed">
            {isAr ? "مشروع التخرج مقدم تحت إشراف: " : "Graduation Project Under the Academic Supervision of: "}
            <strong className="text-teal font-bold">
              {isAr ? "أ.د. محمد نور الدين" : "Prof. Dr. Mohamed NourElDin"}
            </strong>
          </p>
        </div>

        <a
          href="https://docs.google.com/document/d/1U6_Y6hu-2PCKvcQkDrzBDLMt-yY6lOkeA8bY6i9xm4M/edit"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-medium tracking-wide uppercase shadow-sm self-start lg:self-end whitespace-nowrap cursor-pointer"
        >
          <span>{isAr ? "الاطلاع على وثيقة المقترح الأكاديمي" : "View Official Proposal Document"}</span>
          <ExternalLink className="w-4 h-4 text-lime" />
        </a>
      </div>

      {/* Fluid Engineering Roster (Zero Boxed Cards — Breathable Architectural List) */}
      <div className="divide-y divide-teal/15 mt-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="py-6 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start group"
          >
            {/* Col 1: Index & Discipline Tag (Span 3) */}
            <div className="md:col-span-3 space-y-1">
              <span className="font-mono text-xs text-teal font-bold block">
                {member.id} // ECE 2026
              </span>
              <span className="text-xs font-mono text-pine/50 block">
                {member.discipline}
              </span>
            </div>

            {/* Col 2: Name & Role Title (Span 4) */}
            <div className="md:col-span-4 space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold text-pine font-cairo group-hover:text-teal transition-colors">
                {isAr ? member.nameAr : member.nameEn}
              </h3>
              <span className="text-xs sm:text-sm font-semibold text-teal block font-sans">
                {isAr ? member.roleAr : member.roleEn}
              </span>
            </div>

            {/* Col 3: Technical Ownership & Scope (Span 5) */}
            <div className="md:col-span-5">
              <p className="text-xs sm:text-sm text-pine/75 leading-relaxed font-sans">
                {isAr ? member.descAr : member.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}