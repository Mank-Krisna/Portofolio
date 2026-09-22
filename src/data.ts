import { Protein, Compound } from "./types";

export const PROTEINS: Protein[] = [
  {
    id: "er_alpha",
    name: "Estrogen Receptor Alpha (ER-α)",
    code: "3ERT",
    description: {
      id: "Reseptor hormon nuklir utama pada kanker payudara ER-positif. Menjadi target penapisan virtual senyawa metabolit sekunder daun cengkeh dalam riset skripsi Mank Krisna.",
      en: "The primary nuclear hormone receptor in ER-positive breast cancer. Studied as the target for virtual screening of clove leaf secondary metabolites in Mank Krisna's thesis."
    },
    targetPathology: {
      id: "Kanker Payudara ER-Positif (*Breast Cancer*)",
      en: "ER-Positive Breast Cancer"
    },
    activeSite: ["Glu353", "Arg394", "His524", "Ile424", "Leu428", "Phe404", "Gly521"]
  },
  {
    id: "3clpro",
    name: "SARS-CoV-2 Main Protease",
    code: "6LU7",
    description: {
      id: "Enzim kunci yang memediasi replikasi dan transkripsi virus SARS-CoV-2. Target utama pengembangan obat antivirus.",
      en: "A key enzyme mediating the replication and transcription of the SARS-CoV-2 virus. A primary target for antiviral drug discovery."
    },
    targetPathology: {
      id: "Infeksi COVID-19 / Gangguan Pernapasan",
      en: "COVID-19 Infection / Respiratory Pathology"
    },
    activeSite: ["His41", "Cys145", "Gly143", "Glu166", "Gln189", "Met49"]
  },
  {
    id: "egfr",
    name: "Epidermal Growth Factor Receptor",
    code: "1M17",
    description: {
      id: "Reseptor tirosin kinase yang sering kali mengalami overekspresi pada berbagai kanker sel epitel. Target terapi antikanker.",
      en: "A receptor tyrosine kinase that is frequently overexpressed in various epithelial cancers. A critical target for anticancer therapies."
    },
    targetPathology: {
      id: "Kanker Paru-paru & Tumor Epitelial",
      en: "Lung Cancer & Epithelial Tumors"
    },
    activeSite: ["Met793", "Lys745", "Thr854", "Cys797", "Leu718", "Asp855"]
  },
  {
    id: "neuraminidase",
    name: "Influenza Neuraminidase (H5N1)",
    code: "2HU4",
    description: {
      id: "Glikoprotein pada permukaan virus influenza yang memotong asam sialat untuk melepaskan virion baru. Target obat flu seperti Oseltamivir.",
      en: "A glycoprotein on the influenza virus surface that cleans sialic acid to release newly formed virions. Target of anti-flu drugs like Oseltamivir."
    },
    targetPathology: {
      id: "Flu Burung / Influenza A",
      en: "Avian Flu / Influenza A"
    },
    activeSite: ["Arg118", "Asp151", "Glu276", "Arg292", "Arg371", "Tyr406"]
  }
];

