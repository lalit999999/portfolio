import { Section } from "../ui/Section";
import { portfolioData } from "../../data/portfolio-data";
import { BookOpen, Sparkles } from "lucide-react";
import { Card } from "../ui/Card";

export function Learning() {
  const { learning } = portfolioData;

  return (
    <Section className="container mx-auto px-6 md:px-12 max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-3">
        <BookOpen className="w-8 h-8 text-amber-500" />
        Currently Learning
      </h2>
      
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border-amber-200 dark:border-amber-800/30">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-full shrink-0">
            <Sparkles className="w-8 h-8 text-amber-600 dark:text-amber-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Expanding My Horizons
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {learning.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-white/50 dark:bg-zinc-800/50 border border-amber-200 dark:border-amber-700/50 rounded-full text-sm font-medium text-amber-700 dark:text-amber-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 italic">
              "{learning.note}"
            </p>
          </div>
        </div>
      </Card>
    </Section>
  );
}
