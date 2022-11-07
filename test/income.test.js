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
  // Create Income
  test("Create Income", async () => {
    const res = await request(app)
      .post("/api/income")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "gaji bulan 2",
        income: 700000,
      });

    expect(res.statusCode).toBe(201);
  });

  // List Income
  test("Get Income", async () => {
    const res = await request(app)
      .get("/api/income")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  // update Income
  test("Update Income", async () => {
    const res = await request(app)
      .put("/api/income/3")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "gaji bulan 2",
        income: 700000,
      });
    expect(res.statusCode).toBe(201);
  });

  // delete Income
  test("Delete Income", async () => {
    const res = await request(app)
      .delete("/api/income/10")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
