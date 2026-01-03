import { useEffect, useState } from "react";

export function Skills() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector("#skills");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: "Java", level: 70, category: "languages" },
    { name: "Python", level: 70, category: "languages" },
    { name: "C++", level: 70, category: "languages" },
    { name: "C", level: 70, category: "languages" },
    { name: "JavaScript", level: 70, category: "languages" },
    { name: "React", level: 90, category: "Frontend" },
    { name: "Html5", level: 85, category: "Frontend" },
    { name: "CSS", level: 85, category: "Frontend" },
    // { name: "CSS", level: 85, category: "Frontend" },
    { name: "Node.js", level: 88, category: "Backend" },
    { name: "Python", level: 80, category: "Backend" },
    { name: "Oracle", level: 82, category: "Database" },
    { name: "MySQL", level: 82, category: "Database" },
    // { name: "MongoDB", level: 78, category: "Database" },
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
              <div className="space-y-4">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: isVisible ? `${skill.level}%` : "0%",
                          }}
                        />
                      </div>
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
