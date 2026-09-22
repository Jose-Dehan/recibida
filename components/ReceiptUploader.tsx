"use client";

import { useId, useState } from "react";
import { CheckCircle2, FileUp, LoaderCircle } from "lucide-react";
import type { ReceiptUploadResponse } from "@/types";

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const MAX_IMAGE_SIDE = 1600;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);
const FILE_TOO_LARGE = "El archivo es demasiado grande. El máximo permitido es 3 MB.";

const errorMessages: Record<string, string> = {
  RESERVATION_NOT_FOUND: "No encontramos esta reserva.",
  DNI_MISMATCH: "El DNI no coincide con esta reserva.",
  RESERVATION_NOT_PENDING: "Esta reserva ya no permite cargar comprobantes.",
  RESERVATION_EXPIRED: "El plazo de esta reserva ya venció.",
  INVALID_FILE_TYPE: "El formato del archivo no está permitido.",
  FILE_TOO_LARGE,
  INVALID_FILE: "Seleccioná un archivo válido.",
};

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => { URL.revokeObjectURL(url); resolve(image); };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error("INVALID_IMAGE")); };
    image.src = url;
  });
}

function canvasBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

async function prepareImage(file: File) {
  const image = await loadImage(file);
  const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("INVALID_IMAGE");
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  for (const quality of [0.82, 0.74, 0.66, 0.58]) {
    const blob = await canvasBlob(canvas, quality);
    if (blob && blob.size <= MAX_FILE_SIZE) {
      const baseName = file.name.replace(/\.[^.]+$/, "") || "comprobante";
      return new File([blob], `${baseName}.jpg`, { type: "image/jpeg", lastModified: Date.now() });
    }
  }
  throw new Error("FILE_TOO_LARGE");
}

export function ReceiptUploader({ dni, codigo, existingReceipt = false, onUploaded, collapsed = false }: { dni: string; codigo: string; existingReceipt?: boolean; onUploaded?: () => void; collapsed?: boolean }) {
  const inputId = useId();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(existingReceipt);
  const [expanded, setExpanded] = useState(!collapsed);
  const [error, setError] = useState<string | null>(null);

  async function selectFile(selected: File | undefined) {
    setError(null);
    if (!selected) { setFile(null); return; }
    if (!ALLOWED_TYPES.has(selected.type)) {
      setFile(null); setError(errorMessages.INVALID_FILE_TYPE); return;
    }
    if (selected.type === "application/pdf") {
      if (selected.size > MAX_FILE_SIZE) { setFile(null); setError(FILE_TOO_LARGE); return; }
      setFile(selected); return;
    }
    try {
      setFile(selected.size > MAX_FILE_SIZE ? await prepareImage(selected) : selected);
    } catch (reason) {
      setFile(null);
      setError(reason instanceof Error && reason.message === "FILE_TOO_LARGE" ? FILE_TOO_LARGE : "No pudimos procesar esta imagen. Elegí otro archivo.");
    }
  }

  async function upload() {
    if (!file || uploading) return;
    setUploading(true); setError(null);
    const body = new FormData();
    body.set("dni", dni); body.set("codigo", codigo); body.set("file", file);
    try {
      const response = await fetch("/api/receipts", { method: "POST", body });
      const data = (await response.json()) as ReceiptUploadResponse;
      if (!response.ok || !data.ok || data.receiptUploaded !== true) {
        const code = data.ok ? "" : data.code;
        throw new Error(errorMessages[code] ?? "No pudimos subir el comprobante. Intentá nuevamente.");
      }
      setUploaded(true); setFile(null); onUploaded?.();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "No pudimos subir el comprobante. Intentá nuevamente.");
    } finally {
      setUploading(false);
    }
  }

  if (!expanded) {
    return <button
      type="button"
      onClick={() => setExpanded(true)}
      className={existingReceipt
        ? "flex min-h-[54px] w-full items-center justify-center gap-2 rounded-[16px] border border-emerald-300/25 bg-emerald-300/[0.055] px-4 text-[15px] font-bold text-emerald-200 transition hover:border-emerald-300/45 hover:bg-emerald-300/[0.09] sm:rounded-[18px] sm:px-5"
        : "flex min-h-[56px] w-full items-center justify-center gap-2 rounded-[16px] bg-accent px-4 text-[15px] font-extrabold text-ink transition hover:brightness-105 sm:rounded-[18px] sm:px-5"}
    >
      <FileUp aria-hidden="true" className="h-[18px] w-[18px]" />
      {existingReceipt ? "Reemplazar comprobante" : "Subir comprobante"}
    </button>;
  }

  return <section className="glass-card relative overflow-hidden p-4 sm:p-5">
    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent" />
    {uploaded && <div className="mb-5 rounded-[18px] border border-accent/20 bg-accent/[0.065] p-4 text-accent" role="status">
      <div className="flex items-center gap-2.5 font-extrabold"><CheckCircle2 aria-hidden="true" className="h-5 w-5" />Comprobante recibido</div>
      <p className="mt-2 text-sm leading-6 text-zinc-300">Recibimos tu comprobante correctamente. Tu entrada continúa pendiente de validación.</p>
    </div>}
    <div className="flex items-start gap-3">
      <span className="rounded-xl border border-accent/20 bg-accent/[0.08] p-2.5 text-accent"><FileUp aria-hidden="true" className="h-5 w-5" /></span>
      <div><h2 className="text-lg font-extrabold">Subí tu comprobante</h2><p className="mt-1 text-sm text-zinc-500">Formatos permitidos: JPG, PNG, WEBP o PDF.</p></div>
    </div>
    <label htmlFor={inputId} className="mt-4 flex min-h-[58px] cursor-pointer items-center justify-center rounded-[16px] border border-dashed border-white/[0.16] bg-white/[0.035] px-3 text-center text-sm font-semibold text-zinc-300 transition hover:border-accent/45 hover:text-accent sm:mt-5 sm:rounded-[18px] sm:px-4">
      <span className="max-w-full break-all">{file ? file.name : "Seleccionar archivo"}</span>
    </label>
    <input id={inputId} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" disabled={uploading} onChange={(event) => void selectFile(event.target.files?.[0])} />
    {error && <p className="mt-3 text-sm leading-5 text-red-300" role="alert">{error}</p>}
    <button type="button" disabled={!file || uploading} onClick={() => void upload()} className="mt-4 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-[16px] bg-accent px-4 text-[15px] font-extrabold text-ink transition disabled:cursor-not-allowed disabled:opacity-45 sm:rounded-[18px] sm:px-5">
      {uploading && <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />}{uploading ? "Subiendo comprobante..." : uploaded ? "Reemplazar comprobante" : "Subir comprobante"}
    </button>
  </section>;
}
