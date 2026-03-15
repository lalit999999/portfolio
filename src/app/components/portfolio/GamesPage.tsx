import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { Gamepad2, Github, ExternalLink, Star } from "lucide-react";
import React from "react";

type Game = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  rating: number;
  image: string;
  github: string;
  live: string;
  isFeatured?: boolean;
};

const games: Game[] = [
  {
    id: 1,
    title: "3D Maze Explorer",
    description:
      "An immersive 3D maze game built with Three.js. Navigate through complex mazes, collect power-ups, and compete for the best times.",
    technologies: ["Three.js", "React", "Vite"],
    rating: 4.8,
    image:
      "https://res.cloudinary.com/dsmyka9cr/image/upload/v1773595264/TeaGardenGame-43-15_irkup0.png",
    github: "https://github.com/lalit999999",
    live: "/games/TeaGardenGame",
    isFeatured: true,
  },
  //   {
  //     id: 2,
  //     title: "3D Space Shooter",
  //     description:
  //       "Battle enemies in zero gravity. A fast-paced 3D space shooter with particle effects and realistic physics.",
  //     technologies: ["Babylon.js", "TypeScript", "WebGL"],
  //     rating: 4.6,
  //     image:
  //       "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=300&fit=crop",
  //     github: "https://github.com",
  //     live: "https://github.com",
  //   },
  //   {
  //     id: 3,
  //     title: "Procedural Planet Generator",
  //     description:
  //       "Generate infinite procedurally-created planets with unique terrain, atmosphere, and features. Explore and discover.",
  //     technologies: ["Three.js", "Perlin Noise", "WebGL"],
  //     rating: 4.7,
  //     image:
  //       "https://images.unsplash.com/photo-1462332420958-a05d1e7413e3?w=500&h=300&fit=crop",
  //     github: "https://github.com",
  //     live: "https://github.com",
  //     isFeatured: true,
  //   },
  //   {
  //     id: 4,
  //     title: "3D Card Flip Memory Game",
  //     description:
  //       "A modern take on the classic memory game with beautiful 3D card flip animations and smooth transitions.",
  //     technologies: ["Three.js", "React", "CSS3 Transforms"],
  //     rating: 4.5,
  //     image:
  //       "https://images.unsplash.com/photo-1559056169-641ef80759db?w=500&h=300&fit=crop",
  //     github: "https://github.com",
  //     live: "https://github.com",
  //   },
  //   {
  //     id: 5,
  //     title: "3D Pyramid Solver",
  //     description:
  //       "An interactive 3D visualization of AI solving pyramid puzzles. Watch algorithms come to life in three dimensions.",
  //     technologies: ["Three.js", "AI Algorithms", "WebGL"],
  //     rating: 4.4,
  //     image:
  //       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
  //     github: "https://github.com",
  //     live: "https://github.com",
  //   },
  //   {
  //     id: 6,
  //     title: "3D Falling Blocks",
  //     description:
  //       "A 3D interpretation of the classic Tetris game. Stack blocks, clear lines, and reach the highest score.",
  //     technologies: ["Babylon.js", "React", "Physics Engine"],
  //     rating: 4.5,
  //     image:
  //       "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=500&h=300&fit=crop",
  //     github: "https://github.com",
  //     live: "https://github.com",
  //   },
];

export function GamesPage() {
  const featuredGames = games.filter((game) => game.isFeatured);
  const otherGames = games.filter((game) => !game.isFeatured);

  return (
    <Section className="container mx-auto max-w-6xl scroll-mt-32 px-6 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-3">
        <Gamepad2 className="w-8 h-8 text-cyan-500" />
        3D Games & Projects
      </h2>
      <p className="text-center text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
        Explore interactive 3D experiences built with cutting-edge web
        technologies and creative game design.
      </p>

      {/* Featured Games */}
      {featuredGames.length > 0 && (
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Featured Games
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featuredGames.map((game, index) => (
              <a
                key={game.id}
                href={game.live}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card
                  delay={index * 0.1}
                  className="overflow-hidden hover:border-cyan-200 dark:hover:border-cyan-800/50"
                >
                  {/* Game Image */}
                  <div className="mb-6 aspect-video w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {game.title}
                  </h3>

                  <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
                    {game.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(game.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-zinc-300 dark:text-zinc-600"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        {game.rating}
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-cyan-500 transition-colors" />
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Other Games */}
      {otherGames.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">
            More Games
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherGames.map((game, index) => (
              <a
                key={game.id}
                href={game.live}
                target="_blank"
                rel="noopener noreferrer"
                className="block group h-full"
              >
                <Card
                  delay={0.1 + index * 0.05}
                  className="h-full flex flex-col hover:border-cyan-200 dark:hover:border-cyan-800/50"
                >
                  {/* Game Thumbnail */}
                  <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {game.title}
                    </h3>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2 flex-1">
                      {game.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {game.technologies.slice(0, 2).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs font-medium bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {game.technologies.length > 2 && (
                        <span className="px-2 py-0.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          +{game.technologies.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                      <a
                        href={game.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Code
                      </a>
                      <a
                        href={game.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 text-xs font-medium rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Play
                      </a>
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
