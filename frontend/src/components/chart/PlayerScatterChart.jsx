import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ScatterController,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
import trendlinePlugin from "chartjs-plugin-trendline";

ChartJS.register(
  ScatterController,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  trendlinePlugin
);

export default function PlayerScatterChart({ type, gameHistory }) {
  if (!gameHistory) {
    return <p>No data available</p>;
  }

  let chartData;
  let options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "PP",
        },
        title: {
          display: true,
          text: "Game Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  if (type === "pitcher") {
    chartData = {
      datasets: [
        {
          label: "Exit Speed",
          data: gameHistory.map((game) => ({
            x: new Date(game.GAME_DATE),
            y: game.EXIT_SPEED,
          })),
          backgroundColor: "rgba(75, 192, 192, 0.7)",
          pointRadius: 5,
          trendlineLinear: {
            colorMin: "rgba(75, 192, 192, 0.8)",
            colorMax: "rgba(75, 192, 192, 0.8)",
            lineStyle: "solid",
            width: 2,
            extendTrends: true
          }
        },
      ],
    };
  } else if (type === "batter") {
    chartData = {
      datasets: [
      {
        label: "Exit Speed (mph)",
        data: gameHistory.map((game) => ({
          x: new Date(game.GAME_DATE),
          y: game.EXIT_SPEED,
        })),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        pointRadius: 5,
        trendlineLinear: {
          colorMin: "rgba(255, 99, 132, 0.8)",
          colorMax: "rgba(255, 99, 132, 0.8)",
          lineStyle: "solid",
          width: 2,
        extendTrends: true
        }
      },
      {
        label: "Launch Angle (°)",
        data: gameHistory.map((game) => ({
          x: new Date(game.GAME_DATE),
          y: game.LAUNCH_ANGLE,
        })),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        pointRadius: 5,
        trendlineLinear: {
          colorMin: "rgba(54, 162, 235, 0.8)",
          colorMax: "rgba(54, 162, 235, 0.8)",
          lineStyle: "solid",
          width: 2,
          extendTrends: true
        }
      },
      {
        label: "Hit Distance (ft)",
        data: gameHistory.map((game) => ({
          x: new Date(game.GAME_DATE),
          y: game.HIT_DISTANCE,
        })),
        backgroundColor: "rgba(255, 206, 86, 0.7)",
        pointRadius: 5,
        trendlineLinear: {
          colorMin: "rgba(255, 206, 86, 0.8)",
          colorMax: "rgba(255, 206, 86, 0.8)",
          lineStyle: "solid",
          width: 2,
          extendTrends: true
        }
      },
      ],
    };
  }

  return (
    <Scatter data={chartData} options={options} />
  )
}
