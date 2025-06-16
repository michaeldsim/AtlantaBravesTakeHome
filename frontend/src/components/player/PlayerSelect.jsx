import Select from 'react-select';

export default function PlayerSelect({ players, onSelect }) {
    return(
        <div>
            <Select
                getOptionLabel={(player) => player.name}
                getOptionValue={(player) => player.id}
                options={players}
                onChange={onSelect}
            />
        </div>
    )
}

