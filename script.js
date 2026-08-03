
(function () {
  "use strict";

  const CATEGORIES = [
    { key: 'rastgele',            tr: 'Sürpriz Beni (Karma)',              en: 'Surprise Me (Mixed)',                 promptTr: null,                             promptEn: null },
    { key: 'felsefe',             tr: 'Felsefe',                            en: 'Philosophy',                          promptTr: 'felsefe',                        promptEn: 'philosophy' },
    { key: 'teknoloji_etik',      tr: 'Teknoloji & Etik',                   en: 'Technology & Ethics',                 promptTr: 'teknoloji etiği',                promptEn: 'technology ethics' },
    { key: 'toplum_sosyoloji',    tr: 'Toplum & Sosyoloji',                 en: 'Society & Sociology',                 promptTr: 'toplum ve sosyoloji',            promptEn: 'society and sociology' },
    { key: 'psikoloji_zihin',     tr: 'Psikoloji & Zihin',                  en: 'Psychology & Mind',                   promptTr: 'psikoloji ve zihin felsefesi',   promptEn: 'psychology and philosophy of mind' },
    { key: 'siyaset_felsefesi',   tr: 'Siyaset Felsefesi',                  en: 'Political Philosophy',                promptTr: 'siyaset felsefesi',              promptEn: 'political philosophy' },
    { key: 'sanat_estetik',       tr: 'Sanat & Estetik',                    en: 'Art & Aesthetics',                    promptTr: 'sanat ve estetik',               promptEn: 'art and aesthetics' },
    { key: 'bilim_epistemoloji',  tr: 'Bilim Tarihi & Epistemoloji',        en: 'History of Science & Epistemology',   promptTr: 'bilim tarihi ve epistemoloji',   promptEn: 'history of science and epistemology' }
  ];

  const I18N = {
    tr: {
      docTitle: "Düşünce Sistemi · Postmodern Rulet",
      appNameHtml: "Düşünce <em>Sistemi</em>",
      badgePrefix: "Bir konu çevir",
      badgeResearch: (n) => `${n} dk araştır`,
      badgeTalk: (n) => `${n} dk konuş`,
      idleTopic: "Zihnine Meydan Oku",
      footerIdle: "Ayakları üzerinde düşünmek isteyenler için.",
      btnGenerate: "BİR KONU ÜRET",
      labelSpinning: "KONUN SEÇİLİYOR",
      btnSpinning: "SEÇİLİYOR...",
      footerSpinning: "",
      labelReady: "",
      btnResearch: "ARAŞTIRMAYA BAŞLA",
      footerReady: (n) => `Bu konuyu araştırmak ve not almak için ${n} dakikan var.`,
      respin: "Yeniden Çevir",
      reset: "Baştan Başla",
      labelResearch: "ARAŞTIRMA SÜRECİ",
      btnSkipResearch: "TARTIŞMAYA GEÇ (SÜREYİ ATLA)",
      footerResearch: "Notlarını çıkar, argümanını inşa et.",
      labelTalk: "SÖZ SIRASI SENDE",
      btnFinish: "OTURUMU BİTİR",
      footerTalk: "Kameraya, mikrofonuna veya karşındaki kişiye hitap et.",
      questionEyebrow: "Sana Soru",
      labelDone: "SONUÇ",
      doneTopic: "Oturum Tamamlandı.",
      doneSub: "Zihnini geliştirmeye devam et.",
      footerDone: "Hazır hissettiğinde döngüyü yeniden başlat.",
      btnNewTopic: "YENİ BİR KONU ÜRET",
      settingsTitle: "Sistem Ayarları",
      settingsLang: "Dil",
      settingsResearch: "Araştırma Süresi (Dakika)",
      settingsTalk: "Konuşma Süresi (Dakika)",
      settingsCategory: "Tercih Edilen Kategori",
      settingsCategoryHint: "Her çevirişte bu alandan bir konu üretilir.",
      settingsSave: "Kaydet ve Devam Et",
      /* Kompakt tutuldu: kısa, tek satır, gereksiz sözcük yok */
      toastLang: "Türkçe",
      toastLangLockedSpin: "Dönerken değişmez",
      toastLangResetSession: "Dil değişti · sıfırlandı",
      spinWords: ["Kuantum Bilinci","Simülasyon Argümanı","Nöro-Kapitalizm","Evrensel Temel Gelir","Transhümanizm & Etik","Dijital Mahremiyet","Postmodern Nihilizm","Kozmik İzolasyon","Algoritmik Adalet","Hafızanın Politikası","Sanal Kimlik Krizi","Zamanın Fenomenolojisi"],
      idlePrefix: "Zihnine meydan oku",
      idleWords: ["FELSEFE","BİLİM","SANAT","BİLİŞİM","PSİKOLOJİ","SİYASET"]
    },
    en: {
      docTitle: "Thought App · Postmodern Roulette",
      appNameHtml: "Thought <em>App</em>",
      badgePrefix: "Spin a topic",
      badgeResearch: (n) => `${n} min research`,
      badgeTalk: (n) => `${n} min talk`,
      idleTopic: "Challenge Your Mind",
      footerIdle: "For those who like thinking on their feet.",
      btnGenerate: "SPIN A TOPIC",
      labelSpinning: "SELECTING YOUR TOPIC",
      btnSpinning: "SELECTING...",
      footerSpinning: "",
      labelReady: "",
      btnResearch: "START RESEARCHING",
      footerReady: (n) => `You have ${n} minutes to research and take notes.`,
      respin: "Spin Again",
      reset: "Start Over",
      labelResearch: "RESEARCH TIME",
      btnSkipResearch: "GO TO DISCUSSION (SKIP TIME)",
      footerResearch: "Take notes, build your argument.",
      labelTalk: "YOUR TURN TO SPEAK",
      btnFinish: "END SESSION",
      footerTalk: "Speak to the camera, mic, or the person across from you.",
      questionEyebrow: "Your Question",
      labelDone: "DONE",
      doneTopic: "Session Complete.",
      doneSub: "Keep sharpening your mind.",
      footerDone: "Start the cycle again whenever you're ready.",
      btnNewTopic: "GENERATE A NEW TOPIC",
      settingsTitle: "System Settings",
      settingsLang: "Language",
      settingsResearch: "Research Time (Minutes)",
      settingsTalk: "Talk Time (Minutes)",
      settingsCategory: "Preferred Category",
      settingsCategoryHint: "Each spin generates a topic from this field.",
      settingsSave: "Save & Continue",
      toastLang: "English",
      toastLangLockedSpin: "Locked while spinning",
      toastLangResetSession: "Language changed · reset",
      spinWords: ["Quantum Consciousness","The Simulation Argument","Neuro-Capitalism","Universal Basic Income","Transhumanism & Ethics","The Death of Digital Privacy","Postmodern Nihilism","Cosmic Isolation","Algorithmic Justice","The Politics of Memory","Virtual Identity Crisis","The Phenomenology of Time"],
      idlePrefix: "Challenge your mind",
      idleWords: ["PHILOSOPHY","SCIENCE","ART","TECH","PSYCHOLOGY","POLITICS"]
    }
  };

  let currentLang = 'tr';
  const t = () => I18N[currentLang];

  const setAppVh = () => {
    document.documentElement.style.setProperty('--app-vh', `${window.innerHeight * 0.01}px`);
  };
  setAppVh();
  let vhResizeTimer = null;
  let lastVhWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    // Genişlik değiştiyse (ör. gerçek döndürme / cihaz değişimi) güncelle;
    // sadece yükseklik değiştiyse (adres çubuğu) görmezden gel.
    if (window.innerWidth === lastVhWidth) return;
    lastVhWidth = window.innerWidth;
    clearTimeout(vhResizeTimer);
    vhResizeTimer = setTimeout(setAppVh, 150);
  });
  window.addEventListener('orientationchange', () => {
    clearTimeout(vhResizeTimer);
    vhResizeTimer = setTimeout(setAppVh, 250);
  });

  let audioCtx = null;
  const getAudioCtx = () => {
    try {
      if (!audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return null;
        audioCtx = new Ctx();
      }
      if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
      return audioCtx;
    } catch (e) {
      return null;
    }
  };

  const playTone = (type) => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return; 
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'square'; osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
        gain.gain.setValueAtTime(0.04, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now); osc.stop(now + 0.05);
        if (navigator.vibrate) navigator.vibrate(15);
      }
      else if (type === 'tick') {
        osc.type = 'triangle'; osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.015, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.start(now); osc.stop(now + 0.03);
        if (navigator.vibrate) navigator.vibrate(5);
      }
      else if (type === 'success') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        gain.gain.setValueAtTime(0, now); gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
        gain.gain.linearRampToValueAtTime(0, now + 0.4);
        osc.start(now); osc.stop(now + 0.4);
        if (navigator.vibrate) navigator.vibrate([80, 40, 100]);
      }
      else if (type === 'alert') {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.05, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now); osc.stop(now + 0.6);
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      }
    } catch (e) {
    }
  };

  const bgWrapper = document.getElementById("bg-wrapper");
  const bgCombos = [
    { conf: 1, round: 1 }, { conf: 1, round: 2 }, { conf: 1, round: 3 },
    { conf: 2, round: 2 }, { conf: 2, round: 1 }, { conf: 2, round: 3 }
  ];
  let prevConf = 0;
  setInterval(() => {
    let next = prevConf;
    while (prevConf === next) next = Math.floor(Math.random() * bgCombos.length);
    bgWrapper.dataset.configuration = bgCombos[next].conf;
    bgWrapper.dataset.roundness = bgCombos[next].round;
    prevConf = next;
  }, 4500);

  const CANVAS = document.querySelector("#canvas");
  const btnEl = document.querySelector(".btn");
  const ctx = CANVAS.getContext("2d");
  const PARTICLES = [];
  let W, H, XO, YO = 0; let isGoing = false;

  class Particle {
    constructor() { this.reset(); this.z = Math.random() * 2; }
    reset() { this.x = Math.random() * W - XO; this.y = Math.random() * H - YO; this.z = 2; }
    update() { this.z -= 0.02; if (this.z <= 0) this.reset(); }
    render() {
      this.update();
      const px = (this.x / this.z) + XO; const py = (this.y / this.z) + YO;
      const r = Math.max(0, (2 - this.z) * 1.5);
      ctx.beginPath(); ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill();
    }
  }

  const initCanvas = () => {
    CANVAS.width = W = btnEl.offsetWidth; CANVAS.height = H = btnEl.offsetHeight;
    XO = W / 2; YO = H / 2;
    if (PARTICLES.length === 0) for (let i = 0; i < 40; i++) PARTICLES.push(new Particle());
  };

  function loop() {
    requestAnimationFrame(loop);
    if (isGoing) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)"; ctx.fillRect(0, 0, W, H);
      PARTICLES.forEach(p => p.render());
    } else { ctx.clearRect(0, 0, W, H); }
  }
  if (window.ResizeObserver) {
    new ResizeObserver(initCanvas).observe(btnEl);
  } else {
    window.addEventListener('resize', initCanvas);
  }
  initCanvas(); loop();

  const gelTargets = document.querySelectorAll('.btn, .btn-ghost');
  gelTargets.forEach((el) => {
    el.addEventListener('mousemove', (ev) => {
      const rect = el.getBoundingClientRect();
      const x = ((ev.clientX - rect.left) / rect.width) * 100;
      const y = ((ev.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--gel-x', `${x}%`);
      el.style.setProperty('--gel-y', `${y}%`);
    });
    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--gel-x', `50%`);
      el.style.setProperty('--gel-y', `50%`);
    });
  });

  const AI_ENDPOINT = "/api/generate-topic";
  const AI_MODEL = "openai/gpt-oss-20b";
  const MIN_SPIN_MS = 5000;             
  const REQUEST_TIMEOUT_MS = 7000;
  const MAX_ATTEMPTS = 3;
  const REQUEST_WINDOW_MS = 60000;       
  const MAX_REQUESTS_PER_WINDOW = 8;    


  const FALLBACK_TOPICS = {
    tr: [
      { topic: "Simülasyon Hipotezi", sub: "The Simulation Argument", questions: [
        "Bu konuyu hiç bilmeyen birine 2 dakikada nasıl özetlersin?", "Karşıt görüşlü biri neleri savunurdu?",
        "Bu fikrin gündelik hayatımızdaki pratik bir sonucu olur muydu?", "En güçlü karşı-argüman sence nedir?",
        "Bu konu 50 yıl sonra nasıl tartışılır olurdu?" ] },
      { topic: "Dijital İkiz Benlik", sub: "The Algorithmic Self", questions: [
        "Sosyal medyadaki 'sen' ile gerçek 'sen' ne kadar aynı kişi?", "Bir algoritma seni senden daha iyi tanıyabilir mi?",
        "Bunun kimlik üzerine felsefi bir sonucu var mı?", "Karşıt görüşlü biri neleri savunurdu?",
        "Bu durumu tersine çevirecek bir alışkanlık önerir misin?" ] },
      { topic: "Sıkılmanın Kaybolması", sub: "The Extinction of Boredom", questions: [
        "Sürekli uyarılmış bir zihin hâlâ yaratıcı olabilir mi?", "Sıkılmak gerçekten bir sorun mu, yoksa bir ihtiyaç mı?",
        "Karşıt görüşlü biri neleri savunurdu?", "Bu konunun eğitimle ilgisi nedir?", "Bu fikri 2 dakikada nasıl anlatırdın?" ] },
      { topic: "Ölümsüzlüğün Sıkıcılığı", sub: "The Tedium of Immortality", questions: [
        "Sonsuz bir hayat anlamlı olabilir mi, yoksa anlamın kaynağı sonluluk mu?", "Karşıt görüşlü biri neleri savunurdu?",
        "Bu fikrin gündelik kararlarımıza etkisi ne olurdu?", "En güçlü karşı-argüman sence nedir?",
        "Bu konuyu bir sanat eseriyle nasıl anlatırdın?" ] },
      { topic: "Otantikliğin Pazarlanması", sub: "The Marketing of Authenticity", questions: [
        "'Kendin ol' mesajı aslında bir tüketim biçimi mi?", "Karşıt görüşlü biri neleri savunurdu?",
        "Bunun gençlik kültürüne etkisi nedir?", "Bu fikri 2 dakikada nasıl özetlersin?", "En güçlü karşı-argüman sence nedir?" ] },
      { topic: "Sessizliğin Ekonomisi", sub: "The Economy of Silence", questions: [
        "Neden artık sessizlik bir lüks hâline geldi?", "Karşıt görüşlü biri neleri savunurdu?",
        "Bu durumun zihin sağlığıyla ilişkisi nedir?", "Bu fikri 2 dakikada nasıl anlatırdın?", "En güçlü karşı-argüman sence nedir?" ] }
    ],
    en: [
      { topic: "The Simulation Argument", sub: "Ad Infinitum", questions: [
        "How would you explain this to a stranger in two minutes?", "What would someone who disagrees argue?",
        "What's a real, everyday consequence of this idea?", "What's the strongest counter-argument you can think of?",
        "How might this be debated 50 years from now?" ] },
      { topic: "The Algorithmic Self", sub: "Persona Digitalis", questions: [
        "How much is your online 'self' really you?", "Could an algorithm know you better than you know yourself?",
        "What does this mean philosophically for identity?", "What would someone who disagrees argue?",
        "What habit could help reverse this trend?" ] },
      { topic: "The Extinction of Boredom", sub: "Otium Perditum", questions: [
        "Can a constantly stimulated mind still be creative?", "Is boredom actually a problem, or a need?",
        "What would someone who disagrees argue?", "How does this relate to education?", "How would you explain this in two minutes?" ] },
      { topic: "The Tedium of Immortality", sub: "Vita Aeterna", questions: [
        "Can an infinite life be meaningful, or does meaning require an ending?", "What would someone who disagrees argue?",
        "How would this affect our everyday decisions?", "What's the strongest counter-argument?", "How would you illustrate this with a work of art?" ] },
      { topic: "The Marketing of Authenticity", sub: "Persona Vendibilis", questions: [
        "Is 'just be yourself' secretly a form of consumption?", "What would someone who disagrees argue?",
        "How does this affect youth culture?", "How would you summarize this in two minutes?", "What's the strongest counter-argument?" ] },
      { topic: "The Economy of Silence", sub: "Silentium Pretiosum", questions: [
        "Why has silence quietly become a luxury good?", "What would someone who disagrees argue?",
        "How does this relate to mental health?", "How would you explain this in two minutes?", "What's the strongest counter-argument?" ] }
    ]
  };

  // Oturum hafızası (localStorage KULLANILMIYOR — sadece RAM'de tutulur)
  let usedTopicsHistory = [];
  const pushUsedTopic = (topicText) => {
    if (!topicText) return;
    usedTopicsHistory.push(topicText);
    if (usedTopicsHistory.length > 8) usedTopicsHistory.shift();
  };

  // Küçük önbellek: bir konu gösterilirken arka planda sıradaki konu
  // sessizce hazırlanır.
  let topicCache = [];
  let topicCacheKey = null;
  let isPrefetching = false;
  const cacheKeyFor = () => `${currentLang}:${secilenKategori}`;

  // Client-taraflı kaba hız sınırlayıcı
  let requestTimestamps = [];
  const canMakeLiveRequest = () => {
    const now = Date.now();
    requestTimestamps = requestTimestamps.filter(ts => now - ts < REQUEST_WINDOW_MS);
    return requestTimestamps.length < MAX_REQUESTS_PER_WINDOW;
  };

  const sleep = (ms) => new Promise(res => setTimeout(res, ms));

  const buildPrompt = (lang, categoryObj, avoidList) => {
    const category = categoryObj || CATEGORIES[0];
    if (lang === 'en') {
      const categoryHint = (category.key !== 'rastgele')
        ? `Focus specifically on the "${category.promptEn}" field.`
        : `Freely choose from fields like philosophy, technology ethics, sociology, psychology, political philosophy, art theory, or history of science.`;
      const avoidHint = avoidList.length
        ? `These topics were ALREADY used in this session — do NOT repeat them or anything very similar: ${avoidList.join(" | ")}.`
        : "";
      return {
        system: `You are a sharp, deep-thinking, contemporary moderator for postmodern discussions. Your task is to generate ONE extremely specific and original DISCUSSION TOPIC at the intersection of philosophy, sociology, technology, psychology, and politics.

${categoryHint}
${avoidHint}
Each topic must be completely different from previous ones and unexpected. Avoid overused, cliché topics as much as possible; find a rarer, more striking, current angle.

Also generate between 8 and 15 thought-provoking questions ("questions") about this exact topic that make someone think on their feet.

Return ONLY the following JSON format, with no other explanation, preamble, or closing text:
{"topic": "The topic name in English", "sub": "A short evocative subtitle (may be in Latin, French, or another language)", "questions": ["Question 1", "Question 2", "..."]}`,
        user: `Generate a new, original discussion topic not used yet. (request id: ${Date.now()}-${Math.random().toString(36).slice(2, 9)}, do not repeat previous topics)`
      };
    }
    const categoryHint = (category.key !== 'rastgele')
      ? `Özellikle "${category.promptTr}" alanından bir konu üret.`
      : `Felsefe, teknoloji etiği, sosyoloji, psikoloji, siyaset felsefesi, sanat teorisi veya bilim tarihi gibi alanlardan herhangi birini serbestçe seçebilirsin.`;
    const avoidHint = avoidList.length
      ? `Bu oturumda DAHA ÖNCE şu konular üretildi, bunları ve bunlara çok benzer konuları KESİNLİKLE tekrar üretme: ${avoidList.join(" | ")}.`
      : "";
    return {
      system: `Sen zeki, derin düşünen, güncel bir postmodern tartışma moderatörüsün. Görevin felsefe, sosyoloji, teknoloji, psikoloji ve siyasetin kesişiminden ÇOK SPESİFİK ve ÖZGÜN, beyin yakan 1 adet TARTIŞMA KONUSU üretmek.

${categoryHint}
${avoidHint}
Her üretimin bir öncekinden TAMAMEN FARKLI ve beklenmedik olmalı. Klişeleşmiş, çok sık karşılaşılan konulardan mümkün olduğunca kaçın; daha nadir, çarpıcı ve güncel bir açı bul.

Bu konuyla ilgili, insanın ayakları üstünde düşünmesini sağlayacak, birbirinden farklı 8 ile 15 arasında zorlayıcı soru ("questions") üret.

Çıktını SADECE aşağıdaki JSON formatında ver, başka hiçbir açıklama, giriş veya kapanış metni ekleme:
{"topic": "Ürettiğin konunun Türkçe adı", "sub": "Kısa, çarpıcı bir alt başlık (Latince, Fransızca veya İngilizce olabilir)", "questions": ["Soru 1", "Soru 2", "..."]}`,
      user: `Yeni, özgün ve şu ana kadar üretilmemiş bir tartışma konusu üret. (istek kimliği: ${Date.now()}-${Math.random().toString(36).slice(2, 9)}, tekrar etme)`
    };
  };

  const requestTopicOnce = async (temperature, categoryObj, lang) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const prompt = buildPrompt(lang, categoryObj, usedTopicsHistory);

    try {
      requestTimestamps.push(Date.now());
      // NOT: Authorization header'ı artık burada yok — gerçek Groq anahtarı
      // sunucudaki /api/generate-topic proxy'sinin içinde, ortam değişkeni
      // olarak duruyor.
      const response = await fetch(AI_ENDPOINT, {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: AI_MODEL,
          response_format: { type: "json_object" },
          temperature: temperature,
          frequency_penalty: 0.4,
          presence_penalty: 0.5,
          messages: [
            { role: "system", content: prompt.system },
            { role: "user", content: prompt.user }
          ]
        })
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const err = new Error(`HTTP_${response.status}`);
        err.isRateLimited = response.status === 429;
        throw err;
      }
      const data = await response.json();
      if (!data.choices || !data.choices[0] || !data.choices[0].message) throw new Error("INVALID_RESPONSE_SHAPE");

      const parsed = JSON.parse(data.choices[0].message.content);
      if (!parsed.topic || !Array.isArray(parsed.questions) || parsed.questions.length < 3) throw new Error("MALFORMED_JSON");
      return parsed;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  };

  // Ana fonksiyon: retry + anti-tekrar + timeout + hız sınırı + sessiz yedek havuz içerir.
  const fetchAIContent = async (categoryKey, lang) => {
    const categoryObj = CATEGORIES.find(c => c.key === categoryKey) || CATEGORIES[0];
    const requestLang = lang; // bu istek başlarken hangi dildeyiz, sabitle

    if (canMakeLiveRequest()) {
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        try {
          const temperature = 0.9 + attempt * 0.2;
          const parsed = await requestTopicOnce(temperature, categoryObj, requestLang);
          const isDuplicate = usedTopicsHistory.some(tp => tp.trim().toLowerCase() === parsed.topic.trim().toLowerCase());
          if (isDuplicate && attempt < MAX_ATTEMPTS - 1) { continue; }
          return { ...parsed, isLive: true, lang: requestLang };
        } catch (err) {
          console.error(`AI isteği ${attempt + 1}. denemede başarısız:`, err);
          if (err && err.isRateLimited) break; // kota korumak için tekrar deneme
          if (attempt < MAX_ATTEMPTS - 1) await sleep(350 * (attempt + 1));
        }
      }
    }

    // Sessiz, kullanıcıya hiç belli etmeden yedek havuzdan seç.
    const langPool = FALLBACK_TOPICS[requestLang] || FALLBACK_TOPICS.tr;
    let pool = langPool.filter(f => !usedTopicsHistory.some(tp => tp.trim().toLowerCase() === f.topic.trim().toLowerCase()));
    if (pool.length === 0) pool = langPool;
    const fallback = pool[Math.floor(Math.random() * pool.length)];
    return { ...fallback, isLive: false, lang: requestLang };
  };

  const prefetchTopic = async () => {
    if (isPrefetching || topicCache.length >= 1) return;
    isPrefetching = true;
    const keyAtStart = cacheKeyFor();
    try {
      const result = await fetchAIContent(secilenKategori, currentLang);
      if (result.isLive && cacheKeyFor() === keyAtStart) topicCache.push(result);
    } catch (e) { /* sessiz */ }
    isPrefetching = false;
  };

  /* =========================================
     UYGULAMA YÖNETİMİ
  ========================================= */
  const UI = {
    appTitle: document.getElementById("app-title"),
    badgeText: document.getElementById("badge-text"),
    badgeTime: document.getElementById("badge-time"),
    badgeTalk: document.getElementById("badge-talk"),
    tMain: document.getElementById("topic-main"),
    tSub: document.getElementById("topic-sub"),
    lbl: document.getElementById("top-label"),
    btnPrimary: document.getElementById("btn-primary"),
    btnPrimaryTxt: document.getElementById("btn-primary-text"),
    secActions: document.getElementById("secondary-actions"),
    txtRespin: document.getElementById("txt-respin"),
    txtReset: document.getElementById("txt-reset"),
    timer: document.getElementById("timer-display"),
    question: document.getElementById("question-display"),
    footer: document.getElementById("footer-text"),
    flash: document.getElementById("flash"),
    toast: document.getElementById("toast"),
    docTitle: document.getElementById("doc-title")
  };

  let ayarArastirmaDk = 15;
  let ayarKonusmaSn = 120;
  let secilenKategori = "rastgele";
  let currentPhase = "IDLE";
  let intervalTimer = null;
  let spinTimeoutId = null;
  let generatedQuestions = [];
  let toastTimeoutId = null;
  // Bu oturumda şu anda ekranda duran konu hangi dilde üretildi?
  let activeTopicLang = null;

  const formatTime = (secs) => `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;

  const showToast = (msg, duration = 2200) => {
    if (toastTimeoutId) clearTimeout(toastTimeoutId);
    UI.toast.innerText = msg;
    UI.toast.classList.add("show");
    toastTimeoutId = setTimeout(() => UI.toast.classList.remove("show"), duration);
  };

  /* =========================================
     IDLE EKRANI — SÜREKLİ DEĞİŞEN ANİMASYONLU BAŞLIK
     ---------------------------------------------------------------
     Kullanıcı henüz bir konu çevirmemişken (IDLE faz), boş ana ekrana
     verdiği "animated text fill" efektini TR/EN diline göre kelimeler
     arasında yumuşakça geçiş yaparak gösterir. Saf CSS keyframe yerine
     JS tabanlı döngü kullanıyoruz, böylece dil değişince kelime listesi
     de anında doğru dile geçer.
  ========================================= */
  let idleWordTimer = null;
  let idleWordIndex = 0;

  const stopIdleAnimation = () => {
    if (idleWordTimer) { clearInterval(idleWordTimer); idleWordTimer = null; }
  };

  const renderIdleAnimated = () => {
    const s = t();
    idleWordIndex = 0;
    UI.tMain.innerHTML = `
      <div class="idle-animated-wrap">
        <span class="idle-eyebrow" id="idle-prefix">${s.idlePrefix}</span>
        <span class="animated-span" id="idle-word">${s.idleWords[0]}</span>
      </div>`;

    stopIdleAnimation();
    idleWordTimer = setInterval(() => {
      // Faz değiştiyse (kullanıcı bu arada döndürdüyse) ya da eleman DOM'dan
      // kaldırıldıysa döngüyü sessizce durdur — hata fırlatmasın.
      const wordEl = document.getElementById('idle-word');
      if (currentPhase !== "IDLE" || !wordEl) { stopIdleAnimation(); return; }
      const words = t().idleWords;
      idleWordIndex = (idleWordIndex + 1) % words.length;
      wordEl.classList.add('word-swap');
      setTimeout(() => {
        const el = document.getElementById('idle-word');
        if (!el) return;
        el.textContent = words[idleWordIndex];
        el.classList.remove('word-swap');
      }, 350);
    }, 2200);
  };

  // Statik metinleri mevcut faza göre yeniden uygular (dil değişince de çağrılır)
  const applyPhaseStrings = () => {
    const s = t();
    UI.appTitle.innerHTML = s.appNameHtml;
    UI.badgeText.childNodes[0].nodeValue = `${s.badgePrefix} · `;
    UI.badgeTime.nextSibling.nodeValue = ` ${s.badgeResearch(ayarArastirmaDk).replace(/^\d+\s*/, '')} · `;
    UI.badgeTalk.nextSibling.nodeValue = ` ${s.badgeTalk(Math.round(ayarKonusmaSn / 60)).replace(/^\d+\s*/, '')}`;
    UI.docTitle.innerText = s.docTitle;
    document.title = s.docTitle;
    UI.txtRespin.innerText = s.respin;
    UI.txtReset.innerText = s.reset;

    if (currentPhase === "IDLE") {
      renderIdleAnimated();
      UI.tSub.innerText = " ";
      UI.lbl.innerText = "";
      UI.btnPrimaryTxt.innerText = s.btnGenerate;
      UI.footer.innerText = s.footerIdle;
    } else {
      stopIdleAnimation();
    }

    if (currentPhase === "SPINNING") {
      UI.lbl.innerText = s.labelSpinning;
      UI.btnPrimaryTxt.innerText = s.btnSpinning;
      UI.footer.innerText = s.footerSpinning;
    } else if (currentPhase === "READY") {
      UI.lbl.innerText = s.labelReady;
      UI.btnPrimaryTxt.innerText = s.btnResearch;
      UI.footer.innerText = s.footerReady(ayarArastirmaDk);
    } else if (currentPhase === "RESEARCHING") {
      UI.lbl.innerText = s.labelResearch;
      UI.btnPrimaryTxt.innerText = s.btnSkipResearch;
      UI.footer.innerText = s.footerResearch;
    } else if (currentPhase === "TALKING") {
      UI.lbl.innerText = s.labelTalk;
      UI.btnPrimaryTxt.innerText = s.btnFinish;
      UI.footer.innerText = s.footerTalk;
    } else if (currentPhase === "DONE") {
      UI.lbl.innerText = s.labelDone;
      UI.tMain.innerText = s.doneTopic;
      UI.tSub.innerText = s.doneSub;
      UI.footer.innerText = s.footerDone;
      UI.btnPrimaryTxt.innerText = s.btnNewTopic;
    }
  };

  // Rulet Döndürme Aşaması — EN AZ 5 SANİYE, gerçek bir çark gibi sona doğru yavaşlar.
  const spinRoulette = async () => {
    if (currentPhase === "SPINNING") return;
    stopIdleAnimation();
    currentPhase = "SPINNING";
    activeTopicLang = null;
    playTone('click');
    isGoing = true;

    const s = t();
    UI.secActions.classList.add("hidden");
    UI.timer.style.display = "none"; UI.question.style.display = "none";
    UI.tMain.style.display = "flex"; UI.tSub.style.display = "block";
    UI.lbl.innerText = s.labelSpinning;
    UI.footer.innerText = s.footerSpinning;
    UI.btnPrimary.classList.add("active");
    UI.btnPrimaryTxt.innerText = s.btnSpinning;

    const spinStart = Date.now();
    const tickSpin = () => {
      const elapsed = Date.now() - spinStart;
      if (elapsed >= MIN_SPIN_MS + 400) return;
      playTone('tick');
      const liveWords = t().spinWords;
      UI.tMain.innerText = liveWords[Math.floor(Math.random() * liveWords.length)];
      // "Dönüyormuş gibi" hissi: her tick'te kelimenin bir çark gözesi gibi
      // yukarıdan tumbling ederek düşmesini sağlayan CSS animasyonunu
      // reflow trick'iyle yeniden tetikliyoruz.
      UI.tMain.classList.remove('spin-tick');
      void UI.tMain.offsetWidth;
      UI.tMain.classList.add('spin-tick');
      const progress = Math.min(elapsed / MIN_SPIN_MS, 1);
      const delay = 70 + Math.pow(progress, 3) * 300; // sona doğru yavaşla
      spinTimeoutId = setTimeout(tickSpin, delay);
    };
    tickSpin();

    // Önbellekte hazır bir konu varsa onu kullan, yoksa canlı iste.
    const minSpinPromise = sleep(MIN_SPIN_MS);
    const cached = (topicCache.length && cacheKeyFor() === topicCacheKey) ? topicCache.shift() : null;
    const dataPromise = cached ? Promise.resolve(cached) : fetchAIContent(secilenKategori, currentLang);
    const [data] = await Promise.all([dataPromise, minSpinPromise]);

    if (spinTimeoutId) clearTimeout(spinTimeoutId);
    playTone('success');

    // Kullanıcı spin sürerken dili değiştirdiyse elimizdeki konu eski dilde
    // gelmiş olabilir; sessizce yeni dilde bir konu daha isteyip onu gösteriyoruz.
    let finalData = data;
    if (data.lang && data.lang !== currentLang) {
      try {
        finalData = await fetchAIContent(secilenKategori, currentLang);
      } catch (e) {
        finalData = data;
      }
    }

    UI.flash.classList.remove("flash-anim");
    void UI.flash.offsetWidth;
    UI.flash.classList.add("flash-anim");

    UI.tMain.classList.remove("reveal");
    void UI.tMain.offsetWidth;
    UI.tMain.innerText = finalData.topic;
    UI.tMain.classList.add("reveal");

    UI.tSub.classList.remove("reveal-soft");
    void UI.tSub.offsetWidth;
    UI.tSub.innerText = finalData.sub;
    UI.tSub.classList.add("reveal-soft");

    generatedQuestions = finalData.questions;
    pushUsedTopic(finalData.topic);
    activeTopicLang = currentLang;

    currentPhase = "READY";
    isGoing = false;
    UI.btnPrimary.classList.remove("active");
    applyPhaseStrings();
    UI.secActions.classList.remove("hidden");

    topicCacheKey = cacheKeyFor();
    setTimeout(prefetchTopic, 1500);
  };

  const startPhase = (durationSecs, phaseName) => {
    currentPhase = phaseName;
    let remain = durationSecs;
    const s = t();

    UI.secActions.classList.add("hidden");
    UI.timer.style.display = "block";
    UI.timer.innerText = formatTime(remain);
    UI.timer.classList.remove("reveal-soft"); void UI.timer.offsetWidth; UI.timer.classList.add("reveal-soft");

    isGoing = true;

    if (phaseName === "RESEARCHING") {
      playTone('click');
      UI.tMain.style.display = "none"; UI.tSub.style.display = "none";
      applyPhaseStrings();
    } else if (phaseName === "TALKING") {
      playTone('alert');
      applyPhaseStrings();
      UI.question.style.display = "block";
      const randomQ = generatedQuestions[Math.floor(Math.random() * (generatedQuestions.length || 1))] || (currentLang === 'en' ? "What's your core thesis on this?" : "Bu konuda temel tezin nedir?");
      UI.question.innerHTML = `<span class="q-eyebrow">${t().questionEyebrow}</span>"${randomQ}"`;
      UI.question.classList.remove("reveal-soft"); void UI.question.offsetWidth; UI.question.classList.add("reveal-soft");
    }

    intervalTimer = setInterval(() => {
      remain--;
      UI.timer.innerText = formatTime(remain);
      if (remain <= 0) { clearInterval(intervalTimer); nextStep(); }
    }, 1000);
  };

  const nextStep = () => {
    if (intervalTimer) clearInterval(intervalTimer);

    if (currentPhase === "IDLE" || currentPhase === "READY") {
      if (currentPhase === "IDLE") spinRoulette();
      else startPhase(ayarArastirmaDk * 60, "RESEARCHING");
    } else if (currentPhase === "RESEARCHING") {
      startPhase(ayarKonusmaSn, "TALKING");
    } else if (currentPhase === "TALKING" || currentPhase === "DONE") {
      playTone('success');
      currentPhase = "IDLE";
      isGoing = false;
      UI.timer.style.display = "none"; UI.question.style.display = "none";
      UI.tMain.style.display = "flex"; UI.tSub.style.display = "block";
      currentPhase = "DONE";
      activeTopicLang = null;
      applyPhaseStrings();
      currentPhase = "IDLE"; // bir sonraki tıklamada yeni dönüş başlasın
    }
  };

  UI.btnPrimary.addEventListener("click", nextStep);
  document.getElementById("btn-respin").addEventListener("click", spinRoulette);
  document.getElementById("btn-reset").addEventListener("click", () => {
    playTone('click');
    if (spinTimeoutId) clearTimeout(spinTimeoutId);
    if (intervalTimer) clearInterval(intervalTimer);
    currentPhase = "IDLE"; isGoing = false;
    activeTopicLang = null;
    UI.tMain.style.display = "flex"; UI.tSub.style.display = "block";
    UI.timer.style.display = "none"; UI.question.style.display = "none";
    UI.secActions.classList.add("hidden");
    applyPhaseStrings();
  });

  /* =========================================
     AYARLAR MENÜSÜ + DİL KONTROLLERİ
  ========================================= */
  const modal = document.getElementById('settings-modal');
  const inputTime = document.getElementById('setting-time');
  const inputTalk = document.getElementById('setting-talk');
  const selectCategory = document.getElementById('setting-category');
  const langToggleBtns = document.querySelectorAll('.lang-btn');
  const langQuick = document.getElementById('lang-quick');

  const populateCategorySelect = () => {
    selectCategory.innerHTML = "";
    CATEGORIES.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.key;
      opt.innerText = currentLang === 'en' ? cat.en : cat.tr;
      if (cat.key === secilenKategori) opt.selected = true;
      selectCategory.appendChild(opt);
    });
  };

  const applyModalStrings = () => {
    const s = t();
    document.getElementById('settings-title').innerText = s.settingsTitle;
    document.getElementById('lbl-lang').innerText = s.settingsLang;
    document.getElementById('lbl-research').innerText = s.settingsResearch;
    document.getElementById('lbl-talk').innerText = s.settingsTalk;
    document.getElementById('lbl-category').innerText = s.settingsCategory;
    document.getElementById('lbl-category-hint').innerText = s.settingsCategoryHint;
    document.getElementById('settings-close').innerText = s.settingsSave;
    populateCategorySelect();
  };

  // Dil değişimi aktif oturumla güvenli şekilde koordine ediliyor:
  // 1) SPINNING sırasında dil değişimi engellenir (kısa toast ile bildirilir).
  // 2) Ekranda farklı dilde bir konu varsa, dil değişimiyle oturum sıfırlanır.
  const setLanguage = (lang, { silent = false } = {}) => {
    if (lang === currentLang) return;

    if (currentPhase === "SPINNING") {
      showToast(t().toastLangLockedSpin);
      langToggleBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));
      langQuick.innerText = currentLang.toUpperCase();
      return;
    }

    const hadMismatchedTopic = activeTopicLang && activeTopicLang !== lang;

    currentLang = lang;
    langQuick.innerText = lang.toUpperCase();
    langToggleBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    topicCache = []; topicCacheKey = null;

    if (hadMismatchedTopic) {
      if (spinTimeoutId) clearTimeout(spinTimeoutId);
      if (intervalTimer) clearInterval(intervalTimer);
      currentPhase = "IDLE";
      isGoing = false;
      activeTopicLang = null;
      UI.tMain.style.display = "flex"; UI.tSub.style.display = "block";
      UI.timer.style.display = "none"; UI.question.style.display = "none";
      UI.secActions.classList.add("hidden");
      applyPhaseStrings();
      applyModalStrings();
      if (!silent) showToast(t().toastLangResetSession, 2000);
      return;
    }

    applyPhaseStrings();
    applyModalStrings();
    if (!silent) showToast(t().toastLang);
  };

  langToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => { playTone('click'); setLanguage(btn.dataset.lang); });
  });
  langQuick.addEventListener('click', () => {
    playTone('click');
    setLanguage(currentLang === 'tr' ? 'en' : 'tr');
  });

  document.getElementById('settings-open').addEventListener('click', () => {
    playTone('click'); applyModalStrings(); modal.classList.add('show');
  });

  const closeSettings = () => {
    playTone('click'); modal.classList.remove('show');
    const newTime = parseInt(inputTime.value);
    if (newTime && newTime > 0) ayarArastirmaDk = newTime;
    const newTalk = parseInt(inputTalk.value);
    if (newTalk && newTalk > 0) ayarKonusmaSn = newTalk * 60;
    const newCategory = selectCategory.value;
    if (newCategory !== secilenKategori) { secilenKategori = newCategory; topicCache = []; topicCacheKey = null; }
    UI.badgeTime.innerText = ayarArastirmaDk;
    UI.badgeTalk.innerText = Math.round(ayarKonusmaSn / 60);
    applyPhaseStrings();
  };

  document.getElementById('settings-close').addEventListener('click', closeSettings);
  modal.addEventListener('click', (e) => { if (e.target === modal) { playTone('click'); modal.classList.remove('show'); } });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) { playTone('click'); modal.classList.remove('show'); }
  });

  /* =========================================
     BAŞLANGIÇ
  ========================================= */
  populateCategorySelect();
  applyPhaseStrings();
})();
