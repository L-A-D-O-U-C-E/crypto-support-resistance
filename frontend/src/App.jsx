import { useState } from "react";

export default function App() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [interval, setInterval] = useState("1h");
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPrice = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPriceData(null);
    try {
      const res = await fetch(`https://crypto-support-resistance.onrender.com/api/price?symbol=${symbol}&interval=${interval}`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setPriceData(data);
    } catch (err) {
      setError("ไม่สามารถดึงข้อมูลราคาได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crypto Support/Resistance Helper</h1>
      <form onSubmit={fetchPrice} className="flex flex-col gap-2 mb-4">
        <label>
          Symbol:
          <input
            className="ml-2 border px-2 py-1 rounded"
            value={symbol}
            onChange={e => setSymbol(e.target.value.toUpperCase())}
            placeholder="BTCUSDT"
            required
          />
        </label>
        <label>
          Timeframe:
          <select
            className="ml-2 border px-2 py-1 rounded"
            value={interval}
            onChange={e => setInterval(e.target.value)}
          >
            <option value="1m">1m</option>
            <option value="5m">5m</option>
            <option value="15m">15m</option>
            <option value="1h">1h</option>
            <option value="4h">4h</option>
            <option value="1d">1d</option>
          </select>
        </label>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-2">ดึงราคาจาก Backend</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {priceData && Array.isArray(priceData) && (
        <div className="bg-gray-100 p-4 rounded">
          <div className="font-semibold mb-2">ราคาล่าสุด ({symbol}, {interval}):</div>
          <div>Close: {priceData[priceData.length-1][4]}</div>
          <div className="text-xs text-gray-500 mt-2">(ข้อมูลจาก Binance API ผ่าน backend)</div>
        </div>
      )}
    </div>
  );
}
