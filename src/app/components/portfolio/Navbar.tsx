import { Menu, ArrowUpRight, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { portfolioData } from "../../data/portfolio-data";
import { ThemeToggle } from "../ThemeToggle";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { label: "Projects", href: "/projects" },
    { label: "Blogs", href: "/blogs" },
    // { label: "3D Games", href: "/games" },
    { label: "Skills", href: "/skills" },
    { label: "Certifications", href: "/certifications" },
  ];

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <div className="mx-auto flex max-w-6xl flex-col rounded-xl border border-border/70 bg-background/85 text-foreground shadow-[0_10px_40px_-20px_rgba(15,23,42,0.3)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
        <div className="flex items-center justify-between gap-3 px-3 py-2 sm:px-4">
          <button
            onClick={() => navigate("/")}
            className="flex min-w-0 items-center gap-2 rounded-full px-1 py-1 transition-transform duration-300 hover:scale-[1.01]"
            aria-label="Back to home"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20">
              LG
            </span>
            <span className="min-w-0 hidden sm:block">
              <span className="block truncate text-sm font-semibold tracking-[0.2em] text-foreground uppercase">
                {portfolioData.personalInfo.name}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                Crafted interface & code
              </span>
            </span>
          </button>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-all duration-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <span className="inline-flex items-center gap-1">
                  {item.label}
                  {item.external ? <ArrowUpRight className="h-3 w-3" /> : null}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle
              floating={false}
              className="h-9 w-9 p-0 flex items-center justify-center"
            />
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 lg:hidden"
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              {isOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {isOpen ? (
          <nav
            id="mobile-nav"
            className="grid gap-1.5 border-t border-border/70 px-3 py-3 lg:hidden sm:px-4"
            aria-label="Mobile"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-lg border border-border/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <span>{item.label}</span>
                {item.external ? <ArrowUpRight className="h-3 w-3" /> : null}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
