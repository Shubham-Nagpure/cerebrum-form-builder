module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-for': 'off',
    camelcase: 'off',
    'func-names': ['error', 'never'],
    'import/prefer-default-export': 'off',
    'import/no-anonymous-default-export': 'off',
    'no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-multi-spaces': 'off',
    'class-methods-use-this': 'off',
    'no-class-assign': 'off',
    'key-spacing': 'off',
    'lines-between-class-members': 'off',
    'no-param-reassign': 'off',
    'consistent-return': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'import/no-unresolved': 'off',
    'no-tabs': 0
  }
};
