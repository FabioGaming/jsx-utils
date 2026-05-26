import { describe, it, expect } from "vitest";

describe("test runner smoke check", () => {
  it("vitest is working", () => {
    expect(1 + 1).toBe(2);
  });

  it("jsdom is available", () => {
    expect(typeof document).toBe("object");
  });

  it("window exists", () => {
    expect(typeof window).toBe("object");
  });
});
