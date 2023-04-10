module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
    indent: ['error', 2],
    semi: ['error', 'always'],
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false
      }
    ]
  }
};