export const COMPOUNDS: Compound[] = [
  {
    id: "naringenin",
    name: "Naringenin",
    source: {
      id: "Daun Cengkeh (Syzygium aromaticum) / Ekstrak",
      en: "Clove Leaves (Syzygium aromaticum) / Extract"
    },
    formula: "C15H12O5",
    molecularWeight: 272.07,
    baseAffinity: -8.4,
    atomsCount: 32,
    bondsCount: 34,
    description: {
      id: "Senyawa flavonoid dengan afinitas *docking* terbaik (-8.4 kcal/mol). Berinteraksi kuat via ikatan hidrogen dengan residu kunci Glu353 dan Arg394.",
      en: "Flavonoid compound with the best binding affinity (-8.4 kcal/mol). Interacts strongly via hydrogen bonding with key residues Glu353 and Arg394."
    }
  },
  {
    id: "caryophyllene_oxide",
    name: "(-)-Caryophyllene oxide",
    source: {
      id: "Daun Cengkeh (Syzygium aromaticum) / Ekstrak",
      en: "Clove Leaves (Syzygium aromaticum) / Extract"
    },
    formula: "C15H24O",
    molecularWeight: 220.18,
    baseAffinity: -8.2,
    atomsCount: 40,
    bondsCount: 42,
    description: {
      id: "Senyawa seskuiterpenoid oksida melimpah pada minyak cengkeh dengan afinitas -8.2 kcal/mol, didominasi oleh interaksi hidrofobik stabil pada kantong ER-α.",
      en: "Abundant sesquiterpenoid oxide in clove oil with -8.2 kcal/mol affinity, dominated by stable hydrophobic interactions inside the ER-α pocket."
    }
  },
  {
    id: "ellagic_acid",
    name: "Ellagic acid",
    source: {
      id: "Daun Cengkeh (Syzygium aromaticum) / Ekstrak",
      en: "Clove Leaves (Syzygium aromaticum) / Extract"
    },
    formula: "C14H6O8",
    molecularWeight: 302.01,
    baseAffinity: -8.1,
    atomsCount: 28,
    bondsCount: 30,
    description: {
      id: "Senyawa polifenol dengan afinitas -8.1 kcal/mol. Membentuk ikatan hidrogen mapan dengan Arg394 dan Leu387 pada saku aktif ER-α.",
      en: "Polyphenol compound with -8.1 kcal/mol affinity. Forms established hydrogen bonds with Arg394 and Leu387 on the ER-α active pocket."
    }
  },
  {
    id: "quercetin",
    name: "Quercetin",
    source: {
      id: "Daun Cengkeh (Syzygium aromaticum) / Ekstrak",
      en: "Clove Leaves (Syzygium aromaticum) / Extract"
    },
    formula: "C15H10O7",
    molecularWeight: 302.04,
    baseAffinity: -7.6,
    atomsCount: 32,
    bondsCount: 34,
    description: {
      id: "Senyawa flavonoid dengan aktivitas multimodal yang terbukti menghambat ekspresi berlebih reseptor ER-α dengan nilai afinitas -7.6 kcal/mol.",
      en: "Flavonoid compound with multimodal activity proven to inhibit overexpression of the ER-α receptor with -7.6 kcal/mol affinity."
    }
  },
  {
    id: "kaempferol",
    name: "Kaempferol",
    source: {
      id: "Daun Cengkeh (Syzygium aromaticum) / Ekstrak",
      en: "Clove Leaves (Syzygium aromaticum) / Extract"
    },
    formula: "C15H10O6",
    molecularWeight: 286.05,
    baseAffinity: -7.6,
    atomsCount: 31,
    bondsCount: 33,
    description: {
      id: "Senyawa flavonoid fitoestrogen potensial dengan afinitas -7.6 kcal/mol yang berinteraksi dalam saku pengikatan ligan ER-α.",
      en: "Potential phytoestrogen flavonoid compound with -7.6 kcal/mol affinity interacting inside the ER-α ligand-binding domain."
    }
  },
  {
    id: "curcumin",
    name: "Curcumin",
    source: {
      id: "Kunyit (Curcuma longa)",
      en: "Turmeric (Curcuma longa)"
    },
    formula: "C21H20O6",
    molecularWeight: 368.38,
    baseAffinity: -7.8,
    atomsCount: 47,
    bondsCount: 49,
    description: {
      id: "Polifenol alami dengan sifat antiinflamasi, antioksidan, dan antiviral yang kuat. Memiliki afinitas pengikatan yang fleksibel.",
      en: "A natural polyphenol with potent anti-inflammatory, antioxidant, and antiviral properties. Exhibits flexible binding affinity across multiple active sites."
    }
  },
  {
    id: "eugenol",
    name: "Eugenol",
    source: {
      id: "Cengkeh (Syzygium aromaticum)",
      en: "Cloves (Syzygium aromaticum)"
    },
    formula: "C10H12O2",
    molecularWeight: 164.2,
    baseAffinity: -5.9,
    atomsCount: 24,
    bondsCount: 24,
    description: {
      id: "Senyawa fenolik volatil utama minyak cengkeh. Terbukti memiliki efek antiseptik, anestetik lokal, dan penghambatan enzim.",
      en: "The primary volatile phenolic constituent of clove oil. Clinically proven to exhibit antiseptic, local anesthetic, and enzyme-inhibiting effects."
    }
  }
];

