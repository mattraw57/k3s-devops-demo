const { createClient } = require("redis");
const { createApp } = require("./app");

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

  const app = createApp(redis);

  app.listen(port, "0.0.0.0", () => {
    console.log(`API listening on port ${port}`);
  });
}

start();
