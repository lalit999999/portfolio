import { Github, Linkedin,Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="text-center">
        <div className="flex justify-center gap-6 mb-4">
          <Github />
          <Linkedin />
          <Instagram />
          
        </div>
        <p className="text-gray-400">© {new Date().getFullYear()} Lalit Gujar</p>
      </div>
    </footer>
  );
}
