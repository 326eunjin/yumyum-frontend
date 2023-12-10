const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    createProxyMiddleware('/yumyum', {
      target: 'https://yumyum-backend-48405822bc43.herokuapp.com',
      changeOrigin: true,
    })
  )
};  