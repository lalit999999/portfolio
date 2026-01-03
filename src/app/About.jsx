import profileImage from "../assets/profileImage.png";


export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-gray-900">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={profileImage}
              alt="Profile"
              className="w-100 h-100 rounded-full object-cover mx-auto md:mx-0"
            />
          </div>

          <div>
            <h3 className="mb-6 text-gray-900">
              Full Stack Developer & Problem Solver
            </h3>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Hi! I’m Lalit, a Student in NIT Patna. I have a passion for
              building web applications and love Reading articles and books. My
              approach combines technical expertise with creative
              problem-solving to deliver exceptional results.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Currently, I’m studying at National Institute of technology, Patna
              learning AI/ML technology. In my free time, I enjoy reading
              articles and books.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Feel free to connect with me at{" "}
              <a
                target="_blank"
                href="https://www.instagram.com/joker_style_l/"
              >
                Instagram
              </a>
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h4 className="text-gray-900 mb-2">Undergraduate</h4>
                <p className="text-gray-600">
                  B.Tech and M.Tech Dual Degree (Computer Science and
                  Engineering with Specialization in Cyber Security)
                </p>
                <p className="text-gray-500 text-sm">
                  National Institute of technology • 2024 - 2029
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h4 className="text-gray-900 mb-2">12th grade</h4>
                <p className="text-gray-600">PCM</p>
                <p className="text-gray-500 text-sm">MHBGSSS • 2022-23</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
