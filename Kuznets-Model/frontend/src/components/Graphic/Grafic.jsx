import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';
import createModel from './CreateModel';
import { color } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const Grafic = ({ gdpVector, envVector }) => {
  const [regressionData, setRegressionData] = useState([]);
  const [truncatedGDP, setTruncatedGDP] = useState([]);
  const [truncatedEnv, setTruncatedEnv] = useState([]);

  useEffect(() => {
    if (gdpVector.length === 0 || envVector.length === 0) {
      console.warn("Data vectors are empty. Graph will not be displayed.");
      return;
    }

    // Truncăm vectorii pentru a avea aceeași dimensiune
    const minLength = Math.min(gdpVector.length, envVector.length);
    const truncatedGDP = gdpVector.slice(0, minLength);
    const truncatedEnv = envVector.slice(0, minLength);

    setTruncatedGDP(truncatedGDP);
    setTruncatedEnv(truncatedEnv);

    const model = createModel();

    const dataPoints = truncatedGDP.map((x, index) => ({ x, y: truncatedEnv[index] }));
    model.fit(dataPoints, [2]);

    const regressionPoints = truncatedGDP.map(x => ({
      x,
      y: model.estimate(2, x),
    }));

    setRegressionData(regressionPoints);
  }, [gdpVector, envVector]);

  if (gdpVector.length === 0 || envVector.length === 0) {
    return null;
  }

  const chartData = {
    labels: truncatedGDP, // Folosim vectorii trunchiați
    datasets: [
      {
        label: 'Polynomial Regression',
        data: regressionData,
        borderColor: 'rgb(31, 139, 27)',
        backgroundColor: 'rgb(31, 139, 27)',
        fill: false,
        borderWidth: 2,
        lineTension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Kuznets Curve',
        font: {
          size: 20, // Setează dimensiunea fontului
        },
        color: 'rgb(31, 139, 27)', // Setează culoarea textului
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        type: 'linear',
        ticks: {
          font: {
            size: 18, // Setează dimensiunea fontului
          },
          color: 'rgb(31, 139, 27)', // Setează culoarea tick-urilor
        },
        grid: {
          color: 'rgb(31, 139, 27)', // Setează culoarea liniilor de grid pentru axa X
          lineWidth: 1, // Grosimea liniilor
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 18, // Setează dimensiunea fontului
          },
          color: 'rgb(31, 139, 27)', // Setează culoarea tick-urilor
        },
        grid: {
          color: 'rgb(31, 139, 27)', // Setează culoarea liniilor de grid pentru axa Y
          lineWidth: 1, // Grosimea liniilor
        },
      },
    },
  };
  

  return (
    <div style={{ width: '80%', height: '40%', margin: '0 auto', border: '1px solid #ddd', backgroundColor: 'currentcolor', borderRadius: '15px' }}> 
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Grafic;
