import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import FullPageLoader from './fullpageloader/fullpageloader';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);






const BestSellingBurgerItem: React.FC = () => {

  const [selectedTimeFrame, setSelectedTimeFrame] = useState([]);
  const [url, setUrl] = useState(
    "https://project34api.azurewebsites.net/api/weekly-stock-level"
  );
  const [loading, setLoading] = useState(false);
  const handleTimeFrameChange = (e: any) => {
    const selectedValue = e.target.value;
    getSelectedTimeFrame(selectedValue);
    setLoading(true)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setSelectedTimeFrame(jsonData);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false)      }
    };

    fetchData();
  }, [url]);


  const getSelectedTimeFrame = (timeFrame: string) => {
    if (timeFrame?.includes("week")) {
      setUrl("https://project34api.azurewebsites.net/api/weekly-stock-level");
    }

    if (timeFrame?.includes("month")) {
      setUrl("https://project34api.azurewebsites.net/api/monthly-stock-level");
    }

    if (timeFrame?.includes("year")) {
      setUrl("https://project34api.azurewebsites.net/api/yearly-stock-level");
    }
  };


  const labels: any = selectedTimeFrame.map((item: any) => item.ItemName);
  const dataSet: any = selectedTimeFrame.map((item: any) => item.TotalQuantity);

  
 const data = {
  labels,
  datasets: [
    {
      label: 'Burger Items',
      data: dataSet,
      borderColor: '#088F8F',
      backgroundColor: '#088F8F',
    },
  ],
};


 const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Best Selling Burger Item',
    },
  },
};
  return (
    <>
    <select
      id="timeframe"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={handleTimeFrameChange}
    >
      <option value="week">Week</option>
      <option value="month">Month</option>
      <option value="year">Year</option>
    </select>
    <div className=" h-[25rem]">
    {loading || selectedTimeFrame.length===0 ?  (
       <FullPageLoader/>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  </>
  );
      }
export default BestSellingBurgerItem;
