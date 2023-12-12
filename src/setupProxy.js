const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Proxy for Django admin
  app.use(
    "/admin",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );

  // Proxy for Django users
  app.use(
    "/users",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );

  // Proxy for Django reviews
  app.use(
    "/reviews",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );

  // Proxy for Django restaurants
  app.use(
    "/restaurants",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );

  // Add more proxy rules for other Django endpoints as needed

  // Proxy for Django Swagger
  app.use(
    /^\/swagger(\/.*)?$/,
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );

  // Proxy for Django Redoc
  app.use(
    "/redoc",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );
};
