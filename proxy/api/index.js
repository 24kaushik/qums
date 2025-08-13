const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const proxy = createProxyMiddleware({
  target: "https://qums.quantumuniversity.edu.in",
  changeOrigin: true,
  cookieDomainRewrite: "",
  selfHandleResponse: true, // needed for Vercel
  on: {
    proxyReq: (proxyReq, req) => {
      // Forward cookies from browser to college server
      if (req.headers.cookie) {
        proxyReq.setHeader("Cookie", req.headers.cookie);
      }
    },
    proxyRes: (proxyRes, req, res) => {
      // Forward Set-Cookie headers from college server to browser
      // only in production mode because secure flag requires cookie to be sent over https connection.
      // doing this helps to run it locally for development without https. make sure to access the frontend with its local ip and not "localhost".
      if (process.env.MODE === "PROD" || process.env.MODE === "PRODUCTION") {
        let cookies = proxyRes.headers["set-cookie"];
        if (cookies) {
          cookies = cookies.map((cookie) => {
            if (cookie.includes("SameSite=Lax")) {
              return cookie.replace("SameSite=Lax", "SameSite=None; Secure");
            } else {
              return cookie.replace(
                "HttpOnly",
                "HttpOnly; SameSite=None; Secure"
              );
            }
          });
          proxyRes.headers["set-cookie"] = cookies;
        }
      }

      // Forward all proxy response headers
      Object.keys(proxyRes.headers).forEach((key) => {
        res.setHeader(key, proxyRes.headers[key]);
      });

      // CORS handling
      const origins = process.env.FRONTEND
        ? process.env.FRONTEND.split(",")
        : ["*"];
      const origin = req.headers.origin;
      if (origins.includes(origin) || origins.includes("*")) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");
      }

      // Send the proxied response
      res.statusCode = proxyRes.statusCode;
      proxyRes.pipe(res);
    },
  },
});

module.exports = async (req, res) => {
  // Handle OPTIONS preflight
  if (req.method === "OPTIONS") {
    const origins = process.env.FRONTEND
      ? process.env.FRONTEND.split(",")
      : ["*"];
    const origin = req.headers.origin;
    if (origins.includes(origin) || origins.includes("*")) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Cookie"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }
    res.statusCode = 204;
    res.end();
    return;
  }

  // Health check
  if (req.url === "/api" || req.url === "/api/health") {
    res.statusCode = 200;
    res.end("Proxy running");
    return;
  }

  // Remove /api prefix for target server
  req.url = req.url.replace(/^\/api/, "");

  // Run proxy middleware
  return new Promise((resolve) => {
    proxy(req, res, (result) => {
      if (result instanceof Error) {
        console.error(result);
        res.statusCode = 500;
        res.end("Proxy error");
      }
      resolve(result);
    });
  });
};
