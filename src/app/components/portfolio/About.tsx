import { Section } from "../ui/Section";
import { portfolioData } from "../../data/portfolio-data";

export function About() {
  const { description } = portfolioData.personalInfo;

  return (
    <Section className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">About Me</h2>
      <p className="text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </Section>
  );
}
