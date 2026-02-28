import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { portfolioData } from "../../data/portfolio-data";
import { GraduationCap } from "lucide-react";

export function Education() {
  const { education } = portfolioData;

  return (
    <Section className="container mx-auto px-6 md:px-12 max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-3">
        <GraduationCap className="w-8 h-8 text-blue-500" />
        Education
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {education.map((item, index) => (
          <Card key={item.id} delay={index * 0.1} className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{item.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium">{item.institution}</p>
              {item.board && (
                <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">{item.board}</p>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-semibold rounded-full">
                {item.year}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
