import { motion } from "motion/react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Wait, I don't have utils yet. I'll just use tailwind-merge directly or inline.

interface SectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export function Section({ children, className = "", delay = 0, id }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`py-12 md:py-16 ${className}`}
    >
      {children}
    </motion.section>
  );
}
