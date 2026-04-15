/**
 * Simple in-memory sliding-window limiter (per server instance).
 * For multi-instance production, use Redis/Upstash or your host’s edge rate limit.
 */

type Bucket = number[];

const buckets = new Map<string, Bucket>();

export function rateLimitSlidingWindow(
  key: string,
  max: number,
  windowMs: number
): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const start = now - windowMs;
  let hits = buckets.get(key) ?? [];
  hits = hits.filter((t) => t > start);

  if (hits.length >= max) {
    const oldest = hits[0]!;
    const retryAfterMs = oldest + windowMs - now;
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
  }

  hits.push(now);
  buckets.set(key, hits);
  return { ok: true };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
