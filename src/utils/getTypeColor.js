// utils/getTypeColor.js (neu erstellen)
const typeColors = {
  fire: "from-orange-500 to-red-500",
  water: "from-blue-500 to-cyan-500",
  grass: "from-green-500 to-lime-500",
  electric: "from-yellow-400 to-yellow-600",
  psychic: "from-pink-500 to-fuchsia-600",
  ice: "from-cyan-300 to-blue-300",
  dragon: "from-purple-500 to-indigo-700",
  dark: "from-gray-700 to-gray-900",
  fairy: "from-pink-300 to-pink-500",
  normal: "from-gray-300 to-gray-400",
  fighting: "from-red-700 to-orange-700",
  flying: "from-sky-300 to-blue-400",
  poison: "from-purple-400 to-fuchsia-600",
  ground: "from-yellow-600 to-amber-700",
  rock: "from-amber-700 to-yellow-900",
  bug: "from-lime-400 to-green-500",
  ghost: "from-indigo-700 to-purple-800",
  steel: "from-slate-400 to-gray-500",
};

export default function getTypeGradient(type) {
  return typeColors[type] || "from-gray-200 to-gray-300";
}
