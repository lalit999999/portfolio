import { Outlet } from "react-router-dom";
import { Navbar } from "../components/portfolio/Navbar";

export function RootLayout() {
  return (
    <div
      id="top"
      className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 selection:bg-blue-500/30 dark:bg-zinc-950 dark:text-zinc-50"
    >
      <Navbar />
      <main className="space-y-0">
        <Outlet />
      </main>
      <footer className="py-8 text-center text-zinc-500 dark:text-zinc-500 text-sm border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <p>© {new Date().getFullYear()} Lalit Gurjar. All rights reserved.</p>
      </footer>
    </div>
  );
}
