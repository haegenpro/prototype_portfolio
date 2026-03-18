"use client";

import { siteConfig } from "@/data/portfolio";
import { Code2, BookOpen, Activity } from "lucide-react";

export function StatusWidget() {
  const items = [
    { icon: Code2, label: "Building", value: siteConfig.currentlyWorking },
    { icon: BookOpen, label: "Reading", value: siteConfig.currentlyReading },
  ].filter((item) => item.value);

  if (items.length === 0) return null;

  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-4 px-4 py-2 rounded-full glassmorphism text-sm">
      <Activity size={14} className="text-accent animate-pulse" />
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <item.icon size={14} className="text-muted-foreground" />
          <span className="text-muted-foreground">{item.label}:</span>
          <span className="text-foreground">{item.value}</span>
          {i < items.length - 1 && (
            <span className="text-border ml-2">|</span>
          )}
        </div>
      ))}
    </div>
  );
}
