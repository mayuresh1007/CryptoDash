import { fetchCryptoData } from "../../services/cryptoService";
import CryptoTable from "../../components/CryptoTable";

export default async function Dashboard() {
  let cryptoData = await fetchCryptoData();

  return (
    <div className="container mx-auto p-6">
      {/* <h1 className="text-3xl font-bold mb-4 text-center">Crypto Dashboard</h1> */}
      {cryptoData.length > 0 ? (
        <CryptoTable data={cryptoData} />
      ) : (
        <p className="text-center text-red-500">Failed to load data. Try again later.</p>
      )}
    </div>
  );
}
