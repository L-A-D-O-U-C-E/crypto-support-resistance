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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));