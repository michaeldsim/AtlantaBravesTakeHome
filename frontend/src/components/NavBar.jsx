import { useNavigate } from 'react-router-dom';
import PlayerSelect from './player/PlayerSelect'

export default function NavBar({ players }) {
    const navigate = useNavigate();

    function handleSelect(player) {
        navigate(`/${player.type}/${player.id}`)
    }
 
    return(
        <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <div className="flex space-x-4">
                <button className="px-4 py-2 rounded hover:bg-gray-700 transition" onClick={() => navigate("/")}>Home</button>
                <button className="px-4 py-2 rounded hover:bg-gray-700 transition" onClick={() => navigate("/leaderboard")}>Leaderboard</button>
            </div>
            <div className="text-black">
            <div className="min-w-[250px]">
                <PlayerSelect players={players} onSelect={handleSelect} />
            </div>
            </div>
        </div>
    )
}