"use client";

import { useState, useRef, useEffect } from "react";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [lines, setLines] = useState<string[]>([
    "visitor@haegen.dev ~ $",
    "Welcome! Type a command or message:",
    "  /email    — Open email client",
    "  /github   — View my GitHub",
    "  /linkedin — Connect on LinkedIn",
    "",
    "Or type a message and press Enter.",
  ]);
  const [input, setInput] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === "/email") {
      setLines((prev) => [...prev, `$ ${cmd}`, "Opening email client..."]);
      setTimeout(() => window.open(`mailto:${siteConfig.email}`), 300);
    } else if (trimmed === "/github") {
      setLines((prev) => [...prev, `$ ${cmd}`, "Opening GitHub..."]);
      setTimeout(() => window.open(siteConfig.github, "_blank"), 300);
    } else if (trimmed === "/linkedin") {
      setLines((prev) => [...prev, `$ ${cmd}`, "Opening LinkedIn..."]);
      setTimeout(() => window.open(siteConfig.linkedin, "_blank"), 300);
    } else if (trimmed === "/clear") {
      setLines(["Terminal cleared.", ""]);
    } else if (trimmed === "/help") {
      setLines((prev) => [
        ...prev,
        `$ ${cmd}`,
        "Available commands:",
        "  /email    — Open email client",
        "  /github   — View my GitHub",
        "  /linkedin — Connect on LinkedIn",
        "  /clear    — Clear terminal",
        "  /help     — Show this help",
        "",
      ]);
    } else {
      const subject = encodeURIComponent("Message from Portfolio");
      const body = encodeURIComponent(cmd);
      setLines((prev) => [
        ...prev,
        `$ ${cmd}`,
        "Opening email client with your message...",
      ]);
      setTimeout(
        () =>
          window.open(
            `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
          ),
        300
      );
    }
    setInput("");
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text font-heading">
            Get in Touch
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <div className="glassmorphism rounded-xl overflow-hidden border border-border">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="text-xs text-muted-foreground ml-2 font-mono">
                contact@haegen.dev
              </span>
            </div>

            <div
              ref={terminalRef}
              className="p-4 font-mono text-sm max-h-64 overflow-y-auto"
            >
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    "leading-relaxed",
                    line.startsWith("$")
                      ? "text-accent"
                      : "text-muted-foreground"
                  )}
                >
                  {line || "\u00A0"}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 px-4 py-3 border-t border-border">
              <span className="text-accent font-mono text-sm">$</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCommand(input)}
                className="flex-1 bg-transparent text-foreground font-mono text-sm outline-none placeholder:text-muted-foreground"
                placeholder="Type a command or message..."
              />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
