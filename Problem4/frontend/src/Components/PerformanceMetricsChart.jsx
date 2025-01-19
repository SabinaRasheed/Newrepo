import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const PerformanceMetricsChart = () => {
  const [metrics, setMetrics] = useState({
    days: [],
    totalCalls: [],
    totalCallDuration: [],
    avgCallDuration: [],
    connectedCalls: [],
    notConnectedCalls: [],
  });

  useEffect(() => {
    // Function to fetch performance data
    const fetchMetrics = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/performance-metrics?userId=${
            JSON.parse(sessionStorage.getItem("userData")).id
          }`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching performance metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  const chartData = {
    labels: metrics.days,
    datasets: [
      {
        label: "Total Calls",
        data: metrics.totalCalls,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Total Call Duration (min)",
        data: metrics.totalCallDuration,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
      },
      {
        label: "Average Call Duration (min)",
        data: metrics.avgCallDuration,
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        tension: 0.4,
      },
      {
        label: "Connected Calls",
        data: metrics.connectedCalls,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
      {
        label: "Not Connected Calls",
        data: metrics.notConnectedCalls,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Performance Metrics Over the Week",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Values",
        },
      },
      x: {
        title: {
          display: true,
          text: "Days of the Week",
        },
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", padding: "20px" }}>
      <h2>Performance Metrics Chart</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default PerformanceMetricsChart;
