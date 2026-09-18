export const dynamic = "force-dynamic";

export async function GET() {
  const apiUrl = process.env.APPS_SCRIPT_URL;
  const trimmedApiUrl = apiUrl?.trim();
  console.log("APPS_SCRIPT_URL configured:", Boolean(trimmedApiUrl));
  console.log("Apps Script URL length:", trimmedApiUrl?.length);

  if (!trimmedApiUrl) {
    return Response.json({ ok: false, error: "APPS_SCRIPT_URL no configurada" }, { status: 500 });
  }

  try {
    const url = new URL(trimmedApiUrl);
    if (!url.pathname.replace(/\/+$/, "").endsWith("/exec")) {
      return Response.json({ ok: false, error: "APPS_SCRIPT_URL debe terminar en /exec" }, { status: 500 });
    }
    url.searchParams.set("action", "getPrice");
    const response = await fetch(url.toString(), { cache: "no-store" });
    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("Error consultando Apps Script:", error instanceof Error ? error.message : error);
    return Response.json(
      { ok: false, error: "No se pudo conectar con el servicio de reservas", code: "NETWORK_ERROR" },
      { status: 502 },
    );
  }
}