export const WORK_HISTORY = [
  {
    id: "asdos",
    period: "2025 - 2026",
    role: {
      id: "Asisten Dosen (Asdos) Kimia Organik 1 & 2",
      en: "Organic Chemistry 1 & 2 Teaching Assistant"
    },
    institution: {
      id: "Laboratorium Kimia Organik, Universitas Udayana",
      en: "Organic Chemistry Lab, Udayana University"
    },
    description: {
      id: "Dipercaya menjadi Asisten Dosen untuk praktikum Kimia Organik 2 pada semester 7 dan Kimia Organik 1 pada semester 8. Bertanggung jawab membimbing mahasiswa dalam sintesis senyawa, pemurnian (destilasi, kristalisasi), dan menjaga protokol K3 laboratorium.",
      en: "Trusted as a Teaching Assistant for Organic Chemistry 2 in semester 7 and Organic Chemistry 1 in semester 8. Responsible for guiding students through compound synthesis, purification (distillation, crystallization), and maintaining laboratory biosafety/safety protocols."
    },
    skills: ["Kimia Organik", "Sintesis Senyawa", "Teknik Pemurnian", "Bimbingan Praktikum", "Keselamatan Kerja (K3)"]
  },
  {
    id: "bpom",
    period: "4 Mar 2025 - 20 Jun 2025",
    role: {
      id: "Analis Laboratorium (Magang)",
      en: "Laboratory Analyst (Intern)"
    },
    institution: {
      id: "BPOM (Badan Pengawas Obat dan Makanan)",
      en: "BPOM (National Agency of Drug and Food Control)"
    },
    description: {
      id: "Bertanggung jawab atas analisis laboratorium untuk pengujian mutu obat, makanan, kosmetik, dan bahan berbahaya. Mengimplementasikan standar GMP (Good Manufacturing Practice) dan ISO 17025 secara ketat.",
      en: "Responsible for laboratory testing of pharmaceuticals, food, cosmetics, and hazardous substances. Strictly implemented Good Manufacturing Practices (GMP) and ISO 17025 standard procedures."
    },
    skills: ["Uji Mutu Fisiko-Kimia", "HPLC", "Spektrofotometri UV-Vis", "ISO 17025", "GMP Compliance"]
  },
  {
    id: "seafood",
    period: "3 Feb 2025 - 3 Mar 2025",
    role: {
      id: "QC & Analis Logam Berat",
      en: "QC & Heavy Metal Analyst"
    },
    institution: {
      id: "Bali Seafood Inspection Laboratory",
      en: "Bali Seafood Inspection Laboratory"
    },
    description: {
      id: "Melakukan pengawasan mutu ekspor produk perikanan, pengujian kadar logam berat seperti Timbal (Pb), Merkuri (Hg), dan Kadmium (Cd) menggunakan Spektrofotometri Serapan Atom (AAS). Mengelola kepatuhan HACCP.",
      en: "Conducted export quality control for fishery products, chemical safety testing of heavy metals (Lead/Pb, Mercury/Hg, Cadmium/Cd) using Atomic Absorption Spectroscopy (AAS). Managed compliance under HACCP protocols."
    },
    skills: ["Atomic Absorption Spectroscopy (AAS)", "HACCP Certified", "Food Chemistry", "Trace Analysis", "Heavy Metal Testing"]
  },
  {
    id: "computational",
    period: "2025 - Sekarang",
    role: {
      id: "Peneliti Kimia Komputasi Mandiri",
      en: "Independent Computational Chemistry Researcher"
    },
    institution: {
      id: "Udayana Chemistry Lab & In Silico Network",
      en: "Udayana Chemistry Lab & In Silico Network"
    },
    description: {
      id: "Mengembangkan riset penapisan virtual bahan alam potensial Indonesia terhadap reseptor virus dan sel kanker menggunakan teknik *molecular docking*. Menyusun visualisasi interaksi ligan-reseptor 3D tingkat lanjut.",
      en: "Developed virtual screening projects of Indonesian bioactive natural compounds targeting viral and cancer receptors using molecular docking. Conducted advanced 3D ligand-receptor interaction profiling."
    },
    skills: ["AutoDock Vina", "In Silico Molecular Docking", "PyMOL / Discovery Studio", "Binding Free Energy (ΔG)", "Ligand Optimization"]
  }
];

