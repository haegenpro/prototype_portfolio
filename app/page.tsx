"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ScrollProgress } from "@/components/ScrollProgress";

// No SSR — the interactive grid generates 81 absolutely-positioned cells that
// browser extensions modify before hydration, causing unavoidable mismatches.
const AlgorithmSection = dynamic(
  () => import("@/components/sections/AlgorithmSection").then((m) => m.AlgorithmSection),
  { ssr: false }
);

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <CommandPalette />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <AlgorithmSection />
      <AwardsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
