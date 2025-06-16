import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OutcomeChart({ data }) {
    const processed_data = {
        labels: ['Singles', 'Doubles', 'Triples', 'Home Runs', 'Outs', 'Other'],
        datasets: [
            {
                label: '#  of times',
                data: [data.Single, data.Double, data.Triple, data.HomeRun, data.Out, data.Other],
                backgroundColor: [
                    '#4CAF50', // Green for Singles
                    '#2196F3', // Blue for Doubles
                    '#FF9800', // Orange for Triples
                    '#F44336', // Red for Home Runs
                    '#9E9E9E', // Grey for Outs
                    '#BA68C8' // Purple for Other
                ],
                borderWidth: 1
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
            onClick: null,  // disable removing outcomes from chart
            }
        }
    }


     return(
        <Pie data={processed_data} options={options} />
     )
}