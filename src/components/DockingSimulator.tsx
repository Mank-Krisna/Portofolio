import { useState, useEffect } from "react";
import { PROTEINS, COMPOUNDS, TRANSLATIONS } from "../data";
import { Language, Protein, Compound, DockingResult } from "../types";
import { Play, RotateCcw, Activity, Award, CheckCircle, HelpCircle, Terminal } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { motion, AnimatePresence } from "motion/react";

interface DockingSimulatorProps {
  lang: Language;
}

export default function DockingSimulator({ lang }: DockingSimulatorProps) {
  const t = TRANSLATIONS[lang];

  const [selectedProtein, setSelectedProtein] = useState<Protein>(PROTEINS[0]);
  const [selectedCompound, setSelectedCompound] = useState<Compound>(COMPOUNDS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [result, setResult] = useState<DockingResult | null>(null);
  const [activeTab, setActiveTab] = useState<"visualizer" | "report" | "logs">("visualizer");

  // Run the docking simulation
  const runSimulation = () => {
    setIsRunning(true);
    setProgress(0);
    setResult(null);
    setActiveTab("visualizer");

    const steps = [
      { p: 15, msg: lang === "id" ? "Mempersiapkan koordinat atom ligan..." : "Preparing ligand atomic coordinates..." },
      { p: 35, msg: lang === "id" ? "Membaca saku aktif reseptor protein..." : "Reading receptor protein active pocket..." },
      { p: 55, msg: lang === "id" ? "Menghitung peta medan energi (Autogrid)..." : "Computing energy grid maps (Autogrid)..." },
      { p: 75, msg: lang === "id" ? "Menghubungkan konformasi dengan algoritma genetika..." : "Searching conformations via genetic algorithm..." },
      { p: 90, msg: lang === "id" ? "Menghitung afinitas bebas (Autodock scoring)..." : "Calculating binding free affinity (Autodock scoring)..." },
      { p: 100, msg: lang === "id" ? "Simulasi selesai!" : "Simulation completed successfully!" }
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setProgress(steps[stepIdx].p);
        setCurrentStep(steps[stepIdx].msg);
        stepIdx++;
      } else {
        clearInterval(interval);
        setIsRunning(false);

        // Generate a scientifically-sound result based on the chosen compound and protein
        // Add a slight random variance (+/- 0.2 kcal/mol) for realism
        const variance = Math.round((Math.random() * 0.4 - 0.2) * 10) / 10;
        const finalEnergy = Math.round((selectedCompound.baseAffinity + variance) * 10) / 10;

        // Calculate Inhibition Constant Ki = exp(deltaG / (R * T))
        // R * T = 1.987e-3 * 298.15 = 0.592 kcal/mol
        const kiMolar = Math.exp(finalEnergy / 0.592);
        let kiValue = 0;
        let kiUnit = "µM";

        if (kiMolar < 1e-6) {
          kiValue = Math.round(kiMolar * 1e9 * 100) / 100; // Nanomolar
          kiUnit = "nM";
        } else {
          kiValue = Math.round(kiMolar * 1e6 * 100) / 100; // Micromolar
          kiUnit = "µM";
        }

        // Map interactions dynamically using the active site residues of the protein
        const interactions: DockingResult["interactions"] = [
          {
            residue: selectedProtein.activeSite[0],
            type: "hydrogen_bond",
            distance: Math.round((2.4 + Math.random() * 0.8) * 100) / 100
          },
          {
            residue: selectedProtein.activeSite[1],
            type: "hydrogen_bond",
            distance: Math.round((2.7 + Math.random() * 0.7) * 100) / 100
          },
          {
            residue: selectedProtein.activeSite[2] || "Glu166",
            type: "hydrophobic",
            distance: Math.round((3.4 + Math.random() * 1.2) * 100) / 100
          }
        ];

        // Additional interaction if molecular weight is high
        if (selectedCompound.molecularWeight > 200 && selectedProtein.activeSite[3]) {
          interactions.push({
            residue: selectedProtein.activeSite[3],
            type: "electrostatic",
            distance: Math.round((3.1 + Math.random() * 1.0) * 100) / 100
          });
        }

        const dateStr = new Date().toISOString().replace("T", " ").substring(0, 19);
        const dockingLog = [
          `AutoDock Vina v1.2.3 [Built: Jul 2026]`,
          `----------------------------------------`,
          `[LOG] Execution date: ${dateStr}`,
          `[LOG] Reading receptor: ${selectedProtein.code}.pdbqt ... done.`,
          `[LOG] Reading ligand: ${selectedCompound.name.toLowerCase()}.pdbqt ... done.`,
          `[LOG] Grid center: x=12.42, y=-3.15, z=22.84`,
          `[LOG] Grid size: 40 x 40 x 40, spacing: 0.375 Å`,
          `[LOG] Target receptor residues loaded: ${selectedProtein.activeSite.join(", ")}`,
          `[LOG] Ligand atoms: ${selectedCompound.atomsCount}, bonds: ${selectedCompound.bondsCount}`,
          `[LOG] Active search parameters: exhaustiveness=8, seed=42`,
          `----------------------------------------`,
          `Mode | Affinity (kcal/mol) | Dist from best (RMSD l.b. | RMSD u.b.)`,
          `   1 |      ${finalEnergy.toFixed(1)}            |       0.000       |       0.000`,
          `   2 |      ${(finalEnergy + 0.3).toFixed(1)}            |       1.241       |       1.854`,
          `   3 |      ${(finalEnergy + 0.6).toFixed(1)}            |       1.942       |       2.311`,
          `   4 |      ${(finalEnergy + 0.9).toFixed(1)}            |       2.253       |       3.104`,
          `----------------------------------------`,
          `[RESULT] Best Binding Affinity (Delta G): ${finalEnergy.toFixed(1)} kcal/mol`,
          `[RESULT] Calculated Inhibition Constant (Ki): ${kiValue.toFixed(2)} ${kiUnit}`,
          `[RESULT] Mapping hydrogen bonds and hydrophobic interactions... done.`,
          `[RESULT] Standard output status: Success.`
        ];

        setResult({
          bindingEnergy: finalEnergy,
          inhibitionConstant: parseFloat(`${kiValue} ${kiUnit === "nM" ? 0.001 : 1}`), // standard scale
          interactions,
          dockingLog
        });
      }
    }, 600);
  };

  const resetSimulation = () => {
    setResult(null);
    setProgress(0);
    setCurrentStep("");
    setIsRunning(false);
  };

  // Prepare chart data
  const chartData = result
    ? result.interactions.map((inter) => ({
        residue: inter.residue,
        "Distance (Å)": inter.distance,
        type: inter.type === "hydrogen_bond" ? t.simTypeHbond : inter.type === "hydrophobic" ? t.simTypeHydrophobic : t.simTypeElectrostatic,
        color: inter.type === "hydrogen_bond" ? "#3F5A50" : inter.type === "hydrophobic" ? "#D97706" : "#2563EB"
      }))
    : [];

  return (
    <section id="simulator" className="py-24 md:py-32 border-t border-line bg-paper-soft/40 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
            {t.simSubtitle}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mb-6 gradient-text">
            {t.simTitle}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-ink-soft text-justify">
            {t.simIntro}
          </p>
        </div>

        {/* Configuration Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Left */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 shadow-sm space-y-6 card-hover">
            <h3 className="font-mono text-xs tracking-wider uppercase text-ink font-semibold flex items-center gap-2 pb-3 border-b border-line">
              <Activity size={14} className="text-accent" />
              <span>Simulation Panel</span>
            </h3>

            {/* Protein Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-mono tracking-wider uppercase text-ink-soft">
                {t.simSelectProtein}
              </label>
              <select
                disabled={isRunning}
                value={selectedProtein.id}
                onChange={(e) => {
                  const prot = PROTEINS.find((p) => p.id === e.target.value);
                  if (prot) setSelectedProtein(prot);
                }}
                className="w-full bg-paper-soft border border-line rounded-lg px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none transition-colors"
              >
                {PROTEINS.map((prot) => (
                  <option key={prot.id} value={prot.id}>
                    {prot.name} ({prot.code})
                  </option>
                ))}
              </select>

              {/* Protein Metadata Card */}
              <div className="glass-card p-4 rounded-xl space-y-2.5 mt-2 card-hover">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-ink-soft">{t.simPdbCode}:</span>
                  <span className="text-ink font-semibold bg-accent/10 text-accent px-1.5 py-0.5 rounded">
                    {selectedProtein.code}
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-ink-soft font-mono block mb-0.5">{t.simTargetPath}:</span>
                  <span className="text-ink leading-relaxed block font-medium">
                    {selectedProtein.targetPathology[lang]}
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-ink-soft font-mono block mb-1">{t.simActiveSite}:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProtein.activeSite.map((res) => (
                      <span
                        key={res}
                        className="bg-paper text-ink-soft font-mono text-[10px] px-2 py-0.5 rounded border border-line"
                      >
                        {res}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Compound Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-mono tracking-wider uppercase text-ink-soft">
                {t.simSelectCompound}
              </label>
              <select
                disabled={isRunning}
                value={selectedCompound.id}
                onChange={(e) => {
                  const comp = COMPOUNDS.find((c) => c.id === e.target.value);
                  if (comp) setSelectedCompound(comp);
                }}
                className="w-full bg-paper-soft border border-line rounded-lg px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none transition-colors"
              >
                {COMPOUNDS.map((comp) => (
                  <option key={comp.id} value={comp.id}>
                    {comp.name} — {t.simSource}: {comp.source[lang]}
                  </option>
                ))}
              </select>

              {/* Compound Metadata Card */}
              <div className="glass-card p-4 rounded-xl space-y-2.5 mt-2 card-hover">
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-ink-soft block mb-0.5">{t.simFormula}:</span>
                    <span className="text-ink font-medium">{selectedCompound.formula}</span>
                  </div>
                  <div>
                    <span className="text-ink-soft block mb-0.5">{t.simMw}:</span>
                    <span className="text-ink font-medium">{selectedCompound.molecularWeight} g/mol</span>
                  </div>
                </div>
                <p className="text-xs text-ink-soft leading-relaxed border-t border-line/40 pt-2 italic text-justify">
                  {selectedCompound.description[lang]}
                </p>
              </div>
            </div>

            {/* Simulation Action Buttons */}
            <div className="flex gap-3 pt-2">
              {!result && !isRunning ? (
                <button
                  onClick={runSimulation}
                  className="flex-1 btn-primary font-semibold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Play size={15} />
                  <span>{t.simBtnRun}</span>
                </button>
              ) : (
                <button
                  onClick={resetSimulation}
                  disabled={isRunning}
                  className="flex-1 glass-card border border-line hover:border-accent hover:text-accent font-semibold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Screen Right */}
          <div className="lg:col-span-7 glass-card rounded-2xl border border-line overflow-hidden shadow-sm flex flex-col h-[540px]">
            {/* Tabs */}
            <div className="glass-card border-b border-line px-4 py-2 flex items-center justify-between">
              <div className="flex gap-1.5">
                <button
                  onClick={() => setActiveTab("visualizer")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide transition-all ${
                    activeTab === "visualizer"
                      ? "bg-accent text-on-accent font-semibold shadow-sm"
                      : "text-ink-soft hover:text-ink hover:bg-paper-soft"
                  }`}
                >
                  3D Canvas
                </button>
                <button
                  disabled={!result}
                  onClick={() => setActiveTab("report")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide transition-all disabled:opacity-40 ${
                    activeTab === "report"
                      ? "bg-accent text-on-accent font-semibold shadow-sm"
                      : "text-ink-soft hover:text-ink hover:bg-paper-soft"
                  }`}
                >
                  Affinity Report
                </button>
                <button
                  disabled={!result}
                  onClick={() => setActiveTab("logs")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide transition-all disabled:opacity-40 ${
                    activeTab === "logs"
                      ? "bg-accent text-on-accent font-semibold shadow-sm"
                      : "text-ink-soft hover:text-ink hover:bg-paper-soft"
                  }`}
                >
                  Vina Logs
                </button>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isRunning ? "bg-amber-500 animate-pulse" : result ? "bg-emerald-500" : "bg-ink-soft/40"
                  }`}
                />
                <span className="font-mono text-[10px] uppercase text-ink-soft">
                  {isRunning ? "COMPUTING" : result ? "COMPLETED" : "IDLE"}
                </span>
              </div>
            </div>

            {/* Screen Content */}
            <div className="flex-1 bg-ink dark:bg-black p-6 relative overflow-hidden flex flex-col">
              {/* Overlay Loader */}
              <AnimatePresence>
                {isRunning && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="w-16 h-16 border-4 border-accent-soft/30 border-t-accent rounded-full animate-spin mb-6" />
                    <p className="font-mono text-xs text-white/90 animate-pulse max-w-sm">
                      {currentStep}
                    </p>
                    <div className="w-64 bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                      <motion.div
                        className="bg-accent h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-white/40 mt-2">{progress}%</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 1. VISUALIZER TAB */}
              {activeTab === "visualizer" && (
                <div className="flex-1 flex flex-col items-center justify-center relative">
                  {/* Backdrop Grid lines */}
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

                  {/* SVG Molecular Simulation Stage */}
                  <svg
                    viewBox="0 0 400 300"
                    className="w-full h-full max-h-[280px]"
                  >
                    {/* Receptor Pocket boundary representation */}
                    <path
                      d="M 60,150 C 60,90 120,60 200,60 C 280,60 340,90 340,150 C 340,210 270,240 200,240 C 130,240 60,210 60,150 Z"
                      fill="none"
                      stroke="#4e6e62"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      className="opacity-40"
                    />

                    {/* Amino Acid Residue Spheres (Receptor) */}
                    {selectedProtein.activeSite.map((res, idx) => {
                      // Distribute residues in the active site pocket
                      const angle = (idx / selectedProtein.activeSite.length) * Math.PI * 2;
                      const cx = 200 + Math.cos(angle) * 110;
                      const cy = 150 + Math.sin(angle) * 70;

                      return (
                        <g key={res} className="cursor-pointer group">
                          {/* Inner glowing core */}
                          <circle
                            cx={cx}
                            cy={cy}
                            r={result ? "9" : "8"}
                            fill="#3F5A50"
                            className="transition-all duration-500 opacity-90 hover:fill-accent-soft"
                          />
                          {/* Outer halo */}
                          <circle
                            cx={cx}
                            cy={cy}
                            r={result ? "15" : "12"}
                            fill="none"
                            stroke="#7FA593"
                            strokeWidth="1"
                            className={`opacity-30 ${result ? "animate-pulse" : ""}`}
                          />
                          <text
                            x={cx}
                            y={cy - 16}
                            textAnchor="middle"
                            fill="#ECE7DB"
                            fontSize="8"
                            fontFamily="monospace"
                            className="opacity-75 pointer-events-none"
                          >
                            {res}
                          </text>
                        </g>
                      );
                    })}

                    {/* Dotted interaction lines (snap into place when result is ready) */}
                    {result &&
                      result.interactions.map((inter, idx) => {
                        const angle = (idx / selectedProtein.activeSite.length) * Math.PI * 2;
                        const rx = 200 + Math.cos(angle) * 110;
                        const ry = 150 + Math.sin(angle) * 70;

                        // Center ligand displacement
                        const lx = 200 + (idx - 1) * 15;
                        const ly = 150 + (idx % 2 === 0 ? 10 : -10);

                        return (
                          <g key={`line-${idx}`} className="animate-fade-in">
                            <line
                              x1={rx}
                              y1={ry}
                              x2={lx}
                              y2={ly}
                              stroke={inter.type === "hydrogen_bond" ? "#22c55e" : "#eab308"}
                              strokeWidth="1.5"
                              strokeDasharray="4 3"
                            />
                            {/* Interaction distance label */}
                            <rect
                              x={(rx + lx) / 2 - 16}
                              y={(ry + ly) / 2 - 7}
                              width="32"
                              height="14"
                              rx="3"
                              fill="#1B1A17"
                              stroke="#D9D2C2"
                              strokeWidth="0.5"
                            />
                            <text
                              x={(rx + lx) / 2}
                              y={(ry + ly) / 2 + 3}
                              textAnchor="middle"
                              fill="#ECE7DB"
                              fontSize="7"
                              fontFamily="monospace"
                            >
                              {inter.distance} Å
                            </text>
                          </g>
                        );
                      })}

                    {/* Compound Ligand Skeletal Structure (Center) */}
                    <g>
                      {/* Skeletal model lines */}
                      <motion.path
                        d="M 170,140 L 190,135 L 205,150 L 225,145 L 215,165 L 195,160 L 170,140"
                        stroke="#7FA593"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={
                          result
                            ? { rotate: 0, x: 0, y: 0 }
                            : {
                                rotate: [0, 10, -15, 0],
                                x: [0, -10, 8, 0],
                                y: [0, 8, -5, 0]
                              }
                        }
                        transition={
                          result
                            ? { type: "spring", stiffness: 100 }
                            : { repeat: Infinity, duration: 6, ease: "easeInOut" }
                        }
                      />
                      {/* Skeletal atoms */}
                      <motion.circle
                        cx="170"
                        cy="140"
                        r="5"
                        fill="#ef4444"
                        animate={result ? { x: 0, y: 0 } : { x: [0, -10, 8, 0], y: [0, 8, -5, 0] }}
                        transition={result ? { type: "spring" } : { repeat: Infinity, duration: 6 }}
                      />
                      <motion.circle
                        cx="225"
                        cy="145"
                        r="5"
                        fill="#3b82f6"
                        animate={result ? { x: 0, y: 0 } : { x: [0, -10, 8, 0], y: [0, 8, -5, 0] }}
                        transition={result ? { type: "spring" } : { repeat: Infinity, duration: 6 }}
                      />
                      <motion.circle
                        cx="205"
                        cy="150"
                        r="4"
                        fill="#ece7db"
                        animate={result ? { x: 0, y: 0 } : { x: [0, -10, 8, 0], y: [0, 8, -5, 0] }}
                        transition={result ? { type: "spring" } : { repeat: Infinity, duration: 6 }}
                      />
                    </g>
                  </svg>

                  {/* visualizer footer status */}
                  <div className="absolute bottom-2 text-center">
                    <p className="text-[10px] font-mono text-white/50">
                      {result
                        ? `${selectedCompound.name} docked in ${selectedProtein.name} active site`
                        : "Ready for molecular grid search simulation"}
                    </p>
                  </div>
                </div>
              )}

              {/* 2. REPORT TAB (CHARTS) */}
              {activeTab === "report" && result && (
                <div className="flex-1 flex flex-col justify-between text-white animate-fade-in">
                  {/* Energy cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-center">
                      <span className="text-[10px] font-mono uppercase text-white/50 block mb-1">
                        {t.simEnergy}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold font-mono text-emerald-400">
                          {result.bindingEnergy}
                        </span>
                        <span className="text-xs text-white/70">kcal/mol</span>
                      </div>
                      <span className="text-[9px] font-mono text-emerald-400/80 block mt-2">
                        ★ Highly Stable Docking
                      </span>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-center">
                      <span className="text-[10px] font-mono uppercase text-white/50 block mb-1">
                        {t.simInhibition}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold font-mono text-cyan-400">
                          {result.inhibitionConstant < 0.1
                            ? (result.inhibitionConstant * 1000).toFixed(2)
                            : result.inhibitionConstant.toFixed(2)}
                        </span>
                        <span className="text-xs text-white/70">
                          {result.inhibitionConstant < 0.1 ? "nM" : "µM"}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-white/40 block mt-2">
                        Ki = exp(ΔG / RT) at 298.15K
                      </span>
                    </div>
                  </div>

                  {/* Resicharts Bar chart */}
                  <div className="mt-4 flex-1 h-[140px] bg-white/3 p-3 rounded-xl border border-white/5 flex flex-col">
                    <span className="text-[10px] font-mono uppercase text-white/40 block mb-2">
                      {t.simInteractions}
                    </span>
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
                          layout="vertical"
                          margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
                        >
                          <XAxis type="number" domain={[0, 5]} stroke="#888888" fontSize={9} />
                          <YAxis dataKey="residue" type="category" stroke="#888888" fontSize={9} />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#1B1A17", borderColor: "#35332E", color: "#ECE7DB", fontSize: "10px" }}
                          />
                          <Bar dataKey="Distance (Å)" barSize={12}>
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20 text-[10px] leading-relaxed text-emerald-400 font-mono">
                    <CheckCircle size={12} className="shrink-0" />
                    <span>
                      {selectedCompound.name} demonstrates potential binding capacity inside the {selectedProtein.code} pocket with hydrogen bonding on {result.interactions.filter(i => i.type === "hydrogen_bond").map(i => i.residue).join(" & ")}.
                    </span>
                  </div>
                </div>
              )}

              {/* 3. LOGS TAB (TERMINAL) */}
              {activeTab === "logs" && result && (
                <div className="flex-1 flex flex-col bg-black/90 p-4 rounded-lg font-mono text-[10px] leading-normal text-emerald-500/90 overflow-y-auto max-h-[430px] border border-white/10 animate-fade-in select-all">
                  <div className="flex items-center gap-1.5 pb-2 border-b border-white/10 mb-3 text-white/40">
                    <Terminal size={12} />
                    <span>Autodock_Vina_Console.log</span>
                  </div>
                  {result.dockingLog.map((line, idx) => (
                    <div key={idx} className={line.startsWith("[RESULT]") ? "text-cyan-400 font-bold" : line.startsWith("Mode") ? "text-white/60" : ""}>
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
