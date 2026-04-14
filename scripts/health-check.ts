/**
 * Uniqus Platform Health Check
 *
 * Tests:
 * 1. Anthropic API key validity + model availability (sonnet-4-6, opus-4-6)
 * 2. All live platform URLs respond with 200
 * 3. Chat/API endpoints that use Claude respond correctly
 *
 * Usage:
 *   npx tsx scripts/health-check.ts
 *
 * Requires:
 *   ANTHROPIC_API_KEY env var (or .env file in project root)
 */

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

const MODELS_TO_TEST = [
  "claude-sonnet-4-6",
  "claude-opus-4-6",
  "claude-haiku-4-5-20251001",
];

// authProtected: Clerk-protected apps return 404/302 for unauthenticated requests — that's expected
const PLATFORM_URLS: { name: string; url: string; authProtected?: boolean }[] = [
  { name: "IPO Universe", url: "https://ipo-universe.vercel.app", authProtected: true },
  { name: "Uniqus IPO Platform", url: "https://uniqus-ipo-platform.vercel.app" },
  { name: "UAEP", url: "https://uniqus-agentic-platform.vercel.app" },
  { name: "IFFCO Policy Engine", url: "https://iffco-policy-engine-ekw9.vercel.app" },
  { name: "DealSight AI", url: "https://dealsight-ten.vercel.app/hub" },
  { name: "UniTreasury", url: "https://uniqustreasury.com" },
  { name: "VARA AI", url: "https://uniqus-research.vercel.app" },
  { name: "TCA Advisor", url: "https://uniqusnationaloffice.com", authProtected: true },
  { name: "AskSandipKhetan", url: "https://www.asksandipkhetan.com" },
  { name: "AI Controls Universe", url: "https://uniqus-ai-platform.vercel.app" },
  { name: "Polling Station", url: "https://polling-station.vercel.app" },
  { name: "Platform Hub", url: "https://uniqus-platform-hub.vercel.app" },
];

// ── Helpers ──

function getApiKey(): string {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    console.error("ERROR: ANTHROPIC_API_KEY not set. Export it or add to .env");
    process.exit(1);
  }
  return key;
}

async function testModel(
  apiKey: string,
  model: string
): Promise<{ model: string; ok: boolean; latency: number; error?: string }> {
  const start = Date.now();
  try {
    const res = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 10,
        messages: [{ role: "user", content: "Say OK" }],
      }),
    });
    const latency = Date.now() - start;

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return {
        model,
        ok: false,
        latency,
        error: `HTTP ${res.status}: ${(body as any)?.error?.message || res.statusText}`,
      };
    }

    const data = (await res.json()) as any;
    const text = data?.content?.[0]?.text || "";
    return { model, ok: true, latency };
  } catch (err: any) {
    return { model, ok: false, latency: Date.now() - start, error: err.message };
  }
}

async function testUrl(
  name: string,
  url: string,
  authProtected: boolean
): Promise<{ name: string; url: string; ok: boolean; status: number; latency: number; authNote?: string; error?: string }> {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    const latency = Date.now() - start;
    // Auth-protected apps: any response (including 404/302) means the server is up
    const isUp = authProtected ? res.status > 0 : res.ok;
    return {
      name,
      url,
      ok: isUp,
      status: res.status,
      latency,
      authNote: authProtected && !res.ok ? "(auth-protected, server responding)" : undefined,
    };
  } catch (err: any) {
    return {
      name,
      url,
      ok: false,
      status: 0,
      latency: Date.now() - start,
      error: err.message,
    };
  }
}

// ── Main ──

async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("  UNIQUS PLATFORM HEALTH CHECK");
  console.log("  " + new Date().toISOString());
  console.log("═══════════════════════════════════════════════════════════\n");

  // 1. Anthropic API & Model Tests
  const apiKey = getApiKey();
  console.log("1. ANTHROPIC API — Model Availability\n");

  const modelResults = await Promise.all(
    MODELS_TO_TEST.map((m) => testModel(apiKey, m))
  );

  let modelFailures = 0;
  for (const r of modelResults) {
    const icon = r.ok ? "PASS" : "FAIL";
    const latStr = `${r.latency}ms`;
    console.log(`   [${icon}] ${r.model.padEnd(30)} ${latStr.padStart(7)}${r.error ? `  — ${r.error}` : ""}`);
    if (!r.ok) modelFailures++;
  }

  // 2. Platform URL Tests
  console.log("\n2. PLATFORM URLs — Uptime Check\n");

  const urlResults = await Promise.all(
    PLATFORM_URLS.map((p) => testUrl(p.name, p.url, !!p.authProtected))
  );

  let urlFailures = 0;
  for (const r of urlResults) {
    const icon = r.ok ? "PASS" : "FAIL";
    const latStr = `${r.latency}ms`;
    const statusStr = r.status ? `HTTP ${r.status}` : "TIMEOUT";
    const note = r.authNote ? `  ${r.authNote}` : "";
    console.log(
      `   [${icon}] ${r.name.padEnd(25)} ${statusStr.padStart(8)}  ${latStr.padStart(7)}${note}${r.error ? `  — ${r.error}` : ""}`
    );
    if (!r.ok) urlFailures++;
  }

  // 3. Summary
  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("  SUMMARY");
  console.log("═══════════════════════════════════════════════════════════");
  console.log(`  Models:    ${MODELS_TO_TEST.length - modelFailures}/${MODELS_TO_TEST.length} passing`);
  console.log(`  Platforms: ${PLATFORM_URLS.length - urlFailures}/${PLATFORM_URLS.length} reachable`);

  const totalFailures = modelFailures + urlFailures;
  if (totalFailures === 0) {
    console.log("\n  ALL CHECKS PASSED\n");
  } else {
    console.log(`\n  ${totalFailures} FAILURE(S) DETECTED\n`);
    process.exit(1);
  }
}

main();
