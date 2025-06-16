export default function GameHistory({ history, type }) {
    function processDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString();
    }

    return (
        <div className="mt-6 w-full">
            <h2 className="text-2xl font-semibold mb-2">Game History</h2>
            <div className="rounded shadow">
                <table className="w-full table-auto bg-white rounded">
                    <thead>
                        <tr className="bg-blue-100">
                            <th className="px-4 py-2">Date</th>
                            {type === "batter" ? (
                                <>
                                    <th className="px-4 py-2">Pitcher</th>
                                    <th className="px-4 py-2">Launch Angle (°)</th>
                                    <th className="px-4 py-2">Exit Speed (mph)</th>
                                    <th className="px-4 py-2">Hit Distance (ft)</th>
                                    <th className="px-4 py-2">Outcome</th>
                                    <th className="px-4 py-2">Video</th>
                                </>
                            ) : (
                                <>
                                    <th className="px-4 py-2">Batter</th>
                                    <th className="px-4 py-2">Launch Angle (°)</th>
                                    <th className="px-4 py-2">Exit Speed (mph)</th>
                                    <th className="px-4 py-2">Hit Distance (ft)</th>
                                    <th className="px-4 py-2">Outcome</th>
                                    <th className="px-4 py-2">Video</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((game, idx) => (
                            <tr key={idx} className="cursor-pointer hover:bg-blue-50 transition">
                                <td className="px-4 py-2">{processDate(game.GAME_DATE)}</td>
                                {type === "batter" ? (
                                    <>
                                        <td className="px-4 py-2"><a href={"/pitcher/" + game.PITCHER_ID} className="text-blue-600 underline">{game.PITCHER}</a></td>
                                        <td className="px-4 py-2">{game.LAUNCH_ANGLE?.toFixed(2)}</td>
                                        <td className="px-4 py-2">{game.EXIT_SPEED?.toFixed(2)}</td>
                                        <td className="px-4 py-2">{game.HIT_DISTANCE?.toFixed(2)}</td>
                                        <td className="px-4 py-2">{game.PLAY_OUTCOME}</td>
                                        <td className="px-4 py-2">
                                            {game.VIDEO_LINK ? (
                                                <a href={game.VIDEO_LINK} className="text-blue-600 underline">Watch</a>
                                            ) : (
                                                <span className="text-gray-400">N/A</span>
                                            )}
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="px-4 py-2"><a href={"/batter/" + game.BATTER_ID} className="text-blue-600 underline">{game.BATTER}</a></td>
                                        <td className="px-4 py-2">{game.LAUNCH_ANGLE?.toFixed(2)}</td>
                                        <td className="px-4 py-2">{game.EXIT_SPEED?.toFixed(2)}</td>
                                        <td className="px-4 py-2">{game.HIT_DISTANCE?.toFixed(2)}</td>
                                        <td className="px-4 py-2">{game.PLAY_OUTCOME}</td>
                                        <td className="px-4 py-2">
                                            {game.VIDEO_LINK ? (
                                                <a href={game.VIDEO_LINK} className="text-blue-600 underline">Watch</a>
                                            ) : (
                                                <span className="text-gray-400">N/A</span>
                                            )}
                                        </td>
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