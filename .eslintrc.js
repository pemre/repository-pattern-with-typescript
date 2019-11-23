module.exports = {
  parser: '@typescript-eslint/parser',
  globals: {
    document: false,
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript/base'],
  rules: {
    'import/prefer-default-export': 'off',
    'no-console': 'off',
  }
};
