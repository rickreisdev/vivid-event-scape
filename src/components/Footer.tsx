import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-md border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-sm text-gray-300">Desenvolvido por</span>
          <a
            href="https://rickreis.dev.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img
              src="/logo-rickreis.png"
              alt="rickreis"
              className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
