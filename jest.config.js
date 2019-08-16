module.exports = {
  rootDir: ".",

  automock: false,
  clearMocks: true,
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: [
    "<rootDir>/tests/**/*.ts",
    "<rootDir>/src/**/*.(spec|test).(ts|js)"
  ]
};
