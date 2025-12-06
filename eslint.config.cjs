const tsParser = require('@typescript-eslint/parser');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const prettier = require('eslint-plugin-prettier');
const importPlugin = require('eslint-plugin-import');

const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    ignores: [
      '**/dist',
      '**/node_modules',
      '**/.eslintrc.js',
      '**/jest.config.js',
      '**/babel.config.js',
      '**/openapi.ts',
      '.yarn/**/*',
      'test/integration/fixtures/*',
      'test/unit/fixtures/*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {},
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier,
      import: importPlugin,
    },

    rules: {
      ...typescriptEslint.configs.recommended.rules,
      'no-console': 'off',
      'import/extensions': ['error', 'always'],
      'import/no-unresolved': 'off',
      'no-extra-boolean-cast': 'off',
      'arrow-parens': [2, 'as-needed'],
      'prettier/prettier': 2,
      eqeqeq: ['error', 'always'],
      'newline-after-var': ['error', 'always'],
      'no-nested-ternary': 'off',
    },
  },
];
