import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokemonDetailsPage() {
  const [pokemon, setPokemon] = useState([]);

  const { id } = useParams();

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
          image: pokemon.sprites.front_default,
          stats: pokemon.stats,
          types: pokemon.types,
          abilities: pokemon.abilities,
          height: pokemon.height,
          weight: pokemon.weight,
        },
      ];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      alert(`${pokemon.name} added to favorites`);
    } else {
      alert(`${pokemon.name} is already in your favorites`);
    }
  };

  const handleRemoveFromFavorites = () => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = currentFavorites.filter(
      (fav) => fav.id !== pokemon.id
    );

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    alert(`${pokemon.name} removed from favorites`);
  };

  const isFavorite = (pokemon) => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    return currentFavorites.some((fav) => fav.id === pokemon.id);
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] py-10">
      <div className="container mx-auto px-4 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-8 text-center text-emerald-900 capitalize">
          This Is {pokemon.name}!
        </h1>
        <div className="bg-white text-emerald-900 rounded-xl shadow p-4 hover:shadow-lg transition-all duration-300 w-100 ">
          <div className="flex justify-between items-baseline">
            <h2 className="text-3xl font-bold capitalize mb-2">
              {pokemon.name}
            </h2>
            <button
              onClick={() =>
                isFavorite(pokemon)
                  ? handleRemoveFromFavorites(pokemon)
                  : handleAddToFavorites(pokemon)
              }
              className={`text-4xl transition-colors duration-200 ${
                isFavorite(pokemon)
                  ? "text-yellow-300 hover:text-emerald-900"
                  : "text-emerald-900 hover:text-yellow-300"
              }`}
            >
              {isFavorite(pokemon) ? "★" : "☆"}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold capitalize mb-1">
                Type:{" "}
                {pokemon.types
                  ?.map((typeInfo) => typeInfo.type.name)
                  .join(", ")}
              </p>
              <p className="font-bold capitalize mb-2">
                Abilities:{" "}
                {pokemon.abilities
                  ?.map((abilityInfo) => abilityInfo.ability.name)
                  .join(", ")}
              </p>
            </div>
            <p className="font-bold">HP: {pokemon.stats?.[0]?.base_stat}</p>
          </div>
          <img
            src={pokemon.sprites?.other.dream_world.front_default}
            alt={pokemon.name}
            className="w-100"
          />
          <p className="font-bold text-center mt-2 mb-1">
            Attack: {pokemon.stats?.[1]?.base_stat} | Defense:{" "}
            {pokemon.stats?.[2]?.base_stat}
          </p>
          <p className="font-bold text-center">
            Height: {pokemon.height / 10}m | Weight: {pokemon.weight / 10}kg
          </p>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailsPage;
