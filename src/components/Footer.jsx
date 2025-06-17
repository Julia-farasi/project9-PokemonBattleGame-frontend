// function Footer() {
//   return (
//     <footer className="">
//       <div className="">
//         <div className="">
//           <a href="#" className="">
//             Impressum
//           </a>
//           <a href="#" className="">
//             Datenschutz
//           </a>
//           <a href="#" className="">
//             Kontakt
//           </a>
//         </div>
//         <div className="">
//           © {new Date().getFullYear()} Amanda's und Julia's Pokemon Battle Game
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
function Footer() {
  return (
    <footer className="bg-gradient-to-r from-emerald-900 to-green-800 text-white py-6 px-4 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Links */}
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-green-300 transition-colors">
            Impressum
          </a>
          <a href="#" className="hover:text-green-300 transition-colors">
            Datenschutz
          </a>
          <a href="#" className="hover:text-green-300 transition-colors">
            Kontakt
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-200 text-center md:text-right">
          © {new Date().getFullYear()} Amanda's & Julia's Pokémon Battle Game
        </div>
      </div>
    </footer>
  );
}

export default Footer;
