export const dynamic = "force-dynamic";

export async function GET() {
  const rawUrl = process.env.APPS_SCRIPT_URL?.trim();
  console.log("APPS_SCRIPT_URL configured:", Boolean(rawUrl));

  if (!rawUrl) {
    return Response.json(
      { ok: false, error: "APPS_SCRIPT_URL no configurada", code: "MISSING_ENV" },
      { status: 500 },
    );
  }

  try {
    const url = new URL(rawUrl);
    url.searchParams.set("action", "getPrice");

    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
    });
    console.log("Apps Script response status:", response.status);

    const text = await response.text();
    if (!response.ok) {
      return Response.json(
        { ok: false, error: "Apps Script respondió con error", status: response.status, code: "UPSTREAM_ERROR" },
        { status: response.status },
      );
    }

    const data = JSON.parse(text);
    return Response.json(data, { status: response.status });
  } catch (error) {
    return Response.json(
      { ok: false, error: error instanceof Error ? error.message : "Error desconocido", code: "NETWORK_ERROR" },
      { status: 500 },
    );
  }
}
