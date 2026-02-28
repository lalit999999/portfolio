import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { portfolioData } from "../../data/portfolio-data";
import { Share2 } from "lucide-react";
import React from "react";

export function Socials() {
  const { socials } = portfolioData;

  return (
    <Section className="container mx-auto px-6 md:px-12 max-w-4xl pb-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-3">
        <Share2 className="w-8 h-8 text-pink-500" />
        Connect With Me
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            <Card
              delay={index * 0.1}
              className="h-full flex flex-col items-center justify-center gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all duration-300 aspect-square group"
            >
              <social.icon className="w-10 h-10 text-zinc-600 dark:text-zinc-400 group-hover:scale-110 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-all duration-300" />
              <span className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-pink-600 dark:group-hover:text-pink-300 transition-colors">
                {social.name}
              </span>
            </Card>
          </a>
        ))}
      </div>
    </Section>
  );
}
