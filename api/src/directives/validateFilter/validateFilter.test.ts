import { mockRedwoodDirective, getDirectiveName } from "@redwoodjs/testing/api";

import validateFilter from "./validateFilter";

describe("validateFilter directive", () => {
  it("declares the directive sdl as schema, with the correct name", () => {
    expect(validateFilter.schema).toBeTruthy();
    expect(getDirectiveName(validateFilter.schema)).toBe("validateFilter");
  });

  it("has a validateFilter throws an error if validation does not pass", () => {
    const mockExecution = mockRedwoodDirective(validateFilter, {});

    expect(mockExecution).toThrowError(
      "Implementation missing for validateFilter"
    );
  });
});
