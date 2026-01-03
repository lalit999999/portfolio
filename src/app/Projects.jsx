import React from "react";
import bgchanger from "../assets/bgchanger.png";
import currenctconverter from "../assets/currenctconverter.png";

import { ExternalLink, Github } from "lucide-react";

export function Projects() {
  const projects = [
    {
      title: "Backgroung changer",
      description:
        "A simple background change can redefine the entire experience.",
      techStack: ["React", "javaScript"],
      demoLink: "https://bgchanger.mewithblender.shop/",
      githubLink: "https://github.com/lalit999999/Background-Changer",
      image: "./src/assets/bgchanger.png",
    },
    {
      title: "Currency Converter",
      description:
        "Convert currencies instantly with real-time exchange rates. Simple, fast, and reliable conversion between global currencies.",
      techStack: ["React", "javaScript"],
      demoLink: "https://currencyconverter.mewithblender.shop/",
      githubLink: "https://github.com/lalit999999/currenctconverter/",
      image: "./src/assets/currenctconverter.png",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-gray-900">Featured Projects</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="aspect-video overflow-hidden bg-gray-200">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="mb-3 text-xl text-gray-900">{project.title}</h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <ExternalLink size={18} />
                    Demo
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <Github size={18} />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
