// More info at https://redwoodjs.com/docs/project-configuration-dev-test-build

const config = {
  rootDir: "../",
  preset: "@redwoodjs/testing/config/jest/api",
  setupFilesAfterEnv: ["<rootDir>/scripts/test-db-seed.ts"],
};

module.exports = config;
