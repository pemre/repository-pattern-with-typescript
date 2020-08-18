module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    project: 'tsconfig.json',
  },
  globals: {
    document: false,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'no-console': 'off',
  },
};
