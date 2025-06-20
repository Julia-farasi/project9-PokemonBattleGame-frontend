import React, { useState, useEffect } from "react";

export default function BattlePage() {
  const [favorites, setFavorites] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [wildPokemon, setWildPokemon] = useState(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(Array.isArray(favs) ? favs : []);
    } catch {
      setFavorites([]);
    }
  }, []);

  function startBattle() {
    if (!selectedPokemon) {
      setResult("Select a Pokémon from your Roster!");
      return;
    }
    if (!wildPokemon) {
      setResult("No Pokémon available!");
      return;
    }

    const userPower =
      (selectedPokemon.attack || 0) +
      (selectedPokemon.defense || 0) +
      (selectedPokemon.hp || 0);
    const wildPower =
      (wildPokemon.attack || 0) +
      (wildPokemon.defense || 0) +
      (wildPokemon.hp || 0);

    if (userPower > wildPower) {
      setResult("🏆 You won the Battle!");
    } else if (userPower < wildPower) {
      setResult("😢 You lost the Battle!");
    } else {
      setResult("It's a draw!");
    }
  }

  function PokemonCard({ pokemon, onClick, selected }) {
    return (
      <div
        className={`cursor-pointer rounded-lg shadow p-2 flex flex-col items-center border
          ${
            selected
              ? "border-lime-500 bg-lime-100"
              : "border-gray-200 bg-white"
          }
        `}
        onClick={onClick}
        style={{ minWidth: 120, maxWidth: 150 }}
        title={pokemon.name}
      >
        <div className="font-bold capitalize">{pokemon.name}</div>
        <img
          src={pokemon.image || pokemon.sprites?.front_default}
          alt={pokemon.name}
          className="w-20 h-30 object-contain mb-2"
        />
      </div>
    );
  }

  return (
    <div className="bg-[#f5f6f8] min-h-screen py-10">
      <h2 className="text-4xl font-bold mb-8 text-center text-emerald-900">
        Pokémon Battle!
      </h2>
      <div className="ml-20 mr-20 p-10 mx-auto bg-white rounded shadow mb-8">
        <div className="flex flex-col md:flex-row gap-10 justify-evenly items-center">
          <div className="flex-1">
            <h3 className="font-bold mb-4 text-center text-emerald-900">
              My Roster
            </h3>
            {favorites.length === 0 && (
              <p className="text-center text-emerald-900">No Favorites yet!</p>
            )}
            <div className="flex flex-wrap gap-4 justify-center text-emerald-900">
              {favorites.map((p) => (
                <PokemonCard
                  key={p.name}
                  pokemon={p}
                  onClick={() => setSelectedPokemon(p)}
                  selected={selectedPokemon && selectedPokemon.name === p.name}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center min-w-[220px] mx-4">
            <div className="flex items-center justify-center my-4">
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  {selectedPokemon ? (
                    <PokemonCard pokemon={selectedPokemon} selected />
                  ) : (
                    <div className="rounded-full bg-gray-200 w-20 h-20 flex items-center justify-center mb-2 text-2xl text-emerald-900">
                      ?
                    </div>
                  )}
                </div>
                <div className="mx-4 font-bold text-2xl text-emerald-900">
                  VS
                </div>
                <div className="flex flex-col items-center">
                  {wildPokemon ? (
                    <PokemonCard pokemon={wildPokemon} />
                  ) : (
                    <div className="rounded-full bg-gray-200 w-20 h-20 flex items-center justify-center mb-2 text-2xl text-emerald-900">
                      ?
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded mt-2"
              onClick={startBattle}
              disabled={favorites.length === 0}
            >
              Fight!
            </button>
            {result && (
              <div className="mt-4 text-center">
                <p className="font-semibold text-lg">{result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
