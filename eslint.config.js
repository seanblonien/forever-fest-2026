import eslint from '@eslint/js';
import { flatConfig } from '@next/eslint-plugin-next';
import stylistic from '@stylistic/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,

  // TypeScript ESLint stylistic rules
  ...tseslint.configs.stylistic,

  // Next.js recommended rules
  flatConfig.recommended,
  flatConfig.coreWebVitals,

  // Apply stylistic rules with customized settings
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
    braceStyle: '1tbs',
    commaDangle: 'always-multiline',
    arrowParens: true,
  }),

  // Combined React and custom configuration for all JS/TS files
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx}'],
    plugins: {
      'react': reactPlugin,
      'react-hooks': hooksPlugin,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      // Custom stylistic preferences (only rules not already handled by stylistic config)
      '@stylistic/max-len': ['error', {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      }],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      // Custom TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // Ignore patterns
  {
    ignores: ['.next/*', 'node_modules/*'],
  },
);
