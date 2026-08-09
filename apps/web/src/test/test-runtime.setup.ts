import { vi } from "vitest";

function createQueryBuilder() {
  const result = Promise.resolve({ data: [], error: null, count: 0 });
  const builder = {
    select: () => builder,
    order: () => builder,
    eq: () => builder,
    is: () => builder,
    or: () => builder,
    gt: () => builder,
    in: () => builder,
    limit: () => builder,
    insert: () => builder,
    update: () => builder,
    upsert: () => builder,
    maybeSingle: async () => ({ data: null, error: null }),
    single: async () => ({ data: null, error: null }),
    then: result.then.bind(result)
  };
  return builder;
}

function createUnavailableQueryBuilder() {
  const rejection = () =>
    Promise.reject(
      new Error(
        "mock query builder: public catalogue source intentionally unavailable in tests, triggering the app's static fallback"
      )
    );
  const builder = {
    select: () => builder,
    order: () => builder,
    eq: () => builder,
    is: () => builder,
    or: () => builder,
    gt: () => builder,
    in: () => builder,
    limit: () => builder,
    insert: () => builder,
    update: () => builder,
    upsert: () => builder,
    maybeSingle: rejection,
    single: rejection,
    then: <TResult1 = never, TResult2 = never>(
      onFulfilled?: ((value: never) => TResult1 | PromiseLike<TResult1>) | null,
      onRejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
    ) => rejection().then(onFulfilled, onRejected)
  };
  return builder;
}

const auth = {
  getUser: async () => ({ data: { user: null }, error: null }),
  signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
  signOut: async () => ({ error: null })
};

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn()
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
  redirect: vi.fn(),
  notFound: vi.fn()
}));

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    from: () => createQueryBuilder(),
    auth
  })
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => ({
    from: () => createQueryBuilder(),
    auth
  })
}));

vi.mock("@/lib/supabase/public-read", () => ({
  createPublicReadClient: () => ({
    from: () => createUnavailableQueryBuilder(),
    auth
  })
}));
