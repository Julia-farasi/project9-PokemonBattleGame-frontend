import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getTypeGradient from "../utils/getTypeColor"; // ⬅️ neu

function PokemonDetailsPage() {
  const [pokemon, setPokemon] = useState(null);
  const { id } = useParams();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = currentFavorites.some((fav) => fav.id === Number(id));
    setFavorite(exists);
  }, [id]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemon(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemon();
  }, [id]);

  const handleAddToFavorites = () => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const alreadyExists = currentFavorites.some((fav) => fav.id === pokemon.id);

    if (!alreadyExists) {
      const newFavorites = [
        ...currentFavorites,
        {
          id: pokemon.id,
          name: pokemon.name,
          image:
            pokemon.sprites?.other?.dream_world?.front_default ||
            pokemon.sprites?.front_default,
          stats: pokemon.stats,
          types: pokemon.types,
          abilities: pokemon.abilities,
          height: pokemon.height,
          weight: pokemon.weight,
        },
      ];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setFavorite(true); // ✅ Zustand aktualisieren
    }
  };

  const handleRemoveFromFavorites = () => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = currentFavorites.filter(
      (fav) => fav.id !== pokemon.id
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorite(false); // ✅ Zustand aktualisieren
  };

  const isFavorite = (pokemon) => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    return currentFavorites.some((fav) => fav.id === pokemon.id);
  };

  if (!pokemon) return null;

  const primaryType = pokemon.types?.[0]?.type?.name;
  const bgGradient = getTypeGradient(primaryType);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${bgGradient} py-10 relative overflow-hidden`}
    >
      {/* Glitzer Hintergrund über gesamte Seite */}
      <div className="absolute inset-0 bg-[url('/sparkles.svg')] bg-cover opacity-10 pointer-events-none animate-pulse" />

      <div className="container mx-auto px-4 flex flex-col justify-center items-center relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-white capitalize drop-shadow-lg">
          This is {pokemon.name}!
        </h1>

        <div
          className="relative group bg-white text-emerald-900 rounded-xl p-6 shadow-xl transform transition-transform duration-700 hover:rotate-[1deg] hover:scale-105 w-full max-w-md"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          {/* Shine-Lichtreflex */}
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:rotate-45 before:animate-glow pointer-events-none z-0" />

          {/* Glitzer-Effekt */}
          <div className="absolute inset-0 bg-[url('/sparkles.svg')] bg-cover opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none z-0" />

          {/* Inhalt */}
          <div className="relative z-10">
            <div className="flex justify-between items-baseline">
              <h2 className="text-3xl font-bold capitalize mb-2">
                {pokemon.name}
              </h2>
              <button
                onClick={() =>
                  favorite
                    ? handleRemoveFromFavorites()
                    : handleAddToFavorites()
                }
                className={`text-4xl transition-colors duration-200 ${
                  favorite
                    ? "text-yellow-300 hover:text-emerald-900"
                    : "text-emerald-900 hover:text-yellow-300"
                }`}
              >
                {favorite ? "★" : "☆"}
              </button>
            </div>

            <div className="flex justify-between items-center flex-wrap gap-2 mt-2">
              <div>
                <p className="font-bold capitalize mb-1">
                  Type:{" "}
                  {pokemon.types
                    .map((typeInfo) => typeInfo.type.name)
                    .join(", ")}
                </p>
                <p className="font-bold capitalize mb-2">
                  Abilities:{" "}
                  {pokemon.abilities
                    .map((abilityInfo) => abilityInfo.ability.name)
                    .join(", ")}
                </p>
              </div>
              <p className="font-bold">HP: {pokemon.stats?.[0]?.base_stat}</p>
            </div>

            <img
              src={pokemon.sprites?.other.dream_world.front_default}
              alt={pokemon.name}
              className="w-72 h-72 object-contain mx-auto my-4"
            />

            <p className="font-bold text-center mt-2 mb-1">
              Attack: {pokemon.stats?.[1]?.base_stat} | Defense:{" "}
              {pokemon.stats?.[2]?.base_stat}
            </p>
            <p className="font-bold text-center">
              Height: {pokemon.height / 10} m | Weight: {pokemon.weight / 10} kg
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailsPage;
