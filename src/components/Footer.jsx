function Footer() {
  return (
    <footer className="bg-gradient-to-r from-emerald-900 to-green-800 text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Links */}
        <div className="flex space-x-6 text-sm">
          <a
            href="#"
            className="text-white hover:scale-130 transition-transform duration-500"
            style={{
              textShadow: `
            -2px -2px 0 #000,  
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000
            `,
            }}
          >
            Impressum
          </a>
          <a
            href="#"
            className="text-white hover:scale-130 transition-transform duration-500"
            style={{
              textShadow: `
            -2px -2px 0 #000,  
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000
            `,
            }}
          >
            Datenschutz
          </a>
          <a
            href="#"
            className="text-white hover:scale-130 transition-transform duration-500"
            style={{
              textShadow: `
            -2px -2px 0 #000,  
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000
            `,
            }}
          >
            Kontakt
          </a>
        </div>

        {/* Copyright */}
        <div
          className="text-xs text-white text-center md:text-right"
          style={{
            textShadow: `
            -2px -2px 0 #000,  
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000
            `,
          }}
        >
          © {new Date().getFullYear()} Amanda's & Julia's Pokémon Battle Game
        </div>
      </div>
    </footer>
  );
}

export default Footer;
