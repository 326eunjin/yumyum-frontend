const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Proxy for Django admin
  app.use(
    "/admin",
    createProxyMiddleware({
      target: "https://yumyum-backend-48405822bc43.herokuapp.com",
      changeOrigin: true,
    })
  );

  // Proxy for Django users
  app.use(
    "/users",
    createProxyMiddleware({
      target: "https://yumyum-backend-48405822bc43.herokuapp.com",
      changeOrigin: true,
    })
  );

  // Proxy for Django reviews
  app.use(
    "/reviews",
    createProxyMiddleware({
      target: "https://yumyum-backend-48405822bc43.herokuapp.com",
      changeOrigin: true,
    })
  );

  // Proxy for Django restaurants
  app.use(
    "/restaurants",
    createProxyMiddleware({
      target: "https://yumyum-backend-48405822bc43.herokuapp.com",
      changeOrigin: true,
    })
  );

  // Proxy for Django swagger
  app.use(
    "/swagger",
    createProxyMiddleware({
      target: "https://yumyum-backend-48405822bc43.herokuapp.com",
      changeOrigin: true,
    })
  );

  // Proxy for Django redoc
  app.use(
    "/redoc",
    createProxyMiddleware({
      target: "https://yumyum-backend-48405822bc43.herokuapp.com",
      changeOrigin: true,
    })
  );

  // Proxy for Django schema
  app.use(
    "/schema",
    createProxyMiddleware({
      target: "https://yumyum-backend-48405822bc43.herokuapp.com",
      changeOrigin: true,
    })
  );
};
