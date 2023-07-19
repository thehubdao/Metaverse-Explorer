"use client"; // This is a client component 👈🏽

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const USER_DATA = [];


for (let i = 0; i < 120; i++) {
  const year = 1900 + i; // Calcula el año sumando el índice al año inicial (1900)
  const data = {
    id: i + 1,
    year: year,
    userGain: getPriceETH(year), // Obtener el precio de ETH en dólares para el año
    userLost: getPriceUSDT(year), // Obtener el precio de USDT en dólares para el año
  };
  USER_DATA.push(data); // Agrega el objeto al arreglo userData
}

// Función para obtener el precio de ETH en dólares para un año específico
function getPriceETH(year: number) {
  return Math.random() * 1000; // Valor aleatorio entre 0 y 1000
}

// Función para obtener el precio de USDT en dólares para un año específico
function getPriceUSDT(year: number) {
  return Math.random() * 10; // Valor aleatorio entre 0 y 10
}


const data = {
  labels: USER_DATA.map(data => data.year),
  datasets: [{
    label: "Users Gained",
    data: USER_DATA.map(data => data.userGain),
    backgroundColor: '#000',
    borderColor: '#000'
  }, {
    label: "User Lost",
    data: USER_DATA.map(data => data.userLost)
  }]
}

export default function LinearChartUI() {
  return (
    <div className='w-full shadow-relief-12 rounded-md p-7 bg-nm-fill'>
      <Line options={{
        scales: {
          x: {
            position: 'top',
            grid: {
              display: false,
            }
          },
          y: {
            grid: {
              display: true,
            },
            border: {
              color: 'transparent'
            }
          },
        },
        plugins: {
          legend: {
            display: false
          },
        },
        maintainAspectRatio: false,
      }} data={data} />
    </div>
  )
}
