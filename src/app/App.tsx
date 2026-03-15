import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";
import { ProjectsPage } from "./pages/ProjectsPage";
import { BlogsPage } from "./pages/BlogsPage";
import { GamesPageRoute } from "./pages/GamesPageRoute";
import { SkillsPage } from "./pages/SkillsPage";
import { CertificationsPage } from "./pages/CertificationsPage";
import TeaGardenGame from "./games/CherryBlossom";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/games" element={<GamesPageRoute />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/games/TeaGardenGame" element={<TeaGardenGame />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
