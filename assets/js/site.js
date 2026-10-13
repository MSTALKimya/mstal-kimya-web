/*
 * Kimya Teknolojisi Alanı web sitesi
 * Tüm içerik /content klasöründeki JSON dosyalarından okunur.
 * Öğretmenler bu dosyaları /admin panelinden düzenler; kod değiştirmeye gerek yoktur.
 */

// =========================================================
// İkonlar
// =========================================================
const ICONS = {
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  youtube: '<path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  x: '<path d="M4 4l11.7 16H20L8.3 4zM4 20l6.8-6.8M20 4l-6.8 6.8"/>',
  whatsapp: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  play: '<path d="m7 4 13 8-13 8z" fill="currentColor"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
  video: '<rect x="2" y="5" width="15" height="14" rx="2"/><path d="m22 8-5 4 5 4z"/>',
  flask: '<path d="M9 3h6M10 3v6.5L4.5 19A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2L14 9.5V3"/><path d="M7 15h10"/>',
  tube: '<path d="M14.5 2v17.5a2.5 2.5 0 0 1-5 0V2M8.5 2h7M14.5 16h-5"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
  grad: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  drop: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>',
  table: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
  presentation: '<path d="M2 3h20M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3M7 21l5-5 5 5"/>',
};

const icon = (name, cls = "") => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.flask}</svg>`;

const CATEGORY_CLASS = {
  "Sınav Takvimi": "c-sinav",
  "Etkinlik": "c-etkinlik",
  "Başarı": "c-basari",
  "Kariyer & İş İlanı": "c-kariyer",
};

const MATERIAL_ICON = { "Ders Kitabı": "book", "Video": "video", "Bağlantı": "link", "Sunum": "presentation", "Doküman": "file" };

// =========================================================
// Yardımcılar
// =========================================================
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const params = new URLSearchParams(location.search);

function esc(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function md(text) {
  if (!text) return "";
  return window.marked ? window.marked.parse(text) : `<p>${esc(text)}</p>`;
}

function plain(text, max = 180) {
  const t = String(text || "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~|-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return t.length > max ? t.slice(0, max).replace(/\s+\S*$/, "") + "…" : t;
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

const bySira = (a, b) => (Number(a.sira) || 99) - (Number(b.sira) || 99);
const postId = (p) => slug(`${p.tarih}-${p.baslik}`);
const courseId = (c) => slug(`${c.sinif}-${c.ad}`);
const pageId = (p) => slug(p.baslik);
const photosOf = (item) => (item.galeri || item.fotograflar || []).map((g) => (typeof g === "string" ? g : g.foto || g.gorsel)).filter(Boolean);
const coverOf = (p) => p.kapak || p.gorsel || photosOf(p)[0] || "";
const attachmentsOf = (p) => [...(p.ekler || []), ...(p.ek ? [{ baslik: "Ek dosya", dosya: p.ek }] : [])].filter((e) => e.dosya || e.link);

// Fotoğraflar yüklenirken GitHub tarafından otomatik küçültülür (.github/workflows/fotograf-kucult.yml).
function imgSrc(path) {
  return path || "";
}
function img(path, alt = "", w = 800, attrs = "") {
  return `<img src="${esc(imgSrc(path, w))}" data-orig="${esc(path)}" alt="${esc(alt)}" loading="lazy" ${attrs} onerror="if(!this.dataset.f){this.dataset.f=1;this.src=this.dataset.orig}">`;
}
const placeholder = (ic = "flask") => `<div class="placeholder">${icon(ic)}</div>`;
const media = (path, alt, w, ic) => (path ? img(path, alt, w) : placeholder(ic));

function ytId(url) {
  const m = String(url || "").match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/);
  return m ? m[1] : null;
}
function videoEmbed(url, title = "Video") {
  const id = ytId(url);
  if (id) return `<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${esc(title)}" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  if (/\.(mp4|webm)$/i.test(url || "")) return `<div class="video-frame"><video src="${esc(url)}" controls preload="metadata"></video></div>`;
  return "";
}
const videoThumb = (url) => (ytId(url) ? `https://i.ytimg.com/vi/${ytId(url)}/hqdefault.jpg` : "");

const cache = {};
function load(name) {
  if (!cache[name]) {
    cache[name] = fetch(`content/${name}.json`, { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : {}))
      .catch((e) => (console.error(`İçerik yüklenemedi: ${name}`, e), {}));
  }
  return cache[name];
}

function sortPosts(list, pinnedFirst = true) {
  return [...(list || [])].sort((a, b) => {
    if (pinnedFirst && !!b.sabitle !== !!a.sabitle) return b.sabitle ? 1 : -1;
    return String(b.tarih || "").localeCompare(String(a.tarih || ""));
  });
}

const empty = (text, ic = "image") => `<div class="empty">${icon(ic)}${esc(text)}</div>`;

// =========================================================
// Üst menü ve alt bilgi
// =========================================================
function buildNav(s, courses, pages) {
  const custom = (where) => pages.filter((p) => p.menu === where).sort(bySira).map((p) => ({ label: p.baslik, href: `sayfa.html?id=${pageId(p)}` }));

  const classes = [...new Set(courses.map((c) => c.sinif))].sort((a, b) => parseInt(a) - parseInt(b));
  const courseLinks = classes.flatMap((cl) => [
    { heading: `${cl}. Sınıf` },
    ...courses.filter((c) => c.sinif === cl).sort(bySira).map((c) => ({ label: c.ad, href: `ders.html?id=${courseId(c)}` })),
  ]);

  return [
    { label: "Ana Sayfa", href: "index.html" },
    { label: "Kurumsal", children: [
      { label: "Hakkımızda", href: "hakkimizda.html" },
      { label: "Kadromuz", href: "kadro.html" },
      { label: "Mezunlarımız", href: "mezunlar.html" },
      ...custom("Kurumsal"),
    ] },
    { label: "Haberler & Duyurular", href: "haberler.html", also: ["haber.html"] },
    { label: "Dersler", also: ["ders.html"], children: [
      { label: "Tüm Dersler", href: "dersler.html" },
      { label: "Ders Programı", href: "ders-programi.html" },
      ...(courseLinks.length ? [{ sep: true }, ...courseLinks] : []),
    ] },
    { label: "Ürünlerimiz", href: "urunler.html" },
    { label: "Resim & Video", href: "medya.html" },
    ...custom("Ana menü"),
    { label: "İletişim", href: "iletisim.html" },
  ];
}

