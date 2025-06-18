import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import Swal from "sweetalert2"; // ✅ SweetAlert importieren

const MyRoasterPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);

    // ✅ SweetAlert statt alert()
    Swal.fire({
      icon: "success",
      title: "Removed!",
      text: "The Pokémon has been removed from your roster.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleClearAllFavorites = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove all your Pokémon from your roster!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#10b981",
      confirmButtonText: "Yes, remove all!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("favorites");
        setFavorites([]);
        setShowConfetti(true);

        Swal.fire("Deleted!", "All your Pokémon have been removed.", "success");

        setTimeout(() => {
          setShowConfetti(false);
        }, 4000);
      }
    });
  };

  return (
    <div className="bg-[#f5f6f8] min-h-screen py-10 relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={300}
        />
      )}

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-emerald-900">
          My Roaster!
        </h1>

        {favorites.length > 0 && (
          <div className="flex justify-center mb-6">
            <button
              onClick={handleClearAllFavorites}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow transition duration-200"
            >
              🗑️ Remove All Favorites
            </button>
          </div>
        )}

        {favorites.length === 0 ? (
          <p className="text-emerald-900 font-bold text-lg text-center">
            No Favorites Yet!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="relative group bg-white text-emerald-900 rounded-xl p-4 h-auto overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] shadow-md hover:shadow-2xl ring-1 ring-emerald-200 hover:ring-4 hover:ring-emerald-400"
              >
                {/* Glanz + Hover-Highlight */}
                <div className="absolute inset-0 z-0 pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:rotate-12 before:animate-glow" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-100 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

                <div className="relative z-10 flex justify-between items-baseline">
                  <h2 className="text-3xl font-bold capitalize mb-2">
                    {fav.name}
                  </h2>
                  <button
                    onClick={() => handleRemoveFromFavorites(fav.id)}
                    className="text-4xl text-yellow-300 hover:text-emerald-900 transition-colors duration-200"
                  >
                    ★
                  </button>
                </div>

                <Link to={`/pokemon/${fav.id}`}>
                  <img
                    src={fav.image}
                    alt={fav.name}
                    className="h-60 mx-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                <div className="text-sm mt-4 space-y-1 relative z-10">
                  <p className="text-center">
                    <strong>Type:</strong>{" "}
                    {fav.types?.map((t) => t.type.name).join(", ")}
                  </p>
                  <p className="text-center">
                    <strong>Height:</strong> {fav.height / 10} m |{" "}
                    <strong>Weight:</strong> {fav.weight / 10} kg
                  </p>
                  <p className="text-center">
                    <strong>Abilities:</strong>{" "}
                    {fav.abilities?.map((a) => a.ability.name).join(", ")}
                  </p>
                  <div className="pt-2">
                    <p className="text-center font-semibold">Stats</p>
                    <ul className="list-disc list-inside text-center">
                      {fav.stats?.map((stat) => (
                        <li key={stat.stat.name}>
                          {stat.stat.name.toUpperCase()}: {stat.base_stat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRoasterPage;
