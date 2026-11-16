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
      discipline: "Product Design & Software Engineering",
      descEn:
        "Product design, user experience architecture, core system engineering, and end-to-end platform development.",
      descAr:
        "تصميم المنتج وهندسة تجربة المستخدم وتطوير هيكلة المنظومة وهندسة البرمجيات المتكاملة.",
    },
    {
      id: "02",
      nameEn: "Hasan Rada",
      nameAr: "حسن رضا",
      roleEn: "AI & ML Engineer",
      roleAr: "مهندس ذكاء اصطناعي وتعلم آلة",
      discipline: "Artificial Intelligence & Machine Learning",
      descEn:
        "Machine learning model development, data pipelines, and predictive AI engineering.",
      descAr:
        "تطوير نماذج تعلم الآلة وهندسة خطوط معالجة البيانات وبناء النماذج التنبؤية بالذكاء الاصطناعي.",
    },
    {
      id: "03",
      nameEn: "Hamed Bassam",
      nameAr: "حامد بسام",
      roleEn: "AI & ML Engineer",
      roleAr: "مهندس ذكاء اصطناعي وتعلم آلة",
      discipline: "Artificial Intelligence & Machine Learning",
      descEn:
        "Machine learning model training, algorithm development, and AI data engineering pipelines.",
      descAr:
        "تدريب نماذج تعلم الآلة وتطوير الخوارزميات وهندسة مصفوفات بيانات الذكاء الاصطناعي.",
    },
    {
      id: "04",
      nameEn: "Mostafa Kamel",
      nameAr: "مصطفى كامل",
      roleEn: "AI & ML Engineer",
      roleAr: "مهندس ذكاء اصطناعي وتعلم آلة",
      discipline: "Artificial Intelligence & Machine Learning",
      descEn:
        "Machine learning model architecture, algorithmic optimization, and predictive AI systems.",
      descAr:
        "بناء وتصميم معماريات تعلم الآلة وتحسين الخوارزميات ونظم الذكاء الاصطناعي التنبؤية.",
    },
    {
      id: "05",
      nameEn: "Mohammed Samir",
      nameAr: "محمد سمير",
      roleEn: "Cybersecurity Engineer",
      roleAr: "مهندس أمن سيبراني",
      discipline: "Cybersecurity & Information Security",
      descEn:
        "System security architecture, network vulnerability assessment, encrypted protocols, and data protection.",
      descAr:
        "أمن المعلومات وهندسة الحماية السيبرانية وتشفير بروتوكولات الاتصال وحماية الأنظمة وقواعد البيانات.",
    },
    {
      id: "06",
      nameEn: "Mohammed Sobhi",
      nameAr: "محمد صبحي",
      roleEn: "Cloud Engineer",
      roleAr: "مهندس حوسبة سحابية",
      discipline: "Cloud Systems & Infrastructure",
      descEn:
        "Cloud infrastructure architecture, microservices deployment, distributed backend systems, and scalable server environments.",
      descAr:
        "بناء وإدارة البنية التحتية السحابية ونشر الخدمات المصغرة وهندسة النظم الموزعة والسيرفرات.",
    },
    {
      id: "07",
      nameEn: "Yousef Hussien",
      nameAr: "يوسف حسين",
      roleEn: "IoT & Embedded Systems Engineer",
      roleAr: "مهندس أنظمة مدمجة وإنترنت الأشياء",
      discipline: "Custom PCB & FDR Probes",
      descEn:
        "Custom PCB design, dielectric sensor calibration, low-power telemetry (LoRaWAN/Cellular) firmware.",
      descAr:
        "تصميم الدوائر المطبوعة (PCB) لعقد الاستشعار ومعايرة المجسات الميدانية وكتابة الفيرموير.",
    },
  ];

  return (
    <section
      id="team"
      className="w-full max-w-[1600px] mx-auto px-4 sm:px-12 lg:px-16 py-14 sm:py-24 border-t border-teal/15"
    >
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
            {isAr
              ? "فريق مهندسي الاتصالات والإلكترونيات"
              : "Department of ECE Engineering Team"}
          </h2>

          <p className="text-base sm:text-lg text-pine/80 font-sans leading-relaxed">
            {isAr
              ? "مشروع التخرج مقدم تحت إشراف: "
              : "Graduation Project Under the Academic Supervision of: "}
            <strong className="text-teal font-bold">
              {isAr
                ? "أ.د. محمد نور الدين شعبان"
                : "Prof. Dr. Mohamed NourElDin Sha'ban"}
            </strong>
          </p>
        </div>

        <a
          href="https://docs.google.com/document/d/1U6_Y6hu-2PCKvcQkDrzBDLMt-yY6lOkeA8bY6i9xm4M/edit"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-medium tracking-wide uppercase shadow-sm self-start lg:self-end whitespace-nowrap cursor-pointer"
        >
          <span>
            {isAr
              ? "الاطلاع على وثيقة المقترح الأكاديمي"
              : "View Official Proposal Document"}
          </span>
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
