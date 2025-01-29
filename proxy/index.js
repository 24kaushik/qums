const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require("dotenv").config();
const corsOptions = {
  origin: process.env.FRONTEND.split(","), // Frontend's origins
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://qums.quantumuniversity.edu.in",
    changeOrigin: true,
    cookieDomainRewrite: "", // Rewrite domain for compatibility
    onProxyReq: (proxyReq, req) => {
      // Forward cookies from browser to college server
      if (req.headers.cookie) {
        proxyReq.setHeader("Cookie", req.headers.cookie);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      // Forward Set-Cookie headers from college server to browser
      const proxyCookies = proxyRes.headers["set-cookie"];
      if (proxyCookies) {
        res.setHeader("set-cookie", proxyCookies);
      }
    },
  })
);

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`Proxy running on http://localhost:${PORT}`)
);
