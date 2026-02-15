import { useEffect, useState } from "react";
import ButtonsSkill from "../button/button";

export function Skills() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    const section = document.querySelector("#skills");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: "Java", category: "languages" },
    { name: "Python", category: "languages" },
    { name: "C++", category: "languages" },
    { name: "C", category: "languages" },
    { name: "JavaScript", category: "languages" },
    { name: "React", category: "Frontend" },
    { name: "Html5", category: "Frontend" },
    { name: "CSS", category: "Frontend" },
    // { name: "CSS", level: 85, category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Backend" },
    { name: "Oracle", category: "Database" },
    { name: "MySQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
  ];

  const categories = [...new Set(skills.map((skill) => skill.category))];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-gray-900">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div key={category} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="mb-6 text-xl text-gray-900">{category}</h3>
              <div className="space-y-4 ">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <div
                      className="flex flex-wrap justify-center item-center"
                      key={skill.name}
                    >
                      <ButtonsSkill text={skill.name} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
