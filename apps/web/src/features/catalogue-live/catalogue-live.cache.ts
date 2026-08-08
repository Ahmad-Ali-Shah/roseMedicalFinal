const DEFAULT_TTL_MS = 60_000;
const MAX_ENTRIES = 256;

interface CacheEntry<T> {
  insertedAt: number;
  expiresAt: number;
  value?: T;
  pending?: Promise<T>;
}

const projectionCache = new Map<string, CacheEntry<unknown>>();

function pruneCache(now: number): void {
  for (const [key, entry] of projectionCache) {
    if (entry.expiresAt <= now && !entry.pending) {
      projectionCache.delete(key);
    }
  }

  while (projectionCache.size >= MAX_ENTRIES) {
    const oldestKey = projectionCache.keys().next().value as string | undefined;
    if (!oldestKey) break;
    projectionCache.delete(oldestKey);
  }
}

export async function getCachedCatalogueProjection<T>(
  key: string,
  loader: () => Promise<T>,
  options: { ttlMs?: number; now?: () => number } = {}
): Promise<T> {
  const now = options.now ?? Date.now;
  const ttlMs = options.ttlMs ?? DEFAULT_TTL_MS;
  const timestamp = now();
  const existing = projectionCache.get(key) as CacheEntry<T> | undefined;

  if (existing?.pending) return existing.pending;
  if (existing?.value !== undefined && existing.expiresAt > timestamp) {
    return existing.value;
  }

  if (existing) projectionCache.delete(key);
  pruneCache(timestamp);

  const pending = loader()
    .then((value) => {
      projectionCache.set(key, {
        insertedAt: timestamp,
        expiresAt: timestamp + ttlMs,
        value
      });
      return value;
    })
    .catch((error: unknown) => {
      projectionCache.delete(key);
      throw error;
    });

  projectionCache.set(key, {
    insertedAt: timestamp,
    expiresAt: timestamp + ttlMs,
    pending
  });

  return pending;
}

export function clearCatalogueProjectionCache(): void {
  projectionCache.clear();
}
