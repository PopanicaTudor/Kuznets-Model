import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';
import createModel from './CreateModel';
import { color } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const Grafic = ({ gdpVector, envVector, indicator }) => {
  const indicatorUnits = {
    "EN.GHG.CO2.PC.CE.AR5": "CO2 (metric tons per capita)",
    "EN.ATM.PM25.MC.M3": "Air Pollution (micrograms per cubic meter)",
    "EN.GHG.ALL.PC.CE.AR5": "Gas Emissions (metric tons per capita)",
    "ER.H2O.FWTL.K3": "Biodiversity Loss (km³ of freshwater per year)",
  };

  // Funcție pentru obținerea unității de măsură
  const getYAxisLabel = (indicator) => {
    return indicatorUnits[indicator] ? `${indicatorUnits[indicator]}` : "Environmental Indicator";
  };

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
        label: 'Environmental Indicator',
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
          size: 20,
        },
        color: 'rgb(31, 139, 27)',
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
        title: {
          display: true,
          text: 'GDP (USD per capita)', // PIB-ul are unitatea fixă
          font: {
            size: 18,
          },
          color: 'rgb(31, 139, 27)',
        },
        ticks: {
          font: {
            size: 18,
          },
          color: 'rgb(31, 139, 27)',
        },
        grid: {
          color: 'rgb(31, 139, 27)',
          lineWidth: 1,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: `${getYAxisLabel(indicator)}`, // Setează unitatea în funcție de indicator
          font: {
            size: 18,
          },
          color: 'rgb(31, 139, 27)',
        },
        ticks: {
          font: {
            size: 18,
          },
          color: 'rgb(31, 139, 27)',
        },
        grid: {
          color: 'rgb(31, 139, 27)',
          lineWidth: 1,
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
