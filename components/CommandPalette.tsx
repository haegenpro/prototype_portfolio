"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  Search,
  ArrowRight,
  Code,
  User,
  Briefcase,
  Home,
  Mail,
  Terminal,
} from "lucide-react";

interface Command {
  id: string;
  label: string;
  icon: React.ElementType;
  action: () => void;
  keywords?: string[];
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery("");
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const handler = () => {
      setIsOpen((prev) => !prev);
      setQuery("");
    };
    window.addEventListener("toggle-command-palette", handler);
    return () => window.removeEventListener("toggle-command-palette", handler);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  }, []);

  const commands: Command[] = useMemo(
    () => [
      {
        id: "home",
        label: "Go to Home",
        icon: Home,
        action: () => scrollTo("home"),
        keywords: ["top", "hero"],
      },
      {
        id: "about",
        label: "Go to About",
        icon: User,
        action: () => scrollTo("about"),
        keywords: ["bio", "skills"],
      },
      {
        id: "projects",
        label: "Go to Projects",
        icon: Code,
        action: () => scrollTo("projects"),
        keywords: ["work", "portfolio"],
      },
      {
        id: "experience",
        label: "Go to Experience",
        icon: Briefcase,
        action: () => scrollTo("experience"),
        keywords: ["timeline", "journey"],
      },
      {
        id: "contact",
        label: "Go to Contact",
        icon: Mail,
        action: () => scrollTo("contact"),
        keywords: ["email", "message"],
      },
      {
        id: "matrix",
        label: "Enter the Matrix",
        icon: Terminal,
        action: () => {
          document.body.classList.toggle("matrix-mode");
          setIsOpen(false);
        },
        keywords: ["easter", "egg", "secret"],
      },
    ],
    [scrollTo]
  );

  const filtered = commands.filter((cmd) => {
    const q = query.toLowerCase();
    if (!q) return true;
    return (
      cmd.label.toLowerCase().includes(q) ||
      cmd.keywords?.some((k) => k.includes(q))
    );
  });

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
      onClick={() => setIsOpen(false)}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg mx-4 bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search size={18} className="text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
          />
          <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>
        <div className="max-h-64 overflow-y-auto py-2">
          {filtered.map((cmd) => (
            <button
              key={cmd.id}
              onClick={cmd.action}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-primary/10 transition-colors group"
            >
              <cmd.icon size={16} className="text-muted-foreground" />
              <span>{cmd.label}</span>
              <ArrowRight
                size={14}
                className="ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              No commands found
            </div>
          )}
        </div>
        <div className="px-4 py-2 border-t border-border text-xs text-muted-foreground">
          Tip: Press{" "}
          <kbd className="bg-muted px-1 rounded">Ctrl</kbd>+
          <kbd className="bg-muted px-1 rounded">K</kbd> anytime
        </div>
      </div>
    </div>,
    document.body
  );
}
