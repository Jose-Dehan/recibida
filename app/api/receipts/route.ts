import { getAppsScriptUrl } from "@/lib/apps-script";
import type { ReceiptUploadResponse } from "@/types";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);

function errorResponse(code: string, error: string, status: number) {
  return Response.json({ ok: false, code, error } satisfies ReceiptUploadResponse, { status });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_FILE_SIZE + 64 * 1024) {
    return errorResponse("FILE_TOO_LARGE", "El archivo es demasiado grande. El máximo permitido es 3 MB.", 413);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return errorResponse("INVALID_FILE", "No pudimos leer el archivo.", 400);
  }

  const dniValue = formData.get("dni");
  const codeValue = formData.get("codigo");
  const fileValue = formData.get("file");
  const dni = typeof dniValue === "string" ? dniValue.trim() : "";
  const codigo = typeof codeValue === "string" ? codeValue.trim() : "";

  if (!dni) return errorResponse("INVALID_DATA", "El DNI es obligatorio.", 400);
  if (!codigo) return errorResponse("INVALID_DATA", "El código es obligatorio.", 400);
  if (!(fileValue instanceof File) || fileValue.size === 0) {
    return errorResponse("INVALID_FILE", "Seleccioná un archivo válido.", 400);
  }
  if (!ALLOWED_TYPES.has(fileValue.type)) {
    return errorResponse("INVALID_FILE_TYPE", "El formato del archivo no está permitido.", 415);
  }
  if (fileValue.size > MAX_FILE_SIZE) {
    return errorResponse("FILE_TOO_LARGE", "El archivo es demasiado grande. El máximo permitido es 3 MB.", 413);
  }

  try {
    const base64 = Buffer.from(await fileValue.arrayBuffer()).toString("base64");
    const upstream = await fetch(getAppsScriptUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "uploadReceipt",
        dni,
        codigo,
        fileName: fileValue.name,
        mimeType: fileValue.type,
        base64,
      }),
      cache: "no-store",
    });

    let result: unknown;
    try {
      result = await upstream.json();
    } catch {
      return errorResponse("INTERNAL_ERROR", "No pudimos subir el comprobante. Intentá nuevamente.", 502);
    }

    if (result && typeof result === "object" && (result as { ok?: unknown }).ok === true && (result as { receiptUploaded?: unknown }).receiptUploaded === true) {
      return Response.json({ ok: true, receiptUploaded: true, code: "RECEIPT_UPLOADED" } satisfies ReceiptUploadResponse);
    }

    const upstreamCode = result && typeof result === "object" && typeof (result as { code?: unknown }).code === "string"
      ? (result as { code: string }).code
      : "INTERNAL_ERROR";
    const allowedCodes = new Set(["RESERVATION_NOT_FOUND", "DNI_MISMATCH", "RESERVATION_NOT_PENDING", "RESERVATION_EXPIRED", "INVALID_FILE_TYPE", "FILE_TOO_LARGE", "INVALID_FILE"]);
    const code = allowedCodes.has(upstreamCode) ? upstreamCode : "INTERNAL_ERROR";
    return errorResponse(code, "No pudimos subir el comprobante. Intentá nuevamente.", upstream.ok ? 400 : 502);
  } catch {
    return errorResponse("NETWORK_ERROR", "No pudimos subir el comprobante. Intentá nuevamente.", 502);
  }
}
