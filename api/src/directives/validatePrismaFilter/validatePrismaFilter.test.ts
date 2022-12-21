import { mockRedwoodDirective, getDirectiveName } from "@redwoodjs/testing/api";

import validatePrismaFilter from "./validatePrismaFilter";

describe("validatePrismaFilter directive", () => {
  it("declares the directive sdl as schema, with the correct name", () => {
    expect(validatePrismaFilter.schema).toBeTruthy();
    expect(getDirectiveName(validatePrismaFilter.schema)).toBe(
      "validatePrismaFilter"
    );
  });

  it("has a validatePrismaFilter throws an error if validation does not pass", () => {
    const mockExecution = mockRedwoodDirective(validatePrismaFilter, {});

    expect(mockExecution).toThrowError(
      "Implementation missing for validatePrismaFilter"
    );
  });
});
