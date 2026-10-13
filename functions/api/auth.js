// Yönetim paneli girişi (1/2): kullanıcıyı GitHub giriş sayfasına yönlendirir.
// Cloudflare Pages ayarlarında GITHUB_CLIENT_ID ve GITHUB_CLIENT_SECRET tanımlı olmalıdır.
export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  if (!env.GITHUB_CLIENT_ID) {
    return new Response("GITHUB_CLIENT_ID ayarlanmamış.", { status: 500 });
  }

  const state = crypto.randomUUID();
  const github = new URL("https://github.com/login/oauth/authorize");
  github.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  github.searchParams.set("redirect_uri", `${url.origin}/api/callback`);
  github.searchParams.set("scope", "repo,user");
  github.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: github.toString(),
      "Set-Cookie": `cms_oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}
