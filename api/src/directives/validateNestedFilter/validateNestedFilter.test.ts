import { mockRedwoodDirective, getDirectiveName } from "@redwoodjs/testing/api";

import validateNestedFilter from "./validateNestedFilter";

describe("validateNestedFilter directive", () => {
  it("declares the directive sdl as schema, with the correct name", () => {
    expect(validateNestedFilter.schema).toBeTruthy();
    expect(getDirectiveName(validateNestedFilter.schema)).toBe(
      "validateNestedFilter"
    );
  });

  it("has a validateNestedFilter throws an error if validation does not pass", () => {
    const mockExecution = mockRedwoodDirective(validateNestedFilter, {});

    expect(mockExecution).toThrowError(
      "Implementation missing for validateNestedFilter"
    );
  });
});
