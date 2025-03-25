"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes"; // Theme support
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "@/components/ui/button"; // ShadCN button

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const TIME_RANGES = {
  "1D": 1,
  "7D": 7,
  "1M": 30,
  "3M": 90,
  "6M": 180,
  "1Y": 365,
  "MAX": "max",
};

const CryptoChart = ({ coinId = "bitcoin" }) => {
  const { theme } = useTheme(); // Get current theme
  const [chartData, setChartData] = useState(null);
  const [selectedRange, setSelectedRange] = useState("30"); // Default to 30 days

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectedRange}`
        );
        const data = await response.json();

        const labels = data.prices.map((item) =>
          new Date(item[0]).toLocaleDateString()
        );
        const prices = data.prices.map((item) => item[1]);

        setChartData({
          labels,
          datasets: [
            {
              label: `${coinId.toUpperCase()} Price (USD)`,
              data: prices,
              borderColor: theme === "dark" ? "white" : "orange",
              backgroundColor: theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(255,165,0,0.2)",
              tension: 0.3,
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchCoinData();
  }, [coinId, selectedRange, theme]);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div className="p-4 border rounded shadow-md bg-white dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-xl font-bold text-center mb-4">
        <span className="text-orange-400">{coinId.toUpperCase()}</span> Price Chart
      </h2>

      {/* Time Range Selector with ShadCN Buttons */}
      <div className="flex justify-center gap-2 mb-4">
        {Object.entries(TIME_RANGES).map(([label, value]) => (
          <Button
            key={label}
            onClick={() => setSelectedRange(value)}
            variant={selectedRange == value ? "default" : "outline"}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Chart */}
      <div className="container">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default CryptoChart;
