import { useState, useEffect, FormEvent } from "react";
import { TRANSLATIONS } from "../data";
import { Language, GuestbookEntry } from "../types";
import { PenTool, MessageSquare, ShieldCheck, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

interface GuestbookProps {
  lang: Language;
}

const PRESET_ENTRIES: GuestbookEntry[] = [
  {
    id: "p1",
    name: "Dr. Ir. I Ketut Wijaya, M.Si.",
    role: "Chemistry Professor, Universitas Udayana",
    message: "Mank Krisna menunjukkan kemandirian luar biasa dalam mengeksplorasi teknik in silico molecular docking selama masa studi. Dedikasinya pada keakuratan data dan pemodelan 3D sangat mengesankan.",
    timestamp: "2026-06-15",
    avatarColor: "bg-accent/25 text-accent"
  },
  {
    id: "p2",
    name: "Ni Luh Gede Lestari, S.Si.",
    role: "Senior QC Supervisor, Bali Seafood Inspection Lab",
    message: "Bayu Kresna adalah analis yang sangat teliti dalam melakukan preparasi sampel dan mengoperasikan instrumen AAS untuk analisis logam berat. Pengetahuannya mengenai kepatuhan HACCP sangat membantu tim.",
    timestamp: "2026-05-20",
    avatarColor: "bg-amber-500/20 text-amber-600"
  },
  {
    id: "p3",
    name: "Ahmad Fauzi, M.Farm.",
    role: "BPOM Senior Lab Analyst",
    message: "Disiplin kerja yang tinggi terhadap protokol keselamatan kerja, kepatuhan ISO 17025, dan pengemasan laporan uji laboratorium kosmetik. Sangat direkomendasikan untuk posisi lab profesional.",
    timestamp: "2026-04-12",
    avatarColor: "bg-blue-500/20 text-blue-600"
  }
];

export default function Guestbook({ lang }: GuestbookProps) {
  const t = TRANSLATIONS[lang];

  const [entries, setEntries] = useState<GuestbookEntry[]>(PRESET_ENTRIES);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load entries from Firestore
  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbEntries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GuestbookEntry[];
      
      setEntries([...dbEntries, ...PRESET_ENTRIES]);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const colors = [
      "bg-accent/25 text-accent",
      "bg-amber-500/20 text-amber-600",
      "bg-blue-500/20 text-blue-600",
      "bg-rose-500/20 text-rose-600",
      "bg-teal-500/20 text-teal-600"
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    try {
      await addDoc(collection(db, "guestbook"), {
        name: name.trim(),
        role: role.trim() || (lang === "id" ? "Rekan Profesional" : "Professional Colleague"),
        message: message.trim(),
        timestamp: new Date().toISOString().split("T")[0],
        avatarColor: randomColor,
        createdAt: serverTimestamp()
      });

      // Clear form and trigger check animation
      setName("");
      setRole("");
      setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error adding guestbook entry: ", error);
      alert("Failed to submit entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="py-24 md:py-32 border-t border-line bg-paper-soft/30 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header & Submit form left */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent">
                {t.guestSubtitle}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl gradient-text">
                {t.guestTitle}
              </h2>
            </div>

            {/* Form card with glass effect */}
            <form
              onSubmit={handleSubmit}
              className="glass-card p-6 rounded-2xl shadow-sm space-y-4 card-hover"
            >
              <h3 className="font-mono text-xs tracking-wider uppercase text-ink font-semibold flex items-center gap-2 pb-2.5 border-b border-line">
                <PenTool size={13} className="text-accent" />
                <span>Sign Guest Registry</span>
              </h3>

              {/* Name */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono tracking-wider uppercase text-ink-soft">
                  {t.guestPlaceholderName} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Prof. Dr. Wayan"
                  className="w-full bg-paper-soft border border-line rounded-lg px-3 py-2 text-xs text-ink focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              {/* Role */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono tracking-wider uppercase text-ink-soft">
                  {t.guestPlaceholderRole}
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g., Senior QA Analyst"
                  className="w-full bg-paper-soft border border-line rounded-lg px-3 py-2 text-xs text-ink focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono tracking-wider uppercase text-ink-soft">
                  {t.guestPlaceholderMessage} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your note..."
                  className="w-full bg-paper-soft border border-line rounded-lg px-3 py-2 text-xs text-ink focus:border-accent focus:outline-none resize-none transition-colors"
                />
              </div>

              {/* Submit button with gradient */}
              <button
                type="submit"
                disabled={submitted || isSubmitting}
                className={`w-full font-mono uppercase tracking-wider text-xs font-semibold py-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 ${
                  submitted
                    ? "bg-emerald-500 text-white"
                    : isSubmitting
                    ? "bg-accent/70 text-on-accent"
                    : "btn-primary"
                }`}
              >
                {submitted ? <Check size={14} /> : <MessageSquare size={13} />}
                <span>{submitted ? "Signed Successfully" : isSubmitting ? "Signing..." : t.guestBtnSubmit}</span>
              </button>

              <div className="flex items-center gap-2 text-[9px] text-ink-soft font-mono leading-tight">
                <ShieldCheck size={13} className="text-accent shrink-0" />
                <span>Verified securely via Firebase Cloud Firestore.</span>
              </div>
            </form>
          </div>

          {/* Messages list right */}
          <div className="lg:col-span-7 flex flex-col h-[520px]">
            <span className="block text-xs font-mono text-ink-soft uppercase tracking-widest mb-4">
              📝 Registry Signatures ({entries.length})
            </span>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
              <AnimatePresence initial={false}>
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-5 rounded-2xl shadow-sm flex gap-4 items-start card-hover"
                  >
                    {/* Circle Avatar with initials */}
                    <div
                      className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-mono text-xs font-bold ${entry.avatarColor}`}
                    >
                      {entry.name
                        .split(" ")
                        .filter((n) => !n.includes(".") && n.length > 1)
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("") || entry.name[0]}
                    </div>

                    {/* Content */}
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h4 className="font-serif text-sm font-bold text-ink leading-tight">
                          {entry.name}
                        </h4>
                        <span className="font-mono text-[9px] text-ink-soft">
                          {entry.timestamp}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-accent font-medium leading-none">
                        {entry.role}
                      </p>
                      <p className="text-xs text-ink-soft leading-relaxed pt-2 border-t border-line/40 mt-2 italic text-justify">
                        "{entry.message}"
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {entries.length === 0 && (
                <div className="text-center py-20 glass-card rounded-2xl border border-dashed border-line">
                  <p className="text-sm font-mono text-ink-soft italic">{t.guestEmpty}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
