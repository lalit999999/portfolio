import { ArrowRight, Download } from "lucide-react";

export function Hero() {
  const handleDownloadCV = () => {
    // In a real application, this would download an actual CV file
    alert("CV download would start here");
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-linear-to-br
 from-blue-50 to-indigo-100 pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm">
              Welcome to my portfolio
            </span>
          </div>

          <h1 className="mb-6 text-gray-900">
            Hi, I'm <span className="text-blue-600">Lalit Gujar</span>
          </h1>

          <h2 className="text-3xl md:text-4xl text-gray-700 mb-6">
            Frontend Developer
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            I build exceptional digital experiences with modern web
            technologies. Passionate about creating elegant solutions to complex
            problems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownloadCV}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
            >
              <Download size={20} />
              Download CV
            </button>

            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Contact Me
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
