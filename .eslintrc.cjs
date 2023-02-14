module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:unicorn/recommended',
    'plugin:import/recommended',
  ],
  rules: {
    'no-console': 'off',
    'import/extensions': ['error', 'always'],
    'import/no-unresolved': 'off',
    'no-extra-boolean-cast': 'off',
    'arrow-parens': [2, 'as-needed'],
    'prettier/prettier': 2,
    eqeqeq: ['error', 'always'],
    'newline-after-var': ['error', 'always'],
    'unicorn/prefer-module': 0,
    'unicorn/prefer-node-protocol': 0,
    'unicorn/prefer-json-parse-buffer': 0,
    'unicorn/no-process-exit': 0,
    'unicorn/prefer-ternary': 0,
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          dbSync: true,
          CardanoDbSync: true,
          getDbSync: true,
          clientDbSync: true,
        },
      },
    ],
  },
};
