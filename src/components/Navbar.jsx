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
    <div className="h-36 shadow-lg bg-gradient-to-r from-emerald-900 to-green-800">
    <nav className=" text-white flex flex-end flex-wrap justify-between gap-4 font-bold px-16">
      <div className="flex justify-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/027/127/526/non_2x/pokemon-logo-pokemon-icon-transparent-free-png.png"
          className="relative w-30 "
        />
        <img src="https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png" className="w-15 absolute top-11"/>
        <h1
          className="text-xl font-extrabold text-white tracking-wide absolute top-25 w-31"
          style={{
            textShadow: `
            -2px -2px 0 #000,  
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000
            `,
          }}
        >
          Battle Game
        </h1>
        
      </div>
      {/* Navigation Links */}
      <div className="flex flex-wrap gap-16 text-lg relative top-16">
        <Link
          to="/"
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
          Home
        </Link>
        <Link
          to="/battle"
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
          Battle
        </Link>
        <Link
          to="/leaderboard"
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
          Leaderboard
        </Link>
        <Link
          to="/roster"
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
          My Roster
        </Link>
        {/* <Link
          to="/details"
          className="text-white hover:text-green-300 transition-colors duration-150"
        >
          Details
        </Link> */}
      </div>

      {/* Search Input */}
      <div className="relative top-14">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={searchParams.get("search") || ""}
          onChange={handleChange}
          className="w-full md:w-64 px-4 py-2 rounded-xl bg-white text-black placeholder-grey-200 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
        />
      </div>
    </nav>
    </div>
  );
}