export const GALLERY_ITEMS = [
  {
    id: "thesis-clove-er",
    title: {
      id: "Riset Skripsi: Potensi Daun Cengkeh terhadap ER-α",
      en: "Thesis Research: Clove Leaf Bioactives vs ER-α"
    },
    category: "Riset / Skripsi",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=800&q=80",
    description: {
      id: "Riset skripsi meneliti 44 senyawa terdeteksi LC-HRMS/MS pada ekstrak etanol daun cengkeh sebagai inhibitor *Estrogen Receptor Alpha* (ER-α, PDB: 3ERT). Naringenin, (-)-caryophyllene oxide, dan ellagic acid diprioritaskan sebagai kandidat terbaik.",
      en: "Undergraduate thesis screening 44 LC-HRMS/MS detected compounds from clove leaves as Estrogen Receptor Alpha (ER-α, PDB: 3ERT) inhibitors. Naringenin, (-)-caryophyllene oxide, and ellagic acid were prioritized as top leads."
    },
    stats: { target: "ER-α (PDB: 3ERT)", metode: "LC-HRMS/MS & Docking", affinity: "-8.4 to -8.1 kcal/mol" }
  },
  {
    id: "onmipa-nasional",
    title: {
      id: "Lolos & Finalis ONMIPA Tingkat Nasional 2025",
      en: "National Level ONMIPA Finalist & Qualifier (2025)"
    },
    category: "Prestasi / Award",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    description: {
      id: "Berhasil lolos seleksi wilayah tingkat tinggi dan melaju sebagai Finalis Tingkat Nasional dalam Olimpiade Nasional Matematika dan Ilmu Pengetahuan Alam Perguruan Tinggi (ONMIPA-PT) bidang Kimia tahun 2025 mewakili Universitas Udayana.",
      en: "Successfully qualified through highly competitive regional selection to compete as a National Finalist in the National Olympiad in Mathematics and Natural Sciences (ONMIPA-PT) in the Chemistry division in 2025 representing Udayana University."
    },
    stats: { bidang: "Kimia / Chemistry", tingkat: "Nasional / National", penyelenggara: "Puspresnas (2025)" }
  },
  {
    id: "asdos-organik",
    title: {
      id: "Asisten Dosen Praktikum Kimia Organik",
      en: "Organic Chemistry Practicum Teaching Assistant"
    },
    category: "Akademik",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    description: {
      id: "Membimbing ratusan mahasiswa dalam melaksanakan praktikum Kimia Organik I & II di lab Universitas Udayana, membekali mereka dengan keahlian sintesis, isolasi bahan alam, serta kepatuhan K3.",
      en: "Instructed hundreds of undergraduate chemistry students in Organic Chemistry I & II laboratory courses at Udayana University, guiding them on synthesis, natural product isolation, and biosafety protocols."
    },
    stats: { peran: "Asisten Dosen (Asdos)", lab: "Kimia Organik I & II", instansi: "Univ. Udayana" }
  },
  {
    id: "lab-bpom",
    title: {
      id: "Analisis Kadar Bahan Aktif Sediaan Obat & Kosmetik",
      en: "HPLC Assay of Active Ingredients in Pharmaceuticals & Cosmetics"
    },
    category: "BPOM QC",
    image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=800&q=80",
    description: {
      id: "Dokumentasi preparasi sampel dan pengujian kadar zat aktif obat atau bahan pengawet kosmetik menggunakan kromatografi cair kinerja tinggi (HPLC). Dilakukan di laboratorium terakreditasi BPOM.",
      en: "Documentation of sample preparation and assay of active pharmaceutical ingredients or cosmetic preservatives using High-Performance Liquid Chromatography (HPLC). Executed in BPOM certified testing facilities."
    },
    stats: { instrument: "HPLC / UV-Vis", accuracy: "99.8%", standard: "ISO 17025" }
  },
  {
    id: "seafood-testing",
    title: {
      id: "Analisis Spektrometri Serapan Atom (AAS)",
      en: "Atomic Absorption Spectroscopy (AAS) Analysis"
    },
    category: "QC Seafood",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    description: {
      id: "Analisis residu logam berat Pb dan Hg pada sampel tuna sirip kuning untuk sertifikasi ekspor Uni Eropa dan Amerika Serikat di Bali Seafood Inspection Lab.",
      en: "Trace analysis of heavy metals Pb and Hg on yellowfin tuna tissue for EU and US export clearance certifications at Bali Seafood Inspection Lab."
    },
    stats: { detectionLimit: "0.01 ppm", matrix: "Tuna Fish Tissue", method: "AAS Flame/Vapor" }
  }
];

