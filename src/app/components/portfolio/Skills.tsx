import { Section } from "../ui/Section";
import { Badge } from "../ui/Badge";
import { portfolioData } from "../../data/portfolio-data";
import { Cpu } from "lucide-react";
import React from "react";

export function Skills() {
  const { skills } = portfolioData;

  return (
    <Section className="container mx-auto px-6 md:px-12 max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-3">
        <Cpu className="w-8 h-8 text-indigo-500" />
        Technical Skills
      </h2>
      <div className="space-y-12">
        {skills.map((category, catIndex) => (
          <div key={catIndex}>
            <h3 className="text-xl font-bold mb-6 text-zinc-800 dark:text-zinc-200 border-l-4 border-indigo-500 pl-4">
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-4">
              {category.items.map((skill, index) => (
                <Badge
                  key={index}
                  icon={<skill.icon className="w-4 h-4" />}
                  delay={index * 0.05 + catIndex * 0.1}
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
