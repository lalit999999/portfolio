import { motion } from "motion/react";
import { ArrowDown, Download } from "lucide-react";
import { portfolioData } from "../../data/portfolio-data";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function Hero() {
  const { name, tagline, image, resumeLink } = portfolioData.personalInfo;

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-white to-white dark:from-blue-900/20 dark:via-zinc-950 dark:to-zinc-950 opacity-70" />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="relative mb-8"
      >
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl mx-auto relative z-10 bg-zinc-100 dark:bg-zinc-800">
          <ImageWithFallback
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-2xl -z-10 scale-110" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 mb-4 tracking-tight"
      >
        {name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg mx-auto leading-relaxed"
      >
        {tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <a
          href={resumeLink}
          className="group inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          download
          target="_blank"
        >
          <Download className="w-4 h-4 group-hover:animate-bounce" />
          Download Resume
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-400 dark:text-zinc-600"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
