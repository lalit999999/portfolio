import { motion } from "motion/react";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
  hoverScale?: boolean;
}

export function Card({ children, className = "", delay = 0, onClick, hoverScale = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={hoverScale ? { y: -5, boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)" } : {}}
      className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
