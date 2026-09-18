import { appsScriptResponse, getAppsScriptUrl, networkErrorResponse } from "@/lib/apps-script";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const url = new URL(getAppsScriptUrl());
    url.searchParams.set("action", "getPrice");
    const response = await fetch(url, { cache: "no-store" });
    return appsScriptResponse(response);
  } catch {
    return networkErrorResponse();
  }
}
