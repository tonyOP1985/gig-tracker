module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ?
    'https://gigtracker/api' : '',
  
  devServer: {
    proxy: 'http://localhost:5000/api',
    disableHostCheck: true
  }
};