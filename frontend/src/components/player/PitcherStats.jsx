export default function PitcherStats({ data }) {
    return (
        <div className="rounded-lg p-6 bg-white shadow">
            <div className="flex items-baseline gap-2 mb-4">
                <h1 className="text-2xl font-bold text-blue-700">{data?.name}</h1>
                <span className="text-base text-gray-500 font-medium">
                    {data.type[0].toUpperCase() + data.type?.slice(1).toLowerCase()}
                </span>
            </div>
            <dl className="space-y-4">
                <div>
                    <dt className="text-base font-medium text-gray-500">Average Exit Speed Allowed</dt>
                    <dd className="text-2xl font-bold text-gray-900">
                        {data.average_exit_speed?.toFixed(2) + ' mph'}
                    </dd>
                </div>
                <div>
                    <dt className="text-base font-medium text-gray-500">Hard Hit Rate Allowed</dt>
                    <dd className="text-2xl font-bold text-gray-900">
                        {(data.hard_hit_rate * 100).toFixed(2) + '%'}
                    </dd>
                </div>
                <div>
                    <dt className="text-base font-medium text-gray-500">Total Games</dt>
                    <dd className="text-2xl font-bold text-gray-900">
                        {data.game_history?.length}
                    </dd>
                </div>
            </dl>
        </div>
    );
}