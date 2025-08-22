const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
//ในไฟล์ `server.js` เป็นการบอกให้ Backend อนุญาตให้คำขอจาก Origin อื่นๆ (เช่น Frontend ของคุณที่รันอยู่บนพอร์ต `5173`) สามารถเข้ามาดึงข้อมูลได้ ซึ่งทำให้การเชื่อมต่อระหว่าง Frontend และ Backend ทำงานได้อย่างราบรื่นครับ

// ดังนั้น การที่ Frontend รันบนพอร์ต `5173` และ Backend รันบนพอร์ต `5000` จึงเป็นเรื่องปกติและเป็นวิธีการทำงานที่ถูกต้องของแอปพลิเคชันแบบ Full-Stack ครับ!
app.use(cors());

app.get('/',(req, res) => {
    res.send('Backend is running 🚀');
});

// New endpoint for fetching price data from Binance API
const axios = require('axios');
app.get('/api/price', async (req, res) => {
  const { symbol, interval } = req.query;
  if (!symbol || !interval) {
    return res.status(400).send('Missing symbol or interval query parameters.');
  }
  try {
    // Binance API endpoint for klines (candlestick data)
    const url = 'https://api.binance.com/api/v3/klines';
    const response = await axios.get(url, {
      params: {
        symbol: symbol.toUpperCase(),
        interval,
        limit: 100
      }
    });
    // response.data is an array of arrays: [openTime, open, high, low, close, volume, ...]
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch price data from Binance', details: err.message });
  }
});

    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    