export const TRANSLATIONS = {
  id: {
    navHome: "Beranda",
    navAbout: "Tentang",
    navActivities: "Aktivitas",
    navSimulator: "Simulator *In Silico*",
    navCalculator: "Alat Lab QC",
    navGallery: "Dokumentasi",
    navGuestbook: "Buku Tamu",
    navContact: "Kontak",
    heroGreeting: "Halo! Perkenalkan, saya",
    heroName: "Mank Krisna",
    heroTitle: "I Komang Bayu Kresna, S.Si.",
    heroSubtitle: "Sarjana Kimia • Peminat Kimia Komputasi (*In Silico*) & Analis Laboratorium (BPOM / QC)",
    heroBio: "Lulusan Sarjana Kimia Universitas Udayana yang mendedikasikan keahlian dalam mengintegrasikan presisi analisis laboratorium basah (seperti HPLC & AAS) dengan pemodelan komputasi (*molecular docking*) untuk mengeksplorasi potensi senyawa aktif baru.",
    heroBtnSim: "Mulai Simulasi Docking",
    heroBtnContact: "Hubungi Saya",
    heroBtnCv: "Unduh CV",
    
    skillsInSilico: "Komputasi & *In Silico*",
    skillsLab: "Laboratorium (QC/QA)",
    skillsOther: "Sertifikasi & Lainnya",

    aboutTitle: "Dedikasi & Riset Laboratorium",
    aboutSubtitle: "— Menjembatani Eksperimen Riil dengan Simulasi Komputer",
    aboutBio1: "Saya adalah lulusan Sarjana Kimia dari Universitas Udayana yang memiliki ketertarikan besar pada bidang kimia analitik, pengawasan mutu (QC), serta eksplorasi senyawa aktif. Selama menempuh pendidikan, saya dipercaya menjadi Asisten Dosen (Asdos) praktikum Kimia Organik II (Semester 7) dan Kimia Organik I (Semester 8) di Universitas Udayana. Selain itu, saya juga berhasil melaju sebagai Finalis ONMIPA tingkat Nasional di bidang Kimia, sebuah ajang prestasi prestis tingkat nasional yang mempertemukan talenta sains terbaik.",
    aboutBio2: "Ketertarikan profesional saya diperkuat dengan bekal pengalaman magang di BPOM (menggunakan kromatografi HPLC) serta kerja nyata di *Bali Seafood Inspection Laboratory* (menggunakan spektrometri AAS). Melalui pengalaman tersebut, saya terbiasa mengoperasikan instrumen analitis dengan presisi tinggi, memelihara regulasi pengujian yang ketat, serta mendalami Kimia Komputasi lewat teknik *in silico molecular docking* untuk mendukung penemuan senyawa obat baru dari bahan alam Indonesia.",
    aboutSkillsTitle: "Keahlian Profesional & Teknis",
    
    pubTitle: "Publikasi Ilmiah & Abstrak",
    pubSubtitle: "— Dokumentasi Karya Tulis Riset",
    pubThesisTitle: "Penapisan Virtual Senyawa Metabolit Sekunder Daun Cengkeh terhadap Reseptor ER-α",
    pubThesisAbstract: "Kanker payudara ER-positif dipicu oleh overekspresi reseptor estrogen. Penelitian ini menggunakan pendekatan in silico untuk menyeleksi 44 senyawa terdeteksi LC-HRMS/MS pada ekstrak etanol daun cengkeh. Melalui *molecular docking* (AutoDock Vina), ditemukan bahwa naringenin, (-)-caryophyllene oxide, dan ellagic acid memiliki afinitas pengikatan terbaik (-8.4 hingga -8.1 kcal/mol) melampaui ligan kontrol alami. Analisis visualisasi (PyMOL) mengonfirmasi interaksi stabil melalui ikatan hidrogen pada residu kunci Glu353 dan Arg394, menjadikan senyawa-senyawa ini kandidat potensial sebagai agen antikanker payudara.",
    pubRepoLink: "Lihat Repositori & Data Lengkap",

    simTitle: "Simulator *Molecular Docking* *In Silico*",
    simSubtitle: "— Pengujian Afinitas Ikatan Senyawa Aktif Secara *Real-Time*",
    simIntro: "Gunakan simulator interaktif ini untuk mempelajari metode penapisan virtual (*virtual screening*). Anda dapat memilih target protein dan senyawa aktif bahan alam yang ingin diuji, lalu jalankan simulasi untuk melihat nilai energi bebas pengikatan (ΔG), konstanta inhibisi (Ki), serta visualisasi interaksi residu asam aminonya secara langsung.",
    simSelectProtein: "Pilih Reseptor Protein (*Target*)",
    simSelectCompound: "Pilih Senyawa Ligan (Bahan Alam)",
    simBtnRun: "Jalankan Simulasi *Docking*",
    simRunning: "Menghitung medan gaya molekul & kalkulasi energi kisi...",
    simPdbCode: "Kode PDB",
    simTargetPath: "Patologi Target",
    simActiveSite: "Saku Aktif (Residu)",
    simFormula: "Formula Kimia",
    simMw: "Berat Molekul",
    simSource: "Sumber Alam",
    simResultTitle: "Laporan Hasil *Docking* Komputasi",
    simEnergy: "Energi Bebas Pengikatan (ΔG)",
    simInhibition: "Konstanta Inhibisi (Ki) Terhitung",
    simLogs: "Log Konsol Komputasi",
    simInteractions: "Interaksi Pengikatan Residu Kunci",
    simTypeHbond: "Ikatan Hidrogen",
    simTypeHydrophobic: "Interaksi Hidrofobik",
    simTypeElectrostatic: "Interaksi Elektrostatik",

    calcTitle: "Alat Bantu Kalkulator Laboratorium QC",
    calcSubtitle: "— Otomatisasi Perhitungan Kimia Analitis Presisi",
    calcIntro: "Berikut adalah beberapa kalkulator praktis yang digunakan dalam mempermudah perhitungan pengenceran larutan dan molaritas harian pada analisis laboratorium.",
    calcTabDilution: "Pengenceran Larutan (C1.V1 = C2.V2)",
    calcTabMolarity: "Kalkulator Molaritas",
    calcConcentration: "Konsentrasi",
    calcVolume: "Volume",
    calcInitial: "Larutan Pekat (Induk - 1)",
    calcTarget: "Larutan Target (Hasil - 2)",
    calcCalculate: "Hitung Hasil",
    calcDilResult: "Volume larutan pekat yang perlu dipipet adalah",
    calcMolarityResult: "Massa zat yang diperlukan adalah",
    calcSoluteMass: "Massa Zat Terlarut",
    calcVolumeLiters: "Volume Larutan",

    galleryTitle: "Dokumentasi & Riset Portofolio",
    gallerySubtitle: "— Galeri Kerja Laboratorium dan Visualisasi *In Silico*",
    galleryIntro: "Dokumentasi kegiatan laboratorium di BPOM, pengujian mutu ekspor komoditas laut, serta hasil visualisasi 3D dari riset kimia komputasi.",
    galleryStats: "Detail Teknis",

    chatTitle: "Asisten Lab Virtual Mank Krisna AI",
    chatSubtitle: "Tanyakan apa saja tentang Mank Krisna, *molecular docking*, instrumen laboratorium, atau kimia secara umum.",
    chatPlaceholder: "Tanyakan tentang *docking*, BPOM, atau riset laboratorium...",
    chatSend: "Kirim",
    chatInitMessage: "Halo! Saya adalah Asisten *Lab* Virtual Mank Krisna. Anda dapat mengajukan pertanyaan seputar riset *in silico* (*docking* molekuler), instrumen analisis laboratorium (AAS/HPLC), pengalaman kerja di BPOM & *Bali Seafood*, atau topik diskusi menarik lainnya seputar ilmu kimia. Apa yang ingin Anda diskusikan hari ini?",

    guestTitle: "Buku Tamu Rekan & Kolega",
    guestSubtitle: "Tinggalkan pesan, dukungan, atau umpan balik profesional untuk Mank Krisna.",
    guestPlaceholderName: "Nama Anda",
    guestPlaceholderRole: "Instansi / Jabatan (misal: Peneliti, *QC Supervisor*)",
    guestPlaceholderMessage: "Tulis pesan atau umpan balik Anda...",
    guestBtnSubmit: "Tandatangani Buku Tamu",
    guestEmpty: "Belum ada tanda tangan. Silakan menjadi yang pertama meninggalkan pesan di sini!",

    contactTitle: "Hubungi & Mulai Kolaborasi",
    contactSubtitle: "Tertarik untuk berkolaborasi dalam riset, membutuhkan analis QC/QA laboratorium, atau ingin berdiskusi mengenai visualisasi kimia 3D? Silakan hubungi saya secara langsung. Saya siap berdiskusi secara profesional!",
    contactViaEmail: "Kirim Email Langsung",
    contactViaWa: "Hubungi via WhatsApp",
    contactLocation: "Lokasi Kerja: Bali, Indonesia / Bersedia Relokasi"
  },
  en: {
    navHome: "Home",
    navAbout: "About",
    navActivities: "Activities",
    navSimulator: "In Silico Simulator",
    navCalculator: "QC Lab Tools",
    navGallery: "Documentation",
    navGuestbook: "Guestbook",
    navContact: "Contact",

    heroGreeting: "Hello, meet",
    heroName: "Mank Krisna",
    heroTitle: "I Komang Bayu Kresna, S.Si.",
    heroSubtitle: "B.Sc in Chemistry • Computational Chemistry Specialist (In Silico) & Lab QC Analyst",
    heroBio: "Udayana University chemistry graduate dedicated to integrating precise analytical laboratory methods (HPLC, AAS) with virtual computational screening (molecular docking) to accelerate future scientific discoveries.",
    heroBtnSim: "Start Docking Simulation",
    heroBtnContact: "Contact Me",
    heroBtnCv: "Download CV",

    skillsInSilico: "Computational & *In Silico*",
    skillsLab: "Wet Lab (QC/QA)",
    skillsOther: "Certifications & Others",

    aboutTitle: "Laboratory Dedication & Research",
    aboutSubtitle: "— Bridging Wet-Lab Experiments with Computation",
    aboutBio1: "I am a Chemistry graduate from Udayana University deeply passionate about analytical chemistry, quality control (QC), and biomolecular research. During my academic journey, I was honored to serve as a Teaching Assistant (Asdos) for Organic Chemistry II (Semester 7) and Organic Chemistry I (Semester 8) courses. Driven by academic rigor, I also qualified as a National Finalist in the prestigious National Olympiad in Mathematics and Natural Sciences (ONMIPA-PT) in Chemistry representing my university.",
    aboutBio2: "This solid foundation is complemented by hands-on experience interning at BPOM (utilizing HPLC chromatography) and working at the Bali Seafood Inspection Laboratory (utilizing AAS spectrometry). Here, I mastered high-precision analytical instruments and regulatory compliance, while specializing in Computational Chemistry to accelerate natural product drug discovery!",
    aboutSkillsTitle: "Professional & Technical Skills",

    pubTitle: "Scientific Publications & Abstracts",
    pubSubtitle: "— Documented Research Papers",
    pubThesisTitle: "Virtual Screening of Clove Leaf Secondary Metabolites against ER-α Receptor",
    pubThesisAbstract: "ER-positive breast cancer is driven by the overexpression of estrogen receptors. This study utilizes an in silico approach to screen 44 compounds detected via LC-HRMS/MS in clove leaf ethanol extract. Through molecular docking (AutoDock Vina), it was discovered that naringenin, (-)-caryophyllene oxide, and ellagic acid exhibited the highest binding affinities (-8.4 to -8.1 kcal/mol), surpassing the natural control ligand. Visualization analysis (PyMOL) confirmed stable interactions via hydrogen bonding at key residues Glu353 and Arg394, establishing these compounds as potent candidates for breast cancer therapeutic agents.",
    pubRepoLink: "View Full Repository & Data",

    simTitle: "In Silico Molecular Docking Simulator",
    simSubtitle: "— Real-Time Compound Affinity Screening",
    simIntro: "Use this simulator to explore the virtual screening methodologies used by Mank Krisna. Select a protein receptor (disease target) and an active natural compound ligand, then execute the docking algorithm to calculate binding free energy (ΔG), inhibition constants (Ki), and map residue interactions.",
    simSelectProtein: "Select Protein Receptor (Target)",
    simSelectCompound: "Select Ligand Compound (Natural)",
    simBtnRun: "Run Docking Simulation",
    simRunning: "Computing molecular force fields and grid energy calculations...",
    simPdbCode: "PDB ID",
    simTargetPath: "Target Pathology",
    simActiveSite: "Active Pocket (Residues)",
    simFormula: "Chemical Formula",
    simMw: "Molecular Weight",
    simSource: "Natural Source",
    simResultTitle: "Computational Docking Report",
    simEnergy: "Binding Free Energy (ΔG)",
    simInhibition: "Calculated Inhibition Constant (Ki)",
    simLogs: "Computational Console Logs",
    simInteractions: "Key Amino Acid Binding Interactions",
    simTypeHbond: "Hydrogen Bond",
    simTypeHydrophobic: "Hydrophobic Interaction",
    simTypeElectrostatic: "Electrostatic Interaction",

    calcTitle: "QC Laboratory Calculator Tools",
    calcSubtitle: "— Automating High-Precision Chemical Calculations",
    calcIntro: "Daily mathematical tools routinely utilized by Mank Krisna in BPOM and seafood inspection labs for standard preparation dilutions and analytical calibration curve modeling.",
    calcTabDilution: "Solution Dilution (C1.V1 = C2.V2)",
    calcTabMolarity: "Molarity Calculator",
    calcConcentration: "Concentration",
    calcVolume: "Volume",
    calcInitial: "Stock Solution (Initial - 1)",
    calcTarget: "Target Solution (Final - 2)",
    calcCalculate: "Calculate Values",
    calcDilResult: "The volume of stock solution to pipette is",
    calcMolarityResult: "The mass of solute required is",
    calcSoluteMass: "Solute Mass",
    calcVolumeLiters: "Solution Volume",

    galleryTitle: "Documentation & Portfolio Research",
    gallerySubtitle: "— Gallery of Analytical Testing and In Silico Imagery",
    galleryIntro: "A collection of authentic laboratory records, 3D molecular renders, and technical charts compiled during Mank Krisna's professional career at BPOM, seafood export audits, and computational docking.",
    galleryStats: "Technical Details",

    chatTitle: "Mank Krisna AI Virtual Lab Assistant",
    chatSubtitle: "Ask anything about Mank Krisna, molecular docking, laboratory instrumentation, or general chemistry.",
    chatPlaceholder: "Ask about docking, BPOM, AAS, or research...",
    chatSend: "Send",
    chatInitMessage: "Hello! I am Mank Krisna's AI Virtual Lab Assistant. I am ready to answer your questions about computational chemistry (In Silico), analytical testing (AAS/HPLC), my work experiences at BPOM & Bali Seafood, or any general chemistry concepts. What's on your mind?",

    guestTitle: "Colleague & Guest Registry",
    guestSubtitle: "Leave a professional note, feedback, or a word of support for Mank Krisna.",
    guestPlaceholderName: "Your Name",
    guestPlaceholderRole: "Institution / Designation (e.g. Researcher, QC Supervisor)",
    guestPlaceholderMessage: "Write your message or feedback here...",
    guestBtnSubmit: "Sign Guestbook",
    guestEmpty: "No entries yet. Be the first to leave a message!",

    contactTitle: "Get in Touch & Collaborate",
    contactSubtitle: "Open to academic research collaborations, professional lab analyst vacancies (QC/QA), and 3D molecular visualization projects.",
    contactViaEmail: "Send Direct Email",
    contactViaWa: "Contact on WhatsApp",
    contactLocation: "Base Location: Bali, Indonesia / Open to Relocation"
  }
};
