import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

const reactRecommendedRules = reactPlugin.configs.recommended.rules;
const reactHooksRecommendedRules = reactHooksPlugin.configs.recommended.rules;
const tsRecommendedRules = tsPlugin.configs.recommended.rules;

export default [
  {
    ignores: ["dist", "public", "node_modules"],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  js.configs.recommended,
  {
    plugins: {
      react: reactPlugin
    },
    rules: {
      ...reactRecommendedRules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {
    plugins: {
      "react-hooks": reactHooksPlugin
    },
    rules: {
      ...reactHooksRecommendedRules
    }
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      ...tsRecommendedRules,
      "no-undef": "off"
    }
  },
  prettierConfig
];
