import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyRoasterPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
    alert("Removed from favorites");
  };

  return (
    <div className="bg-[#f5f6f8] min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-emerald-900">
          My Roaster!
        </h1>

        {favorites.length === 0 ? (
          <p className="text-emerald-900 font-bold text-lg text-center">
            No Favorites Yet!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="bg-white text-emerald-900 rounded-xl shadow p-4 hover:shadow-lg transition-all duration-300 h-auto"
              >
                <div className="flex justify-between items-baseline">
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
                    className="h-60 mx-auto"
                  />
                </Link>

                <div className="text-sm mt-4 space-y-1">
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
