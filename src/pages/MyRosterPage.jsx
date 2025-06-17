import { useEffect, useState } from "react";
import { Link } from "react-router";

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
    alert("removed from favorites");
  };

  return (
    <div className="bg-[#f5f6f8] min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-emerald-900">
          My Roaster!
        </h1>
        <div>
          {favorites.length === 0 ? (
            <p className="text-emerald-900 font-bold text-lg text-center">
              No Favorites Yet!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((fav) => (
                <div
                  key={fav.id}
                  className="bg-white text-emerald-900 rounded-xl shadow p-4 hover:shadow-lg transition-all duration-300 h-100"
                >
                  <div className="flex justify-between items-baseline">
                    <h2 className="text-3xl font-bold capitalize mb-2">
                      {fav.name}
                    </h2>
                    {/* <p className="text-sm">HP: {fav.stats?.[0]?.base_stat}</p> */}
                    {/* <p className="text-sm uppercase">
                      TYPE:{" "}
                      {fav.types
                        ?.map((typeInfo) => typeInfo.type.name)
                        .join(", ")}
                    </p> */}
                    <button
                      onClick={() => handleRemoveFromFavorites(fav.id)}
                      className="text-4xl text-yellow-300 hover:text-emerald-900 transition-colors duration-200"
                    >
                      ★
                    </button>
                  </div>
                  <Link to={`/pokemon/${fav.id}`}>
                    <img src={fav.image} alt={fav.name} className="h-80" />
                  </Link>
                  {/* <p className="text-sm text-center">
                    ATTACK: {fav.stats?.[1]?.base_stat} | DEFENSE:{" "}
                    {fav.stats?.[2]?.base_stat}
                  </p>
                  <p className="text-sm text-center">
                    HEIGHT: {fav.height / 10}m | WEIGHT: {fav.weight / 10}
                    kg
                  </p>
                  <br></br>
                  <p className="text-sm uppercase text-center">
                    ABILITIES:<br></br>
                    {fav.abilities
                      ?.map((abilityInfo) => abilityInfo.ability.name)
                      .join(", ")}
                  </p> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRoasterPage;
