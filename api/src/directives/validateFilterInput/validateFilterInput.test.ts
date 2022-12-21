import { mockRedwoodDirective, getDirectiveName } from "@redwoodjs/testing/api";

import validateFilterInput from "./validateFilterInput";

describe("validateFilterInput directive", () => {
  it("declares the directive sdl as schema, with the correct name", () => {
    expect(validateFilterInput.schema).toBeTruthy();
    expect(getDirectiveName(validateFilterInput.schema)).toBe(
      "validateFilterInput"
    );
  });

  it("has a validateFilterInput throws an error if validation does not pass", () => {
    const mockExecution = mockRedwoodDirective(validateFilterInput, {});

    expect(mockExecution).toThrowError(
      "Implementation missing for validateFilterInput"
    );
  });
});
