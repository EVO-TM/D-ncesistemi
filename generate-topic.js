

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// Güvenlik için "*" yerine kendi GitHub Pages adresini yazman önerilir,
// ör: "https://evo-tm.github.io". Şimdilik her yerden erişime izin veriyor.
const ALLOWED_ORIGIN = "*";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Tarayıcı, cross-origin JSON POST'tan önce bir "preflight" OPTIONS
  // isteği gönderir; buna boş 204 ile hemen cevap vermemiz gerekiyor.
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Sunucuda GROQ_API_KEY tanımlı değil." });
    return;
  }

  try {
    const groqResponse = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      res.status(groqResponse.status).json(data);
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: "AI sağlayıcısına ulaşılamadı.", detail: String(err) });
  }
};