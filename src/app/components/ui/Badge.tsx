import { motion } from "motion/react";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  delay?: number;
}

export function Badge({ children, icon, className = "", delay = 0 }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay, ease: "backOut" }}
      whileHover={{ scale: 1.05, borderColor: "#3b82f6" }}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-full text-sm font-medium text-zinc-700 dark:text-zinc-200 shadow-sm cursor-default transition-colors ${className}`}
    >
      {icon && <span className="text-blue-500 dark:text-blue-400">{icon}</span>}
      {children}
    </motion.div>
  );
}
