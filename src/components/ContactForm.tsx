import { useState, FormEvent } from "react";
import { TRANSLATIONS } from "../data";
import { Language } from "../types";
import { Mail, MessageCircle, MapPin, Linkedin, Instagram, Github, ArrowUpRight } from "lucide-react";

interface ContactFormProps {
  lang: Language;
}

export default function ContactForm({ lang }: ContactFormProps) {
  const t = TRANSLATIONS[lang];

  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleEmailDraft = (e: FormEvent) => {
    e.preventDefault();
    if (!senderName || !body) return;

    const emailTo = "krixsan4@gmail.com";
    const mailSubject = encodeURIComponent(subject || `Portfolio Collaboration - ${senderName}`);
    const mailBody = encodeURIComponent(
      `Halo Mank Krisna,\n\nNama saya ${senderName}.\n\n${body}\n\nSalam,\n${senderName}`
    );

    window.location.href = `mailto:${emailTo}?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleWhatsAppMessage = () => {
    const rawNumber = "6285737605649";
    const defaultText = encodeURIComponent(
      `Halo Mank Krisna, saya melihat portofolio kimia Anda dan tertarik untuk berkolaborasi.`
    );
    window.open(`https://wa.me/${rawNumber}?text=${defaultText}`, "_blank");
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/i-komang-bayu-kresna-8b9240412",
      icon: <Linkedin size={18} />,
      label: "I Komang Bayu Kresna",
      color: "hover:text-blue-500 hover:border-blue-400"
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/krixsan_/",
      icon: <Instagram size={18} />,
      label: "@krixsan_",
      color: "hover:text-pink-500 hover:border-pink-400"
    },
    {
      name: "GitHub",
      href: "https://github.com/Mang Krisna",
      icon: <Github size={18} />,
      label: "Mang Krisna",
      color: "hover:text-ink hover:border-ink-soft"
    }
  ];

  return (
    <section id="kontak" className="py-24 md:py-32 border-t border-line scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info & socials Left */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent">
                {t.navContact}
              </p>
              <h2 className="font-serif italic text-4xl md:text-6xl leading-[1.1] font-medium gradient-text">
                {t.contactTitle}
              </h2>
              <p className="text-sm md:text-base text-ink-soft leading-relaxed pt-2 text-justify">
                {t.contactSubtitle}
              </p>
            </div>

            {/* Practical Quick Contacts */}
            <div className="space-y-3 font-mono text-xs text-ink-soft">
              <div className="flex items-center gap-3 p-3 glass-card rounded-xl card-hover">
                <MapPin size={15} className="text-accent shrink-0" />
                <span>{t.contactLocation}</span>
              </div>
              <div className="flex items-center gap-3 p-3 glass-card rounded-xl card-hover">
                <Mail size={15} className="text-accent shrink-0" />
                <span>krixsan4@gmail.com</span>
              </div>
            </div>

            {/* Social Network Channels */}
            <div className="space-y-2.5">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-ink-soft">
                🌐 Social Channels
              </span>
              <div className="flex flex-col sm:flex-row gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-between p-3 glass-card rounded-xl text-ink-soft transition-all card-hover ${social.color}`}
                  >
                    <div className="flex items-center gap-2.5">
                      {social.icon}
                      <div className="text-left">
                        <span className="block text-[9px] font-mono leading-none mb-0.5">
                          {social.name}
                        </span>
                        <span className="text-[10px] font-bold text-ink truncate block max-w-[100px] sm:max-w-[120px]">
                          {social.label}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={13} className="opacity-50" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form and CTA Right */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 shadow-sm space-y-6 card-hover">
            <h3 className="font-mono text-xs tracking-wider uppercase text-ink font-semibold flex items-center gap-2 pb-3 border-b border-line">
              <Mail size={14} className="text-accent" />
              <span>Inquiry Delivery Panel</span>
            </h3>

            {/* Email form */}
            <form onSubmit={handleEmailDraft} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-mono tracking-wider uppercase text-ink-soft">
                    {lang === "id" ? "Nama Anda" : "Your Name"} *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g., Prof. Dr. Wayan"
                    className="w-full bg-paper-soft border border-line rounded-lg px-3 py-2.5 text-xs text-ink focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-mono tracking-wider uppercase text-ink-soft">
                    {lang === "id" ? "Subjek Inkuiri" : "Subject Inquiry"}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Lab Analyst Opportunity"
                    className="w-full bg-paper-soft border border-line rounded-lg px-3 py-2.5 text-xs text-ink focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono tracking-wider uppercase text-ink-soft">
                  {lang === "id" ? "Pesan / Keterangan Proyek" : "Message / Project Pitch"} *
                </label>
                <textarea
                  required
                  rows={5}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Detail proposal kolaborasi..."
                  className="w-full bg-paper-soft border border-line rounded-lg px-3 py-2.5 text-xs text-ink focus:border-accent focus:outline-none resize-none transition-colors"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 btn-primary font-mono uppercase tracking-wider text-[11px] font-semibold py-3 px-4 rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <Mail size={13} />
                  <span>{t.contactViaEmail}</span>
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppMessage}
                  className="flex-1 glass-card border border-line hover:border-emerald-500 hover:text-emerald-500 text-ink-soft font-mono uppercase tracking-wider text-[11px] font-semibold py-3 px-4 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={13} className="text-emerald-500" />
                  <span>{t.contactViaWa}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
