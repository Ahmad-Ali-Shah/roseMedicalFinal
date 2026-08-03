import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  addInquiryItem,
  clearInquiry,
  readInquiry,
  removeInquiryItem,
  updateInquiryItem,
  type InquiryItem
} from "@/features/inquiry/inquiry-store";

const values = new Map<string, string>();
const memoryStorage: Storage = {
  get length() {
    return values.size;
  },
  clear: () => values.clear(),
  getItem: (key) => values.get(key) ?? null,
  key: (index) => [...values.keys()][index] ?? null,
  removeItem: (key) => {
    values.delete(key);
  },
  setItem: (key, value) => {
    values.set(key, String(value));
  }
};

const item: InquiryItem = {
  id: "product_scalpel_handle_3",
  familySlug: "knives",
  slug: "scalpel-handle-no-3",
  name: "Scalpel Handle No. 3",
  code: "01-0103",
  size: "No. 3",
  variant: "Standard",
  quantity: 1,
  notes: ""
};

describe("inquiry store", () => {
  beforeEach(() => {
    values.clear();
    vi.stubGlobal("window", {
      localStorage: memoryStorage,
      dispatchEvent: vi.fn()
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  it("adds an immutable product snapshot", () => {
    expect(addInquiryItem(item)).toEqual([item]);
    expect(readInquiry()).toEqual([item]);
  });

  it("merges the same snapshot by increasing quantity", () => {
    addInquiryItem(item);
    const result = addInquiryItem({ ...item, quantity: 2 });
    expect(result).toHaveLength(1);
    expect(result[0]?.quantity).toBe(3);
  });

  it("clamps quantities to at least one and persists notes", () => {
    addInquiryItem(item);
    const result = updateInquiryItem(item.id, { quantity: 0, notes: "Sterile packing" });
    expect(result[0]?.quantity).toBe(1);
    expect(result[0]?.notes).toBe("Sterile packing");
  });

  it("removes and clears inquiry lines", () => {
    addInquiryItem(item);
    expect(removeInquiryItem(item.id)).toEqual([]);
    addInquiryItem(item);
    clearInquiry();
    expect(readInquiry()).toEqual([]);
  });

  it("recovers safely from invalid stored JSON", () => {
    memoryStorage.setItem("rosa-medical-inquiry-v1", "not-json");
    expect(readInquiry()).toEqual([]);
  });
});
