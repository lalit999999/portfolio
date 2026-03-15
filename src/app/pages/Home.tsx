import { Hero } from "../components/portfolio/Hero";
import { About } from "../components/portfolio/About";
import { Education } from "../components/portfolio/Education";
import { Learning } from "../components/portfolio/Learning";
import { Socials } from "../components/portfolio/Socials";

export function Home() {
  return (
    <div className="space-y-24 pb-24">
      <Hero />
      <About />
      <Education />
      <Learning />
      <Socials />
    </div>
  );
}
