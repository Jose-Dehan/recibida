import "server-only";

export function getAppsScriptUrl() {
  const value = process.env.APPS_SCRIPT_URL;

  if (!value) {
    throw new Error("APPS_SCRIPT_URL no está configurada");
  }

  return value;
}

export async function appsScriptResponse(response: Response) {
  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export function networkErrorResponse() {
  return Response.json(
    { ok: false, error: "No se pudo conectar con el servicio de reservas", code: "NETWORK_ERROR" },
    { status: 502 },
  );
}
