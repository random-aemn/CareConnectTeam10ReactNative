import { formatDate } from "./format-date";

describe("formatDate", () => {
  it("formats a date for the application locale", () => {
    expect(formatDate(new Date("2026-09-10T00:00:00Z"))).toBe("9/10/2026");
  });
});
