import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "./components/ThemeToggle";
import { Hero } from "./components/portfolio/Hero";
import { About } from "./components/portfolio/About";
import { Education } from "./components/portfolio/Education";
import { Skills } from "./components/portfolio/Skills";
import { Learning } from "./components/portfolio/Learning";
import { Projects } from "./components/portfolio/Projects";
import { Socials } from "./components/portfolio/Socials";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 selection:bg-blue-500/30">
        <ThemeToggle />
        <main className="space-y-0">
          <Hero />
          <div className="space-y-24 pb-24">
            <About />
            <Education />
            <Skills />
            <Learning />
            <Projects />
            <Socials />
          </div>
        </main>

        <footer className="py-8 text-center text-zinc-500 dark:text-zinc-500 text-sm border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <p>© {new Date().getFullYear()} Lalit Gurjar. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}
