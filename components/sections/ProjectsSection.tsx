"use client";

import { projects } from "@/data/portfolio";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { ProjectCard } from "@/components/ProjectCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Calendar, Code } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";
import Image from "next/image";
import type { Project } from "@/data/portfolio";

function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard>
      <Card className="glassmorphism border-border hover:border-primary/30 transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto bg-muted">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground min-h-[16rem]">
                  <Code size={64} className="opacity-20" />
                </div>
              )}
              <span className="absolute top-3 left-3 px-3 py-1 text-xs bg-primary/90 text-primary-foreground rounded-full font-medium">
                Featured Project
              </span>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-semibold text-foreground font-heading">
                  {project.title}
                </h3>
                {project.date && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar size={12} />
                    {project.date}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex space-x-3">
                {project.liveUrl && (
                  <Button
                    variant="outline"
                    asChild
                    className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={16} className="mr-2" /> Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    asChild
                    className="border-muted-foreground/30 text-muted-foreground hover:bg-muted/50 bg-transparent"
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} className="mr-2" /> Source Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TiltCard>
  );
}

export function ProjectsSection() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text font-heading">
            Projects
          </h2>
        </AnimateOnScroll>

        {featured && (
          <AnimateOnScroll className="mb-12">
            <FeaturedProjectCard project={featured} />
          </AnimateOnScroll>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((project, i) => (
            <AnimateOnScroll key={project.title} delay={i * 100}>
              <ProjectCard project={project} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
