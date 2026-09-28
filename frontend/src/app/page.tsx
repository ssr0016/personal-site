// THROWAWAY PROTOTYPE: Four homepage hero variants on /, switchable via ?variant=.
import type { Metadata } from "next";
import PrototypeHome from "./prototype-home";

export const metadata: Metadata = {
  title: "Portrait-led RPG hero · Prototype",
  description: "A four-way study for the personal-site homepage hero.",
};

export default async function Home({ searchParams }: PageProps<"/">) {
  const { variant } = await searchParams;
  const initialVariant = variant === "B" || variant === "C" ? variant : variant === "d" || variant === "D" ? "d" : "A";
  const origin = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/v1\/?$/, "") ?? "http://localhost:8080";
  let status = { online: false, label: "unreachable" };

  try {
    const response = await fetch(`${origin}/health`, {
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });
    const data = (await response.json()) as { status?: string };
    status = { online: response.ok && data.status === "ok", label: data.status ?? `HTTP ${response.status}` };
  } catch {
    // This study still renders when the local backend is stopped.
  }

  return <PrototypeHome initialVariant={initialVariant} status={status} />;
}
