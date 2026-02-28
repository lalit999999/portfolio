import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { portfolioData } from "../../data/portfolio-data";
import { FolderGit2, Github, ExternalLink, Code } from "lucide-react";

export function Projects() {
  const { projects } = portfolioData;

  return (
    <Section className="container mx-auto px-6 md:px-12 max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-3">
        <FolderGit2 className="w-8 h-8 text-emerald-500" />
        Featured Projects
      </h2>
      <div className="space-y-8">
        {projects.map((project, index) => (
          <Card 
            key={project.id} 
            delay={index * 0.1}
            className="group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Code className="w-24 h-24 text-zinc-400 dark:text-zinc-600 rotate-12 transform translate-x-4 -translate-y-4" />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    aria-label="View Source"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  {/* Optional Live Demo Link if available */}
                  {/* <a href="#" className="..." ><ExternalLink /></a> */}
                </div>
              </div>
              
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 text-sm font-medium rounded-md border border-zinc-200 dark:border-zinc-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
