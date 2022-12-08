import { mockRedwoodDirective, getDirectiveName } from "@redwoodjs/testing/api";

import fieldOn from "./fieldOn";

describe("fieldOn directive", () => {
  it("declares the directive sdl as schema, with the correct name", () => {
    expect(fieldOn.schema).toBeTruthy();
    expect(getDirectiveName(fieldOn.schema)).toBe("fieldOn");
  });

  it("has a fieldOn throws an error if validation does not pass", () => {
    const mockExecution = mockRedwoodDirective(fieldOn, {});

    expect(mockExecution).toThrowError("Implementation missing for fieldOn");
  });
});
