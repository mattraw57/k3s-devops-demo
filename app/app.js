const express = require("express");
const os = require("os");

function createApp(redis) {
  const app = express();

  app.get("/", async (req, res) => {
    const visits = await redis.incr("visits");

    res.json({
      message: "Hello from Kubernetes!",
      version: "v5",
      hostname: os.hostname(),
      visits
    });
  });

  app.get("/health", (req, res) => {
    res.json({
      status: "healthy"
    });
  });

  return app;
}

module.exports = { createApp };
