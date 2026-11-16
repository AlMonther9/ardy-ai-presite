"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { ArdyTreeArchLineArt, SatelliteRadarBeamLineArt, IoTProbeLineArt } from "./LineArt";

interface WaitlistStudioProps {
  lang: "en" | "ar";
}

export default function WaitlistStudio({ lang }: WaitlistStudioProps) {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState<"investor" | "grower" | "researcher">("investor");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isAr = lang === "ar";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/almonther.art@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          partnerCategory: interest,
          _subject: `ARDY-AI Partnership Briefing (${interest}) from ${email}`,
          source: "Partnership Studio Section",
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setIsSubmitted(true);
    } catch {
      window.location.href = `mailto:almonther.art@gmail.com?subject=${encodeURIComponent(
        `ARDY-AI Partnership Briefing (${interest})`
      )}&body=${encodeURIComponent(`Contact Email: ${email}\nPartner Category: ${interest}`)}`;
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="partner" className="w-full max-w-[1600px] mx-auto px-4 sm:px-12 lg:px-16 py-14 sm:py-24 border-t border-teal/15">
      {/* Fluid Panoramic Partnership Studio Spread (Uncontained, Screen-Wide) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column (Span 6): Strategic Narrative & Partnership Tracks */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <ArdyTreeArchLineArt className="w-8 h-8 text-teal shrink-0" />
            <span className="font-mono text-xs text-teal font-semibold uppercase tracking-widest">
              {isAr ? "مسرعات الأعمال والشركاء الميدانيين" : "ACCELERATOR ACCESS & PILOT PARTNERSHIP STUDIO"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-pine font-sans leading-[1.12]">
            {isAr
              ? "انضم إلى برنامج الشراكات وتجارب المعايرة الميدانية"
              : "Join the ARDY-AI Partnership & Calibration Program"}
          </h2>

          <p className="text-base sm:text-lg text-pine/80 font-sans leading-relaxed">
            {isAr
              ? "نوجه هذا العمل لمسرعات الأعمال والمستثمرين المهتمين بالأمن المائي والتكنولوجيا الزراعية العميقة (مثل Flat6Labs و Falak و AUC Venture Lab)، إضافة إلى المزارع الكبرى في توشكى والدلتا."
              : "Prepared for venture partners, accelerators (Flat6Labs, Falak, AUC Venture Lab), and pilot farm operators across Upper Egypt and the Nile Delta."}
          </p>

          {/* Strategic Feature List */}
          <div className="space-y-4 pt-4 border-t border-teal/15 text-xs sm:text-sm font-sans text-pine/85">
            <div className="flex items-start gap-3">
              <span className="text-teal font-bold font-mono">01 //</span>
              <div>
                <strong className="text-pine block font-semibold">
                  {isAr ? "وصول خاص لغرفة بيانات المستثمرين ومسرعات الأعمال" : "Investor & Accelerator Data Room Access"}
                </strong>
                <span className="text-pine/70 text-xs">
                  {isAr
                    ? "نموذج العمل، خارطة الطريق التقنية، ونتائج المعايرة الرادارية الميدانية."
                    : "Full business model, technical milestones, and calibrated radar validation datasets."}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-teal font-bold font-mono">02 //</span>
              <div>
                <strong className="text-pine block font-semibold">
                  {isAr ? "نشر عقد الاستشعار الميدانية بالمزارع الشريكة" : "In-Situ IoT Node Pilot Deployments"}
                </strong>
                <span className="text-pine/70 text-xs">
                  {isAr
                    ? "تركيب مجسات FDR 70MHz في توشكى ووادي قنا ودلتا النيل للمعايرة الفورية."
                    : "Deployment of custom FDR capacitance nodes across Toshka, Qena, and Delta fields."}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-teal font-bold font-mono">03 //</span>
              <div>
                <strong className="text-pine block font-semibold">
                  {isAr ? "تكامل سحابي مباشر مع خوارزميات Google Earth Engine" : "Direct Google Earth Engine Telemetry Pipeline"}
                </strong>
                <span className="text-pine/70 text-xs">
                  {isAr
                    ? "بيانات رطوبة حجمية أسبوعية متجددة بدقة تفريق ١٠ أمتار للمحاصيل الاستراتيجية."
                    : "Automated weekly volumetric soil moisture delivery at 10m spatial resolution."}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Span 6): Fluid Partnership Command Form */}
        <div className="lg:col-span-6 bg-[#002428] text-cream rounded-[36px] border border-teal/25 p-8 sm:p-12 shadow-2xl relative">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(194, 214, 200, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(194, 214, 200, 0.2) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 space-y-6">
            <div>
              <span className="font-mono text-xs text-lime font-bold uppercase tracking-wider block mb-1">
                INSTITUTIONAL BRIEFING REQUEST
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-cream font-sans">
                {isAr ? "طلب إيجاز الشراكة الفني" : "Request Institutional Briefing"}
              </h3>
              <p className="text-xs sm:text-sm text-cream/75 font-sans mt-1">
                {isAr
                  ? "أدخل بريدك المؤسسي لتلقي الملف الاستثماري وعينات البيانات الرادارية."
                  : "Enter your corporate or institutional email to receive our deck and telemetry samples."}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                  onSubmit={handleSubmit}
                >
                  {/* Role Selector Pills */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono text-cream/60 block">PARTNER CATEGORY:</span>
                    <div className="flex flex-wrap gap-2 text-xs font-sans">
                      {(
                        [
                          { id: "investor", labelEn: "Accelerator / VC", labelAr: "مستثمر / مسرعة أعمال" },
                          { id: "grower", labelEn: "Farm Pilot Operator", labelAr: "مزرعة تجريبية" },
                          { id: "researcher", labelEn: "Academic Institution", labelAr: "جهة بحثية" },
                        ] as const
                      ).map((pill) => (
                        <button
                          key={pill.id}
                          type="button"
                          onClick={() => setInterest(pill.id)}
                          className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-medium ${
                            interest === pill.id
                              ? "bg-lime text-pine font-bold shadow-sm"
                              : "bg-pine/80 text-cream/70 hover:bg-pine border border-teal/30"
                          }`}
                        >
                          {isAr ? pill.labelAr : pill.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input & Action */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-cream/60 block">INSTITUTIONAL EMAIL:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isAr ? "partner@accelerator.com" : "partner@accelerator.com"}
                      className="w-full bg-[#00171a] border border-teal/35 px-5 py-3.5 rounded-xl text-cream placeholder:text-cream/40 focus:outline-none focus:border-lime transition-all text-xs sm:text-sm font-sans"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-lime text-pine hover:bg-cream disabled:opacity-60 py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-sans font-bold text-xs sm:text-sm tracking-wide uppercase shadow-sm cursor-pointer whitespace-nowrap active:scale-[0.98]"
                  >
                    <span>
                      {isSubmitting
                        ? isAr
                          ? "جاري الإرسال..."
                          : "Sending Request..."
                        : isAr
                        ? "إرسال طلب الإيجاز التقني"
                        : "Submit Briefing Request"}
                    </span>
                    <ArrowRight className="w-4 h-4 text-pine" />
                  </button>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-sans text-cream/60 pt-2 gap-2">
                    <span>{isAr ? "سرية تامة. رد مباشر خلال ٢٤ ساعة." : "Strict institutional confidentiality. 24h direct response."}</span>
                    <a
                      href="mailto:almonther.art@gmail.com?subject=Direct%20Inquiry:%20ARDY-AI%20Partnership"
                      className="text-lime hover:underline font-mono"
                    >
                      almonther.art@gmail.com
                    </a>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#00171a] border border-teal/35 rounded-2xl p-8 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-lime/20 text-lime mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-lime" />
                  </div>
                  <h4 className="text-xl font-bold text-cream font-sans">
                    {isAr ? "تم تسجيل طلبك بنجاح" : "Partnership Request Received"}
                  </h4>
                  <p className="text-xs sm:text-sm text-cream/75 max-w-md mx-auto font-sans leading-relaxed">
                    {isAr
                      ? "سيتواصل معك مهندسو المشروع بالملف الاستثماري وبيانات المعايرة الميدانية لشبكة الاستشعار."
                      : "Our engineering leads will deliver our technical paper, GEE data samples, and telemetry validation data directly to your inbox."}
                  </p>
                  <a
                    href="https://docs.google.com/document/d/1U6_Y6hu-2PCKvcQkDrzBDLMt-yY6lOkeA8bY6i9xm4M/edit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-lime hover:underline font-semibold font-sans pt-2"
                  >
                    <span>{isAr ? "تصفح وثيقة مقترح التخرج الأكاديمي كاملة" : "Read official graduation proposal document"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}