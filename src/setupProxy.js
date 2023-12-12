const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Proxy for Django admin
  app.use(
    "/admin",
    createProxyMiddleware({
      target: "https://yumyum-backend-48405822bc43.herokuapp.com/",
      changeOrigin: true,
    })
  );

  // Proxy for Django users
  app.use(
    "/users",
    createProxyMiddleware({
      target: "https://yumyum-backend-48405822bc43.herokuapp.com/",
      changeOrigin: true,
    })
  );

  // Proxy for Django reviews
  app.use(
    "/reviews",
    createProxyMiddleware({
      target: "https://yumyum-backend-48405822bc43.herokuapp.com/",
      changeOrigin: true,
    })
  );

  // Proxy for Django restaurants
  app.use(
    "/restaurants",
    createProxyMiddleware({
      target: "https://yumyum-backend-48405822bc43.herokuapp.com/",
      changeOrigin: true,
    })
  );

  // Add more proxy rules for other Django endpoints as needed

  // Proxy for Django Swagger
  app.use(
    /^\/swagger(\/.*)?$/,
    createProxyMiddleware({
      target: "https://yumyum-backend-48405822bc43.herokuapp.com/",
      changeOrigin: true,
    })
  );

  // Proxy for Django Redoc
  app.use(
    "/redoc",
    createProxyMiddleware({
      target: "https://yumyum-backend-48405822bc43.herokuapp.com/",
      changeOrigin: true,
    })
  );
};
