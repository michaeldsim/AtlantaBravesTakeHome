import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function Leaderboard() {
    const [type, setType] = useState("batter");
    const [players, setPlayers] = useState([]);
    const [sortKey, setSortKey] = useState("average_exit_speed");
    const [sortOrder, setSortOrder] = useState("desc");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/api/${type+"s"}`)
            .then(res => {
                setPlayers(res.data[type + "s"]);
                setLoading(false);
            });
    }, [type]);

    function handleSort(key) {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("desc");
        }
    }

    const sortedPlayers = players.sort((a, b) => {
        return sortOrder === "asc"
            ? a[sortKey] - b[sortKey]
            : b[sortKey] - a[sortKey];
    });

    function handleRowClick(playerId) {
        navigate(`/${type}/${playerId}`);
    }

    if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-gray-500 text-lg">Loading...</span>
      </div>
    );
  }

    return (
        <div className="w-full max-w-4xl mx-auto px-2">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex space-x-2">
                    <button className={`px-5 py-2 rounded font-semibold border-2 ${type === "batter"? "bg-blue-600 text-white border-blue-600 shadow" : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"}`} onClick={() => setType("batter")}>
                        Batters
                    </button>
                    <button className={`px-5 py-2 rounded font-semibold border-2  ${type === "pitcher" ? "bg-blue-600 text-white border-blue-600 shadow" : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"}`} onClick={() => setType("pitcher")}>
                        Pitchers
                    </button>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="font-semibold">Sort by:</span>
                    <select value={sortKey} onChange={e => handleSort(e.target.value)} className="border border-gray-300 rounded px-2 py-1">
                        {type === "batter" ? (
                            <>
                                <option value="average_exit_speed">Avg Exit Speed</option>
                                <option value="average_hit_distance">Avg Hit Distance</option>
                                <option value="average_launch_angle">Avg Launch Angle</option>
                                <option value="hard_hit_rate">Hard Hit Rate</option>
                                <option value="total_games">Total Games</option>
                            </>
                        ) : (
                            <>
                                <option value="average_exit_speed">Avg Exit Speed Allowed</option>
                                <option value="hard_hit_rate">Hard Hit Rate Allowed</option>
                                <option value="total_games">Total Games</option>
                            </>
                        )}
                    </select>
                    <button className="ml-1 px-2 py-1 rounded border border-gray-300 bg-white hover:bg-gray-100 transition" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")} aria-label="Toggle sort order">
                        {sortOrder === "asc" ? "↑" : "↓"}
                    </button>
                </div>
            </div>
            <div className="rounded shadow">
                <table className="w-full table-auto bg-white rounded">
                    <thead>
                        <tr className="bg-blue-100">
                            <th className="px-4 py-3 text-left font-semibold">Name</th>
                            {type === "batter" && (
                                <>
                                    <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("average_exit_speed")}>
                                        Avg Exit Speed {sortKey === "average_exit_speed" && (sortOrder === "asc" ? "↑" : "↓")}
                                    </th>
                                    <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("average_hit_distance")}>
                                        Avg Hit Distance {sortKey === "average_hit_distance" && (sortOrder === "asc" ? "↑" : "↓")}
                                    </th>
                                    <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("average_launch_angle")}>
                                        Avg Launch Angle {sortKey === "average_launch_angle" && (sortOrder === "asc" ? "↑" : "↓")}
                                    </th>
                                    <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("hard_hit_rate")}>
                                        Hard Hit Rate {sortKey === "hard_hit_rate" && (sortOrder === "asc" ? "↑" : "↓")}
                                    </th>
                                    <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("total_games")}>
                                        Total Games {sortKey === "total_games" && (sortOrder === "asc" ? "↑" : "↓")}
                                    </th>
                                </>
                            )}
                            {type === "pitcher" && (
                                <>
                                    <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("average_exit_speed")}>
                                        Avg Exit Speed Allowed {sortKey === "average_exit_speed" && (sortOrder === "asc" ? "↑" : "↓")}
                                    </th>
                                    <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("hard_hit_rate")}>
                                        Hard Hit Rate Allowed {sortKey === "hard_hit_rate" && (sortOrder === "asc" ? "↑" : "↓")}
                                    </th>
                                    <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("total_games")}>
                                        Total Games {sortKey === "total_games" && (sortOrder === "asc" ? "↑" : "↓")}
                                    </th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPlayers.map((player) => (
                            <tr key={player.id} onClick={() => handleRowClick(player.id)} className="cursor-pointer hover:bg-blue-50 transition">
                                <td className="px-4 py-3 font-medium">{player?.name ?? "N/A"}</td>
                                {type === "batter" && (
                                    // check if the player data exists before trying to access properties
                                    <>
                                        <td className="px-4 py-3">{player?.average_exit_speed !== undefined ? player.average_exit_speed.toFixed(2) : "N/A"}</td>
                                        <td className="px-4 py-3">{player?.average_hit_distance !== undefined ? player.average_hit_distance.toFixed(2) : "N/A"}</td>
                                        <td className="px-4 py-3">{player?.average_launch_angle !== undefined ? player.average_launch_angle.toFixed(2) : "N/A"}</td>
                                        <td className="px-4 py-3">{player?.hard_hit_rate !== undefined ? (player.hard_hit_rate * 100).toFixed(2) + "%" : "N/A"}</td>
                                        <td className="px-4 py-3">{player?.total_games ?? "N/A"}</td>
                                    </>
                                )}
                                {type === "pitcher" && (
                                    <>
                                        <td className="px-4 py-3">{player?.average_exit_speed !== undefined ? player.average_exit_speed.toFixed(2) : "N/A"}</td>
                                        <td className="px-4 py-3">{player?.hard_hit_rate !== undefined ? (player.hard_hit_rate * 100).toFixed(2) + "%" : "N/A"}</td>
                                        <td className="px-4 py-3">{player?.total_games ?? "N/A"}</td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}