"use client";

import { awards } from "@/data/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { cn } from "@/lib/utils";
import { Trophy, Medal, Award } from "lucide-react";
import type { Award as AwardType } from "@/data/portfolio";

const tierConfig = {
  gold: {
    Icon: Trophy,
    glow: "shadow-[0_0_20px_rgba(234,179,8,0.25)]",
    border: "border-yellow-500/30 hover:border-yellow-400/60",
    iconColor: "text-yellow-400",
    pillBg: "bg-yellow-500/10 text-yellow-300 border border-yellow-500/30",
    accent: "from-yellow-500/10 to-transparent",
  },
  silver: {
    Icon: Medal,
    glow: "shadow-[0_0_20px_rgba(148,163,184,0.25)]",
    border: "border-slate-400/30 hover:border-slate-300/60",
    iconColor: "text-slate-300",
    pillBg: "bg-slate-400/10 text-slate-300 border border-slate-400/30",
    accent: "from-slate-400/10 to-transparent",
  },
  bronze: {
    Icon: Award,
    glow: "shadow-[0_0_20px_rgba(180,83,9,0.25)]",
    border: "border-amber-700/30 hover:border-amber-600/60",
    iconColor: "text-amber-500",
    pillBg: "bg-amber-700/10 text-amber-400 border border-amber-700/30",
    accent: "from-amber-700/10 to-transparent",
  },
};

function AwardCard({ award, index }: { award: AwardType; index: number }) {
  const cfg = tierConfig[award.tier];
  const { Icon } = cfg;

  return (
    <AnimateOnScroll variant="up" delay={index * 120}>
      <Card
        className={cn(
          "glassmorphism transition-all duration-300 h-full",
          cfg.border,
          cfg.glow
        )}
      >
        <CardContent className="p-6 flex flex-col h-full">
          <div
            className={cn(
              "absolute inset-0 rounded-lg bg-gradient-to-br opacity-40 pointer-events-none",
              cfg.accent
            )}
          />

          <div className="flex items-start gap-4 mb-4 relative">
            <div
              className={cn(
                "flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center glassmorphism",
                cfg.border
              )}
            >
              <Icon className={cn("w-5 h-5", cfg.iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-foreground font-heading leading-snug">
                {award.title}
              </h3>
              <p className="text-accent text-sm mt-0.5">{award.organization}</p>
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed flex-1 relative">
            {award.description}
          </p>

          <div className="flex items-center justify-between mt-4 relative">
            {award.highlight && (
              <span
                className={cn(
                  "text-xs font-semibold px-2.5 py-1 rounded-full",
                  cfg.pillBg
                )}
              >
                {award.highlight}
              </span>
            )}
            <span className="text-muted-foreground text-xs ml-auto">
              {award.date}
            </span>
          </div>
        </CardContent>
      </Card>
    </AnimateOnScroll>
  );
}

export function AwardsSection() {
  return (
    <section id="awards" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text font-heading">
            Recognition
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={100}>
          <p className="text-center text-muted-foreground mb-14 max-w-xl mx-auto">
            Competitions, scholarships, and achievements along the way.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {awards.map((award, i) => (
            <AwardCard key={award.title} award={award} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
