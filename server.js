/**
 * server.js
 * ---------------------------------------------------------------
 * SADECE YEREL GELİŞTİRME İÇİN. Bağımlılık gerektirmez (Node 18+).
 *
 * Neden gerekli? script.js, AI isteğini /api/generate-topic adresine
 * gönderiyor. index.html'i çift tıklayıp file:// ile açtığında bu adres
 * hiçbir sunucuya gitmiyor — istek anında başarısız olup uygulama
 * sessizce sabit (fallback) konu havuzuna düşüyor. Bu script hem
 * dosyaları sunar hem de /api/generate-topic isteğini gerçek Groq API'sine
 * yönlendirir; anahtar HİÇBİR ZAMAN tarayıcıya gitmez.
 *
 * KULLANIM:
 *   1) Groq panelinden YENİ bir anahtar oluştur (eski/paylaşılmış
 *      anahtarı kullanma — onu iptal et).
 *   2) Bu klasörde ".env" adında bir dosya oluştur (bu dosyayı asla
 *      git'e ekleme / paylaşma) ve içine tek satır yaz:
 *        GROQ_API_KEY=senin_yeni_anahtarin
 *   3) Terminalde bu klasörde çalıştır:
 *        node --env-file=.env server.js
 *      (Node 20.6'dan eskiyse onun yerine:
 *        GROQ_API_KEY=senin_anahtarin node server.js      [mac/linux]
 *        set GROQ_API_KEY=senin_anahtarin&&node server.js  [windows cmd]
 *      )
 *   4) Tarayıcıda dosyayı çift tıklamak YERİNE şu adresi aç:
 *        http://localhost:3000
 *
 * Vercel'e deploy ederken bu dosyaya gerek yok — orada zaten
 * api/generate-topic.js (aynı proxy mantığı) otomatik çalışıyor.
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const ROOT = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon"
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

async function handleGenerateTopic(req, res) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "GROQ_API_KEY tanımlı değil. .env dosyasını kontrol et." }));
    console.error("[server] GROQ_API_KEY eksik — .env dosyasını oluşturup --env-file ile başlatmayı unuttun mu?");
    return;
  }

  try {
    const rawBody = await readBody(req);
    const groqResponse = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: rawBody
    });
    const data = await groqResponse.json();
    res.writeHead(groqResponse.status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
    if (!groqResponse.ok) {
      console.error("[server] Groq isteği başarısız:", groqResponse.status, data);
    }
  } catch (err) {
    console.error("[server] AI sağlayıcısına ulaşılamadı:", err);
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "AI sağlayıcısına ulaşılamadı.", detail: String(err) }));
  }
}

function serveStatic(req, res) {
  let filePath = req.url === "/" ? "/index.html" : req.url;
  filePath = decodeURIComponent(filePath.split("?")[0]);
  const fullPath = path.join(ROOT, filePath);

  // Klasör dışına çıkışı engelle
  if (!fullPath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(fullPath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 - Dosya bulunamadı: " + filePath);
      return;
    }
    const ext = path.extname(fullPath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/generate-topic") {
    await handleGenerateTopic(req, res);
    return;
  }
  if (req.method === "GET" || req.method === "HEAD") {
    serveStatic(req, res);
    return;
  }
  res.writeHead(405);
  res.end("Method not allowed");
});

server.listen(PORT, () => {
  console.log(`\n  Düşünce Sistemi yerel sunucusu çalışıyor:`);
  console.log(`  → http://localhost:${PORT}\n`);
  if (!process.env.GROQ_API_KEY) {
    console.warn("  ⚠ GROQ_API_KEY tanımlı değil — AI istekleri fallback havuzuna düşecek.");
    console.warn("    .env dosyası oluştur ve 'node --env-file=.env server.js' ile başlat.\n");
  }
});
