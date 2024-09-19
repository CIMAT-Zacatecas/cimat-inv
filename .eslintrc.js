module.exports = {
  extends: ["expo", "plugin:tailwindcss/recommended", "prettier"],
  plugins: ["prettier", "react-native"],
  rules: {
    "prettier/prettier": "warn",
    "react-native/no-unused-styles": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js"],
      parser: "@typescript-eslint/parser",
    },
  ],
};
