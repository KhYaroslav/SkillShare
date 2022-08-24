module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-restricted-syntax': 0,
    'o-case-declarations': 0,
    'no-case-declarations': 0,
    'linebreak-style': 0,
    'no-fallthrough': 0,
    'no-shadow': 0,
  },
};
