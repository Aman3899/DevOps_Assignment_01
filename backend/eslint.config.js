export default [
    {
      ignores: ["node_modules/", "dist/"], // Ignore build folders
    },
    {
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      plugins: {
        import: require("eslint-plugin-import"),
      },
      rules: {
        "no-unused-vars": "warn",
        "import/no-unresolved": "error",
      },
    },
  ];  