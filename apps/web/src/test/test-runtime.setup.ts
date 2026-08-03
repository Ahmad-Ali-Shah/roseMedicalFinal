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
