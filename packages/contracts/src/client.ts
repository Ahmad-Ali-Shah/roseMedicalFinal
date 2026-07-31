import createClient from "openapi-fetch";
import type { paths } from "./generated/schema";

export type RosaApiClient = ReturnType<typeof createRosaApiClient>;

export interface RosaApiClientOptions {
  baseUrl: string;
  fetch?: typeof globalThis.fetch;
}

export function createRosaApiClient({ baseUrl, fetch }: RosaApiClientOptions) {
  return fetch ? createClient<paths>({ baseUrl, fetch }) : createClient<paths>({ baseUrl });
}
