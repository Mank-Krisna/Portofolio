import { useState } from "react";
import { GALLERY_ITEMS, TRANSLATIONS } from "../data";
import { Language } from "../types";
import { ZoomIn, X, Info, Beaker, BarChart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CloveCaseStudy from "./CloveCaseStudy";
import { formatText } from "../utils/textFormatter";

interface ResearchGalleryProps {
  lang: Language;
}

interface GalleryItem {
  id: string;
  title: { id: string; en: string };
  category: string;
  image: string;
  description: { id: string; en: string };
  stats: Record<string, string>;
}

export default function ResearchGallery({ lang }: ResearchGalleryProps) {
  const t = TRANSLATIONS[lang];
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [showCloveStudy, setShowCloveStudy] = useState(false);

  return (
    <section id="dokumentasi" className="py-24 md:py-32 border-t border-line scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
              {formatText(t.gallerySubtitle)}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl gradient-text">
              {t.galleryTitle}
            </h2>
          </div>
          <p className="max-w-xs text-sm text-ink-soft leading-relaxed text-justify">
            {t.galleryIntro}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item, idx) => {
            // Give specific bento sizes for architectural rhythm
            const isLarge = idx === 0 || idx === 3;

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={() => {
                  if (item.id === "thesis-clove-er") {
                    setShowCloveStudy(true);
                  } else {
                    setSelectedItem(item);
                  }
                }}
                className={`group cursor-pointer glass-card border border-line rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between card-hover ${
                  isLarge ? "sm:col-span-2" : "sm:col-span-1"
                }`}
              >
                {/* Image Section */}
                <div className="relative aspect-video w-full overflow-hidden bg-ink/10">
                  <img
                    src={item.image}
                    alt={item.title[lang]}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 glass-card text-[9px] font-mono font-bold uppercase tracking-wider text-accent px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                  {/* Overlay zoom */}
                  <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="glass-card text-ink w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                      <ZoomIn size={16} />
                    </div>
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-mono text-ink-soft tracking-wider uppercase">
                      🔬 {item.category} Research
                    </span>
                    <h3 className="font-serif text-lg leading-snug font-semibold text-ink group-hover:text-accent transition-colors">
                      {item.title[lang]}
                    </h3>
                  </div>
                  <p className="text-xs text-ink-soft leading-relaxed line-clamp-2 mt-2 text-justify">
                    {formatText(item.description[lang])}
                  </p>
                  {item.id === "thesis-clove-er" && (
                    <div className="mt-3 pt-2 border-t border-line/40 flex items-center justify-between text-[10px] font-mono text-accent">
                      <span className="font-bold uppercase tracking-wider">
                        {lang === "id" ? "→ Buka Laporan Riset" : "→ Open Research Report"}
                      </span>
                      <span className="px-1.5 py-0.5 bg-accent/10 rounded border border-accent/20">INTERAKTIF</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Lightbox / Info Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 md:p-10 flex items-center justify-center"
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="glass-card border border-line rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row"
              >
                {/* Image panel left */}
                <div className="md:w-1/2 relative bg-black flex items-center">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title[lang]}
                    className="w-full h-full object-cover max-h-[300px] md:max-h-full aspect-video md:aspect-auto"
                  />
                  <span className="absolute top-4 left-4 glass-card text-accent font-mono text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    {selectedItem.category}
                  </span>
                  {/* Close button on image panel */}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-accent text-white hover:text-on-accent flex items-center justify-center cursor-pointer transition-all shadow-lg"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Content Panel right */}
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6 relative">
                  {/* Close button - now visible */}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 text-ink-soft hover:text-ink w-8 h-8 rounded-full bg-paper border border-line shadow-md flex items-center justify-center cursor-pointer hover:bg-accent hover:text-on-accent transition-all"
                  >
                    <X size={15} />
                  </button>

                  <div className="space-y-4">
                    <div className="space-y-1.5 pt-2">
                      <span className="font-mono text-[10px] uppercase text-accent tracking-widest block">
                        — DOCUMENTATION REPORT
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight text-ink pr-6">
                        {selectedItem.title[lang]}
                      </h3>
                    </div>

                    <p className="text-xs text-ink-soft leading-relaxed text-justify">
                      {formatText(selectedItem.description[lang])}
                    </p>
                  </div>

                  {/* Technical Specs Card */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-[10px] uppercase text-ink tracking-wider font-bold flex items-center gap-1.5 border-b border-line pb-1.5">
                      <BarChart size={12} className="text-accent" />
                      <span>{t.galleryStats}</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-3.5">
                      {Object.entries(selectedItem.stats).map(([key, val]) => (
                        <div
                          key={key}
                          className="glass-card p-3 rounded-xl font-mono card-hover"
                        >
                          <span className="block text-[8px] uppercase tracking-wider text-ink-soft mb-0.5">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <span className="text-xs font-semibold text-accent block">
                            {val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lab Assurance footer */}
                  <div className="flex items-center gap-2 bg-accent/5 p-3 rounded-xl border border-accent/10 text-[9px] leading-relaxed text-ink-soft font-mono">
                    <Beaker size={12} className="text-accent shrink-0" />
                    <span>
                      {lang === "id"
                        ? "Seluruh data pengujian tercatat secara valid pada Logbook Laboratorium terakreditasi dan mematuhi batas mutu audit."
                        : "All testing procedures are audited and validated in accredited lab journals following stringent compliance metrics."}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clove Case Study Immersive Detail Page Overlay */}
        <AnimatePresence>
          {showCloveStudy && (
            <CloveCaseStudy lang={lang} onClose={() => setShowCloveStudy(false)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
