import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next", "prettier"], // Adiciona Prettier
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": "error",
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_", // Ignora variáveis que começam com _
          args: "none", // Agora não avisa sobre argumentos não utilizados
          ignoreRestSiblings: true,
        },
      ],
    },
  }),
];

export default eslintConfig;
