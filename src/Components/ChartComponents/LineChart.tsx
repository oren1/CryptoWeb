import { useQuery } from "@apollo/client";
import { queries } from "../../queries";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      customCanvasBackgroundColor: {
        color: 'green',
      },
      legend: {
        display: false
      },
      title: {
        text: 'Chart.js Line Chart',
      },
      layout: {
        padding: 0,
      },
    },
  };
  
  export function LineChart({fsym}: {fsym?: string | null}) {

    const { loading, error, data } = useQuery(queries.GET_HISTORY, {
      variables: {
        params: {
          limit: (90 * 24) / 10,
          fsym: fsym,
          tsym: "USD",
          aggregate: 10,
        } 
      },
    });
  
    if (loading || !fsym) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
  
    const lineData = {
      labels: data.listHistory.map( ({x}: {x: number}) => {
        const date = new Date(x*1000);
        return date.getDate() + "/" + (date.getMonth()+1) + '/' + date.getFullYear();
      }),
      datasets: [
        {
          label: 'Price',
          data: data.listHistory.map( ({y}: {y: number}) => y) ,
          borderColor: 'orange',
        }, 
      ],
    }
    
    return <Line options={options} data={lineData} />;
  }