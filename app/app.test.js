const { test } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const { createApp } = require("./app");

test("GET /health returns healthy", async () => {
  const app = createApp({});

  const response = await request(app)
    .get("/health")
    .expect(200);

  assert.deepEqual(response.body, {
    status: "healthy"
  });
});
