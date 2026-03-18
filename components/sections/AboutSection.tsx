"use client";

import { skills } from "@/data/portfolio";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import type { Skill } from "@/data/portfolio";

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="space-y-1.5"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex justify-between text-sm">
        <span className="text-foreground font-medium">{skill.name}</span>
        <span className="text-muted-foreground">{skill.proficiency}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${skill.proficiency}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export function AboutSection() {
  const languages = skills.filter((s) => s.category === "language");
  const frameworks = skills.filter((s) => s.category === "framework");
  const databases = skills.filter((s) => s.category === "database");
  const tools = skills.filter((s) => s.category === "tool");

  const skillGroups = [
    { label: "Languages", items: languages },
    { label: "Frameworks & Libraries", items: frameworks },
    { label: "Databases", items: databases },
    { label: "Tools", items: tools },
  ].filter((g) => g.items.length > 0);

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text font-heading">
            About Me
          </h2>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <AnimateOnScroll variant="left">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-foreground">
                I am an aspiring Data Scientist with a strong academic
                foundation (3.71 GPA) in AI and algorithms, focused on
                translating theory into measurable impact. As a Bakti BCA
                Scholar (top 8%), I had the opportunity to put this into
                practice by contributing to a strategic project that boosted
                e-commerce sales by 30%.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Beyond the classroom, I am dedicated to honing my craft through
                hands-on development of personal machine learning projects and
                the intellectual rigor of Competitive Programming. When I&apos;m
                not coding, I enjoy unwinding with music, books, and basketball.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div>
              <h3 className="text-2xl font-semibold mb-8 text-primary font-heading">
                Technical Skills
              </h3>
              <div className="space-y-8">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                      {group.label}
                    </h4>
                    <div className="space-y-3">
                      {group.items.map((skill, i) => (
                        <SkillBar
                          key={skill.name}
                          skill={skill}
                          delay={i * 80}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
