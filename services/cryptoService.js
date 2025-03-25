// "use client"
import axios from "axios";

export const fetchCryptoData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 80,
          page: 1,
          sparkline: false,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchCryptoById = async (name) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets&ids=${name}`,
      {
        params: {
          vs_currency: "usd",
        //   order: "market_cap_desc",
        //   ids={name},
          per_page: 80,
          page: 1,
          sparkline: false,
        },
        headers:{
            x_cg_demo_api_key :"CG-NkGL1XsXeFwTYgiWnBot5Jua"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const fetchChartById = async (name) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30`,
      {
        // params: {
        //   vs_currency: "usd",
        // //   order: "market_cap_desc",
        // //   ids={name},
        //   per_page: 80,
        //   page: 1,
        //   sparkline: false,
        // },
        headers:{
            x_cg_demo_api_key :"CG-NkGL1XsXeFwTYgiWnBot5Jua"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&x_cg_demo_api_key=CG-NkGL1XsXeFwTYgiWnBot5Jua

// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30
