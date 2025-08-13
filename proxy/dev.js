const express = require("express");
const handler = require("./api/index.js"); // your proxy code

const app = express();

app.use("/api", (req, res) => {
  return handler(req, res);
});

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
