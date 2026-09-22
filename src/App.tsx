import { useState, useEffect } from "react";
import { Language } from "./types";
import { TRANSLATIONS, WORK_HISTORY } from "./data";
import Navbar from "./components/Navbar";
import DockingSimulator from "./components/DockingSimulator";
import LabCalculator from "./components/LabCalculator";
import ResearchGallery from "./components/ResearchGallery";
import Guestbook from "./components/Guestbook";
import ContactForm from "./components/ContactForm";
import AiAssistant from "./components/AiAssistant";
import ExtraCurricular from "./components/ExtraCurricular";
import { Award, BookOpen, ChevronRight, GraduationCap, Cpu, Beaker, ArrowRight, Download } from "lucide-react";
import { motion } from "motion/react";
import { formatText } from "./utils/textFormatter";

export default function App() {
  const [lang, setLang] = useState<Language>("id");
  const [darkMode, setDarkMode] = useState(false);
  const t = TRANSLATIONS[lang];

  // Initialize theme based on user preferences
  useEffect(() => {
    const isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="bg-paper text-ink font-sans antialiased overflow-x-hidden min-h-screen transition-colors duration-500">
      {/* 1. STICKY GLASSMORPHIC HEADER */}
      <Navbar
        lang={lang}
        setLang={setLang}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main>
        {/* 2. DYNAMIC HERO SECTION */}
        <section id="beranda" className="relative pt-36 md:pt-44 pb-24 md:pb-36 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Introduction Text Left */}
              <div className="order-2 lg:order-1 lg:col-span-7 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-2"
                >
                  <p className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-accent font-semibold">
                    {t.heroGreeting}
                  </p>
                  <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight font-medium gradient-text">
                    {t.heroName}
                  </h1>
                  <h2 className="font-mono text-[11px] sm:text-xs md:text-sm tracking-wider uppercase text-accent font-semibold border-b-2 border-accent-gradient pb-3 max-w-lg">
                    {t.heroTitle}
                  </h2>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="max-w-xl text-base md:text-lg leading-relaxed text-ink-soft font-serif italic text-justify"
                >
                  "{formatText(t.heroSubtitle)}"
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="max-w-xl text-xs md:text-sm leading-relaxed text-ink-soft font-sans text-justify"
                >
                  {formatText(t.heroBio)}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="flex flex-wrap items-center gap-4 pt-4"
                >
                  <a
                    href="#simulator"
                    className="btn-primary text-xs font-mono tracking-wider uppercase font-bold px-6 py-3.5 rounded-full shadow-sm cursor-pointer"
                  >
                    {t.heroBtnSim}
                  </a>
                  <a
                    href="#kontak"
                    className="text-xs font-mono tracking-wider uppercase text-ink-soft hover:text-accent border-b border-line hover:border-accent pb-1 transition-all"
                  >
                    {t.heroBtnContact}
                  </a>
                  <a
                    href="/CV_Mank_Krisna.pdf"
                    target="_blank"
                    className="flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-ink-soft hover:text-accent border-b border-line hover:border-accent pb-1 transition-all ml-2"
                  >
                    <Download size={14} />
                    {(t as any).heroBtnCv}
                  </a>
                </motion.div>
              </div>

              {/* Styled Portrait Block Right */}
              <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-72 h-90 sm:w-80 sm:h-100 animate-float"
                >
                  {/* Outer offset visual frame with gradient */}
                  <div className="absolute inset-0 rounded-[2.5rem] bg-accent-gradient -rotate-3 translate-x-3 translate-y-3 opacity-90 shadow-lg" />
                  
                  {/* Portrait Container */}
                  <div className="relative w-full h-full rounded-[2.5rem] rotate-2 overflow-hidden shadow-xl border-4 border-paper-soft bg-paper-soft flex items-center justify-center">
                    {/* Fallback elegant molecular art if local photo isn't available */}
                    <img
                      src="https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=800&q=80"
                      alt="I Komang Bayu Kresna"
                      className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700 cursor-pointer"
                      title="Mank Krisna - Udayana Chemistry Alumni"
                    />
                    
                    {/* SVG Floating molecules over portrait */}
                    <div className="absolute bottom-4 inset-x-0 text-center glass-card border-t border-line py-2.5 px-4 mx-4 rounded-2xl font-mono text-[9px] text-accent font-bold uppercase tracking-wider glow">
                      🔬 IN SILICO & QC RESEARCHER
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. DETAILED ABOUT & PROFESSIONAL BACKGROUND */}
        <section id="tentang" className="py-24 md:py-32 border-t border-line scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              
              {/* Heading Side Left */}
              <div className="lg:col-span-4 space-y-4">
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent">
                  {formatText(t.aboutSubtitle)}
                </p>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight gradient-text">
                  {t.aboutTitle}
                </h2>
                
                {/* Education sub-card with glass effect */}
                <div className="glass-card p-5 rounded-2xl space-y-4 mt-8 card-hover">
                  <span className="font-mono text-[10px] uppercase text-accent tracking-widest font-bold flex items-center gap-1.5 border-b border-line pb-1.5">
                    <GraduationCap size={13} />
                    <span>Education Timeline</span>
                  </span>
                  
                  <div className="space-y-4">
                    {/* Universitas Udayana */}
                    <div className="relative pl-4 border-l-2 border-accent/30 space-y-1">
                      <div className="absolute w-2.5 h-2.5 bg-accent rounded-full -left-[6px] top-1.5 shadow-sm" />
                      <span className="text-[9px] font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded">2022 - Graduate</span>
                      <h4 className="font-serif text-sm font-bold text-ink pt-1">
                        Universitas Udayana (UNUD), Bali
                      </h4>
                      <p className="text-[10px] font-mono text-ink-soft">
                        Bachelor of Science in Chemistry (S.Si.)
                      </p>
                      <p className="text-[10px] text-ink-soft italic leading-relaxed pt-1.5 border-t border-line/40 mt-1.5 text-justify">
                        {formatText(lang === "id"
                          ? "Fokus riset: Kimia Komputasi, Pemodelan Farmakofor, dan *In Silico* *Drug Design*."
                          : "Research focus: Computational Chemistry, Pharmacophore Profiling, and In Silico Drug Design.")}
                      </p>
                      <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-line/40">
                        <div className="flex items-center gap-2 glass-card p-2 rounded-lg transition-all hover:glow">
                          <span className="text-sm bg-paper p-1 rounded shadow-sm border border-accent/20">🏆</span>
                          <span className="font-semibold text-[9px] font-mono text-accent">
                            {lang === "id" 
                              ? "Finalis & Lolos ONMIPA Tingkat Nasional 2025 (Kimia)" 
                              : "National ONMIPA Finalist 2025 (Chemistry)"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 glass-card p-2 rounded-lg transition-all hover:glow">
                          <span className="text-sm bg-paper p-1 rounded shadow-sm border border-accent/20">🔬</span>
                          <span className="font-semibold text-[9px] font-mono text-accent">
                            {lang === "id" 
                              ? "Asdos Lab Kimia Organik I & II (Smt 7 & 8)" 
                              : "Organic Chemistry I & II Teaching Assistant"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* SMA Negeri 1 Sukawati */}
                    <div className="relative pl-4 border-l-2 border-line space-y-1">
                      <div className="absolute w-2.5 h-2.5 bg-ink-soft/40 rounded-full -left-[6px] top-1.5" />
                      <span className="text-[9px] font-mono text-ink-soft bg-paper px-1.5 py-0.5 rounded border border-line">2019 - 2022</span>
                      <h4 className="font-serif text-sm font-bold text-ink pt-1">
                        SMA Negeri 1 Sukawati
                      </h4>
                      <p className="text-[10px] font-mono text-ink-soft">
                        {lang === "id" ? "Peminatan MIPA (Matematika & IPA)" : "Mathematics & Natural Sciences Major"}
                      </p>
                    </div>

                    {/* SMP Negeri 1 Ubud */}
                    <div className="relative pl-4 border-l-2 border-line space-y-1">
                      <div className="absolute w-2.5 h-2.5 bg-ink-soft/40 rounded-full -left-[6px] top-1.5" />
                      <span className="text-[9px] font-mono text-ink-soft bg-paper px-1.5 py-0.5 rounded border border-line">2016 - 2019</span>
                      <h4 className="font-serif text-sm font-bold text-ink pt-1">
                        SMP Negeri 1 Ubud
                      </h4>
                      <p className="text-[10px] font-mono text-ink-soft">
                        {lang === "id" ? "Sekolah Menengah Pertama" : "Junior High School"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Professional Experience Bento Cards Right */}
              <div className="lg:col-span-8 space-y-10">
                <div className="space-y-6 text-sm md:text-base leading-relaxed text-ink-soft">
                  <p className="text-justify">{formatText(t.aboutBio1)}</p>
                  <p className="text-justify">{formatText(t.aboutBio2)}</p>
                </div>

                {/* Stints Timeline (Bento-styled cards) */}
                <div className="space-y-4">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-ink-soft">
                    💼 Career & Research Milestones
                  </span>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {WORK_HISTORY.map((work) => (
                      <div
                        key={work.id}
                        className="glass-card p-6 rounded-2xl transition-all card-hover flex flex-col sm:flex-row justify-between gap-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-accent/10 text-accent font-mono text-[9px] font-bold uppercase px-2.5 py-1 rounded">
                              {work.period}
                            </span>
                            <span className="text-ink-soft font-mono text-[10px]">
                              {work.institution[lang]}
                            </span>
                          </div>
                          <h4 className="font-serif text-lg font-bold text-ink">
                            {work.role[lang]}
                          </h4>
                          <p className="text-xs text-ink-soft leading-relaxed max-w-xl text-justify">
                            {formatText(work.description[lang])}
                          </p>
                        </div>

                        {/* Skills badges */}
                        <div className="flex flex-wrap gap-1.5 max-w-[180px] self-start sm:self-center">
                          {work.skills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-paper text-ink-soft font-mono text-[9px] px-2 py-0.5 rounded border border-line"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Matrix with gradient borders */}
                <div className="space-y-4 pt-4 border-t border-line/40">
                  <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-ink-soft">
                    <Cpu size={12} /> {t.aboutSkillsTitle}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="glass-card p-4 rounded-xl space-y-3 gradient-border card-hover">
                      <h5 className="font-mono text-[9px] uppercase text-accent font-bold">{(t as any).skillsInSilico}</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {["AutoDock Vina", "PyRx", "PyMOL", "Discovery Studio", "Gromacs"].map((s) => (
                          <span key={s} className="bg-paper text-ink font-mono text-[9px] px-2 py-0.5 rounded border border-line">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="glass-card p-4 rounded-xl space-y-3 gradient-border card-hover">
                      <h5 className="font-mono text-[9px] uppercase text-accent font-bold">{(t as any).skillsLab}</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {["HPLC", "AAS (Atomic Abs.)", "Titrasi Volumetrik", "Spektro UV-Vis", "Ekstraksi"].map((s) => (
                          <span key={s} className="bg-paper text-ink font-mono text-[9px] px-2 py-0.5 rounded border border-line">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="glass-card p-4 rounded-xl space-y-3 gradient-border card-hover">
                      <h5 className="font-mono text-[9px] uppercase text-accent font-bold">{(t as any).skillsOther}</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {["GMP Compliance", "ISO 17025", "HACCP", "Data Analysis (Python)", "Scientific Writing"].map((s) => (
                          <span key={s} className="bg-paper text-ink font-mono text-[9px] px-2 py-0.5 rounded border border-line">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 3.2 SCIENTIFIC PUBLICATIONS & ABSTRACTS */}
        <section className="py-16 md:py-24 border-t border-line bg-paper-soft/50">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-4 space-y-4">
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent">
                  {(t as any).pubSubtitle}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl leading-tight gradient-text">
                  {(t as any).pubTitle}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <div className="glass-card p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden group card-hover">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-gradient" />
                  <div className="space-y-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft flex items-center gap-2">
                      <BookOpen size={13} /> {lang === "id" ? "Abstrak Skripsi" : "Thesis Abstract"}
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl font-medium text-ink">
                      {(t as any).pubThesisTitle}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-ink-soft text-justify font-serif italic">
                      "{(t as any).pubThesisAbstract}"
                    </p>
                    <div className="pt-4 flex items-center">
                      <a href="#simulator" className="text-xs font-mono tracking-wider uppercase text-accent hover:text-accent-soft border-b border-accent pb-1 transition-all flex items-center gap-1">
                        {(t as any).pubRepoLink} <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3.5 ORGANIZATIONAL & CREATIVE PURSUITS */}
        <ExtraCurricular lang={lang} />

        {/* 4. INTERACTIVE MOLECULAR DOCKING SIMULATOR */}
        <DockingSimulator lang={lang} />

        {/* WORKFLOW TRANSITION BREAK */}
        <div className="bg-paper-soft/50 border-y border-line py-14 relative overflow-hidden">
          {/* Subtle matrix-like grid patterns */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none font-mono text-[9px] select-none flex flex-wrap gap-x-4 gap-y-2 p-6 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i}>01100011 01101000 01100101 01101101 01101001 01110011 01110100 01110010 01111001</span>
            ))}
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-5">
            <div className="flex items-center justify-center gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 rounded-2xl glass-card border border-accent/20 flex items-center justify-center text-accent shadow-sm glow"
              >
                <Cpu size={20} />
              </motion.div>
              <div className="flex items-center gap-2 text-ink-soft">
                <div className="h-[2px] w-12 bg-accent-gradient" />
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight size={14} className="text-accent" />
                </motion.div>
                <div className="h-[2px] w-12 bg-accent-gradient" />
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 rounded-2xl glass-card border border-accent/20 flex items-center justify-center text-accent shadow-sm glow"
              >
                <Beaker size={20} />
              </motion.div>
            </div>
            
            <div className="space-y-2">
              <span className="font-mono text-[9px] uppercase text-accent tracking-[0.25em] font-bold block">
                {lang === "id" ? "TRANSISI ALUR KERJA RISET" : "RESEARCH WORKFLOW TRANSITION"}
              </span>
              <h3 className="font-serif italic text-2xl md:text-3xl font-medium gradient-text">
                {lang === "id" 
                  ? "Menghubungkan Pemodelan Virtual dengan Pengujian Fisik" 
                  : "Bridging Virtual Screening with Wet-Lab Analytics"}
              </h3>
              <p className="max-w-2xl mx-auto text-xs text-ink-soft leading-relaxed font-sans text-justify">
                {lang === "id"
                  ? "Setelah memprediksi afinitas senyawa aktif secara komputasi (In Silico), tahap berikutnya dalam Quality Control (QC) adalah formulasi nyata dan analisis kadar kualitas fisik di laboratorium basah. Gunakan alat bantu QC di bawah ini untuk kalkulasi preparasi lab."
                  : "After predicting compound affinity computationally (In Silico), the subsequent stage in Quality Control (QC) requires physical formulation and chemical assaying in a wet laboratory. Use the QC tools in the section below to calculate dilution and molarity."}
              </p>
            </div>
          </div>
        </div>

        {/* 5. INTERACTIVE LABORATORY toolkit */}
        <LabCalculator lang={lang} />

        {/* 6. INTERACTIVE PORTFOLIO RESEARCH GALLERY */}
        <ResearchGallery lang={lang} />

        {/* 7. DYNAMIC ENDORSEMENT GUESTBOOK */}
        <Guestbook lang={lang} />

        {/* 8. CONTACT FORM & OUTREACH PLUGINS */}
        <ContactForm lang={lang} />
      </main>

      {/* 9. MINIMALIST SYSTEM FOOTER */}
      <footer className="border-t border-line py-8 bg-paper-soft/50">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-ink-soft font-mono tracking-wide">
          <p>© {new Date().getFullYear()} I Komang Bayu Kresna, S.Si. All Rights Reserved.</p>
          <a
            href="#beranda"
            className="hover:text-accent border-b border-transparent hover:border-accent pb-0.5 transition-all"
          >
            {lang === "id" ? "Kembali ke Atas ↑" : "Back to Top ↑"}
          </a>
        </div>
      </footer>

      {/* 10. FLOATING AI ASSISTANT CHATBOT */}
      <AiAssistant lang={lang} />
    </div>
  );
}
