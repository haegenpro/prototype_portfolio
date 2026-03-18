"use client";

import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Menu, X, User, Code, Briefcase, Search } from "lucide-react";
import { siteConfig } from "@/data/portfolio";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Home", icon: null },
    { name: "About", icon: User },
    { name: "Projects", icon: Code },
    { name: "Experience", icon: Briefcase },
    { name: "Contact", icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="font-bold text-xl gradient-text font-heading">
              HQ
            </div>

            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.name.toLowerCase())}
                  className={`font-medium transition-all duration-300 soft-glow-hover px-3 py-2 rounded-md text-sm ${
                    activeSection === item.name.toLowerCase()
                      ? "text-primary soft-glow"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.icon && <item.icon size={15} />}
                    {item.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("toggle-command-palette"))
              }
              className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border hover:border-primary/30 transition-colors"
            >
              <Search size={14} />
              <span>Search</span>
              <kbd className="text-[10px] bg-muted px-1 rounded ml-1">
                Ctrl K
              </kbd>
            </button>

            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-all duration-300 soft-glow-hover p-2 rounded-full"
            >
              <Github size={20} />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-all duration-300 soft-glow-hover p-2 rounded-full"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-foreground hover:text-primary transition-all duration-300 soft-glow-hover p-2 rounded-full"
            >
              <Mail size={20} />
            </a>
          </div>

          <button
            className="md:hidden text-foreground hover:text-primary transition-colors p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden glassmorphism mt-2 rounded-lg p-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.name.toLowerCase())}
                  className="text-left font-medium text-foreground hover:text-primary transition-colors p-2 rounded-md soft-glow-hover"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex space-x-4 pt-4 border-t border-border">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors p-2 rounded-full soft-glow-hover"
                >
                  <Github size={20} />
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-accent transition-colors p-2 rounded-full soft-glow-hover"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-foreground hover:text-primary transition-colors p-2 rounded-full soft-glow-hover"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
