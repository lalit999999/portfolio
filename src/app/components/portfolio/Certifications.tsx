import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { portfolioData } from "../../data/portfolio-data";
import { Award, ExternalLink, CalendarDays, BadgeCheck } from "lucide-react";
import React from "react";

const colorMap: Record<
  string,
  {
    badge: string;
    icon: string;
    border: string;
    dot: string;
  }
> = {
  emerald: {
    badge:
      "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
    icon: "text-emerald-500",
    border: "border-emerald-200 dark:border-emerald-800/40",
    dot: "bg-emerald-500",
  },
  blue: {
    badge: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    icon: "text-blue-500",
    border: "border-blue-200 dark:border-blue-800/40",
    dot: "bg-blue-500",
  },
  violet: {
    badge:
      "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
    icon: "text-violet-500",
    border: "border-violet-200 dark:border-violet-800/40",
    dot: "bg-violet-500",
  },
  amber: {
    badge:
      "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    icon: "text-amber-500",
    border: "border-amber-200 dark:border-amber-800/40",
    dot: "bg-amber-500",
  },
  rose: {
    badge: "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400",
    icon: "text-rose-500",
    border: "border-rose-200 dark:border-rose-800/40",
    dot: "bg-rose-500",
  },
};

export function Certifications() {
  const { certifications } = portfolioData;

  return (
    <Section className="container mx-auto max-w-4xl scroll-mt-32 px-6 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-3">
        <Award className="w-8 h-8 text-amber-500" />
        Certifications
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => {
          const c = colorMap[cert.color] ?? colorMap["emerald"];

          return (
            <Card
              key={cert.id}
              delay={index * 0.1}
              className={`group flex flex-col justify-between border-t-4 ${c.border} overflow-hidden !p-0`}
            >
              {/* Certificate image */}
              <div className="relative w-full h-36 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                    (
                      e.currentTarget.parentElement as HTMLElement
                    ).classList.add("flex", "items-center", "justify-center");
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Verify link on top-right */}
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition-colors"
                  aria-label="View Credential"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col flex-1">
                {/* Top row: icon + badge */}
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 ${c.icon}`}
                  >
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-snug mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-4">
                  {cert.issuer}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Date */}
                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                  <span
                    className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${c.badge}`}
                  >
                    {cert.date}
                  </span>
                </div>
              </div>
              {/* end card body */}
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
