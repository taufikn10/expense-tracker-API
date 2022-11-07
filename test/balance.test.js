const request = require("supertest");
const app = require("./server");

let token;

describe("Income API Test", () => {
  // login
  test("Login", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "taunur@gmail.com", password: "123" });

    expect(res.status).toBe(200);
    token = res.body.data.token;
  });

  // List Balance
  test("Get Balance", async () => {
    const res = await request(app)
      .get("/api/balance")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(201);
  });
});
