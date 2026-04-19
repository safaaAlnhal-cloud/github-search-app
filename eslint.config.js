import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js ,
       "react-hooks": reactHooks,
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  tseslint.configs.recommended,

  pluginReact.configs.flat.recommended,

  
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", 
      "@typescript-eslint/no-unused-vars": "warn",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    },
  },
]);