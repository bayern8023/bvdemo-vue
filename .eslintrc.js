module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "vue/max-attributes-per-line": [4, {
      "singleline": 10,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/name-property-casing": ["error", "PascalCase"],
    "vue/no-v-html": "off",
    'accessor-pairs': 4,
    'arrow-spacing': [4, {
      'before': true,
      'after': true
    }],
    'block-spacing': [4, 'always'],
    'brace-style': [4, '1tbs', {
      'allowSingleLine': true
    }],
    'camelcase': [0, {
      'properties': 'always'
    }],
    'comma-dangle': [4, 'never'],
    'comma-spacing': [4, {
      'before': false,
      'after': true
    }],
    'comma-style': [4, 'last'],
    'constructor-super': 4,
    'curly': [4, 'multi-line'],
    'dot-location': [4, 'property'],
    'eol-last': 4,
    'eqeqeq': ["error", "always", {
      "null": "ignore"
    }],
    'generator-star-spacing': [4, {
      'before': true,
      'after': true
    }],
    'handle-callback-err': [4, '^(err|error)$'],
    'indent': [4, 4, {
      'SwitchCase': 1
    }],
    'jsx-quotes': [4, 'prefer-single'],
    'key-spacing': [4, {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [4, {
      'before': true,
      'after': true
    }],
    'new-cap': [4, {
      'newIsCap': true,
      'capIsNew': false
    }],
    'new-parens': 4,
    'no-array-constructor': 4,
    'no-caller': 4,
    'no-console': 'off',
    'no-class-assign': 4,
    'no-cond-assign': 4,
    'no-const-assign': 4,
    'no-control-regex': 0,
    'no-delete-var': 4,
    'no-dupe-args': 4,
    'no-dupe-class-members': 4,
    'no-dupe-keys': 4,
    'no-duplicate-case': 4,
    'no-empty-character-class': 4,
    'no-empty-pattern': 4,
    'no-eval': 4,
    'no-ex-assign': 4,
    'no-extend-native': 4,
    'no-extra-bind': 4,
    'no-extra-boolean-cast': 4,
    'no-extra-parens': [4, 'functions'],
    'no-fallthrough': 4,
    'no-floating-decimal': 4,
    'no-func-assign': 4,
    'no-implied-eval': 4,
    'no-inner-declarations': [4, 'functions'],
    'no-invalid-regexp': 4,
    'no-irregular-whitespace': 4,
    'no-iterator': 4,
    'no-label-var': 4,
    'no-labels': [4, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 4,
    'no-mixed-spaces-and-tabs': 4,
    'no-multi-spaces': 4,
    'no-multi-str': 4,
    'no-multiple-empty-lines': [4, {
      'max': 1
    }],
    'no-native-reassign': 4,
    'no-negated-in-lhs': 4,
    'no-new-object': 4,
    'no-new-require': 4,
    'no-new-symbol': 4,
    'no-new-wrappers': 4,
    'no-obj-calls': 4,
    'no-octal': 4,
    'no-octal-escape': 4,
    'no-path-concat': 4,
    'no-proto': 4,
    'no-redeclare': 4,
    'no-regex-spaces': 4,
    'no-return-assign': [4, 'except-parens'],
    'no-self-assign': 4,
    'no-self-compare': 4,
    'no-sequences': 4,
    'no-shadow-restricted-names': 4,
    'no-spaced-func': 4,
    'no-sparse-arrays': 4,
    'no-this-before-super': 4,
    'no-throw-literal': 4,
    'no-trailing-spaces': 4,
    'no-undef': 4,
    'no-undef-init': 4,
    'no-unexpected-multiline': 4,
    'no-unmodified-loop-condition': 4,
    'no-unneeded-ternary': [4, {
      'defaultAssignment': false
    }],
    'no-unreachable': 4,
    'no-unsafe-finally': 4,
    'no-unused-vars': [4, {
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 4,
    'no-useless-computed-key': 4,
    'no-useless-constructor': 4,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 4,
    'no-with': 4,
    'one-var': [4, {
      'initialized': 'never'
    }],
    'operator-linebreak': [4, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': [4, 'never'],
    'quotes': [4, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': [4, 'never'],
    'semi-spacing': [4, {
      'before': false,
      'after': true
    }],
    'space-before-blocks': [4, 'always'],
    'space-before-function-paren': [4, 'never'],
    'space-in-parens': [4, 'never'],
    'space-infix-ops': 4,
    'space-unary-ops': [4, {
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': [4, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [4, 'never'],
    'use-isnan': 4,
    'valid-typeof': 4,
    'wrap-iife': [4, 'any'],
    'yield-star-spacing': [4, 'both'],
    'yoda': [4, 'never'],
    'prefer-const': 4,
    'no-debugger': process.env.NODE_ENV === 'production' ? 4 : 0,
    'object-curly-spacing': [4, 'always', {
      objectsInObjects: false
    }],
    'array-bracket-spacing': [4, 'never']
  }
}
