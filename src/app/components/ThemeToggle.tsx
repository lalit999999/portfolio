import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "./ui/utils";

interface ThemeToggleProps {
  className?: string;
  floating?: boolean;
}

export function ThemeToggle({ className, floating = true }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "flex items-center justify-center rounded-lg border border-border bg-background/80 p-2 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400",
        floating && "fixed top-6 right-6 z-50",
        className,
      )}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-yellow-500" />
      ) : (
        <Moon className="h-4 w-4 text-indigo-500" />
      )}
    </motion.button>
  );
}
