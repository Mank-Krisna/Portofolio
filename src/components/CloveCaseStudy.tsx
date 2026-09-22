import { useState } from "react";
import { Language } from "../types";
import { 
  ArrowLeft, Beaker, Cpu, FileText, CheckCircle2, 
  Activity, Award, ChevronRight, Binary, ExternalLink, Dna, Info 
} from "lucide-react";
import { motion } from "motion/react";
import { formatText } from "../utils/textFormatter";

interface CloveCaseStudyProps {
  lang: Language;
  onClose: () => void;
}

export default function CloveCaseStudy({ lang, onClose }: CloveCaseStudyProps) {
  const [activeTab, setActiveTab] = useState<"ringkasan" | "metodologi" | "hasil" | "peran">("ringkasan");
  const [selectedLigand, setSelectedLigand] = useState<number>(0);

  // Content translated professionally (formal, balanced, scientifically rigorous)
  const content = {
    id: {
      metaCategory: "STUDI KASUS RISET MENDALAM",
      title: "Riset Skripsi: Potensi Senyawa Aktif Daun Cengkeh terhadap Estrogen Receptor Alpha (ER-α) Secara *In Silico*",
      subtitle: "Mengintegrasikan Analisis Fitokimia LC-HRMS/MS dengan *Molecular Docking* untuk Eksplorasi Kandidat Fitofarmaka Kanker Payudara",
      
      // Quick stats
      targetHeader: "Parameter Riset",
      receptor: "Reseptor Target",
      pdbId: "PDB ID (Struktur)",
      method: "Metode Utama",
      totalLigands: "Jumlah Ligan Diteliti",
      controlDrug: "Kontrol Positif",

      // Tab Names
      tabSummary: "Ringkasan Eksekutif",
      tabMethod: "Tahapan Metodologi",
      tabResults: "Hasil & Analisis Ligan",
      tabRole: "Peran & Kontribusi Saya",

      // Tab 1: Summary
      summaryTitle: "Latar Belakang & Urgensi Riset",
      summaryP1: "Kanker payudara merupakan salah satu prevalensi kanker tertinggi di dunia pada wanita, dengan sekitar 70% kasus dikategorikan sebagai *Estrogen Receptor-Positive* (ER+). Pada tipe ini, pertumbuhan sel kanker dipicu oleh hormon estrogen endogen yang berikatan dengan Estrogen Receptor Alpha (ER-α). Terapi konvensional menggunakan ligan antagonis sintetis seperti Tamoxifen memiliki efisiensi tinggi, namun sering kali disertai efek samping jangka panjang dan risiko resistensi obat.",
      summaryP2: "Tanaman cengkeh (Syzygium aromaticum) melimpah di Indonesia, namun pemanfaatan bioaktif daunnya di luar minyak atsiri masih belum optimal. Riset skripsi saya mendedikasikan analisis komputasi berbasis struktur (*structure-based virtual screening*) untuk mengevaluasi secara mendalam 44 senyawa non-volatil yang sebelumnya terdeteksi melalui instrumen *Liquid Chromatography-High Resolution Mass Spectrometry* (LC-HRMS/MS) pada ekstrak etanol daun cengkeh sebagai agen antagonis alternatif terhadap ER-α.",

      // Tab 2: Methodology
      methodTitle: "Alur Kerja Komputasi & Eksperimen",
      methodWetLab: "1. Preparasi & Penapisan Laboratorium Basah",
      methodWetDesc: "Maserasi serbuk kering daun cengkeh menggunakan pelarut etanol 96% untuk mengekstrak senyawa polar dan non-polar. Filtrat disaring dan dipekatkan dengan *rotary evaporator*, dilanjutkan dengan pengujian kromatografi LC-HRMS/MS untuk mendapatkan profil puncak (*peak profile*) metabolit sekunder secara akurat.",
      methodComp1: "2. Preparasi Ligan & Reseptor (*In Silico*)",
      methodComp1Desc: "Struktur kristal 3D reseptor ER-α yang berikatan dengan tamoxifen diunduh dari RCSB *Protein Data Bank* (PDB ID: 3ERT). Struktur protein dibersihkan dari molekul air dan ligan bawaan, ditambahkan atom hidrogen polar, serta diberikan muatan parsial Kollman. 44 struktur senyawa daun cengkeh dikonversi ke koordinat 3D dan dioptimasi energinya.",
      methodComp2: "3. Penapisan Virtual & *Docking* *Batches*",
      methodComp2Desc: "Grid box *docking* diarahkan secara presisi ke kantong pengikat ligan (*ligand-binding pocket*) ER-α dengan koordinat pusat mencakup residu penting (Glu353, Arg394). Simulasi *molecular docking* dijalankan menggunakan AutoDock Vina dengan tingkat *exhaustiveness* sebesar 8 untuk menjamin konformasi dengan energi bebas terendah (ΔG).",
      methodComp3: "4. Analisis Ikatan Molekuler",
      methodComp3Desc: "Visualisasi 3D pemetaan konformasi terbaik ligan dianalisis menggunakan PyMOL dan Discovery Studio. Interaksi ikatan hidrogen, interaksi hidrofobik (*pi-alkyl*, *pi-sigma*), serta energi bebas pengikatan dievaluasi untuk memprioritaskan senyawa unggulan.",

      // Tab 3: Results
      resultsTitle: "Profil Energi Bebas Pengikatan (ΔG) Senyawa Utama",
      resultsIntro: "Dari 44 senyawa daun cengkeh yang ditapis, simulator mengidentifikasi 3 senyawa aktif terbaik yang menunjukkan energi bebas pengikatan stabil (negatif tinggi) dan interaksi asam amino yang krusial, sangat bersaing dengan obat kontrol Tamoxifen.",
      ligandSelectLabel: "Pilih Senyawa untuk Detail Interaksi:",
      bindingEnergy: "Energi Pengikatan (ΔG)",
      inhibitionConstant: "Konstanta Inhibisi (Ki) Prediksi",
      hydrogenBonds: "Ikatan Hidrogen Residu",
      hydrophobicInteractions: "Interaksi Hidrofobik",
      compChartTitle: "Perbandingan Energi Bebas Pengikatan (ΔG) - Lebih Rendah Lebih Stabil",

      // Tab 4: My Role
      roleTitle: "Tanggung Jawab & Kontribusi Nyata",
      roleIntro: "Skripsi ini merupakan karya mandiri terintegrasi di mana saya bertanggung jawab penuh pada pengerjaan fase komputasi serta kontribusi aktif dalam fase laboratorium basah.",
      role1: "Ekstraksi & Preparasi Sampel Lab",
      role1Desc: "Melakukan maserasi, evaporasi pelarut, dan penyiapan *vial* sampel ekstrak daun cengkeh steril sebelum diinjeksikan ke instrumen kromatografi.",
      role2: "Konfigurasi Lingkungan Kerja *In Silico*",
      role2Desc: "Menginstalasi perangkat lunak *open-source*, mengonfigurasi pustaka koordinat protein, serta membangun alur simulasi *docking* dari awal di laboratorium kimia analitik.",
      role3: "Pembuatan Skrip Otomasi *Batch*",
      role3Desc: "Menulis skrip *command-line* *bash* sederhana untuk mengotomatiskan proses penapisan 44 ligan secara berurutan, menghemat waktu *running* hingga 60%.",
      role4: "Visualisasi Data & Ilustrasi Publikasi",
      role4Desc: "Mendesain ilustrasi 3D interaksi reseptor-ligan secara profesional menggunakan Discovery Studio dan PyMOL untuk naskah skripsi dan bahan draf jurnal ilmiah.",
      
      // Footer text
      verifiedLabel: "Riset ini divalidasi oleh pembimbing skripsi Universitas Udayana dan tercatat pada logbook penelitian Program Studi Kimia.",
      backBtn: "Kembali ke Dokumentasi"
    },
    en: {
      metaCategory: "DEEP-DIVE RESEARCH CASE STUDY",
      title: "Thesis Research: In Silico Bioactive Screening of Clove Leaf Compounds against Estrogen Receptor Alpha (ER-α)",
      subtitle: "Integrating LC-HRMS/MS Phytochemical Analysis with Molecular Docking to Explore Breast Cancer Phytopharmaceutical Leads",
      
      // Quick stats
      targetHeader: "Research Parameters",
      receptor: "Target Receptor",
      pdbId: "PDB ID (Structure)",
      method: "Primary Method",
      totalLigands: "Screened Ligands",
      controlDrug: "Positive Control",

      // Tab Names
      tabSummary: "Executive Summary",
      tabMethod: "Methodological Phases",
      tabResults: "Results & Ligand Profiles",
      tabRole: "My Contributions & Role",

      // Tab 1: Summary
      summaryTitle: "Background & Research Rationale",
      summaryP1: "Breast cancer is a leading cause of cancer-related mortality in women worldwide, with approximately 70% of cases designated as Estrogen Receptor-Positive (ER+). In this subtype, tumor proliferation is fueled by endogenous estrogen hormones binding to Estrogen Receptor Alpha (ER-α). While synthetic antagonist therapies like Tamoxifen possess high efficacy, they are frequently limited by severe long-term side effects and potential drug resistance.",
      summaryP2: "Clove plants (Syzygium aromaticum) are highly abundant in Indonesia, yet the therapeutic potential of their leaves remains largely restricted to essential oil extraction. My undergraduate research is dedicated to structure-based virtual screening to systematically evaluate 44 non-volatile compounds previously detected via Liquid Chromatography-High Resolution Mass Spectrometry (LC-HRMS/MS) on clove leaf ethanol extract as potent, safe, and alternative antagonistic agents against ER-α.",

      // Tab 2: Methodology
      methodTitle: "Computational & Wet-Lab Workflow",
      methodWetLab: "1. Wet-Lab Extraction & Screening",
      methodWetDesc: "Macerating pulverized clove leaves in 96% ethanol to extract diverse bioactives. The filtrate is filtered, concentrated using a rotary evaporator, and processed via LC-HRMS/MS chromatography to acquire highly precise metabolite peak profiles.",
      methodComp1: "2. Ligand & Macromolecule Preparation (In Silico)",
      methodComp1Desc: "The 3D crystal structure of human ER-α complexed with tamoxifen was retrieved from the RCSB Protein Data Bank (PDB ID: 3ERT). The protein was stripped of water molecules and co-crystallized ligands, polar hydrogen atoms were added, and Kollman charges were assigned. 44 clove compound ligand files were compiled and geometry-minimized.",
      methodComp2: "3. Virtual Screening & Batch Docking",
      methodComp2Desc: "Docking search grids were accurately centered over the active ligand-binding domain (LBD) encompassing essential anchors (Glu353, Arg394). Batch docking was simulated via AutoDock Vina with an exhaustiveness level of 8 to identify low-energy conformations (ΔG).",
      methodComp3: "4. Intermolecular Interaction Mapping",
      methodComp3Desc: "Best-pose ligand binding complexes were modeled in PyMOL and Discovery Studio. Residu-specific hydrogen bonds, hydrophobic contacts (pi-alkyl, pi-sigma), and docking scores were critically evaluated to shortlist top compounds.",

      // Tab 3: Results
      resultsTitle: "Binding Free Energy (ΔG) Profiles of Top Compounds",
      resultsIntro: "Among the 44 clove leaf bioactives screened, the computational pipeline successfully prioritized 3 highly promising compounds exhibiting robust binding stability (low ΔG) and key residue contacts, comparing closely with the reference drug Tamoxifen.",
      ligandSelectLabel: "Select Compound to View Interactions:",
      bindingEnergy: "Binding Energy (ΔG)",
      inhibitionConstant: "Predicted Inhibition Constant (Ki)",
      hydrogenBonds: "Residue Hydrogen Bonds",
      hydrophobicInteractions: "Hydrophobic Interactions",
      compChartTitle: "Binding Free Energy (ΔG) Comparison - Lower is More Stable",

      // Tab 4: My Role
      roleTitle: "Key Roles & Core Contributions",
      roleIntro: "This thesis project was an integrated research effort where I maintained complete ownership of the computational stages and contributed actively to the laboratory experiments.",
      role1: "Wet-Lab Extractions & Assays",
      role1Desc: "Conducted maceration, solvent vacuum evaporation, and prepared high-purity stock vials of clove leaf extract prior to chromatography injection.",
      role2: "Computational Environment Deployment",
      role2Desc: "Configured open-source modeling packages, prepared protein/ligand database environments, and established the docking pipeline from scratch.",
      role3: "Scripting Automation for Batch Docking",
      role3Desc: "Authored bash shell scripts to automate sequential virtual screening of all 44 compounds, reducing calculation processing times by 60%.",
      role4: "Scientific Data Visualization & Figures",
      role4Desc: "Rendered professional 3D protein-ligand binding interfaces using Discovery Studio and PyMOL for the thesis manuscript and research paper drafts.",
      
      // Footer text
      verifiedLabel: "This study was validated by Udayana University academic supervisors and archived in the official Department of Chemistry research logs.",
      backBtn: "Back to Documentation"
    }
  };

  const t = content[lang];

  // Specific scientific parameters for the 3 prioritized compounds + Tamoxifen control
  const ligandsData = [
    {
      name: "Naringenin",
      energy: -8.4,
      ki: "0.69 µM",
      hBonds: "Glu353 (2.1 Å), Arg394 (1.9 Å), Leu387 (2.4 Å)",
      hydrophobic: "Ala350, Leu346, Val384 (Pi-Alkyl, Pi-Sigma)",
      chemicalClass: "Flavonoid",
      formula: "C15H12O5",
      description: {
        id: "Flavonoid yang menunjukkan afinitas ikatan tertinggi. Membentuk ikatan hidrogen ganda yang kuat dengan Glu353 dan Arg394, meniru konformasi pengikatan estradiol alami namun bertindak sebagai antagonis karena rantai lateral memblokir penutupan Helix 12.",
        en: "A flavonoid showing the highest binding affinity. It forms strong double hydrogen bonds with Glu353 and Arg394, mimicking natural estradiol binding but acting as an antagonist due to steric blocking of Helix 12 closure."
      }
    },
    {
      name: "(-)-Caryophyllene oxide",
      energy: -8.2,
      ki: "0.97 µM",
      hBonds: "Thr347 (2.7 Å)",
      hydrophobic: "Met343, Leu387, Phe404, Ile424 (Intense Hydrophobic Pocket Fitting)",
      chemicalClass: "Sesquiterpenoid Oxide",
      formula: "C15H24O",
      description: {
        id: "Senyawa terpenoid yang sangat melimpah pada minyak daun cengkeh. Ukurannya yang ringkas dan sifat hidrofobiknya yang tinggi memungkinkannya masuk sempurna ke dalam celah hidrofobik terdalam dari reseptor ER-α.",
        en: "A sesquiterpenoid oxide highly abundant in clove leaf oil. Its compact size and lipophilic nature allow it to fit perfectly into the deep hydrophobic core pocket of the ER-α receptor."
      }
    },
    {
      name: "Ellagic acid",
      energy: -8.1,
      ki: "1.15 µM",
      hBonds: "Glu353 (2.0 Å), Arg394 (2.1 Å), Asp351 (2.3 Å), Gly521 (1.8 Å)",
      hydrophobic: "Leu346, Leu349 (Pi-Alkyl)",
      chemicalClass: "Polyphenol",
      formula: "C14H6O8",
      description: {
        id: "Senyawa polifenol planar yang membentuk jejaring jembatan hidrogen terbanyak (4 ikatan stabil) dengan residu polar ER-α, menstabilkan kompleks protein-ligan dengan sangat baik.",
        en: "A planar polyphenol compound forming the highest number of hydrogen bridges (4 stable bonds) with polar residues, highly stabilizing the receptor-ligand complex."
      }
    },
    {
      name: "Tamoxifen (Control)",
      energy: -8.9,
      ki: "0.30 µM",
      hBonds: "Asp351 (1.8 Å)",
      hydrophobic: "Leu346, Ala350, Trp383, Leu387, Met388, Phe404, Leu525 (Extensive Pi-Alkyl)",
      chemicalClass: "Synthetic Selective Estrogen Receptor Modulator (SERM)",
      formula: "C26H29NO",
      description: {
        id: "Obat standar emas klinis untuk kanker payudara ER+. Memiliki afinitas yang sangat kuat dengan ikatan hidrogen tunggal pada Asp351 dan interaksi hidrofobik yang ekstensif.",
        en: "The clinical gold standard drug for ER+ breast cancer. Exhibits strong binding with a critical single hydrogen bond to Asp351 and extensive hydrophobic interactions."
      }
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="fixed inset-0 z-50 bg-black/95 overflow-y-auto"
    >
      <div className="min-h-screen bg-paper text-ink selection:bg-accent/20">
        
        {/* Navigation Header */}
        <header className="sticky top-0 z-40 bg-paper/80 backdrop-blur border-b border-line px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button 
              id="close-clove-case-study"
              onClick={onClose}
              className="flex items-center gap-2 text-xs font-mono text-ink-soft hover:text-accent transition-colors cursor-pointer group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              <span>{t.backBtn}</span>
            </button>
            <div className="flex items-center gap-2 text-right">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></span>
              <span className="text-[10px] font-mono text-ink-soft uppercase tracking-wider">
                {t.metaCategory}
              </span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="border-b border-line bg-gradient-to-b from-paper-soft/40 to-paper py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-mono text-accent font-semibold mb-6">
              <Dna size={12} />
              <span>IN SILICO VIRTUAL SCREENING REPORT</span>
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-ink mb-6 max-w-4xl">
              {formatText(t.title)}
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-ink-soft font-serif italic max-w-3xl border-l-2 border-accent pl-4 text-justify">
              {formatText(t.subtitle)}
            </p>
          </div>
        </section>

        {/* Main Grid Content */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Sidebar: Parameters & Stats */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-paper-soft/50 border border-line p-6 rounded-2xl space-y-5">
                <h3 className="font-mono text-xs uppercase text-ink font-bold tracking-wider border-b border-line pb-2.5 flex items-center gap-2">
                  <Binary size={14} className="text-accent" />
                  <span>{t.targetHeader}</span>
                </h3>
                
                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <span className="block text-ink-soft text-[10px] uppercase tracking-wider mb-0.5">{t.receptor}</span>
                    <span className="text-ink font-medium">Estrogen Receptor Alpha (ER-α)</span>
                  </div>
                  <div>
                    <span className="block text-ink-soft text-[10px] uppercase tracking-wider mb-0.5">{t.pdbId}</span>
                    <span className="text-accent font-bold flex items-center gap-1">
                      3ERT
                      <a href="https://www.rcsb.org/structure/3ERT" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                        <ExternalLink size={10} />
                      </a>
                    </span>
                  </div>
                  <div>
                    <span className="block text-ink-soft text-[10px] uppercase tracking-wider mb-0.5">{t.method}</span>
                    <span className="text-ink font-medium">LC-HRMS/MS & AutoDock Vina</span>
                  </div>
                  <div>
                    <span className="block text-ink-soft text-[10px] uppercase tracking-wider mb-0.5">{t.totalLigands}</span>
                    <span className="text-ink font-medium">44 Compounds</span>
                  </div>
                  <div>
                    <span className="block text-ink-soft text-[10px] uppercase tracking-wider mb-0.5">{t.controlDrug}</span>
                    <span className="text-ink font-medium">4-Hydroxytamoxifen</span>
                  </div>
                </div>
              </div>

              {/* Lab Info Widget */}
              <div className="bg-accent/5 border border-accent/10 p-5 rounded-2xl flex items-start gap-3">
                <Beaker size={18} className="text-accent shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-ink-soft font-mono">
                  {t.verifiedLabel}
                </p>
              </div>

              {/* Structural Visualization Card Mockup */}
              <div className="border border-line rounded-2xl overflow-hidden shadow-sm bg-paper-soft/40">
                <div className="aspect-square bg-ink/10 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=800&q=80" 
                    alt="Binding pocket mapping"
                    className="w-full h-full object-cover opacity-90 contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <p className="font-mono text-[10px] text-white">
                      Fig 1. Visualisasi 3D Ligan-Binding Pocket ER-α (PDB: 3ERT)
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Column: Tabbed Content Area */}
            <section className="lg:col-span-8 space-y-8">
              
              {/* Tab Selection */}
              <div className="flex border-b border-line overflow-x-auto no-scrollbar scroll-smooth gap-1">
                {[
                  { id: "ringkasan", label: t.tabSummary },
                  { id: "metodologi", label: t.tabMethod },
                  { id: "hasil", label: t.tabResults },
                  { id: "peran", label: t.tabRole }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-3 text-xs font-mono border-b-2 transition-all shrink-0 cursor-pointer ${
                      activeTab === tab.id 
                        ? "border-accent text-accent font-semibold" 
                        : "border-transparent text-ink-soft hover:text-ink"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Rendering */}
              <div className="space-y-6">
                
                {/* 1. Ringkasan Eksekutif */}
                {activeTab === "ringkasan" && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="space-y-6"
                  >
                    <h3 className="font-serif text-2xl font-semibold text-ink">
                      {t.summaryTitle}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-ink-soft text-justify">
                      {formatText(t.summaryP1)}
                    </p>
                    <p className="text-sm md:text-base leading-relaxed text-ink-soft text-justify">
                      {formatText(t.summaryP2)}
                    </p>
                    <div className="p-5 bg-paper-soft border border-line rounded-2xl flex items-start gap-3.5 mt-6">
                      <Info size={18} className="text-accent shrink-0 mt-0.5" />
                      <p className="text-xs text-ink-soft leading-relaxed italic text-justify">
                        {lang === "id" 
                          ? "Temuan penting: Penelitian ini mengkonfirmasi bahwa daun cengkeh Indonesia tidak hanya berharga untuk kandungan eugenolnya saja, tetapi memiliki fraksi senyawa non-volatil yang sangat aktif untuk dieksplorasi lebih lanjut sebagai antikanker tertarget." 
                          : "Key insight: This research confirms that Indonesian clove leaves are valuable beyond their eugenol content, possessing highly active non-volatile chemical fractions worthy of further exploration as targeted anticancer therapeutics."}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* 2. Tahapan Metodologi */}
                {activeTab === "metodologi" && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="space-y-6"
                  >
                    <h3 className="font-serif text-2xl font-semibold text-ink">
                      {t.methodTitle}
                    </h3>
                    
                    <div className="relative border-l border-line/60 pl-6 ml-3 space-y-8">
                      {/* Step 1 */}
                      <div className="relative">
                        <span className="absolute -left-[31px] top-0 bg-paper border border-accent text-accent font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                          1
                        </span>
                        <h4 className="font-serif text-base font-semibold text-ink mb-2">
                          {formatText(t.methodWetLab)}
                        </h4>
                        <p className="text-xs md:text-sm text-ink-soft leading-relaxed text-justify">
                          {formatText(t.methodWetDesc)}
                        </p>
                      </div>

                      {/* Step 2 */}
                      <div className="relative">
                        <span className="absolute -left-[31px] top-0 bg-paper border border-accent text-accent font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                          2
                        </span>
                        <h4 className="font-serif text-base font-semibold text-ink mb-2">
                          {formatText(t.methodComp1)}
                        </h4>
                        <p className="text-xs md:text-sm text-ink-soft leading-relaxed text-justify">
                          {formatText(t.methodComp1Desc)}
                        </p>
                      </div>

                      {/* Step 3 */}
                      <div className="relative">
                        <span className="absolute -left-[31px] top-0 bg-paper border border-accent text-accent font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                          3
                        </span>
                        <h4 className="font-serif text-base font-semibold text-ink mb-2">
                          {formatText(t.methodComp2)}
                        </h4>
                        <p className="text-xs md:text-sm text-ink-soft leading-relaxed text-justify">
                          {formatText(t.methodComp2Desc)}
                        </p>
                      </div>

                      {/* Step 4 */}
                      <div className="relative">
                        <span className="absolute -left-[31px] top-0 bg-paper border border-accent text-accent font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                          4
                        </span>
                        <h4 className="font-serif text-base font-semibold text-ink mb-2">
                          {formatText(t.methodComp3)}
                        </h4>
                        <p className="text-xs md:text-sm text-ink-soft leading-relaxed text-justify">
                          {formatText(t.methodComp3Desc)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. Hasil & Analisis Ligan */}
                {activeTab === "hasil" && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="font-serif text-2xl font-semibold text-ink mb-3">
                        {formatText(t.resultsTitle)}
                      </h3>
                      <p className="text-xs md:text-sm text-ink-soft leading-relaxed text-justify">
                        {formatText(t.resultsIntro)}
                      </p>
                    </div>

                    {/* Interactive Compound Viewer */}
                    <div className="bg-paper-soft/40 border border-line rounded-2xl p-5 space-y-4">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-ink-soft font-bold">
                        {t.ligandSelectLabel}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {ligandsData.map((lig, idx) => (
                          <button
                            key={lig.name}
                            onClick={() => setSelectedLigand(idx)}
                            className={`px-3 py-1.5 rounded-full text-xs font-mono border cursor-pointer transition-all ${
                              selectedLigand === idx 
                                ? "bg-accent text-white border-accent" 
                                : "bg-paper text-ink border-line hover:border-accent/40"
                            }`}
                          >
                            {lig.name} {lig.name.includes("Control") ? "🧪" : "🌿"}
                          </button>
                        ))}
                      </div>

                      {/* Selected Ligand Details Box */}
                      <div className="bg-paper border border-line rounded-xl p-5 space-y-4 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-3">
                          <div>
                            <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-widest">{ligandsData[selectedLigand].chemicalClass}</span>
                            <h4 className="font-serif text-xl font-bold text-ink">{ligandsData[selectedLigand].name}</h4>
                          </div>
                          <div className="bg-accent/10 px-3 py-1 rounded text-right shrink-0">
                            <span className="block text-[8px] font-mono text-accent tracking-wider font-semibold">FORMULA</span>
                            <span className="text-xs font-mono font-bold text-ink">{ligandsData[selectedLigand].formula}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                          <div className="bg-paper-soft/60 p-3 rounded-lg border border-line/40">
                            <span className="block text-[9px] text-ink-soft uppercase tracking-wider mb-0.5">{t.bindingEnergy}</span>
                            <span className="text-base font-bold text-accent">{ligandsData[selectedLigand].energy} kcal/mol</span>
                          </div>
                          <div className="bg-paper-soft/60 p-3 rounded-lg border border-line/40">
                            <span className="block text-[9px] text-ink-soft uppercase tracking-wider mb-0.5">{t.inhibitionConstant}</span>
                            <span className="text-base font-bold text-accent">{ligandsData[selectedLigand].ki}</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs font-mono">
                          <div>
                            <span className="block text-[9px] text-ink-soft uppercase tracking-wider">{t.hydrogenBonds}</span>
                            <span className="text-ink text-[11px] font-medium">{ligandsData[selectedLigand].hBonds}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] text-ink-soft uppercase tracking-wider">{t.hydrophobicInteractions}</span>
                            <span className="text-ink text-[11px] font-medium">{ligandsData[selectedLigand].hydrophobic}</span>
                          </div>
                        </div>

                        <p className="text-xs text-ink-soft leading-relaxed border-t border-line/50 pt-3 italic text-justify">
                          {formatText(ligandsData[selectedLigand].description[lang])}
                        </p>
                      </div>
                    </div>

                    {/* Horizontal Bar Chart comparing ΔG */}
                    <div className="space-y-4">
                      <h4 className="font-mono text-xs uppercase text-ink font-bold tracking-wider">
                        {t.compChartTitle}
                      </h4>
                      <div className="bg-paper-soft/40 border border-line p-5 rounded-2xl space-y-4">
                        {ligandsData.map((lig) => {
                          const maxEnergy = -9.5; // for scaling
                          const percentage = (lig.energy / maxEnergy) * 100;
                          return (
                            <div key={lig.name} className="space-y-1">
                              <div className="flex justify-between text-xs font-mono">
                                <span className="font-medium text-ink">{lig.name}</span>
                                <span className="font-bold text-accent">{lig.energy} kcal/mol</span>
                              </div>
                              <div className="w-full bg-line/30 h-2.5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className={`h-full rounded-full ${
                                    lig.name.includes("Control") ? "bg-ink-soft/75" : "bg-accent"
                                  }`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 4. Peran & Kontribusi Saya */}
                {activeTab === "peran" && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-serif text-2xl font-semibold text-ink mb-3">
                        {formatText(t.roleTitle)}
                      </h3>
                      <p className="text-xs md:text-sm text-ink-soft leading-relaxed">
                        {formatText(t.roleIntro)}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                      {/* Contribution 1 */}
                      <div className="p-5 border border-line/70 rounded-2xl bg-paper-soft/30 hover:border-accent/40 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 size={16} className="text-accent" />
                          <h4 className="font-serif text-base font-bold text-ink">{formatText(t.role1)}</h4>
                        </div>
                        <p className="text-xs md:text-sm text-ink-soft leading-relaxed text-justify">
                          {formatText(t.role1Desc)}
                        </p>
                      </div>

                      {/* Contribution 2 */}
                      <div className="p-5 border border-line/70 rounded-2xl bg-paper-soft/30 hover:border-accent/40 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                          <Cpu size={16} className="text-accent" />
                          <h4 className="font-serif text-base font-bold text-ink">{formatText(t.role2)}</h4>
                        </div>
                        <p className="text-xs md:text-sm text-ink-soft leading-relaxed text-justify">
                          {formatText(t.role2Desc)}
                        </p>
                      </div>

                      {/* Contribution 3 */}
                      <div className="p-5 border border-line/70 rounded-2xl bg-paper-soft/30 hover:border-accent/40 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                          <Binary size={16} className="text-accent" />
                          <h4 className="font-serif text-base font-bold text-ink">{formatText(t.role3)}</h4>
                        </div>
                        <p className="text-xs md:text-sm text-ink-soft leading-relaxed text-justify">
                          {formatText(t.role3Desc)}
                        </p>
                      </div>

                      {/* Contribution 4 */}
                      <div className="p-5 border border-line/70 rounded-2xl bg-paper-soft/30 hover:border-accent/40 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                          <Activity size={16} className="text-accent" />
                          <h4 className="font-serif text-base font-bold text-ink">{formatText(t.role4)}</h4>
                        </div>
                        <p className="text-xs md:text-sm text-ink-soft leading-relaxed text-justify">
                          {formatText(t.role4Desc)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>
            </section>

          </div>
        </main>

        {/* Big Bottom Action / Close */}
        <footer className="border-t border-line py-12 bg-gradient-to-t from-paper-soft/40 to-paper text-center">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-accent text-white font-mono text-xs font-semibold px-6 py-3 rounded-full hover:bg-accent-soft transition-all cursor-pointer shadow-sm hover:shadow active:scale-95"
          >
            <span>{t.backBtn}</span>
            <ChevronRight size={14} />
          </button>
        </footer>

      </div>
    </motion.div>
  );
}
