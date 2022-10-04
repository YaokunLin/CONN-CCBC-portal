module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb-typescript',
    'next',
    'plugin:relay/recommended',
    'prettier',
  ],
  env: { es6: true, browser: true, node: true },
  plugins: ['jest', 'relay'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
  overrides: [
    {
      files: ['tests/**/*'],
      extends: 'plugin:jest/recommended',
      rules: {
        'jest/expect-expect': [
          'warn',
          {
            assertFunctionNames: ['expect', '*.expectMutationToBeCalled'],
          },
        ],
      },
    },
    {
      files: ['cypress/**/*.js'],
      extends: ['plugin:cypress/recommended'],
      parserOptions: {
        project: 'cypress/tsconfig.json',
      },
      rules: {
        'jest/valid-expect-in-promise': 0,
        'jest/no-focused-tests': 2,
        'promise/prefer-await-to-then': 0,
        'no-unused-expressions': 0,
        'cypress/no-unnecessary-waiting': 0,
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
    },
  ],
};
