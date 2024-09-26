module.exports = {
  extends: ["expo", "plugin:tailwindcss/recommended", "eslint-config-prettier", "prettier"],
  plugins: ["prettier", "react-native"],
  rules: {
    "prettier/prettier": ["warn", { endOfLine: "auto" }],
    "react-native/no-unused-styles": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js"],
      parser: "@typescript-eslint/parser",
    },
  ],
};
