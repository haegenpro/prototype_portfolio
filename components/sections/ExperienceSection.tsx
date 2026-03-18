"use client";

import { experiences } from "@/data/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import type { Experience } from "@/data/portfolio";

function TimelineEntry({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: "-50px",
  });

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-start transition-all duration-700 ease-out",
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-10"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className={cn(
          "absolute left-6 w-4 h-4 rounded-full border-2 border-background z-10 transition-all duration-500",
          isVisible
            ? "bg-primary scale-100 shadow-[0_0_12px_rgba(59,130,246,0.4)]"
            : "bg-muted scale-75"
        )}
      />

      <div className="ml-20 w-full">
        <Card
          className={cn(
            "glassmorphism border-border transition-all duration-500",
            isVisible ? "border-primary/20" : ""
          )}
        >
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-primary font-heading">
                  {experience.role}
                </h3>
                <p className="text-foreground font-medium">
                  {experience.company}
                </p>
              </div>
              <span className="text-accent text-sm font-medium mt-2 sm:mt-0">
                {experience.period}
              </span>
            </div>
            <ul className="space-y-2">
              {experience.achievements.map((achievement, i) => (
                <li
                  key={i}
                  className="text-muted-foreground text-sm flex items-start"
                >
                  <span className="text-accent mr-2 mt-1">&raquo;</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text font-heading">
            My Journey
          </h2>
        </AnimateOnScroll>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-muted"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <TimelineEntry
                key={exp.company}
                experience={exp}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
