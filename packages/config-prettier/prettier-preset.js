module.exports = {
  bracketSpacing: true,
  bracketSameLine: false,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  semi: true,
  printWidth: 110,
  tabWidth: 2,
  arrowParens: "always",
  importOrder: [
    // Mocks must be at the top as they contain vi.mock calls
    "(.*)/__mocks__/(.*)",
    "server-only",
    "<THIRD_PARTY_MODULES>",
    "^@repo/(.*)$",
    "^~/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
};
