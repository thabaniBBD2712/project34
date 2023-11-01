import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import FullPageLoader from "./fullpageloader/fullpageloader";

ChartJS.register(ArcElement, Tooltip, Legend);

const BestSellingBurger: React.FC = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState([]);
  const [url, setUrl] = useState(
    "https://project34api.azurewebsites.net/api/weekly-burger-popularity"
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
      setUrl("https://project34api.azurewebsites.net/api/weekly-burger-popularity");
    }

    if (timeFrame?.includes("month")) {
      setUrl("https://project34api.azurewebsites.net/api/monthly-burger-popularity");
    }

    if (timeFrame?.includes("year")) {
      setUrl("https://project34api.azurewebsites.net/api/yearly-burger-popularity");
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: " Burger Popularity",
      },
    },
  };

  const labels: any = selectedTimeFrame.map((item: any) => item.BurgerName);
  const dataSet: any = selectedTimeFrame.map((item: any) => item.Percentage);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "selling %",
        data: dataSet,
        backgroundColor: ["red", "blue", "yellow"],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <select
        id="timeframe"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleTimeFrameChange}
      >
        <option value="week">Week</option>
        {/* <option value="month">Month</option> */}
        <option value="year">Year</option>
      </select>
      <div className="pl-[20rem] h-[25rem]">
      {loading || selectedTimeFrame.length===0 ?  (
         <FullPageLoader/>
        ) : (
          <Pie data={data} options={options} />
        )}
      </div>
    </>
  );
};

export default BestSellingBurger;
