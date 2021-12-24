module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  collectCoverageFrom: ["./**/*.ts", "!**/*.d.ts"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // moduleNameMapper: {
  //   "^@/(.*)$": "./$1",
  // },
};
