import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

export default function BattlePage() {
  const [favorites, setFavorites] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [wildPokemon, setWildPokemon] = useState(null);
  const [result, setResult] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [username, setUsername] = useState("");
  const [width, height] = useWindowSize();

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(Array.isArray(favs) ? favs : []);
  }, []);

  useEffect(() => {
    generateWildPokemon();
  }, []);

  const generateWildPokemon = async () => {
    const randomId = Math.floor(Math.random() * 150) + 1;
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const wild = res.data;
      const formatted = {
        name: wild.name,
        image:
          wild.sprites?.other?.dream_world?.front_default ||
          wild.sprites?.front_default,
        attack: wild.stats[1].base_stat,
        defense: wild.stats[2].base_stat,
        hp: wild.stats[0].base_stat,
      };
      setWildPokemon(formatted);
    } catch (err) {
      console.error("Fehler beim Laden des wilden Pokémon:", err);
    }
  };

  function startBattle() {
    if (!selectedPokemon || !wildPokemon) {
      setResult("❗ Wähle ein Pokémon & Gegner!");
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
      setResult("🏆 Du hast gewonnen!");
      setScore(userPower);
      setShowConfetti(true);
    } else if (userPower < wildPower) {
      setResult("😢 Du hast verloren.");
      setScore(userPower);
    } else {
      setResult("⚔️ Unentschieden.");
      setScore(userPower);
    }
  }

  function resetGame() {
    setSelectedPokemon(null);
    setWildPokemon(null);
    setResult("");
    setShowConfetti(false);
    setScore(0);
    setUsername("");
    setNameSubmitted(false);
    generateWildPokemon();
  }

  async function submitScore() {
    if (!username) return;

    try {
      await axios.post("http://localhost:8000/leaderboard", {
        username,
        score,
      });
      setNameSubmitted(true);
    } catch (err) {
      console.error("Fehler beim Speichern:", err);
    }
  }

  function PokemonCard({ pokemon, onClick, selected, label }) {
    return (
      <div
        className={`cursor-pointer rounded-xl shadow p-3 flex flex-col items-center border transition-all duration-200 ${
          selected
            ? "border-lime-500 bg-lime-100"
            : "border-gray-200 bg-white hover:shadow-md"
        }`}
        onClick={onClick}
        style={{ minWidth: 140, maxWidth: 180 }}
        title={pokemon.name}
      >
        <div className="text-sm text-gray-500 mb-1">{label}</div>
        <div className="font-bold capitalize mb-1">{pokemon.name}</div>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-20 h-20 object-contain mb-2"
        />
        <p className="text-xs text-center text-gray-700">
          HP: {pokemon.hp} | ATK: {pokemon.attack} | DEF: {pokemon.defense}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f6f8] min-h-screen py-10 relative">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={300}
        />
      )}

      <h2 className="text-4xl font-bold mb-8 text-center text-emerald-900">
        Pokémon Battle!
      </h2>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Spieler */}
          <div className="flex flex-col items-center flex-1">
            <h3 className="font-bold mb-4 text-emerald-900">Meine Favoriten</h3>
            {favorites.length === 0 && (
              <p className="text-emerald-900">Keine Favoriten vorhanden!</p>
            )}
            <div className="flex flex-wrap gap-4 justify-center">
              {favorites.map((p) => (
                <PokemonCard
                  key={p.name}
                  pokemon={{
                    ...p,
                    attack: p.stats[1]?.base_stat,
                    defense: p.stats[2]?.base_stat,
                    hp: p.stats[0]?.base_stat,
                  }}
                  onClick={() =>
                    setSelectedPokemon({
                      ...p,
                      attack: p.stats[1]?.base_stat,
                      defense: p.stats[2]?.base_stat,
                      hp: p.stats[0]?.base_stat,
                    })
                  }
                  selected={selectedPokemon && selectedPokemon.name === p.name}
                  label="Du"
                />
              ))}
            </div>
          </div>

          {/* Kampfzone */}
          <div className="flex flex-col items-center justify-center min-w-[220px] mx-4">
            <div className="flex items-center justify-center my-4">
              {selectedPokemon ? (
                <PokemonCard pokemon={selectedPokemon} selected label="Du" />
              ) : (
                <div className="rounded-full bg-gray-200 w-24 h-24 flex items-center justify-center mb-2 text-2xl text-emerald-900">
                  ?
                </div>
              )}
              <div className="mx-4 font-bold text-2xl text-emerald-900">VS</div>
              {wildPokemon ? (
                <PokemonCard pokemon={wildPokemon} label="Computer" />
              ) : (
                <div className="rounded-full bg-gray-200 w-24 h-24 flex items-center justify-center mb-2 text-2xl text-emerald-900">
                  ?
                </div>
              )}
            </div>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded mt-2"
              onClick={startBattle}
              disabled={!selectedPokemon || !wildPokemon}
            >
              Fight!
            </button>
            {result && (
              <div className="mt-4 text-center text-lg font-semibold text-emerald-900">
                {result}
              </div>
            )}
            {result && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-700 mb-2">Score: {score}</p>
                {!nameSubmitted ? (
                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Dein Name"
                      className="border px-4 py-2 rounded text-sm mb-2"
                    />
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
                      onClick={submitScore}
                      disabled={!username.trim()}
                    >
                      Score speichern
                    </button>
                  </div>
                ) : (
                  <p className="text-green-600 font-semibold">
                    Score gespeichert ✔️
                  </p>
                )}
              </div>
            )}
            {result && (
              <button
                className="mt-4 text-sm text-red-500 underline"
                onClick={resetGame}
              >
                🔁 Neues Spiel starten
              </button>
            )}
          </div>

          {/* Gegner */}
          <div className="flex flex-col items-center flex-1">
            <h3 className="font-bold mb-4 text-emerald-900">Computer</h3>
            {wildPokemon ? (
              <PokemonCard pokemon={wildPokemon} label="Gegner" />
            ) : (
              <p className="text-gray-500">Lade Gegner...</p>
            )}
            <button
              onClick={generateWildPokemon}
              className="mt-2 text-sm text-blue-500 underline hover:text-blue-700"
            >
              Gegner neu laden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
