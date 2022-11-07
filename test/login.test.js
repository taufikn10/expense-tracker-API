const request = require("supertest");
const app = require("./server");

describe("login API Test", () => {
  // Login Test
  test("Login", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "taunur@gmail.com", password: "123" });

    expect(res.status).toBe(200);
  });
});
