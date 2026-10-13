// Yönetim paneli girişi (2/2): GitHub'dan dönen kodu erişim anahtarına çevirir
// ve sonucu panel penceresine (Decap CMS) iletir.
export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const savedState = (request.headers.get("Cookie") || "").match(/cms_oauth_state=([^;]+)/)?.[1];

  if (!code || !state || state !== savedState) {
    return reply(url.origin, "error", { error: "Geçersiz giriş isteği. Lütfen tekrar deneyin." });
  }

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", "User-Agent": "mstal-kimya-cms" },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/api/callback`,
    }),
  });
  const data = await res.json().catch(() => ({}));

  if (!data.access_token) {
    return reply(url.origin, "error", { error: data.error_description || "GitHub girişi başarısız oldu." });
  }
  return reply(url.origin, "success", { token: data.access_token, provider: "github" });
}

// Decap CMS'in beklediği el sıkışma: açılır pencere ana panele mesaj gönderir.
// Mesaj yalnızca bu sitenin kendi adresine (origin) gönderilir.
function reply(origin, status, content) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const js = (v) => JSON.stringify(v).replace(/</g, "\\u003c");
  const html = `<!doctype html><html lang="tr"><meta charset="utf-8"><title>Giriş</title>
<body style="font-family:system-ui;padding:40px;text-align:center">
<p>${status === "success" ? "Giriş başarılı, bu pencere kapanıyor…" : "Giriş yapılamadı."}</p>
<script>
(function () {
  var origin = ${js(origin)}, message = ${js(message)};
  if (!window.opener) { document.body.insertAdjacentHTML("beforeend", "<p>Lütfen yönetim panelinden tekrar giriş yapın.</p>"); return; }
  function receive(e) {
    if (e.origin !== origin) return;
    window.removeEventListener("message", receive);
    window.opener.postMessage(message, origin);
  }
  window.addEventListener("message", receive);
  window.opener.postMessage("authorizing:github", origin);
})();
</script></body></html>`;
  return new Response(html, {
    status: status === "success" ? 200 : 400,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Set-Cookie": "cms_oauth_state=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
    },
  });
}
