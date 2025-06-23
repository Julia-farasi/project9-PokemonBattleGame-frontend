import { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:8000/leaderboard"
          "https://pokemon-battle-backend-z30t.onrender.com/leaderboard"
        ); //

        // Zugriff auf das verschachtelte data.data
        const rawEntries = response.data.data || [];

        const sorted = rawEntries.sort((a, b) => b.score - a.score);
        setEntries(sorted);
      } catch (error) {
        console.error("Fehler beim Laden des Leaderboards:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRowClasses = (index) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg";
      case 1:
        return "bg-gradient-to-r from-green-300 to-green-500";
      case 2:
        return "bg-gradient-to-r from-green-200 to-green-400";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-emerald-900 mb-8">
          🏆 Leaderboard
        </h1>

        {entries.length === 0 ? (
          <p className="text-center text-emerald-800 font-medium">
            Kein Eintrag vorhanden.
          </p>
        ) : (
          <div className="rounded-xl overflow-hidden shadow-md">
            <div className="grid grid-cols-3 bg-emerald-800 text-white font-semibold py-3 px-4 text-lg">
              <div>Platz</div>
              <div>Name</div>
              <div className="text-right">Score</div>
            </div>
            {entries.map((entry, index) => (
              <div
                key={entry._id}
                className={`grid grid-cols-3 items-center py-3 px-4 border-b border-gray-200 ${getRowClasses(
                  index
                )}`}
              >
                <div className="font-bold">#{index + 1}</div>
                <div className="capitalize">{entry.username}</div>
                <div className="text-right font-bold">{entry.score}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
