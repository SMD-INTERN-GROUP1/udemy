module.exports = {
  extends: 'airbnb-base',
  plugins: [
    'import',
  ],
  env: {
    es2020: true,
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'linebreak-style': [0, 'unix'],
    // 'prettier/prettier': ['error'],
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'no-unused-vars': 'warn',
    'import/no-cycle': 'warn',
    'max-classes-per-file': 0,

  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

};
