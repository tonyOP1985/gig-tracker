module.exports = {
  devServer: {
    proxy: 'http://localhost:5000/api',
    disableHostCheck: true
  }
};
