module.exports = {
  // A list of paths to directories that Jest should use to search for files in
  // https://jestjs.io/docs/configuration#roots-arraystring
  roots: ["<rootDir>"],

  // The test environment that will be used for testing
  // https://jestjs.io/docs/configuration#testenvironment-string
  testEnvironment: "node",

  // Jest transformations
  // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files using ts-jest
  },
  testTimeout: 30000,
};
