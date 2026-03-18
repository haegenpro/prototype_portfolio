"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Calendar, Code } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";
import Image from "next/image";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard className="h-full">
      <Card className="glassmorphism border-border hover:border-primary/30 transition-all duration-300 overflow-hidden h-full flex flex-col">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="relative w-full h-48 bg-muted">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Code size={48} className="opacity-20" />
              </div>
            )}
            {project.featured && (
              <span className="absolute top-3 right-3 px-2 py-1 text-xs bg-primary/90 text-primary-foreground rounded-full">
                Featured
              </span>
            )}
          </div>

          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-foreground">
                {project.title}
              </h3>
              {project.date && (
                <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0 ml-2">
                  <Calendar size={12} />
                  {project.date}
                </span>
              )}
            </div>
            <p className="text-muted-foreground mb-4 text-sm flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex space-x-3 mt-auto">
              {project.liveUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={14} className="mr-1" /> Live
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="border-muted-foreground/30 text-muted-foreground hover:bg-muted/50 bg-transparent"
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={14} className="mr-1" /> Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </TiltCard>
  );
}
