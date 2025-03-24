// services/cryptoService.js
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
