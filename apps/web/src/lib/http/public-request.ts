import { z } from "zod";

export class PublicRequestError extends Error {
  constructor(message: string, public readonly status: 400 | 413) {
    super(message);
    this.name = "PublicRequestError";
  }
}

interface TextRequest {
  headers: Headers;
  text(): Promise<string>;
}

export async function readBoundedJson(request: TextRequest, maximumBytes: number): Promise<unknown> {
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > maximumBytes) {
    throw new PublicRequestError("Request body is too large.", 413);
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > maximumBytes) {
    throw new PublicRequestError("Request body is too large.", 413);
  }

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    throw new PublicRequestError("Invalid JSON body.", 400);
  }
}

const normalizedPhone = z.preprocess(
  (value) => typeof value === "string" ? value.trim().replace(/[^\d+]/g, "") : value,
  z.string().regex(/^\+?\d{8,15}$/).transform((value) => value.startsWith("+") ? value : `+${value}`)
    .refine((value) => !/^(\+?)(\d)\2+$/.test(value), "Invalid telephone number")
);

export const contactRequestSchema = z.object({
  company_name: z.string().max(200).optional().default(""),
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  phone: normalizedPhone,
  country: z.string().trim().max(80).optional().default(""),
  subject: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(10).max(4000)
}).strict();

export function parseContactPayload(value: unknown) {
  return contactRequestSchema.safeParse(value);
}
