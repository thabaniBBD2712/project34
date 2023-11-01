import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import FullPageLoader from "./fullpageloader/fullpageloader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://project34api.azurewebsites.net/api/burgers");
        const jsonData = await response.json();
        setSelectedTimeFrame(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const labels: any = selectedTimeFrame.map((item: any) => item.ItemName);
  const dataSet: any = selectedTimeFrame.map(
    (item: any) => item.StockQuantity
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Remaining Stock in Percentage",
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: dataSet,
        backgroundColor: "#0D6EFD",
      },
    ],
  };
  return (
    <>
      {selectedTimeFrame.length > 0 ? (
        <div className=" h-[25rem]">
          <Bar data={data} options={options} />
        </div>
      ) : (
        <FullPageLoader />
      )}
    </>
  );
}
