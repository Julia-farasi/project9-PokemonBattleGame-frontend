// import { Link, useSearchParams } from "react-router-dom";

// export default function Navbar() {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const handleChange = (e) => {
//     const query = e.target.value;
//     if (query) {
//       setSearchParams({ search: query });
//     } else {
//       setSearchParams({});
//     }
//   };

//   return (
//     <>
//       <nav className="">
//         <h1 className="">Pokemon Battle Game</h1>

//         <input
//           type="text"
//           placeholder="🔎 Suchen..."
//           value={searchParams.get("search") || ""}
//           onChange={handleChange}
//           className="rounded-lg px-4 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//         />
//         <Link to="/">Home</Link>
//         <Link to="/battle">Battle</Link>
//         <Link to="/leaderboard">Leaderboard</Link>
//         <Link to="/roster">MyRosterPage</Link>
//         <Link to="/details">PokemonDetailsPage</Link>
//       </nav>
//     </>
//   );
// }
import { Link, useSearchParams } from "react-router-dom";

export default function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    const query = e.target.value;
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-900 to-green-800 text-white px-6 py-4 shadow-lg flex flex-wrap items-center justify-between gap-4">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold text-green-300 tracking-wide">
        Pokémon Battle Game
      </h1>

      {/* Navigation Links */}
      <div className="flex flex-wrap gap-4 justify-end">
        <Link
          to="/"
          className="text-white hover:text-green-300 transition-colors duration-150"
        >
          Home
        </Link>
        <Link
          to="/battle"
          className="text-white hover:text-green-300 transition-colors duration-150"
        >
          Battle
        </Link>
        <Link
          to="/leaderboard"
          className="text-white hover:text-green-300 transition-colors duration-150"
        >
          Leaderboard
        </Link>
        <Link
          to="/roster"
          className="text-white hover:text-green-300 transition-colors duration-150"
        >
          My Roster
        </Link>
        <Link
          to="/details"
          className="text-white hover:text-green-300 transition-colors duration-150"
        >
          Details
        </Link>
      </div>

      {/* Search Input */}
      <div className="flex-1 md:flex-initial">
        <input
          type="text"
          placeholder="🔍 Suchen..."
          value={searchParams.get("search") || ""}
          onChange={handleChange}
          className="w-full md:w-64 px-4 py-2 rounded-xl bg-green-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
        />
      </div>
    </nav>
  );
}
