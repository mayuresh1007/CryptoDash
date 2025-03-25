
import { fetchCryptoData } from "../../services/cryptoService";
import CryptoTable from "../../components/CryptoTable";

export default async function Dashboard() {
  let cryptoData = await fetchCryptoData();
  console.log(process.env.NEXT_PUBLIC_API_URL)
  return (
    <div className="container mx-auto p-6">
      {cryptoData.length > 0 ? (
        <CryptoTable data={cryptoData} />
      ) : (
        <p className="text-center text-red-500">Failed to load data. Try again later.</p>
      )}
    </div>
  );
}
