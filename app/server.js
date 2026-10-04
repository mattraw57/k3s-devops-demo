const express = require("express");
const os = require("os");
const { createClient } = require("redis");

const app = express();
const port = 3000;

const redis = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

async function start() {
  await redis.connect();

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

  app.listen(port, "0.0.0.0", () => {
    console.log(`API listening on port ${port}`);
  });
}

start();
