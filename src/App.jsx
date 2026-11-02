import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ScrollTopButton from "./components/ScrollTopButton";
import { NAV_LINKS } from "./data/portfolioData";

export default function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((label) => label.toLowerCase());

    const setActiveByScroll = () => {
      const viewportAnchor = window.scrollY + window.innerHeight * 0.35;
      let currentSection = "Home";

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;

        const top = section.offsetTop - 90;
        const bottom = top + section.offsetHeight;
        if (viewportAnchor >= top && viewportAnchor < bottom) {
          currentSection = id.charAt(0).toUpperCase() + id.slice(1);
        }
      }

      setActiveNav((prev) => (prev === currentSection ? prev : currentSection));
    };

    setActiveByScroll();
    window.addEventListener("scroll", setActiveByScroll, { passive: true });
    window.addEventListener("resize", setActiveByScroll);

    return () => {
      window.removeEventListener("scroll", setActiveByScroll);
      window.removeEventListener("resize", setActiveByScroll);
    };
  }, []);

  const onNavClick = (label) => {
    document.getElementById(label.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(label);
    setMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <Navbar
        activeNav={activeNav}
        scrolled={scrolled}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onNavClick={onNavClick}
      />
      <main>
        <HomePage onNavClick={onNavClick} />
      </main>
      <Footer />
      <ScrollTopButton />
    </div>
  );
}
