import axios from "axios";
import { useEffect, useState, useSearch } from "react";
import { Link } from "react-router-dom";
// import { useSearch } from "../context/SearchContext";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      const fetchedPokemons = [];
      for (let i = 1; i <= 150; i++) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${i}`
          );
          fetchedPokemons.push(response.data);
        } catch (error) {
          console.error(`Error ID ${i}:`, error);
        }
      }
      setPokemons(fetchedPokemons);
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favorites.map((fav) => fav.id));
  }, []);

  const handleAddToFavorites = (pokemon) => {
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
      setFavorites([...favorites, pokemon.id]);
      alert(`${pokemon.name} added to favorites`);
    } else {
      alert(`${pokemon.name} is already in your favorites`);
    }
  };

  const handleRemoveFromFavorites = (pokemon) => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = currentFavorites.filter(
      (fav) => fav.id !== pokemon.id
    );

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(favorites.filter((id) => id !== pokemon.id));
    alert(`${pokemon.name} removed from favorites`);
  };

  const isFavorite = (pokemon) => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    return currentFavorites.some((fav) => fav.id === pokemon.id);
  };

  const filteredPokemons = searchTerm
    ? pokemons.filter(
        (el) =>
          el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          el.id.toString() === searchTerm
      )
    : pokemons;

  return (
    <div className="bg-[#f5f6f8] min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-emerald-900">
          Choose Your Pokémon!
        </h1>
        <div
          id="pokemon-container"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredPokemons.length === 0 && (
            <p className="text-center col-span-full text-emerald-900 font-bold text-lg">
              No Pokémon Found For "{searchTerm}"!
            </p>
          )}
          {filteredPokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="bg-white text-emerald-900 rounded-xl shadow p-4 hover:shadow-lg transition-all duration-300 h-100"
            >
              <div className="flex justify-between items-baseline">
                <h2 className="text-3xl font-bold capitalize mb-2">
                  {pokemon.name}
                </h2>
                {/* <p className="text-sm">HP: {pokemon.stats[0].base_stat}</p> */}
                {/* <p className="text-sm uppercase">
                  TYPE:{" "}
                  {pokemon.types
                    .map((typeInfo) => typeInfo.type.name)
                    .join(", ")}
                </p> */}
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
              <Link to={`/pokemon/${pokemon.id}`}>
                <img
                  src={pokemon.sprites?.other.dream_world.front_default}
                  alt={pokemon.name}
                  className="h-80"
                />
              </Link>
              {/* <p className="text-sm text-center">
                ATTACK: {pokemon.stats[1].base_stat} | DEFENSE:{" "}
                {pokemon.stats[2].base_stat}
              </p>
              <p className="text-sm text-center">
                HEIGHT: {pokemon.height / 10}m | WEIGHT: {pokemon.weight / 10}kg
              </p>
              <br></br>
              <p className="text-sm uppercase text-center">
                ABILITIES:<br></br>
                {pokemon.abilities
                  .map((abilityInfo) => abilityInfo.ability.name)
                  .join(", ")}
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
