import { describe, expect, it } from "vitest";
import {
  PublicRequestError,
  parseContactPayload,
  readBoundedJson
} from "@/lib/http/public-request";

describe("bounded public requests", () => {
  it("accepts and normalizes a valid contact request", () => {
    const result = parseContactPayload({
      name: "  Rosa Buyer  ",
      email: "BUYER@example.com",
      phone: "+966 50 555 0142",
      message: "Please send catalogue support details.",
      company: "Example Hospital"
    });
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toMatchObject({ name: "Rosa Buyer", email: "buyer@example.com", phone: "+966505550142" });
  });

  it("rejects malformed and overlong contact values", () => {
    expect(parseContactPayload({ name: "A", email: "bad", phone: "11111111", message: "short" }).success).toBe(false);
    expect(parseContactPayload({ name: "Valid Name", email: "a@example.com", phone: "+966505550142", message: "x".repeat(4001) }).success).toBe(false);
  });

  it("rejects declared and actual oversized JSON bodies", async () => {
    const declared = { headers: new Headers({ "content-length": "101" }), text: async () => "{}" };
    await expect(readBoundedJson(declared, 100)).rejects.toMatchObject({ status: 413 } satisfies Partial<PublicRequestError>);

    const actual = { headers: new Headers(), text: async () => JSON.stringify({ value: "x".repeat(100) }) };
    await expect(readBoundedJson(actual, 50)).rejects.toMatchObject({ status: 413 } satisfies Partial<PublicRequestError>);
  });

  it("returns a safe bad-request error for malformed JSON", async () => {
    const request = { headers: new Headers(), text: async () => "{" };
    await expect(readBoundedJson(request, 100)).rejects.toMatchObject({ status: 400, message: "Invalid JSON body." });
  });
});
