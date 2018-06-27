module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactComponentLoader',
      externals: {
        react: 'React'
      }
    }
  }
}
