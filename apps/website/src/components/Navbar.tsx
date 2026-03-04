import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "How It Works", id: "how-it-works" },
  { label: "Features", id: "features" },
  { label: "Docs", id: "docs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Determine active section based on scroll position
      const sections = NAV_LINKS.map((link) => ({
        id: link.id,
        el: document.getElementById(link.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section.el) continue;
        const rect = section.el.getBoundingClientRect();
        if (rect.top <= 150) {
          setActive(section.id);
          return;
        }
      }

      setActive("home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <motion.div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="group relative w-9 h-9 rounded-full flex-shrink-0 transition-transform duration-200 hover:scale-110"
        >
          {/* Gradient border ring */}
          <div className="absolute inset-0 rounded-full accent-gradient" />
          {/* Inner circle */}
          <div className="absolute inset-[1.5px] rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-accent">
              C
            </span>
          </div>
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Nav links */}
        <div className="hidden sm:flex items-center">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 ${
                active === link.id
                  ? "text-text-primary bg-stroke/50"
                  : "text-muted hover:text-text-primary hover:bg-stroke/50"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* CTA button */}
        <button
          className="group relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary"
          onClick={() =>
            document
              .getElementById("get-api-key")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {/* Hover gradient border */}
          <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          {/* Inner background */}
          <span className="relative z-10 flex items-center gap-1 bg-surface rounded-full px-3 sm:px-4 py-1.5 sm:py-2 -m-3 sm:-m-4 -my-1.5 sm:-my-2">
            Get API Key
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
              &rarr;
            </span>
          </span>
        </button>
      </motion.div>
    </nav>
  );
}
