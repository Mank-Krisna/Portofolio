import { useState, useEffect } from "react";
import { Language } from "../types";
import { TRANSLATIONS } from "../data";
import { Sun, Moon, Menu, X, Globe } from "lucide-react";

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export default function Navbar({ lang, setLang, darkMode, setDarkMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const [scrollProgress, setScrollProgress] = useState(0);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const sectionIds = ['beranda', 'tentang', 'aktivitas', 'simulator', 'kalkulator', 'dokumentasi', 'guestbook', 'kontak'];
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      let current = "";
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            current = id;
            break;
          }
        }
      }
      
      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 100) {
        setActiveSection("beranda");
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newVal = !darkMode;
    setDarkMode(newVal);
    if (newVal) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navItems = [
    { href: "#beranda", label: t.navHome },
    { href: "#tentang", label: t.navAbout },
    { href: "#aktivitas", label: t.navActivities },
    { href: "#simulator", label: t.navSimulator },
    { href: "#kalkulator", label: t.navCalculator },
    { href: "#dokumentasi", label: t.navGallery },
    { href: "#guestbook", label: t.navGuestbook },
    { href: "#kontak", label: t.navContact },
  ];

  return (
    <header
      id="site-nav"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "glass-card shadow-sm py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-accent-soft transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo with Gradient */}
        <a
          href="#beranda"
          className="font-serif italic text-2xl md:text-3xl tracking-tight font-medium hover:opacity-80 transition-opacity gradient-text"
        >
          Mank Krisna
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-[11px] tracking-[0.12em] uppercase text-ink-soft">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`transition-colors duration-200 relative group py-1 ${
                activeSection === item.href.substring(1) 
                  ? "text-accent font-bold" 
                  : "hover:text-accent"
              }`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 h-[2px] bg-accent-gradient transition-all duration-300 ${
                activeSection === item.href.substring(1) ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line text-ink-soft hover:border-accent hover:text-accent transition-all font-mono text-[10px] tracking-wider uppercase glass-card"
            title={lang === "id" ? "Switch to English" : "Ubah ke Bahasa Indonesia"}
          >
            <Globe size={12} />
            <span>{lang === "id" ? "EN" : "ID"}</span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-line text-ink hover:border-accent hover:text-accent transition-all duration-300 glass-card cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-line text-ink glass-card cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-line glass-card animate-fade-in absolute top-[100%] inset-x-0 shadow-lg">
          <nav className="flex flex-col px-6 py-4 gap-1 font-mono text-xs tracking-wider uppercase text-ink-soft">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xl font-serif italic block transition-colors ${
                  activeSection === item.href.substring(1) 
                    ? "text-accent font-bold" 
                    : "text-ink hover:text-accent"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