function renderChrome(s, nav) {
  // Sunucu adresleri uzantısız gösterebilir (/haberler); menü eşleşmesi için .html eklenir.
  const last = location.pathname.split("/").pop() || "index";
  const file = last.includes(".") ? last : `${last}.html`;
  const here = file + location.search;
  const isActive = (item) =>
    item.href === here || item.href === file && !location.search ||
    (item.also || []).includes(file) ||
    (item.children || []).some((c) => c.href && (c.href === here || (c.href === file && !c.href.includes("?"))));

  const socials = [
    ["instagram", s.instagram, "Instagram"], ["youtube", s.youtube, "YouTube"],
    ["facebook", s.facebook, "Facebook"], ["x", s.x, "X"],
  ].filter(([, url]) => url);
  const socialLinks = socials.map(([ic, url, label]) => `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${label}">${icon(ic)}</a>`).join("");

  const navHtml = nav.map((item) => {
    if (!item.children) return `<div class="nav-item"><a class="nav-link ${isActive(item) ? "active" : ""}" href="${item.href}">${esc(item.label)}</a></div>`;
    const sub = item.children.map((c) =>
      c.sep ? "<hr>" : c.heading ? `<div class="dd-label">${esc(c.heading)}</div>` : `<a href="${c.href}">${esc(c.label)}</a>`).join("");
    return `<div class="nav-item"><button class="nav-link ${isActive(item) ? "active" : ""}" aria-haspopup="true">${esc(item.label)} ${icon("down")}</button><div class="dropdown">${sub}</div></div>`;
  }).join("");

  document.body.insertAdjacentHTML("afterbegin", `
    <div class="topbar">
      <div class="container">
        <div class="topbar-info">
          ${s.telefon ? `<a href="tel:${esc(s.telefon.replace(/\s/g, ""))}">${icon("phone")} ${esc(s.telefon)}</a>` : ""}
          ${s.eposta ? `<a href="mailto:${esc(s.eposta)}">${icon("mail")} ${esc(s.eposta)}</a>` : ""}
          ${!s.telefon && !s.eposta ? `<span>${esc(s.okulAdi)}</span>` : ""}
        </div>
        <div class="topbar-social">${socialLinks}${s.okulWebSitesi ? `<a href="${esc(s.okulWebSitesi)}" target="_blank" rel="noopener">${icon("globe")} Okul Sitesi</a>` : ""}</div>
      </div>
    </div>
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html">
          <img src="${esc(s.logo || "images/logo.svg")}" alt="${esc(s.okulAdi)} amblemi">
          <span class="brand-text"><small>${esc(s.okulAdi)}</small><strong>${esc(s.bolumAdi)}</strong></span>
        </a>
        <nav class="nav" aria-label="Ana menü">
          <button class="menu-btn nav-close" aria-label="Menüyü kapat">${icon("close")}</button>
          ${navHtml}
        </nav>
        <button class="menu-btn" id="menu-open" aria-label="Menüyü aç">${icon("menu")}</button>
      </div>
    </header>
    <div class="nav-backdrop"></div>`);

  const navEl = $(".nav"), backdrop = $(".nav-backdrop");
  const toggle = (open) => { navEl.classList.toggle("open", open); backdrop.classList.toggle("open", open); };
  $("#menu-open").addEventListener("click", () => toggle(true));
  $(".nav-close").addEventListener("click", () => toggle(false));
  backdrop.addEventListener("click", () => toggle(false));
  $$(".nav-item > button").forEach((b) => b.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 1140px)").matches) b.parentElement.classList.toggle("open");
  }));
  addEventListener("scroll", () => $(".site-header").classList.toggle("scrolled", scrollY > 10), { passive: true });

  const flat = nav.flatMap((n) => (n.children ? n.children.filter((c) => c.href && !c.href.startsWith("ders.html")) : [n]));
  document.body.insertAdjacentHTML("beforeend", `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">
              <img src="${esc(s.logo || "images/logo.svg")}" alt="">
              <div><strong>${esc(s.bolumAdi)}</strong><small>${esc(s.okulAdi)}</small></div>
            </div>
            <p>${esc(s.slogan)}</p>
            ${socialLinks ? `<div class="socials">${socialLinks}</div>` : ""}
          </div>
          <div>
            <h4>Hızlı Bağlantılar</h4>
            <ul>${flat.slice(0, 7).map((n) => `<li><a href="${n.href}">${esc(n.label)}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Bölümümüz</h4>
            <ul>${flat.slice(7).map((n) => `<li><a href="${n.href}">${esc(n.label)}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>İletişim</h4>
            <ul class="footer-contact">
              ${s.adres ? `<li>${icon("pin")}<span>${esc(s.adres)}</span></li>` : ""}
              ${s.telefon ? `<li>${icon("phone")}<a href="tel:${esc(s.telefon.replace(/\s/g, ""))}">${esc(s.telefon)}</a></li>` : ""}
              ${s.eposta ? `<li>${icon("mail")}<a href="mailto:${esc(s.eposta)}">${esc(s.eposta)}</a></li>` : ""}
              ${s.okulWebSitesi ? `<li>${icon("globe")}<a href="${esc(s.okulWebSitesi)}" target="_blank" rel="noopener">Okul web sitesi</a></li>` : ""}
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${esc(s.okulAdi)} · ${esc(s.bolumAdi)}</span>
          <a href="admin/">${icon("lock")} Yönetim Paneli</a>
        </div>
      </div>
    </footer>`);
}

function pageHero(title, sub = "", crumbs = []) {
  const trail = [["Ana Sayfa", "index.html"], ...crumbs];
  return `
    <section class="page-hero">
      <div class="hero-pattern"></div>
      <div class="container">
        <nav class="crumbs" aria-label="Konum">${trail.map(([l, h]) => `<a href="${h}">${esc(l)}</a>`).join(` ${icon("right")} `)} ${icon("right")} <span>${esc(title)}</span></nav>
        <h1>${esc(title)}</h1>
        ${sub ? `<p>${esc(sub)}</p>` : ""}
      </div>
    </section>`;
}

// =========================================================
// Ortak bileşenler
// =========================================================
function newsCard(p, variant = "") {
  const cat = p.kategori || "Haber";
  const photos = photosOf(p).length;
  return `
    <a class="card ${variant}" href="haber.html?id=${postId(p)}">
      <div class="card-media">
        ${media(coverOf(p), p.baslik, variant === "featured" ? 1100 : 700, "megaphone")}
        <span class="chip ${CATEGORY_CLASS[cat] || ""}">${esc(cat)}</span>
        ${photos > 1 ? `<span class="count">${icon("image")} ${photos}</span>` : ""}
      </div>
      <div class="card-body">
        <div class="meta" style="margin-bottom:10px">
          <span>${icon("calendar")} ${formatDate(p.tarih)}</span>
          ${p.sabitle ? `<span style="color:#a01d1d;font-weight:600">${icon("pin")} Sabit</span>` : ""}
        </div>
        <h3 class="clamp-2">${esc(p.baslik)}</h3>
        ${variant === "news-row" ? "" : `<p class="clamp-3">${esc(plain(p.metin, 220))}</p>`}
        ${variant === "news-row" ? "" : `<div class="card-foot"><span>${p.yazar ? `${icon("user")} ${esc(p.yazar)}` : ""}</span><span class="link-arrow">Devamı ${icon("arrow")}</span></div>`}
      </div>
    </a>`;
}

function productCard(p, i) {
  return `
    <article class="card clickable" data-product="${i}" tabindex="0">
      <div class="card-media" style="aspect-ratio:4/3">
        ${media(p.gorsel, p.ad, 700, "drop")}
        ${p.kategori ? `<span class="chip">${esc(p.kategori)}</span>` : ""}
      </div>
      <div class="card-body">
        <h3>${esc(p.ad)}</h3>
        <p class="clamp-2">${esc(p.kisaAciklama)}</p>
        <div class="card-foot"><span>${p.ureten ? esc(p.ureten) : ""}</span><span class="link-arrow">İncele ${icon("arrow")}</span></div>
      </div>
    </article>`;
}

function bindProducts(list) {
  $$("[data-product]").forEach((el) => {
    const open = () => {
      const p = list[el.dataset.product];
      openDialog(`
        ${p.gorsel ? `<div class="dlg-media">${img(p.gorsel, p.ad, 1200)}</div>` : ""}
        <div class="dlg-body">
          ${p.kategori ? `<span class="chip">${esc(p.kategori)}</span>` : ""}
          <h2 style="margin:12px 0 14px">${esc(p.ad)}</h2>
          <div class="prose">${md(p.aciklama || p.kisaAciklama)}</div>
          ${p.icindekiler || p.ureten || p.kullanim ? `<dl class="spec">
            ${p.icindekiler ? `<dt>İçindekiler</dt><dd>${esc(p.icindekiler)}</dd>` : ""}
            ${p.kullanim ? `<dt>Kullanım</dt><dd>${esc(p.kullanim)}</dd>` : ""}
            ${p.ureten ? `<dt>Üreten</dt><dd>${esc(p.ureten)}</dd>` : ""}
          </dl>` : ""}
        </div>`);
    };
    el.addEventListener("click", open);
    el.addEventListener("keydown", (e) => e.key === "Enter" && open());
  });
}

function personCard(t) {
  return `
    <div class="card person">
      <div class="avatar">${t.fotograf ? img(t.fotograf, t.adSoyad, 400) : initials(t.adSoyad)}</div>
      <h3>${esc(t.adSoyad)}</h3>
      <div class="role">${esc(t.unvan)}</div>
      ${t.brans ? `<div class="muted" style="font-size:14px">${esc(t.brans)}</div>` : ""}
      ${t.hakkinda ? `<p>${esc(t.hakkinda)}</p>` : ""}
      ${t.eposta ? `<a class="mail" href="mailto:${esc(t.eposta)}">${icon("mail")} ${esc(t.eposta)}</a>` : ""}
    </div>`;
}

function attachmentLink(e, ic = "file") {
  const url = e.dosya || e.link;
  const ext = (url.split("?")[0].split(".").pop() || "").toUpperCase();
  const isFile = !!e.dosya;
  return `
    <a class="attachment" href="${esc(url)}" target="_blank" rel="noopener">
      <span class="file-icon">${icon(ic)}</span>
      <span>${esc(e.baslik || "Dosya")}<small>${isFile ? (ext.length <= 4 ? ext + " dosyası" : "Dosya") : "Bağlantı"}${e.aciklama ? " · " + esc(e.aciklama) : ""}</small></span>
      <span class="dl">${icon(isFile ? "download" : "external")}</span>
    </a>`;
}

// Fotoğraf galerisi ve lightbox
const LB = {};
function galleryGrid(key, photos, caption = "") {
  LB[key] = photos.map((src) => ({ src, caption }));
  return `<div class="gallery">${photos.map((src, i) => `<button data-lb="${key}" data-i="${i}" aria-label="Fotoğrafı büyüt">${img(src, caption, 400)}</button>`).join("")}</div>`;
}

function openLightbox(items, start = 0) {
  let i = start;
  const dlg = document.createElement("dialog");
  dlg.className = "lightbox";
  dlg.innerHTML = `
    <button class="dlg-close" aria-label="Kapat">${icon("close")}</button>
    <div class="lb-count"></div>
    <div class="lb-stage"></div>
    <div class="lb-caption"></div>
    ${items.length > 1 ? `<button class="lb-btn lb-prev" aria-label="Önceki">${icon("left")}</button><button class="lb-btn lb-next" aria-label="Sonraki">${icon("right")}</button>` : ""}`;
  document.body.appendChild(dlg);
  const show = () => {
    const it = items[i];
    $(".lb-stage", dlg).innerHTML = it.video ? videoEmbed(it.video, it.caption) : `<img src="${esc(imgSrc(it.src, 1800))}" data-orig="${esc(it.src)}" alt="${esc(it.caption)}" onerror="if(!this.dataset.f){this.dataset.f=1;this.src=this.dataset.orig}">`;
    $(".lb-caption", dlg).textContent = it.caption || "";
    $(".lb-count", dlg).textContent = items.length > 1 ? `${i + 1} / ${items.length}` : "";
  };
  const go = (d) => { i = (i + d + items.length) % items.length; show(); };
  const close = () => { dlg.close(); dlg.remove(); document.removeEventListener("keydown", keys); };
  const keys = (e) => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); };
  $(".dlg-close", dlg).onclick = close;
  $(".lb-prev", dlg)?.addEventListener("click", () => go(-1));
  $(".lb-next", dlg)?.addEventListener("click", () => go(1));
  dlg.addEventListener("cancel", (e) => { e.preventDefault(); close(); });
  dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.classList.contains("lb-stage")) close(); });
  let touchX = null;
  dlg.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  dlg.addEventListener("touchend", (e) => { if (touchX === null) return; const dx = e.changedTouches[0].clientX - touchX; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); touchX = null; });
  document.addEventListener("keydown", keys);
  dlg.showModal();
  show();
}

