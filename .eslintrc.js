module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react'],
  globals: {
    customFetch: true,
    __DEV__: true,
  },
  rules: {
    'object-curly-newline': 0,
    'react/jsx-fragments': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
    'max-len': [
      1,
      {
        code: 120,
        ignoreComments: true,
      },
    ],
    'no-nested-ternary': 0,
    'operator-linebreak': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./'],
      },
    },
  },
};
