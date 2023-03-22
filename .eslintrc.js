module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    requireConfigFile: false,
    ecmaVersion: 'latest',
    sourceType: 'module',
    babelOptions: {
      presets: ['@babel/preset-env'],
      parserOpts: {
        plugins: ['jsx'],
      },
    },
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    'no-console': 0,
    'react/jsx-filename-extension': 0,
    'import/prefer-default-export': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'func-names': 0,
    'import/no-extraneous-dependencies': 0,
    'comma-dangle': 0,
    'no-unused-vars': 0,
    'no-useless-return': 0,
    'max-len': 0,
    'react/prop-types': 0,
    'no-param-reassign': 0
  },
};
