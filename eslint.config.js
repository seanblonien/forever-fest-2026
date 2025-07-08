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
    commaDangle: 'never',
    arrowParens: true
  }),

  // React configuration for all JS/TS files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react': reactPlugin,
      'react-hooks': hooksPlugin
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      'object-curly-spacing': ['error', 'always']
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // Custom stylistic overrides for specific file patterns
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Additional stylistic preferences
      '@stylistic/max-len': ['error', {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/trailing-comma': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ]
    }
  },
  // Ignore patterns
  {
    ignores: ['.next/*', 'node_modules/*']
  }
);
