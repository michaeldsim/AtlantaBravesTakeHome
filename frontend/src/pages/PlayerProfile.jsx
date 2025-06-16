import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BatterStats from '../components/player/BatterStats';
import PitcherStats from '../components/player/PitcherStats';
import GameHistory from '../components/player/GameHistory';
import OutcomeChart from '../components/chart/OutcomeChart';
import axios from "axios";
import { API_URL } from "../config";
import PlayerScatterChart from "../components/chart/PlayerScatterChart";

export default function PlayerProfile({ type }) {
    const { id } = useParams();
    const [playerData, setPlayerData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!type || !id) return;
        axios.get(`${API_URL}/api/${type}/${id}`)
            .then(res => {
                setPlayerData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.error("Error fetching player data:", err);
            });
    }, [type, id]);

    if (loading) {
        return <div className="text-center text-lg py-8">Loading...</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-2">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="flex-1 w-full">
                    {type === "batter" && playerData && <BatterStats data={playerData} />}
                    {type === "pitcher" && playerData && <PitcherStats data={playerData} />}
                </div>
                <div className="flex-1 w-full">
                    {playerData && playerData.outcomes && (
                        <div className="bg-white rounded shadow p-4">
                            <h2 className="text-xl font-semibold mb-2">Outcomes Chart</h2>
                            <OutcomeChart data={playerData.outcomes} />
                        </div>
                    )}
                </div>
            </div>
            {playerData && playerData.game_history && (
                        <div className="bg-white rounded shadow p-4 mt-4">
                            <h2 className="text-xl font-semibold mb-2">Game Scatter Chart</h2>
                            <PlayerScatterChart type={type} gameHistory={playerData.game_history}/>
                        </div>
                    )}
            <GameHistory history={playerData.game_history} type={type} />
        </div>
    );
}