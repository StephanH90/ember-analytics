'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['ember'],
  extends: ['@adfinis-sygroup/eslint-config'],
  env: {
    es6: true,
    browser: true,
  },
  rules: {
    'ember/no-jquery': 'error',
    'ember/no-mixins': 'warn',
    'ember/no-new-mixins': 'warn',
    'ember/no-observers': 'warn',
    'ember/no-get': 'warn',
    'ember/no-classic-components': 'warn',
    'ember/no-classic-classes': 'warn',
    'ember/require-tagless-components': 'warn',
    'ember/no-actions-hash': 'warn',
    'ember/no-component-lifecycle-hooks': 'warn',
  },
  settings: {
    'import/internal-regex': '^(@projectcaluma|ember-caluma)/',
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.prettierrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js',
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
    },
    {
      // Test files:
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended'],
    },
  ],
};