document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-lb]");
  if (b && LB[b.dataset.lb]) openLightbox(LB[b.dataset.lb], Number(b.dataset.i || 0));
});

function openDialog(html, cls = "") {
  const dlg = document.createElement("dialog");
  dlg.className = cls;
  dlg.innerHTML = `<button class="dlg-close" aria-label="Kapat">${icon("close")}</button>${html}`;
  document.body.appendChild(dlg);
  dlg.showModal();
  const close = () => { dlg.close(); dlg.remove(); };
  $(".dlg-close", dlg).addEventListener("click", close);
  dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); });
  dlg.addEventListener("cancel", () => setTimeout(() => dlg.remove()));
}

function shareBar(title) {
  const url = location.href;
  const u = encodeURIComponent(url), t = encodeURIComponent(title);
  return `
    <div class="share">
      <span>Paylaş:</span>
      <a class="wa" href="https://wa.me/?text=${t}%20${u}" target="_blank" rel="noopener" aria-label="WhatsApp ile paylaş">${icon("whatsapp")}</a>
      <a class="fb" href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener" aria-label="Facebook'ta paylaş">${icon("facebook")}</a>
      <a class="x" href="https://twitter.com/intent/tweet?url=${u}&text=${t}" target="_blank" rel="noopener" aria-label="X'te paylaş">${icon("x")}</a>
      <button class="cp" type="button" aria-label="Bağlantıyı kopyala" onclick="navigator.clipboard.writeText(location.href).then(()=>{this.innerHTML='${icon("check").replace(/"/g, "&quot;")}'})">${icon("link")}</button>
    </div>`;
}

