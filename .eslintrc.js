module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  env: {
    browser: true,
    node: true
  },
  'rules': {
      'func-names': [0, 'never'],
      'max-len':[0,80],
      'prefer-spread':0,
      'no-console':0,
      'semi':0,
      'no-plusplus':0,
      'comma-dangle':0,
      'eqeqeq':0,
      'no-param-reassign':0,
      'space-before-function-paren':[1, 'never'],
      'arrow-body-style': 0,
      'import/no-extraneous-dependencies': [0, {'devDependencies': ['/test/**/*.js']}],
      // don't require .vue extension when importing
        'import/extensions': ['error', 'always', {
          'js': 'never',
          'vue': 'never'
        }],

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
