"use client";

import {
  NileRiverBasinLineArt,
  RootSystemLineArt,
  SatelliteRadarBeamLineArt,
} from "./LineArt";

interface StrategicImpactProps {
  lang: "en" | "ar";
}

export default function StrategicImpact({ lang }: StrategicImpactProps) {
  const isAr = lang === "ar";

  const impacts = [
    {
      index: "01",
      titleEn: "Rationalization of Nile Basin Quotas",
      titleAr: "ترشيد حصة مصر من مياه النيل",
      statEn: "15% – 30%",
      statAr: "١٥٪ – ٣٠٪",
      subEn: "Extraction Volume Reduction",
      subAr: "خفض في استهلاك مياه الري",
      descEn:
        "Agriculture accounts for 80–85% of Egypt's total Nile allocation. Transitioning from unmonitored flood irrigation schedules to radar-guided precision intervals saves billions of cubic meters of fresh water annually, directly addressing Nile upstream hydrological stresses.",
      descAr:
        "يستهلك القطاع الزراعي ما يزيد عن 80% من الموارد المائية لمصر. التحول من الري بالغمر غير المقنن إلى الري الدقيق المعتمد على استشعار الرطوبة يخفض الفاقد المائي بمليارات الأمتار المكعبة سنوياً لمواجهة الضغوط الهيدرولوجية على حوض النيل.",
      highlightEn: "Strategic Water Security for 110M+ Population",
      highlightAr: "أمن مائي استراتيجي لأكثر من ١١٠ مليون نسمة",
      LineArtComponent: NileRiverBasinLineArt,
    },
    {
      index: "02",
      titleEn: "Mitigation of Delta Soil Salinization",
      titleAr: "الحد من تملح أراضي دلتا النيل",
      statEn: "0 – 5.0 cm",
      statAr: "٠ – ٥.٠ سم",
      subEn: "SAR Active Skin Depth",
      subAr: "عمق النفاذ الراداري المباشر",
      descEn:
        "In poorly drained sectors of the Nile Delta (Kafr El-Sheikh, Beheira), excessive flooding drives deep saline tables upward into root zones. Continuous dielectric permittivity tracking prevents water-table pooling, protecting critical arable heritage land from irreversible salinization.",
      descAr:
        "الإفراط في الري في مناطق الدلتا يؤدي إلى ارتفاع منسوب الماء الأرضي المالح نحو الجذور. توفير قياسات رادارية دقيقة يمنع التراكم الملحي ويحفظ خصوبة أراضي الدلتا التاريخية للأجيال القادمة.",
      highlightEn: "Guarding Kafr El-Sheikh & Beheira Alluvial Heritage",
      highlightAr: "حماية خصوبة أراضي كفر الشيخ والبحيرة التاريخية",
      LineArtComponent: RootSystemLineArt,
    },
    {
      index: "03",
      titleEn: "Desert Mega-Projects Optimization",
      titleAr: "دعم مشاريع الاستصلاح الصحراوي القومية",
      statEn: "10m × 10m",
      statAr: "١٠م × ١٠م",
      subEn: "Spatio-Temporal Pixel Grid",
      subAr: "دقة التفريق المكاني الميدانية",
      descEn:
        "National mega-projects in Toshka, the New Delta, and East Oweinat operate under hyper-arid conditions. C-Band microwaves penetrate dry surface sand crusts to reveal subterranean root moisture, maximizing yield-per-drop across sandy soils.",
      descAr:
        "تسهم القياسات الرادارية في رفع كفاءة استخدام المياه في مشاريع توشكى والدلتا الجديدة وشرق العوينات، لاختراقها الطبقة الرملية الجافة وقياس الرطوبة في منطقة الجذور بدقة تفريق ١٠ أمتار.",
      highlightEn: "Yield-Per-Drop Efficiency across Toshka & New Delta",
      highlightAr: "تعظيم إنتاجية قطرة الماء في توشكى والدلتا الجديدة",
      LineArtComponent: SatelliteRadarBeamLineArt,
    },
  ];

  return (
    <section id="impact" className="w-full max-w-[1600px] mx-auto px-4 sm:px-12 lg:px-16 py-14 sm:py-24 border-t border-teal/15">
      {/* Editorial Fluid Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-teal/15">
        <div className="max-w-3xl">
          <span className="font-mono text-xs text-teal font-semibold uppercase tracking-widest block mb-2">
            {isAr ? "الأثر القومي للأمن المائي في مصر" : "STRATEGIC IMPACT // NATIONAL WATER SECURITY IN EGYPT"}
          </span>
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-pine font-sans">
            {isAr ? "حلول هندسية لمواجهة تحديات ندرة المياه" : "Engineering Solutions for National Water Resilience"}
          </h2>
          <p className="text-sm sm:text-lg text-pine/75 mt-3 sm:mt-4 leading-relaxed font-sans max-w-2xl">
            {isAr
              ? "التحول من التقديرات النظرية إلى بيانات فضائية دقيقة ترشد إدارة الموارد المائية وتحمي الأراضي الزراعية التاريخية والحديثة في مصر."
              : "Transforming agricultural water management from guesswork to active microwave intelligence across the Nile basin."}
          </p>
        </div>

        <div className="font-mono text-xs text-teal self-start lg:self-end text-left lg:text-right">
          <span className="text-pine font-bold block text-sm">Al-Azhar ECE Graduation Project</span>
          <span className="text-pine/50">Aligned with Egypt Vision 2030 Water Pillar</span>
        </div>
      </div>

      {/* Fluid Editorial Stories Flow (Zero Boxed Cards — Breathable Full-Width Rows) */}
      <div className="divide-y divide-teal/15 mt-4">
        {impacts.map((item) => {
          const LineArt = item.LineArtComponent;
          return (
            <div
              key={item.index}
              className="py-8 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center"
            >
              {/* Massive Metric & Index Column (Span 4) */}
              <div className="lg:col-span-4 space-y-2">
                <span className="font-mono text-xs text-teal font-semibold uppercase tracking-wider block">
                  {item.index} // NATIONAL IMPACT
                </span>
                <div className="text-5xl sm:text-6xl lg:text-7xl font-bold font-mono text-pine tracking-tight">
                  {isAr ? item.statAr : item.statEn}
                </div>
                <div className="text-xs sm:text-sm font-semibold uppercase text-teal tracking-wide font-sans">
                  {isAr ? item.subAr : item.subEn}
                </div>
              </div>

              {/* Narrative Editorial Column (Span 6) */}
              <div className="lg:col-span-6 space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold text-pine font-sans">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-sm sm:text-base text-pine/80 font-sans leading-relaxed">
                  {isAr ? item.descAr : item.descEn}
                </p>
                <div className="text-xs font-mono text-teal pt-2">
                  ✓ {isAr ? item.highlightAr : item.highlightEn}
                </div>
              </div>

              {/* Line Art Column (Span 2) */}
              <div className="lg:col-span-2 flex justify-start lg:justify-end">
                <div className="w-20 h-20 rounded-2xl bg-sage/20 border border-teal/20 flex items-center justify-center text-teal">
                  <LineArt className="w-12 h-12 text-teal" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}