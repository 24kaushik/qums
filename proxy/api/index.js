const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

// This is needed to make http-proxy-middleware work with Vercel
const proxy = createProxyMiddleware({
  target: "https://qums.quantumuniversity.edu.in",
  changeOrigin: true,
  cookieDomainRewrite: "",
  selfHandleResponse: true, // Important for Vercel
  on: {
    proxyReq: (proxyReq, req) => {
      // Forward cookies from browser to college server
      if (req.headers.cookie) {
        proxyReq.setHeader("Cookie", req.headers.cookie);
      }
    },
    proxyRes: (proxyRes, req, res) => {
      // Handle cookies
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
        res.setHeader("Set-Cookie", cookies);
      }

      // Copy all headers from proxy response
      Object.keys(proxyRes.headers).forEach(key => {
        res.setHeader(key, proxyRes.headers[key]);
      });

      // Set CORS headers
      const origins = process.env.FRONTEND ? process.env.FRONTEND.split(",") : ["*"];
      const origin = req.headers.origin;
      if (origins.includes(origin) || origins.includes("*")) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");
      }

      // Stream the response back to the client
      res.statusCode = proxyRes.statusCode;
      proxyRes.pipe(res);
    }
  }
});

module.exports = async (req, res) => {
  // Set CORS headers for preflight requests
  if (req.method === "OPTIONS") {
    const origins = process.env.FRONTEND ? process.env.FRONTEND.split(",") : ["*"];
    const origin = req.headers.origin;
    if (origins.includes(origin) || origins.includes("*")) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.statusCode = 204;
      res.end();
      return;
    }
  }

  // For health checks
  if (req.url === "/api") {
    res.statusCode = 200;
    res.end("Proxy running");
    return;
  }

  // Rewrite URL to remove /api prefix
  req.url = req.url.replace(/^\/api/, "");
  
  // Handle the proxy
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
