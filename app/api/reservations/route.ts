import { appsScriptResponse, getAppsScriptUrl, networkErrorResponse } from "@/lib/apps-script";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const dni = requestUrl.searchParams.get("dni")?.trim();
  const codigo = requestUrl.searchParams.get("codigo")?.trim();

  if (!dni || !codigo) {
    return Response.json({ ok: false, error: "DNI y código son obligatorios", code: "INVALID_DATA" }, { status: 400 });
  }

  try {
    const url = new URL(getAppsScriptUrl());
    url.searchParams.set("action", "getReservation");
    url.searchParams.set("dni", dni);
    url.searchParams.set("codigo", codigo);
    const response = await fetch(url, { cache: "no-store" });
    return appsScriptResponse(response);
  } catch {
    return networkErrorResponse();
  }
}

export async function POST(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Datos inválidos", code: "INVALID_DATA" }, { status: 400 });
  }

  if (!input || typeof input !== "object") {
    return Response.json({ ok: false, error: "Datos inválidos", code: "INVALID_DATA" }, { status: 400 });
  }

  const { genero, nombre, dni, email, egresado, expectedPrice } = input as Record<string, unknown>;
  if (![genero, nombre, dni, email, egresado].every((value) => typeof value === "string" && value.trim())) {
    return Response.json({ ok: false, error: "Todos los datos son obligatorios", code: "INVALID_DATA" }, { status: 400 });
  }
  if (typeof expectedPrice !== "number" || !Number.isFinite(expectedPrice) || expectedPrice < 0) {
    return Response.json({ ok: false, error: "El precio esperado no es válido", code: "INVALID_DATA" }, { status: 400 });
  }

  try {
    const response = await fetch(getAppsScriptUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "createReservation", genero, nombre, dni, email, expectedPrice, egresado }),
      cache: "no-store",
    });
    return appsScriptResponse(response);
  } catch {
    return networkErrorResponse();
  }
}
