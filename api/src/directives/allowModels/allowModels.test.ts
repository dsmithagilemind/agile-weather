import { mockRedwoodDirective, getDirectiveName } from "@redwoodjs/testing/api";

import allowModels from "./allowModels";

describe("allowModels directive", () => {
  it("declares the directive sdl as schema, with the correct name", () => {
    expect(allowModels.schema).toBeTruthy();
    expect(getDirectiveName(allowModels.schema)).toBe("allowModels");
  });

  it("has a allowModels throws an error if validation does not pass", () => {
    const mockExecution = mockRedwoodDirective(allowModels, {});

    expect(mockExecution).toThrowError(
      "Implementation missing for allowModels"
    );
  });
});
