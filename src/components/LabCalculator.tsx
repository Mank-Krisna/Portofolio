import { useState } from "react";
import { TRANSLATIONS } from "../data";
import { Language } from "../types";
import { Calculator, Beaker, HelpCircle, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface LabCalculatorProps {
  lang: Language;
}

export default function LabCalculator({ lang }: LabCalculatorProps) {
  const t = TRANSLATIONS[lang];

  const [activeTab, setActiveTab] = useState<"dilution" | "molarity">("dilution");

  // Dilution state
  const [c1, setC1] = useState("100");
  const [v1, setV1] = useState("");
  const [c2, setC2] = useState("5");
  const [v2, setV2] = useState("100");
  const [dilutionUnitC, setDilutionUnitC] = useState("ppm");
  const [dilutionUnitV, setDilutionUnitV] = useState("mL");
  const [dilutionResult, setDilutionResult] = useState<number | null>(null);

  // Molarity state
  const [molarityM, setMolarityM] = useState("0.1");
  const [molarityV, setMolarityV] = useState("250");
  const [molarityMW, setMolarityMW] = useState("368.38"); // Default Curcumin MW
  const [molarityResult, setMolarityResult] = useState<number | null>(null);

  const calculateDilution = () => {
    // C1 * V1 = C2 * V2
    // Calculate whichever is empty or let's calculate V1 (most common: "how much stock to pipette")
    const numC1 = parseFloat(c1);
    const numC2 = parseFloat(c2);
    const numV2 = parseFloat(v2);

    if (numC1 && numC2 && numV2 && numC1 > numC2) {
      const calculatedV1 = (numC2 * numV2) / numC1;
      setDilutionResult(Math.round(calculatedV1 * 1000) / 1000);
    } else {
      setDilutionResult(null);
    }
  };

  const calculateMolarity = () => {
    // Mass = Molarity (M) * Volume (L) * MW
    const numM = parseFloat(molarityM);
    const numV = parseFloat(molarityV) / 1000; // convert mL to L
    const numMW = parseFloat(molarityMW);

    if (numM && numV && numMW) {
      const calculatedMass = numM * numV * numMW;
      setMolarityResult(Math.round(calculatedMass * 1000) / 1000);
    } else {
      setMolarityResult(null);
    }
  };

  return (
    <section id="kalkulator" className="py-24 md:py-32 border-t border-line scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
            {t.calcSubtitle}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mb-6 gradient-text">
            {t.calcTitle}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-ink-soft text-justify">
            {t.calcIntro}
          </p>
        </div>

        {/* Toolkit Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form left */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-6 shadow-sm space-y-6 card-hover">
            {/* Tab Switches */}
            <div className="flex border-b border-line pb-px">
              <button
                onClick={() => setActiveTab("dilution")}
                className={`flex-1 pb-3 text-xs font-mono tracking-wider uppercase border-b-2 text-center cursor-pointer transition-all ${
                  activeTab === "dilution"
                    ? "border-accent text-accent font-semibold"
                    : "border-transparent text-ink-soft hover:text-ink"
                }`}
              >
                {t.calcTabDilution}
              </button>
              <button
                onClick={() => setActiveTab("molarity")}
                className={`flex-1 pb-3 text-xs font-mono tracking-wider uppercase border-b-2 text-center cursor-pointer transition-all ${
                  activeTab === "molarity"
                    ? "border-accent text-accent font-semibold"
                    : "border-transparent text-ink-soft hover:text-ink"
                }`}
              >
                {t.calcTabMolarity}
              </button>
            </div>

            {/* DILUTION CALCULATOR */}
            {activeTab === "dilution" && (
              <div className="space-y-4">
                <p className="text-xs text-ink-soft leading-relaxed italic flex items-center gap-2">
                  <HelpCircle size={13} className="text-accent shrink-0" />
                  <span>
                    Formula: C₁ × V₁ = C₂ × V₂. {lang === "id" ? "Hitung volume induk (V₁) yang perlu diambil." : "Find the volume of stock (V₁) to extract."}
                  </span>
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {/* Stock concentration C1 */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-ink-soft">
                      {lang === "id" ? "Konsentrasi Induk (C1)" : "Stock Conc. (C1)"}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={c1}
                        onChange={(e) => {
                          setC1(e.target.value);
                          setDilutionResult(null);
                        }}
                        placeholder="1000"
                        className="w-full bg-paper-soft border border-line rounded-lg px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
                      />
                      <span className="absolute right-3 top-2.5 text-[10px] font-mono text-ink-soft">
                        {dilutionUnitC}
                      </span>
                    </div>
                  </div>

                  {/* Stock volume V1 */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-ink-soft">
                      {lang === "id" ? "Volume Induk (V1) - Target Cari" : "Stock Vol. (V1) - Unknown"}
                    </label>
                    <input
                      type="text"
                      disabled
                      value={dilutionResult ? `${dilutionResult} ${dilutionUnitV}` : "?"}
                      className="w-full bg-paper-soft/40 border border-line/60 rounded-lg px-3 py-2 text-sm text-accent font-bold font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Target concentration C2 */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-ink-soft">
                      {lang === "id" ? "Konsentrasi Target (C2)" : "Target Conc. (C2)"}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={c2}
                        onChange={(e) => {
                          setC2(e.target.value);
                          setDilutionResult(null);
                        }}
                        placeholder="50"
                        className="w-full bg-paper-soft border border-line rounded-lg px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
                      />
                      <span className="absolute right-3 top-2.5 text-[10px] font-mono text-ink-soft">
                        {dilutionUnitC}
                      </span>
                    </div>
                  </div>

                  {/* Target volume V2 */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-ink-soft">
                      {lang === "id" ? "Volume Target (V2)" : "Target Vol. (V2)"}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={v2}
                        onChange={(e) => {
                          setV2(e.target.value);
                          setDilutionResult(null);
                        }}
                        placeholder="100"
                        className="w-full bg-paper-soft border border-line rounded-lg px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
                      />
                      <span className="absolute right-3 top-2.5 text-[10px] font-mono text-ink-soft">
                        {dilutionUnitV}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Configuration of Units */}
                <div className="flex gap-4 border-t border-line/50 pt-3">
                  <div className="flex-1 space-y-1">
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-ink-soft">
                      {lang === "id" ? "Satuan Konsentrasi" : "Concentration Unit"}
                    </label>
                    <select
                      value={dilutionUnitC}
                      onChange={(e) => setDilutionUnitC(e.target.value)}
                      className="w-full bg-paper-soft border border-line rounded-lg px-3 py-1.5 text-xs text-ink focus:outline-none"
                    >
                      <option value="ppm">ppm (mg/L)</option>
                      <option value="ppb">ppb (µg/L)</option>
                      <option value="M">M (Molar)</option>
                      <option value="mM">mM (MiliMolar)</option>
                      <option value="%">% (Percent w/v)</option>
                    </select>
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-ink-soft">
                      {lang === "id" ? "Satuan Volume" : "Volume Unit"}
                    </label>
                    <select
                      value={dilutionUnitV}
                      onChange={(e) => setDilutionUnitV(e.target.value)}
                      className="w-full bg-paper-soft border border-line rounded-lg px-3 py-1.5 text-xs text-ink focus:outline-none"
                    >
                      <option value="mL">mL (Mililiter)</option>
                      <option value="µL">µL (Mikroliter)</option>
                      <option value="L">L (Liter)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={calculateDilution}
                  className="w-full bg-accent hover:bg-accent-soft text-on-accent font-semibold py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all mt-4"
                >
                  <Calculator size={13} />
                  <span>{t.calcCalculate}</span>
                </button>

                {/* Dilution Report card */}
                {dilutionResult !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-accent/5 rounded-xl border border-accent/20 text-xs text-ink leading-relaxed space-y-2 mt-4"
                  >
                    <p className="font-semibold text-accent flex items-center gap-2">
                      <Beaker size={14} />
                      <span>{t.calcDilResult}:</span>
                    </p>
                    <p className="text-sm font-mono font-bold bg-paper px-3 py-2 rounded border border-line text-center">
                      <span className="text-accent text-lg mr-1">{dilutionResult}</span> {dilutionUnitV}
                    </p>
                    <p className="text-[10px] text-ink-soft italic text-justify">
                      {lang === "id"
                        ? `Pipet sebanyak ${dilutionResult} ${dilutionUnitV} larutan induk, masukkan ke dalam labu ukur ${v2} ${dilutionUnitV}, lalu tambahkan pelarut hingga tanda batas.`
                        : `Pipette ${dilutionResult} ${dilutionUnitV} of stock solution, transfer into a ${v2} ${dilutionUnitV} volumetric flask, and dilute with solvent up to the calibration mark.`}
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* MOLARITY CALCULATOR */}
            {activeTab === "molarity" && (
              <div className="space-y-4">
                <p className="text-xs text-ink-soft leading-relaxed italic flex items-center gap-2">
                  <HelpCircle size={13} className="text-accent shrink-0" />
                  <span>
                    Formula: Mass = Molarity (M) × Volume (L) × Molecular Weight (g/mol)
                  </span>
                </p>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono tracking-wider uppercase text-ink-soft">
                    {lang === "id" ? "Molaritas Target (M)" : "Target Molarity (M)"}
                  </label>
                  <input
                    type="number"
                    value={molarityM}
                    onChange={(e) => {
                      setMolarityM(e.target.value);
                      setMolarityResult(null);
                    }}
                    placeholder="0.1"
                    className="w-full bg-paper-soft border border-line rounded-lg px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Volume V (mL) */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-ink-soft">
                      {lang === "id" ? "Volume Larutan (mL)" : "Solution Volume (mL)"}
                    </label>
                    <input
                      type="number"
                      value={molarityV}
                      onChange={(e) => {
                        setMolarityV(e.target.value);
                        setMolarityResult(null);
                      }}
                      placeholder="250"
                      className="w-full bg-paper-soft border border-line rounded-lg px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
                    />
                  </div>

                  {/* Molecular Weight MW */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-ink-soft">
                      {lang === "id" ? "Berat Molekul (BM / MW)" : "Molecular Weight (MW)"}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={molarityMW}
                        onChange={(e) => {
                          setMolarityMW(e.target.value);
                          setMolarityResult(null);
                        }}
                        placeholder="164.2"
                        className="w-full bg-paper-soft border border-line rounded-lg px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
                      />
                      <span className="absolute right-3 top-2.5 text-[10px] font-mono text-ink-soft">
                        g/mol
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={calculateMolarity}
                  className="w-full bg-accent hover:bg-accent-soft text-on-accent font-semibold py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all mt-4"
                >
                  <Calculator size={13} />
                  <span>{t.calcCalculate}</span>
                </button>

                {/* Molarity report card */}
                {molarityResult !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-accent/5 rounded-xl border border-accent/20 text-xs text-ink leading-relaxed space-y-2 mt-4"
                  >
                    <p className="font-semibold text-accent flex items-center gap-2">
                      <Beaker size={14} />
                      <span>{t.calcMolarityResult}:</span>
                    </p>
                    <p className="text-sm font-mono font-bold bg-paper px-3 py-2 rounded border border-line text-center">
                      <span className="text-accent text-lg mr-1">{molarityResult}</span> g
                    </p>
                    <p className="text-[10px] text-ink-soft italic text-justify">
                      {lang === "id"
                        ? `Timbang secara analitis sebanyak ${molarityResult} gram zat, larutkan dengan sedikit pelarut dalam glass beaker, transfer ke labu ukur ${molarityV} mL, lalu tambahkan pelarut hingga tanda batas.`
                        : `Weigh ${molarityResult} grams of powder on an analytical balance, dissolve in a beaker, transfer to a ${molarityV} mL volumetric flask, and dilute with solvent up to the calibration mark.`}
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Interactive Lab Stage Right */}
          <div className="lg:col-span-6 bg-paper-soft rounded-2xl p-6 border border-line flex flex-col items-center justify-center h-[430px] space-y-6 relative shadow-inner overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#3f5a50_1px,transparent_1px)] bg-[size:16px_16px]" />

            <h3 className="font-mono text-xs text-ink-soft uppercase text-center w-full z-10">
              {lang === "id" ? "Visualisasi Sediaan Cairan Lab" : "Lab Liquefaction Visualization"}
            </h3>

            {/* SVG Volumetric Flasks Rendering */}
            <div className="flex gap-12 items-end z-10">
              {/* Flask 1: Stock */}
              <div className="flex flex-col items-center">
                <svg width="100" height="150" viewBox="0 0 100 150">
                  {/* Neck calibration line */}
                  <line x1="40" y1="45" x2="60" y2="45" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />

                  {/* Stock Flask Body */}
                  <path
                    d="M 40,20 L 60,20 L 60,55 L 85,115 C 92,125 87,135 75,135 L 25,135 C 13,135 8,125 15,115 L 40,55 Z"
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />

                  {/* Liquid inside stock flask */}
                  <motion.path
                    d="M 18,120 L 82,120 C 85,130 80,132 75,132 L 25,132 C 20,132 15,130 18,120 Z"
                    fill="#3F5A50"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: activeTab === "dilution" && dilutionResult ? 0.3 : 1.4 }}
                    style={{ originY: "132px" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="opacity-75"
                  />

                  <text x="50" y="145" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="monospace" fill="var(--ink-soft)">
                    Stock
                  </text>
                </svg>
              </div>

              {/* Pipette / Cylinder separator arrow */}
              <div className="text-center pb-8">
                <motion.div
                  animate={{ x: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-accent text-3xl font-serif font-bold"
                >
                  →
                </motion.div>
                <span className="font-mono text-[9px] text-ink-soft uppercase tracking-wider block mt-1">
                  {activeTab === "dilution" ? "Pipette" : "Dilute"}
                </span>
              </div>

              {/* Flask 2: Target */}
              <div className="flex flex-col items-center">
                <svg width="100" height="150" viewBox="0 0 100 150">
                  {/* Neck calibration line */}
                  <line x1="40" y1="45" x2="60" y2="45" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />

                  {/* Target Flask Body */}
                  <path
                    d="M 40,20 L 60,20 L 60,55 L 85,115 C 92,125 87,135 75,135 L 25,135 C 13,135 8,125 15,115 L 40,55 Z"
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />

                  {/* Liquid inside target flask */}
                  <motion.path
                    d="M 23,126 Q 50,123 77,126 C 85,134 81,132 75,132 L 25,132 C 19,132 15,134 23,126 Z"
                    fill="#3f82f6"
                    initial={{ scaleY: 0.1 }}
                    animate={{
                      scaleY:
                        activeTab === "dilution" && dilutionResult
                          ? 2.1
                          : activeTab === "molarity" && molarityResult
                          ? 2.8
                          : 0.1
                    }}
                    style={{ originY: "132px" }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    className="opacity-60"
                  />

                  <text x="50" y="145" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="monospace" fill="var(--ink-soft)">
                    Target
                  </text>
                </svg>
              </div>
            </div>

            {/* Analytical feedback notice */}
            <div className="w-full flex items-center gap-2.5 bg-paper/80 p-3 rounded-xl border border-line text-[10px] leading-relaxed text-ink-soft">
              <AlertCircle size={14} className="text-accent shrink-0" />
              <span>
                {activeTab === "dilution"
                  ? (lang === "id"
                    ? "Presisi penting! Pengenceran standar analitis wajib dikocok melingkar membentuk pusaran homogên setelah diencerkan hingga tanda tera."
                    : "Precision matters! Analytical dilution standards must be swirled into a homogeneous state after diluting up to the calibration mark.")
                  : (lang === "id"
                    ? "Wajib mencatat Berat Molekul senyawa aktif secara saksama. Untuk senyawa tak murni, koreksi kemurnian zat wajib dikalikan."
                    : "Ensure chemical purity is accounted for. For non-absolute reagents, the purity correction factor must be applied to the target weight.")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
