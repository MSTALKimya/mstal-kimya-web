/*
 * Site içeriği /content klasöründeki JSON dosyalarından okunur.
 * Öğretmenler bu dosyaları /admin panelinden düzenler; kod değiştirmeye gerek yoktur.
 */

const NAV = [
  ["index.html", "Ana Sayfa"],
  ["hakkimizda.html", "Hakkımızda"],
  ["duyurular.html", "Duyurular"],
  ["urunler.html", "Ürünlerimiz"],
  ["kadro.html", "Kadromuz"],
  ["mezunlar.html", "Mezunlarımız"],
  ["ders-programi.html", "Ders Programı"],
];

const CATEGORY_CLASS = {
  "Sınav Takvimi": "sinav",
  "Önemli": "onemli",
  "Etkinlik": "etkinlik",
};

// ---------- Yardımcılar ----------
const $ = (sel, root = document) => root.querySelector(sel);

function esc(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function md(text) {
  if (!text) return "";
  return window.marked ? window.marked.parse(text) : `<p>${esc(text)}</p>`;
}

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d)) return esc(value);
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

function slug(text) {
  return String(text || "")
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function initials(name) {
  return String(name || "?").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toLocaleUpperCase("tr-TR");
}

function imgOrPlaceholder(src, alt, cls = "card-img", icon = "🧪") {
  return src
    ? `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`
    : `<div class="img-placeholder">${icon}</div>`;
}

async function load(name) {
  try {
    const res = await fetch(`content/${name}.json`, { cache: "no-cache" });
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (e) {
    console.error(`İçerik yüklenemedi: ${name}`, e);
    return {};
  }
}

function youtubeEmbed(url) {
  if (!url) return "";
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  if (m) {
    return `<div class="video-wrap"><iframe src="https://www.youtube-nocookie.com/embed/${m[1]}" title="Tanıtım videosu" allowfullscreen loading="lazy"></iframe></div>`;
  }
  if (/\.(mp4|webm)$/i.test(url)) {
    return `<div class="video-wrap"><video src="${esc(url)}" controls preload="metadata"></video></div>`;
  }
  return "";
}

function sortAnnouncements(list) {
  return [...(list || [])].sort((a, b) => {
    if (!!b.sabitle !== !!a.sabitle) return b.sabitle ? 1 : -1;
    return String(b.tarih || "").localeCompare(String(a.tarih || ""));
  });
}

function annId(a) {
  return "d-" + slug(`${a.tarih}-${a.baslik}`);
}

// ---------- Ortak parçalar: üst menü ve alt bilgi ----------
function renderChrome(s) {
  const current = location.pathname.split("/").pop() || "index.html";
  const logo = s.logo || "images/logo.svg";

  document.body.insertAdjacentHTML("afterbegin", `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html">
          <img src="${esc(logo)}" alt="Okul amblemi">
          <span class="brand-text"><strong>${esc(s.bolumAdi)}</strong><span>${esc(s.okulAdi)}</span></span>
        </a>
        <button class="menu-btn" aria-label="Menü" onclick="document.querySelector('.nav').classList.toggle('open')">☰</button>
        <nav class="nav">
          ${NAV.map(([href, label]) => `<a href="${href}" class="${href === current ? "active" : ""}">${label}</a>`).join("")}
        </nav>
      </div>
    </header>`);

  const social = [
    s.instagram && `<li><a href="${esc(s.instagram)}" target="_blank" rel="noopener">Instagram</a></li>`,
    s.youtube && `<li><a href="${esc(s.youtube)}" target="_blank" rel="noopener">YouTube</a></li>`,
    s.okulWebSitesi && `<li><a href="${esc(s.okulWebSitesi)}" target="_blank" rel="noopener">Okul Web Sitesi</a></li>`,
  ].filter(Boolean).join("");

  document.body.insertAdjacentHTML("beforeend", `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h4>${esc(s.okulAdi)}</h4>
            <p>${esc(s.bolumAdi)}</p>
            ${s.adres ? `<p>📍 ${esc(s.adres)}</p>` : ""}
            ${s.telefon ? `<p>📞 <a href="tel:${esc(s.telefon.replace(/\s/g, ""))}">${esc(s.telefon)}</a></p>` : ""}
            ${s.eposta ? `<p>✉️ <a href="mailto:${esc(s.eposta)}">${esc(s.eposta)}</a></p>` : ""}
          </div>
          <div>
            <h4>Sayfalar</h4>
            <ul>${NAV.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Bağlantılar</h4>
            <ul>${social || "<li>—</li>"}</ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${esc(s.okulAdi)}</span>
          <a href="admin/">Yönetim Paneli</a>
        </div>
      </div>
    </footer>`);

  if (s.okulAdi) document.title = `${document.title} | ${s.bolumAdi || s.okulAdi}`;
}

// ---------- Sayfalar ----------
const PAGES = {
  async index(main, s) {
    const [ann, products] = await Promise.all([load("duyurular"), load("urunler")]);
    const latest = sortAnnouncements(ann.liste).slice(0, 4);
    const featured = (products.liste || []).filter((p) => p.oneCikar).slice(0, 3);
    const showProducts = featured.length ? featured : (products.liste || []).slice(0, 3);

    main.innerHTML = `
      <section class="hero ${s.heroGorsel ? "has-image" : ""}" ${s.heroGorsel ? `style="background-image:linear-gradient(135deg,rgba(7,63,73,.88),rgba(11,93,107,.75)),url('${esc(s.heroGorsel)}')"` : ""}>
        <div class="container hero-inner">
          <img class="hero-logo" src="${esc(s.logo || "images/logo.svg")}" alt="Okul amblemi">
          <div>
            <h1>${esc(s.bolumAdi)}</h1>
            <p>${esc(s.slogan)}</p>
            <a class="btn" href="duyurular.html">Duyurular</a>
            <a class="btn outline" href="urunler.html">Ürünlerimiz</a>
          </div>
        </div>
      </section>

      <section class="block alt">
        <div class="container two-col">
          <div>
            <h2>Kısaca Biz Kimiz?</h2>
            <div class="prose">${md(s.kisacaBizKimiz)}</div>
            <a class="btn primary" href="hakkimizda.html">Daha Fazlası</a>
          </div>
          <div>
            <div class="section-title"><h2>Son Duyurular</h2><a href="duyurular.html">Tümü →</a></div>
            ${latest.length ? latest.map((a) => `
              <a class="mini-ann" href="duyurular.html#${annId(a)}">
                <span class="tag ${CATEGORY_CLASS[a.kategori] || ""}">${esc(a.kategori || "Genel")}</span>
                ${a.sabitle ? `<span class="pin">📌 Sabit</span>` : ""}
                <strong>${esc(a.baslik)}</strong>
                <small>${formatDate(a.tarih)}</small>
              </a>`).join("") : `<div class="empty">Henüz duyuru yok.</div>`}
          </div>
        </div>
      </section>

      ${s.videoUrl ? `
      <section class="block">
        <div class="container">
          <div class="section-title"><h2>Tanıtım Videomuz</h2></div>
          ${youtubeEmbed(s.videoUrl)}
        </div>
      </section>` : ""}

      <section class="block ${s.videoUrl ? "alt" : ""}">
        <div class="container">
          <div class="section-title"><h2>Öğrencilerimizin Ürettikleri</h2><a href="urunler.html">Tüm ürünler →</a></div>
          <div class="grid cols-3">
            ${showProducts.map(productCard).join("") || `<div class="empty">Henüz ürün eklenmedi.</div>`}
          </div>
        </div>
      </section>`;
    bindProductDialogs(showProducts);
  },

  async hakkimizda(main, s) {
    const gallery = await load("galeri");
    const photos = gallery.liste || [];
    main.innerHTML = `
      ${pageHead("Hakkımızda", s.okulAdi)}
      <section class="block alt">
        <div class="container two-col">
          <div>
            <h2>Bölümümüz</h2>
            <div class="prose">${md(s.bolumHakkinda)}</div>
          </div>
          <div>
            <h2>Tarihçe</h2>
            <div class="prose">${md(s.tarihce)}</div>
          </div>
        </div>
      </section>
      ${s.videoUrl ? `
      <section class="block">
        <div class="container">
          <div class="section-title"><h2>Tanıtım Videosu</h2></div>
          ${youtubeEmbed(s.videoUrl)}
        </div>
      </section>` : ""}
      <section class="block ${s.videoUrl ? "alt" : ""}">
        <div class="container">
          <div class="section-title"><h2>Fotoğraf Galerisi</h2></div>
          ${photos.length ? `<div class="gallery">
            ${photos.map((p, i) => `<figure data-i="${i}"><img src="${esc(p.gorsel)}" alt="${esc(p.aciklama)}" loading="lazy">${p.aciklama ? `<figcaption>${esc(p.aciklama)}</figcaption>` : ""}</figure>`).join("")}
          </div>` : `<div class="empty">Galeriye henüz fotoğraf eklenmedi.</div>`}
        </div>
      </section>`;

    main.querySelectorAll(".gallery figure").forEach((fig) => {
      fig.addEventListener("click", () => {
        const p = photos[fig.dataset.i];
        openDialog(`<img src="${esc(p.gorsel)}" alt="${esc(p.aciklama)}">${p.aciklama ? `<p>${esc(p.aciklama)}</p>` : ""}`, "lightbox");
      });
    });
  },

  async duyurular(main) {
    const data = await load("duyurular");
    const list = sortAnnouncements(data.liste);
    const categories = ["Tümü", ...new Set(list.map((a) => a.kategori || "Genel"))];

    main.innerHTML = `
      ${pageHead("Duyurular", "Sınav takvimleri, etkinlikler ve bölümümüzden haberler")}
      <section class="block">
        <div class="container" style="max-width:900px">
          <div class="filters">${categories.map((c, i) => `<button class="${i === 0 ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("")}</div>
          <div id="ann-list"></div>
        </div>
      </section>`;

    const render = (cat) => {
      const items = cat === "Tümü" ? list : list.filter((a) => (a.kategori || "Genel") === cat);
      $("#ann-list").innerHTML = items.length ? items.map((a) => `
        <article class="announcement ${a.sabitle ? "pinned" : ""} ${CATEGORY_CLASS[a.kategori] || ""}" id="${annId(a)}">
          <span class="tag ${CATEGORY_CLASS[a.kategori] || ""}">${esc(a.kategori || "Genel")}</span>
          ${a.sabitle ? `<span class="pin">📌 Sabitlenmiş</span>` : ""}
          <h3>${esc(a.baslik)}</h3>
          <div class="date">${formatDate(a.tarih)}</div>
          <div class="prose">${md(a.metin)}</div>
          ${a.gorsel ? `<img src="${esc(a.gorsel)}" alt="${esc(a.baslik)}">` : ""}
          ${a.ek ? `<a class="attachment" href="${esc(a.ek)}" target="_blank" rel="noopener">📎 Eki görüntüle / indir</a>` : ""}
        </article>`).join("") : `<div class="empty">Bu kategoride duyuru yok.</div>`;
    };
    render("Tümü");

    main.querySelectorAll(".filters button").forEach((b) => b.addEventListener("click", () => {
      main.querySelectorAll(".filters button").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      render(b.dataset.cat);
    }));

    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  },

  async urunler(main) {
    const data = await load("urunler");
    const list = data.liste || [];
    main.innerHTML = `
      ${pageHead("Ürünlerimiz", data.aciklama || "Öğrencilerimizin atölye ve laboratuvarlarda ürettiği ürünler")}
      <section class="block">
        <div class="container">
          <div class="grid cols-3">${list.map(productCard).join("") || `<div class="empty">Henüz ürün eklenmedi.</div>`}</div>
        </div>
      </section>`;
    bindProductDialogs(list);
  },

  async kadro(main) {
    const data = await load("kadro");
    const list = data.liste || [];
    main.innerHTML = `
      ${pageHead("Kadromuz", "Kimya Teknolojisi Alanı öğretmenlerimiz")}
      <section class="block">
        <div class="container">
          <div class="grid cols-4">
            ${list.map((t) => `
              <div class="card person">
                ${t.fotograf ? `<img src="${esc(t.fotograf)}" alt="${esc(t.adSoyad)}" loading="lazy">` : `<div class="avatar">${initials(t.adSoyad)}</div>`}
                <h3>${esc(t.adSoyad)}</h3>
                <div class="role">${esc(t.unvan)}</div>
                ${t.brans ? `<div class="meta">${esc(t.brans)}</div>` : ""}
                ${t.hakkinda ? `<p>${esc(t.hakkinda)}</p>` : ""}
                ${t.eposta ? `<a href="mailto:${esc(t.eposta)}">${esc(t.eposta)}</a>` : ""}
              </div>`).join("") || `<div class="empty">Kadro bilgisi henüz eklenmedi.</div>`}
          </div>
        </div>
      </section>`;
  },

  async mezunlar(main) {
    const data = await load("mezunlar");
    const years = [...(data.liste || [])].sort((a, b) => String(b.yil).localeCompare(String(a.yil)));
    main.innerHTML = `
      ${pageHead("Mezunlarımız", data.aciklama || "Bölümümüzden mezun olan öğrencilerimiz")}
      <section class="block">
        <div class="container">
          ${years.map((y) => `
            <div class="grad-year">
              <h2>${esc(y.yil)} Mezunları</h2>
              ${y.aciklama ? `<div class="prose">${md(y.aciklama)}</div>` : ""}
              ${y.fotograf ? `<img class="class-photo" src="${esc(y.fotograf)}" alt="${esc(y.yil)} mezunları" loading="lazy">` : ""}
              ${(y.kisiler || []).length ? `<ul class="grad-list">
                ${y.kisiler.map((k) => `<li><strong>${esc(k.adSoyad)}</strong>${k.simdi ? `<small>${esc(k.simdi)}</small>` : ""}</li>`).join("")}
              </ul>` : ""}
            </div>`).join("") || `<div class="empty">Mezun bilgisi henüz eklenmedi.</div>`}
        </div>
      </section>`;
  },

  async "ders-programi"(main) {
    const data = await load("ders-programi");
    const list = data.liste || [];
    main.innerHTML = `
      ${pageHead("Ders Programı", data.donem || "")}
      <section class="block">
        <div class="container" style="max-width:1000px">
          ${data.aciklama ? `<div class="prose" style="margin-bottom:24px">${md(data.aciklama)}</div>` : ""}
          ${list.map((d) => {
            const isPdf = /\.pdf$/i.test(d.dosya || "");
            return `
            <div class="schedule">
              <h2>${esc(d.baslik)}</h2>
              ${d.not ? `<div class="prose">${md(d.not)}</div>` : ""}
              ${d.dosya ? (isPdf
                ? `<iframe src="${esc(d.dosya)}" title="${esc(d.baslik)}"></iframe><a class="attachment" href="${esc(d.dosya)}" target="_blank" rel="noopener">📄 PDF olarak aç</a>`
                : `<a href="${esc(d.dosya)}" target="_blank" rel="noopener"><img src="${esc(d.dosya)}" alt="${esc(d.baslik)}"></a>`) : ""}
            </div>`;
          }).join("") || `<div class="empty">Ders programı henüz eklenmedi.</div>`}
        </div>
      </section>`;
  },
};

function pageHead(title, sub) {
  return `<div class="page-head"><div class="container"><h1>${esc(title)}</h1>${sub ? `<p>${esc(sub)}</p>` : ""}</div></div>`;
}

function productCard(p, i) {
  return `
    <article class="card clickable" data-product="${i}">
      ${imgOrPlaceholder(p.gorsel, p.ad, "card-img", "🧼")}
      <div class="card-body">
        ${p.kategori ? `<div><span class="tag">${esc(p.kategori)}</span></div>` : ""}
        <h3 style="margin-top:8px">${esc(p.ad)}</h3>
        <p>${esc(p.kisaAciklama)}</p>
      </div>
    </article>`;
}

function bindProductDialogs(list) {
  document.querySelectorAll("[data-product]").forEach((el) => {
    el.addEventListener("click", () => {
      const p = list[el.dataset.product];
      openDialog(`
        ${p.gorsel ? `<img class="dlg-img" src="${esc(p.gorsel)}" alt="${esc(p.ad)}">` : ""}
        <div class="dlg-body">
          ${p.kategori ? `<span class="tag">${esc(p.kategori)}</span>` : ""}
          <h2 style="margin-top:10px">${esc(p.ad)}</h2>
          <div class="prose">${md(p.aciklama || p.kisaAciklama)}</div>
          ${p.icindekiler ? `<h3>İçindekiler</h3><p>${esc(p.icindekiler)}</p>` : ""}
          ${p.ureten ? `<p class="meta"><strong>Üreten:</strong> ${esc(p.ureten)}</p>` : ""}
        </div>`);
    });
  });
}

function openDialog(html, cls = "") {
  const dlg = document.createElement("dialog");
  dlg.className = cls;
  dlg.innerHTML = `<button class="dlg-close" aria-label="Kapat">×</button>${html}`;
  document.body.appendChild(dlg);
  dlg.showModal();
  const close = () => { dlg.close(); dlg.remove(); };
  dlg.querySelector(".dlg-close").addEventListener("click", close);
  dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); });
  dlg.addEventListener("cancel", () => dlg.remove());
}

// ---------- Başlat ----------
(async function init() {
  const settings = await load("ayarlar");
  renderChrome(settings);
  const page = document.body.dataset.page;
  const main = $("main");
  if (PAGES[page]) await PAGES[page](main, settings);
})();
