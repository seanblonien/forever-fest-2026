import { configWithNext } from '@seanblonien/eslint-config-react';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  ...await configWithNext(),
  {
    rules: {
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-max-depth': 'off',
      'no-console': 'off',
      'no-useless-rename': ['error',
        {
          ignoreDestructuring: false,
          ignoreImport: false,
          ignoreExport: false,
        }],
    },
  },
  // Override default ignores
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Additional ignores:
    'node_modules/**',
    '*.tsbuildinfo',
    '.vercel/**',
  ]),
]);

export default eslintConfig;
