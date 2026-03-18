"use client";

import { Button } from "@/components/ui/button";
import { useTypewriter } from "@/hooks/useTypewriter";
import { StatusWidget } from "@/components/StatusWidget";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

export function HeroSection() {
  const subtitle = useTypewriter([
    "Computer Science Student",
    "Aspiring Data Scientist",
    "Frontend Developer",
  ]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="text-center max-w-4xl mx-auto">
        <AnimateOnScroll>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text font-heading">
            Haegen Quinston
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <h2 className="text-xl md:text-2xl mb-8 text-muted-foreground h-8">
            {subtitle}
            <span className="animate-pulse">|</span>
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
            Computer Science undergraduate with a strong aptitude for mastering
            complex algorithms and data structures. Seeking to apply skills in
            data analysis and predictive modeling.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={600}>
          <Button
            onClick={() => scrollToSection("projects")}
            className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-3 text-lg font-semibold soft-glow-hover mb-8"
          >
            View My Projects
          </Button>
        </AnimateOnScroll>

        <AnimateOnScroll delay={800}>
          <StatusWidget />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
