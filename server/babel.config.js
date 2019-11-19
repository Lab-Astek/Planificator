module.exports = {
  presets: [['@babel/preset-env', {
    modules: 'cjs',
  }]],
  plugins: [
    ['@babel/plugin-transform-runtime'],
    ['@babel/plugin-transform-modules-commonjs'],
    ['module-resolver', {
      root: ['./src', './'],
    }],
  ],
  babelrcRoots: [
    '.',
  ],
};