function recentWidget(posts, exceptId) {
  const list = sortPosts(posts, false).filter((p) => postId(p) !== exceptId).slice(0, 5);
  if (!list.length) return "";
  return `
    <div class="widget">
      <h4>Son Haberler</h4>
      ${list.map((p) => `
        <a class="mini-post" href="haber.html?id=${postId(p)}">
          <span class="thumb">${media(coverOf(p), p.baslik, 200, "megaphone")}</span>
          <span><strong class="clamp-2">${esc(p.baslik)}</strong><small>${formatDate(p.tarih)}</small></span>
        </a>`).join("")}
    </div>`;
}

function notFound(main, what, back, backLabel) {
  main.innerHTML = `${pageHero(`${what} bulunamadı`)}
    <section class="section"><div class="container center">
      <p class="muted">Aradığınız ${what.toLocaleLowerCase("tr-TR")} kaldırılmış ya da adı değişmiş olabilir.</p>
      <a class="btn btn-primary" href="${back}">${esc(backLabel)} ${icon("arrow")}</a>
    </div></section>`;
}

// =========================================================
// Sayfalar
// =========================================================
const PAGES = {
  // ---------- Ana Sayfa ----------
  async index(main, s) {
    const [news, products, staff, courses, grads] = await Promise.all([load("haberler"), load("urunler"), load("kadro"), load("dersler"), load("mezunlar")]);
    const posts = sortPosts(news.liste);
    const pinned = posts.filter((p) => p.sabitle);
    const latest = sortPosts(news.liste, false);
    const productList = products.liste || [];
    const showProducts = (productList.filter((p) => p.oneCikar).length ? productList.filter((p) => p.oneCikar) : productList).slice(0, 4);
    const gradCount = (grads.liste || []).reduce((n, y) => n + (y.kisiler || []).length, 0);

    const words = String(s.bolumAdi || "").split(" ");
    const title = words.length > 1 ? `${esc(words.slice(0, -1).join(" "))} <span>${esc(words.at(-1))}</span>` : esc(s.bolumAdi);

    const stats = [
      s.kurulusYili && ["calendar", s.kurulusYili, "Kuruluş yılı"],
      (staff.liste || []).length && ["users", staff.liste.length, "Öğretmen"],
      (courses.liste || []).length && ["book", courses.liste.length, "Meslek dersi"],
      productList.length && ["flask", productList.length, "Öğrenci ürünü"],
      gradCount && ["grad", gradCount, "Mezun"],
    ].filter(Boolean);

    const reasons = s.neden || [];

    main.innerHTML = `
      ${pinned.length ? `
      <div class="notice-bar"><div class="container">
        <span class="label">${icon("megaphone")} Duyuru</span>
        <div class="notice-list">${pinned.slice(0, 3).map((p) => `<a href="haber.html?id=${postId(p)}">${esc(p.baslik)}</a>`).join("")}</div>
      </div></div>` : ""}

      <section class="hero">
        ${s.heroGorsel ? `<div class="hero-bg" style="background-image:url('${esc(imgSrc(s.heroGorsel, 1920))}')"></div>` : ""}
        <div class="hero-pattern"></div>
        <div class="container" style="position:relative">
          <div class="hero-inner">
            <div class="eyebrow">${icon("flask")} ${esc(s.okulAdi)}</div>
            <h1>${title}</h1>
            <p>${esc(s.slogan)}</p>
            <div class="hero-actions">
              <a class="btn btn-accent" href="hakkimizda.html">Bölümümüzü Tanıyın ${icon("arrow")}</a>
              <a class="btn btn-ghost" href="haberler.html">Haberler & Duyurular</a>
            </div>
          </div>
          <img class="hero-logo" src="${esc(s.logo || "images/logo.svg")}" alt="${esc(s.okulAdi)} amblemi">
        </div>
      </section>

      ${stats.length ? `
      <div class="stats"><div class="container"><div class="stats-grid">
        ${stats.map(([ic, n, l]) => `<div class="stat"><span class="stat-icon">${icon(ic)}</span><div><strong>${esc(n)}</strong><span>${l}</span></div></div>`).join("")}
      </div></div></div>` : ""}

      <section class="section">
        <div class="container about">
          <div class="about-media">${media(s.tanitimGorsel, s.bolumAdi, 1000, "flask")}</div>
          <div>
            <div class="eyebrow">Biz Kimiz?</div>
            <h2 style="font-size:clamp(28px,3.2vw,38px);font-weight:800">Kısaca Biz Kimiz</h2>
            <div class="prose">${md(s.kisacaBizKimiz)}</div>
            <a class="btn btn-primary" href="hakkimizda.html" style="margin-top:22px">Daha Fazla Bilgi ${icon("arrow")}</a>
          </div>
        </div>
      </section>

      ${reasons.length ? `
      <section class="section white">
        <div class="container">
          <div class="section-head"><div><div class="eyebrow">Neden Biz?</div><h2>Neden Kimya Teknolojisi?</h2></div></div>
          <div class="grid grid-4">
            ${reasons.map((r) => `<div class="feature"><div class="feature-icon">${icon(r.ikon)}</div><h3>${esc(r.baslik)}</h3><p>${esc(r.aciklama)}</p></div>`).join("")}
          </div>
        </div>
      </section>` : ""}

      <section class="section">
        <div class="container">
          <div class="section-head">
            <div><div class="eyebrow">Bölümümüzden</div><h2>Haberler & Duyurular</h2></div>
            <a class="link-arrow" href="haberler.html">Tüm haberler ${icon("arrow")}</a>
          </div>
          ${latest.length ? `
          <div class="news-layout">
            ${newsCard(latest[0], "featured")}
            <div class="side">${latest.slice(1, 4).map((p) => newsCard(p, "news-row")).join("")}</div>
          </div>` : empty("Henüz haber eklenmedi.", "megaphone")}
        </div>
      </section>

      ${s.videoUrl ? `
      <section class="section dark">
        <div class="container video-split">
          <div>
            <div class="eyebrow">${icon("play")} Tanıtım Filmi</div>
            <h2 style="font-size:clamp(28px,3.2vw,38px)">${esc(s.videoBaslik || "Bölümümüzü yakından tanıyın")}</h2>
            <p>${esc(s.videoAciklama || "Laboratuvarlarımızı, atölyelerimizi ve öğrencilerimizin çalışmalarını tanıtım videomuzda izleyebilirsiniz.")}</p>
            <a class="btn btn-ghost" href="medya.html" style="margin-top:12px">Tüm Fotoğraf ve Videolar ${icon("arrow")}</a>
          </div>
          ${videoEmbed(s.videoUrl, "Tanıtım videosu")}
        </div>
      </section>` : ""}

      <section class="section ${s.videoUrl ? "" : "white"}">
        <div class="container">
          <div class="section-head">
            <div><div class="eyebrow">Atölyelerimizden</div><h2>Öğrencilerimizin Ürettikleri</h2><p>Laboratuvar ve atölyelerimizde öğrencilerimizin kendi elleriyle ürettiği ürünler.</p></div>
            <a class="link-arrow" href="urunler.html">Tüm ürünler ${icon("arrow")}</a>
          </div>
          <div class="grid grid-4">${showProducts.map(productCard).join("") || empty("Henüz ürün eklenmedi.", "drop")}</div>
        </div>
      </section>

      <section class="section tight">
        <div class="container">
          <div class="cta">
            <div><h2>${esc(s.ctaBaslik || "Geleceğini laboratuvarda şekillendir!")}</h2><p>${esc(s.ctaMetin || "Bölümümüz hakkında bilgi almak için bizimle iletişime geçin.")}</p></div>
            <a class="btn btn-accent" href="iletisim.html">Bize Ulaşın ${icon("arrow")}</a>
          </div>
        </div>
      </section>`;
    bindProducts(showProducts);
  },

  // ---------- Hakkımızda ----------
  async hakkimizda(main, s) {
    const staff = await load("kadro");
    const reasons = s.neden || [];
    main.innerHTML = `
      ${pageHero("Hakkımızda", s.okulAdi)}
      <section class="section white">
        <div class="container about">
          <div class="about-media">${media(s.tanitimGorsel, s.bolumAdi, 1000, "flask")}</div>
          <div>
            <div class="eyebrow">Bölümümüz</div>
            <h2 style="font-size:clamp(26px,3vw,34px)">${esc(s.bolumAdi)}</h2>
            <div class="prose">${md(s.bolumHakkinda)}</div>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container" style="max-width:860px">
          <div class="eyebrow">${icon("clock")} Geçmişten Bugüne</div>
          <h2 style="font-size:clamp(26px,3vw,34px)">Tarihçemiz</h2>
          <div class="prose">${md(s.tarihce)}</div>
        </div>
      </section>
      ${s.videoUrl ? `
      <section class="section dark">
        <div class="container" style="max-width:980px">
          <div class="section-head"><div><div class="eyebrow">Tanıtım Filmi</div><h2>${esc(s.videoBaslik || "Bölümümüzü yakından tanıyın")}</h2></div></div>
          ${videoEmbed(s.videoUrl, "Tanıtım videosu")}
        </div>
      </section>` : ""}
      ${reasons.length ? `
      <section class="section white">
        <div class="container">
          <div class="section-head"><div><div class="eyebrow">Neden Biz?</div><h2>Neden Kimya Teknolojisi?</h2></div></div>
          <div class="grid grid-4">${reasons.map((r) => `<div class="feature"><div class="feature-icon">${icon(r.ikon)}</div><h3>${esc(r.baslik)}</h3><p>${esc(r.aciklama)}</p></div>`).join("")}</div>
        </div>
      </section>` : ""}
      ${(staff.liste || []).length ? `
      <section class="section">
        <div class="container">
          <div class="section-head"><div><div class="eyebrow">Ekibimiz</div><h2>Öğretmenlerimiz</h2></div><a class="link-arrow" href="kadro.html">Tüm kadro ${icon("arrow")}</a></div>
          <div class="grid grid-4">${staff.liste.slice(0, 4).map(personCard).join("")}</div>
        </div>
      </section>` : ""}`;
  },

  // ---------- Haberler listesi ----------
  async haberler(main) {
    const data = await load("haberler");
    const posts = sortPosts(data.liste);
    const cats = ["Tümü", ...new Set(posts.map((p) => p.kategori || "Haber"))];
    let cat = cats.includes(params.get("kategori")) ? params.get("kategori") : "Tümü";
    let q = "", shown = 9;

    main.innerHTML = `
      ${pageHero("Haberler & Duyurular", "Sınav takvimleri, etkinlikler, başarılarımız ve bölümümüzden haberler")}
      <section class="section">
        <div class="container">
          <div class="toolbar">
            <div class="filters">${cats.map((c) => `<button data-cat="${esc(c)}" class="${c === cat ? "active" : ""}">${esc(c)}</button>`).join("")}</div>
            <label class="search">${icon("search")}<span class="visually-hidden">Ara</span><input type="search" placeholder="Haberlerde ara…"></label>
          </div>
          <div class="grid grid-3" id="list"></div>
          <div class="load-more"></div>
        </div>
      </section>`;

    const render = () => {
      const needle = q.toLocaleLowerCase("tr-TR");
      const items = posts.filter((p) => (cat === "Tümü" || (p.kategori || "Haber") === cat) &&
        (!needle || `${p.baslik} ${p.metin}`.toLocaleLowerCase("tr-TR").includes(needle)));
      $("#list").innerHTML = items.slice(0, shown).map((p) => newsCard(p)).join("") || empty("Aramanıza uygun haber bulunamadı.", "search");
      $(".load-more").innerHTML = items.length > shown ? `<button class="btn btn-outline">Daha fazla göster (${items.length - shown}) ${icon("down")}</button>` : "";
      $(".load-more button")?.addEventListener("click", () => { shown += 9; render(); });
    };
    $$(".filters button").forEach((b) => b.addEventListener("click", () => {
      $$(".filters button").forEach((x) => x.classList.toggle("active", x === b));
      cat = b.dataset.cat; shown = 9; render();
      history.replaceState(null, "", cat === "Tümü" ? "haberler.html" : `haberler.html?kategori=${encodeURIComponent(cat)}`);
    }));
    $(".search input").addEventListener("input", (e) => { q = e.target.value.trim(); shown = 9; render(); });
    render();
  },

  // ---------- Haber detayı ----------
  async haber(main) {
    const data = await load("haberler");
    const posts = data.liste || [];
    const id = params.get("id");
    const p = posts.find((x) => postId(x) === id);
    if (!p) return notFound(main, "Haber", "haberler.html", "Tüm haberler");

    document.title = p.baslik;
    const cat = p.kategori || "Haber";
    const photos = photosOf(p);
    const cover = coverOf(p);
    const gallery = photos.filter((ph) => ph !== cover || photos.length > 1);
    const files = attachmentsOf(p);
    const cats = [...new Set(posts.map((x) => x.kategori || "Haber"))];

    main.innerHTML = `
      ${pageHero(cat, "", [["Haberler & Duyurular", "haberler.html"]])}
      <section class="section">
        <div class="container with-sidebar">
          <article class="article">
            ${cover ? `<div class="article-cover">${img(cover, p.baslik, 1400)}</div>` : ""}
            <div class="article-body">
              <span class="chip ${CATEGORY_CLASS[cat] || ""}">${esc(cat)}</span>
              <h1>${esc(p.baslik)}</h1>
              <div class="meta">
                <span>${icon("calendar")} ${formatDate(p.tarih)}</span>
                ${p.yazar ? `<span>${icon("user")} ${esc(p.yazar)}</span>` : ""}
                ${photos.length ? `<span>${icon("image")} ${photos.length} fotoğraf</span>` : ""}
              </div>
              <div class="prose">${md(p.metin)}</div>
              ${p.videoUrl ? `<h3 class="block-title">${icon("video")} Video</h3>${videoEmbed(p.videoUrl, p.baslik)}` : ""}
              ${gallery.length ? `<h3 class="block-title">${icon("image")} Fotoğraflar</h3>${galleryGrid("post", gallery, p.baslik)}` : ""}
              ${files.length ? `<h3 class="block-title">${icon("file")} Ekler</h3>${files.map((f) => attachmentLink(f)).join("")}` : ""}
              ${shareBar(p.baslik)}
            </div>
          </article>
          <aside class="sidebar">
            ${recentWidget(posts, id)}
            <div class="widget"><h4>Kategoriler</h4><div class="tag-list">${cats.map((c) => `<a class="chip ${CATEGORY_CLASS[c] || ""}" href="haberler.html?kategori=${encodeURIComponent(c)}">${esc(c)}</a>`).join("")}</div></div>
          </aside>
        </div>
      </section>`;
  },

  // ---------- Dersler ----------
  async dersler(main) {
    const [data, staff] = await Promise.all([load("dersler"), load("kadro")]);
    const courses = data.liste || [];
    const classes = [...new Set(courses.map((c) => c.sinif))].sort((a, b) => parseInt(a) - parseInt(b));
    main.innerHTML = `
      ${pageHero("Dersler", data.aciklama || "Alan derslerimiz, ders notları ve kaynaklar")}
      <section class="section">
        <div class="container">
          <div class="toolbar">
            <div class="filters">${classes.map((c) => `<button onclick="document.getElementById('sinif-${slug(c)}').scrollIntoView()">${esc(c)}. Sınıf</button>`).join("")}</div>
            <a class="btn btn-outline" href="ders-programi.html">${icon("table")} Ders Programı</a>
          </div>
          ${classes.map((cl) => `
            <div class="class-group" id="sinif-${slug(cl)}">
              <div class="class-head"><span class="class-badge">${esc(cl)}</span><h2>${esc(cl)}. Sınıf Dersleri</h2></div>
              <div class="grid grid-3">
                ${courses.filter((c) => c.sinif === cl).sort(bySira).map((c) => `
                  <a class="card course-card" href="ders.html?id=${courseId(c)}">
                    <div class="card-body">
                      <span class="course-icon">${icon("flask")}</span>
                      <h3>${esc(c.ad)}</h3>
                      <p class="clamp-3">${esc(c.ozet || plain(c.aciklama, 160))}</p>
                      <div class="card-foot">
                        <span>${icon("file")} ${(c.materyaller || []).length} kaynak</span>
                        <span class="link-arrow">Derse git ${icon("arrow")}</span>
                      </div>
                    </div>
                  </a>`).join("")}
              </div>
            </div>`).join("") || empty("Henüz ders eklenmedi.", "book")}
        </div>
      </section>`;
  },

  // ---------- Ders detayı ----------
  async ders(main) {
    const [data, staff] = await Promise.all([load("dersler"), load("kadro")]);
    const courses = data.liste || [];
    const c = courses.find((x) => courseId(x) === params.get("id"));
    if (!c) return notFound(main, "Ders", "dersler.html", "Tüm dersler");
    document.title = c.ad;

    const units = [];
    (c.materyaller || []).forEach((m) => {
      const name = m.unite || "Ders Kaynakları";
      let u = units.find((x) => x.name === name);
      if (!u) units.push((u = { name, items: [] }));
      u.items.push(m);
    });
    const videos = (c.materyaller || []).filter((m) => m.tur === "Video" && ytId(m.link));
    LB.dersvideo = videos.map((m) => ({ video: m.link, caption: m.baslik }));
    const teachers = (staff.liste || []).filter((t) => (c.ogretmenler || []).includes(t.adSoyad));
    const siblings = courses.filter((x) => x.sinif === c.sinif && x !== c).sort(bySira);

    const materialHtml = (m) => {
      if (m.tur === "Video" && ytId(m.link)) {
        return `<button class="attachment" style="width:100%;text-align:left;font:inherit;font-weight:600;cursor:pointer" data-lb="dersvideo" data-i="${videos.indexOf(m)}">
          <span class="file-icon">${icon("play")}</span><span>${esc(m.baslik)}<small>Video${m.aciklama ? " · " + esc(m.aciklama) : ""}</small></span><span class="dl">${icon("play")}</span></button>`;
      }
      return m.dosya || m.link ? attachmentLink(m, MATERIAL_ICON[m.tur] || "file") : `<div class="attachment"><span class="file-icon">${icon("file")}</span><span>${esc(m.baslik)}</span></div>`;
    };

    main.innerHTML = `
      ${pageHero(`${c.sinif}. Sınıf Dersleri`, "", [["Dersler", "dersler.html"]])}
      <section class="section">
        <div class="container with-sidebar">
          <article class="article">
            ${c.kapak ? `<div class="article-cover">${img(c.kapak, c.ad, 1400)}</div>` : ""}
            <div class="article-body">
              <span class="chip">${esc(c.sinif)}. Sınıf</span>
              <h1>${esc(c.ad)}</h1>
              <div class="meta">
                ${c.haftalikSaat ? `<span>${icon("clock")} Haftalık ${esc(c.haftalikSaat)} saat</span>` : ""}
                <span>${icon("file")} ${(c.materyaller || []).length} kaynak</span>
              </div>
              <div class="prose">${md(c.aciklama)}</div>
              ${units.map((u) => `<div class="unit"><h3>${esc(u.name)}</h3><div class="material-list">${u.items.map(materialHtml).join("")}</div></div>`).join("")}
              ${shareBar(c.ad)}
            </div>
          </article>
          <aside class="sidebar">
            ${teachers.length ? `<div class="widget"><h4>Dersin Öğretmenleri</h4>${teachers.map((t) => `
              <div class="mini-post"><span class="thumb" style="border-radius:50%;width:52px;height:52px">${t.fotograf ? img(t.fotograf, t.adSoyad, 120) : `<span class="placeholder" style="font-weight:700">${initials(t.adSoyad)}</span>`}</span>
              <span><strong>${esc(t.adSoyad)}</strong><small>${esc(t.unvan)}</small></span></div>`).join("")}</div>` : ""}
            ${siblings.length ? `<div class="widget"><h4>${esc(c.sinif)}. Sınıf Diğer Dersler</h4>${siblings.map((x) => `
              <a class="mini-post" href="ders.html?id=${courseId(x)}"><span class="thumb" style="display:grid;place-items:center;color:var(--primary)">${icon("book")}</span><span><strong>${esc(x.ad)}</strong><small>${(x.materyaller || []).length} kaynak</small></span></a>`).join("")}</div>` : ""}
            <a class="btn btn-outline" href="ders-programi.html" style="justify-content:center">${icon("table")} Ders Programı</a>
          </aside>
        </div>
      </section>`;
  },

  // ---------- Ders programı ----------
  async "ders-programi"(main) {
    const data = await load("ders-programi");
    const list = data.liste || [];
    main.innerHTML = `
      ${pageHero("Ders Programı", data.donem || "", [["Dersler", "dersler.html"]])}
      <section class="section">
        <div class="container" style="max-width:1040px">
          ${data.aciklama ? `<div class="prose" style="margin-bottom:28px">${md(data.aciklama)}</div>` : ""}
          ${list.map((d) => {
            const isPdf = /\.pdf$/i.test(d.dosya || "");
            return `
            <div class="schedule">
              <h2 style="font-size:24px">${esc(d.baslik)}</h2>
              ${d.not ? `<div class="prose">${md(d.not)}</div>` : ""}
              ${d.dosya ? (isPdf
                ? `<iframe src="${esc(d.dosya)}" title="${esc(d.baslik)}"></iframe>${attachmentLink({ baslik: "PDF olarak aç / indir", dosya: d.dosya })}`
                : `<button data-lb="prog-${slug(d.baslik)}" style="border:0;padding:0;background:none;cursor:zoom-in;width:100%">${img(d.dosya, d.baslik, 1600)}</button>`) : ""}
            </div>`;
          }).join("") || empty("Ders programı henüz eklenmedi.", "table")}
        </div>
      </section>`;
    list.forEach((d) => d.dosya && (LB[`prog-${slug(d.baslik)}`] = [{ src: d.dosya, caption: d.baslik }]));
  },

  // ---------- Ürünler ----------
  async urunler(main) {
    const data = await load("urunler");
    const list = data.liste || [];
    const cats = ["Tümü", ...new Set(list.map((p) => p.kategori).filter(Boolean))];
    main.innerHTML = `
      ${pageHero("Ürünlerimiz", data.aciklama || "Öğrencilerimizin atölye ve laboratuvarlarda ürettiği ürünler")}
      <section class="section">
        <div class="container">
          ${cats.length > 2 ? `<div class="toolbar"><div class="filters">${cats.map((c, i) => `<button class="${i ? "" : "active"}" data-cat="${esc(c)}">${esc(c)}</button>`).join("")}</div></div>` : ""}
          <div class="grid grid-4" id="list">${list.map(productCard).join("") || empty("Henüz ürün eklenmedi.", "drop")}</div>
        </div>
      </section>`;
    bindProducts(list);
    $$(".filters button").forEach((b) => b.addEventListener("click", () => {
      $$(".filters button").forEach((x) => x.classList.toggle("active", x === b));
      $$("[data-product]").forEach((el) => {
        el.style.display = b.dataset.cat === "Tümü" || list[el.dataset.product].kategori === b.dataset.cat ? "" : "none";
      });
    }));
  },

  // ---------- Kadro ----------
  async kadro(main) {
    const data = await load("kadro");
    const list = data.liste || [];
    main.innerHTML = `
      ${pageHero("Kadromuz", data.aciklama || "Kimya Teknolojisi Alanı öğretmenlerimiz", [["Kurumsal", "hakkimizda.html"]])}
      <section class="section">
        <div class="container">
          <div class="grid grid-4">${list.map(personCard).join("") || empty("Kadro bilgisi henüz eklenmedi.", "users")}</div>
        </div>
      </section>`;
  },

  // ---------- Mezunlar ----------
  async mezunlar(main) {
    const data = await load("mezunlar");
    const years = [...(data.liste || [])].sort((a, b) => String(b.yil).localeCompare(String(a.yil)));
    main.innerHTML = `
      ${pageHero("Mezunlarımız", data.aciklama || "Bölümümüzden mezun olan öğrencilerimiz", [["Kurumsal", "hakkimizda.html"]])}
      <section class="section">
        <div class="container">
          ${years.map((y, i) => {
            if (y.fotograf) LB[`grad${i}`] = [{ src: y.fotograf, caption: `${y.yil} Mezunları` }];
            return `
            <div class="year-block">
              <header><span class="year-pill">${esc(y.yil)}</span><h2 style="margin:0;font-size:24px">Mezunları</h2>
                ${(y.kisiler || []).length ? `<span class="muted" style="margin-left:auto">${y.kisiler.length} mezun</span>` : ""}</header>
              ${y.aciklama ? `<div class="prose" style="margin-bottom:18px">${md(y.aciklama)}</div>` : ""}
              ${y.fotograf ? `<button data-lb="grad${i}" style="border:0;padding:0;background:none;width:100%">${img(y.fotograf, `${y.yil} mezunları`, 1600, 'class="class-photo"')}</button>` : ""}
              ${(y.kisiler || []).length ? `<ul class="grad-list">
                ${y.kisiler.map((k) => `<li><span class="ini">${initials(k.adSoyad)}</span><span><strong>${esc(k.adSoyad)}</strong>${k.simdi ? `<small>${esc(k.simdi)}</small>` : ""}</span></li>`).join("")}
              </ul>` : ""}
            </div>`;
          }).join("") || empty("Mezun bilgisi henüz eklenmedi.", "grad")}
        </div>
      </section>`;
  },

  // ---------- Resim & Video ----------
  async medya(main) {
    const [data, news] = await Promise.all([load("medya"), load("haberler")]);
    const albums = [
      ...(data.albumler || []).map((a) => ({ baslik: a.baslik, tarih: a.tarih, aciklama: a.aciklama, photos: photosOf(a) })),
      ...sortPosts(news.liste, false).filter((p) => photosOf(p).length > 1).map((p) => ({ baslik: p.baslik, tarih: p.tarih, photos: photosOf(p), link: `haber.html?id=${postId(p)}` })),
    ].filter((a) => a.photos.length).sort((a, b) => String(b.tarih || "").localeCompare(String(a.tarih || "")));
    const videos = [...(data.videolar || [])];
    const tab = params.get("sekme") === "video" ? "video" : "foto";

    albums.forEach((a, i) => (LB[`album${i}`] = a.photos.map((src) => ({ src, caption: a.baslik }))));
    LB.videos = videos.map((v) => ({ video: v.url, caption: v.baslik }));

    main.innerHTML = `
      ${pageHero("Resim & Video", "Okulumuzdan, atölyelerimizden ve etkinliklerimizden kareler")}
      <section class="section">
        <div class="container">
          <div class="tabs" role="tablist">
            <button data-tab="foto" class="${tab === "foto" ? "active" : ""}">${icon("image")} Fotoğraf Albümleri (${albums.length})</button>
            <button data-tab="video" class="${tab === "video" ? "active" : ""}">${icon("video")} Videolar (${videos.length})</button>
          </div>
          <div data-panel="foto" ${tab === "foto" ? "" : "hidden"}>
            <div class="grid grid-3">
              ${albums.map((a, i) => `
                <article class="card clickable" data-lb="album${i}" data-i="0">
                  <div class="card-media">${img(a.photos[0], a.baslik, 700)}<span class="count">${icon("image")} ${a.photos.length}</span></div>
                  <div class="card-body">
                    <h3 class="clamp-2">${esc(a.baslik)}</h3>
                    ${a.aciklama ? `<p class="clamp-2">${esc(a.aciklama)}</p>` : ""}
                    <div class="card-foot"><span>${a.tarih ? `${icon("calendar")} ${formatDate(a.tarih)}` : ""}</span>
                      ${a.link ? `<a class="link-arrow" href="${a.link}" onclick="event.stopPropagation()">Haberi oku ${icon("arrow")}</a>` : `<span class="link-arrow">Albümü aç ${icon("arrow")}</span>`}</div>
                  </div>
                </article>`).join("") || empty("Henüz fotoğraf albümü eklenmedi.", "image")}
            </div>
          </div>
          <div data-panel="video" ${tab === "video" ? "" : "hidden"}>
            <div class="grid grid-3">
              ${videos.map((v, i) => `
                <article class="card clickable video-card" data-lb="videos" data-i="${i}">
                  <div class="card-media">${videoThumb(v.url) ? `<img src="${videoThumb(v.url)}" alt="" loading="lazy">` : placeholder("video")}<div class="play"><span>${icon("play")}</span></div></div>
                  <div class="card-body"><h3 class="clamp-2">${esc(v.baslik)}</h3>${v.aciklama ? `<p class="clamp-2">${esc(v.aciklama)}</p>` : ""}</div>
                </article>`).join("") || empty("Henüz video eklenmedi.", "video")}
            </div>
          </div>
        </div>
      </section>`;

    $$(".tabs button").forEach((b) => b.addEventListener("click", () => {
      $$(".tabs button").forEach((x) => x.classList.toggle("active", x === b));
      $$("[data-panel]").forEach((p) => (p.hidden = p.dataset.panel !== b.dataset.tab));
      history.replaceState(null, "", b.dataset.tab === "video" ? "medya.html?sekme=video" : "medya.html");
    }));
  },

  // ---------- İletişim ----------
  async iletisim(main, s) {
    const mapQuery = s.haritaKonum || [s.okulAdi, s.adres].filter(Boolean).join(" ");
    main.innerHTML = `
      ${pageHero("İletişim", "Bölümümüz hakkında bilgi almak için bize ulaşabilirsiniz")}
      <section class="section">
        <div class="container contact-grid">
          <div>
            ${s.adres ? `<div class="contact-item"><span class="ci">${icon("pin")}</span><div><small>Adres</small><strong>${esc(s.adres)}</strong></div></div>` : ""}
            ${s.telefon ? `<a class="contact-item" href="tel:${esc(s.telefon.replace(/\s/g, ""))}"><span class="ci">${icon("phone")}</span><div><small>Telefon</small><strong>${esc(s.telefon)}</strong></div></a>` : ""}
            ${s.eposta ? `<a class="contact-item" href="mailto:${esc(s.eposta)}"><span class="ci">${icon("mail")}</span><div><small>E-posta</small><strong>${esc(s.eposta)}</strong></div></a>` : ""}
            ${s.okulWebSitesi ? `<a class="contact-item" href="${esc(s.okulWebSitesi)}" target="_blank" rel="noopener"><span class="ci">${icon("globe")}</span><div><small>Okul web sitesi</small><strong>${esc(s.okulWebSitesi.replace(/^https?:\/\//, ""))}</strong></div></a>` : ""}
            ${s.instagram ? `<a class="contact-item" href="${esc(s.instagram)}" target="_blank" rel="noopener"><span class="ci">${icon("instagram")}</span><div><small>Instagram</small><strong>Bizi takip edin</strong></div></a>` : ""}
          </div>
          <div class="map">${mapQuery ? `<iframe src="https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=16&output=embed" title="Konum haritası" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>` : ""}</div>
        </div>
      </section>`;
  },

  // ---------- Serbest sayfa ----------
  async sayfa(main) {
    const data = await load("sayfalar");
    const p = (data.liste || []).find((x) => pageId(x) === params.get("id"));
    if (!p) return notFound(main, "Sayfa", "index.html", "Ana sayfaya dön");
    document.title = p.baslik;
    const photos = photosOf(p);
    const files = attachmentsOf(p);
    main.innerHTML = `
      ${pageHero(p.baslik, p.ozet || "", p.menu === "Kurumsal" ? [["Kurumsal", "hakkimizda.html"]] : [])}
      <section class="section">
        <div class="container" style="max-width:920px">
          <article class="article">
            ${p.kapak ? `<div class="article-cover">${img(p.kapak, p.baslik, 1400)}</div>` : ""}
            <div class="article-body">
              <div class="prose">${md(p.icerik)}</div>
              ${p.videoUrl ? `<h3 class="block-title">${icon("video")} Video</h3>${videoEmbed(p.videoUrl, p.baslik)}` : ""}
              ${photos.length ? `<h3 class="block-title">${icon("image")} Fotoğraflar</h3>${galleryGrid("page", photos, p.baslik)}` : ""}
              ${files.length ? `<h3 class="block-title">${icon("file")} Dosyalar</h3>${files.map((f) => attachmentLink(f)).join("")}` : ""}
              ${shareBar(p.baslik)}
            </div>
          </article>
        </div>
      </section>`;
  },
};

// =========================================================
// Başlat
// =========================================================
(async function init() {
  const [s, courses, pages] = await Promise.all([load("ayarlar"), load("dersler"), load("sayfalar")]);
  renderChrome(s, buildNav(s, courses.liste || [], pages.liste || []));
  const page = document.body.dataset.page;
  const main = $("main");
  if (PAGES[page]) await PAGES[page](main, s);
  const base = s.bolumAdi || s.okulAdi;
  if (base && !document.title.includes(base)) document.title = `${document.title} | ${base}`;
  if (s.logo) $("link[rel=icon]")?.setAttribute("href", s.logo);
})();
