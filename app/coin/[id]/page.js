"use client";
import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "@/components/ui/button";

ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const CryptoChart = ({ coinId = "bitcoin" }) => {
  const [chartData, setChartData] = useState(null);
  const [volumeData, setVolumeData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [days, setDays] = useState(30);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
        );
        const data = await response.json();

        const labels = data.prices.map((item) =>
          new Date(item[0]).toLocaleDateString()
        );
        const prices = data.prices.map((item) => item[1]);
        const volumes = data.total_volumes.map((item) => item[1]);

        setChartData({
          labels,
          datasets: [
            {
              label: `${coinId.toUpperCase()} Price (USD)`,
              data: prices,
              borderColor: "orange",
              backgroundColor: "rgba(255,165,0,0.2)",
              tension: 0.3,
              fill: true,
            },
          ],
        });

        setVolumeData({
          labels,
          datasets: [
            {
              label: "Trading Volume",
              data: volumes,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
          ],
        });

        setPieData({
          labels: ["Buy Orders", "Sell Orders"],
          datasets: [
            {
              data: [Math.random() * 60 + 20, Math.random() * 40 + 10], // Mocked data
              backgroundColor: ["#4CAF50", "#F44336"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchCoinData();
  }, [coinId, days]);

  if (!chartData || !volumeData || !pieData) return <p>Loading chart...</p>;

  return (
    <div className="p-4 border rounded shadow-md space-y-6">
      <h2 className="text-xl font-bold text-center mb-2">
        <span className="text-orange-400">{coinId.toUpperCase()}</span> Price
        Chart
      </h2>

      <div className="flex justify-center gap-4">
        <Button
          variant={days === 7 ? "default" : "outline"}
          onClick={() => setDays(7)}
        >
          7D
        </Button>
        <Button
          variant={days === 30 ? "default" : "outline"}
          onClick={() => setDays(30)}
        >
          1M
        </Button>
        <Button
          variant={days === 365 ? "default" : "outline"}
          onClick={() => setDays(365)}
        >
          1Y
        </Button>
      </div>

      <div className="container mx-auto">
        <Line data={chartData} />
      </div>

      <h3 className="text-lg font-bold text-center mt-6">Trading Volume</h3>
      <div className="container mx-auto">
        <Bar data={volumeData} />
      </div>

      <h3 className="text-lg font-bold text-center mt-6">Buy vs. Sell Ratio</h3>
      <div className="flex justify-center">
        <div className="w-72 h-72">
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default CryptoChart;
