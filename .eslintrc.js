module.exports = {
  env: {
    browser : true,
    es2021  : true,
    commonjs: true,  // `module.exports` などのエラー回避のため
    node    : true   // `gulpfile.js` 内で `process.env` を使用しているため
  },
  extends: 'eslint:recommended',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType : 'module'
  },
  rules: {  // https://eslint.org/docs/latest/rules/
    'arrow-spacing': 'error',  // アロー関数のスペース
    'block-spacing': 'error',  // ブレースの前後のスペース
    'brace-style': ['error', 'stroustrup'],  // `else` や `catch` の手前の終了ブレース `}` で改行する
    'comma-dangle': ['error', 'never'],  // 末尾カンマを禁止
    quotes: ['error', 'single'],  // シングルクォート必須
    semi: ['error', 'always'],  // 末尾セミコロンを必須
    'semi-spacing': 'error',  // セミコロンの手前はスペースなし
    'space-before-blocks': ['error', { functions: 'always', keywords: 'always', classes: 'always' }],  // ブレース `{` の手前にスペース
    'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }]  // 関数の引数カッコ `(` の手前のスペース
  }
};
