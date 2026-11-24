// Passa as visitas do site ao Worker "alertas-sites" (servidor a servidor).
// O endereço do Worker fica em ALERTAS_URL (variável do projeto no Cloudflare Pages).
export async function onRequestPost({ request, env }) {
  let d = {};
  try { d = await request.json(); } catch { return new Response("", { status: 400 }); }
  if (env.ALERTAS_URL) {
    await fetch(env.ALERTAS_URL + "/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...d, site: "keystory" })
    }).catch(() => {});
  }
  return new Response(null, { status: 204 });
}
