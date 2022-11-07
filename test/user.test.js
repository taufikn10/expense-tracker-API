const request = require("supertest");
const app = require("./server");

afterAll((done) => {
  done();
});

// Get Users
describe("User", () => {
  // Get User
  test("Get User", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
  });

  // Create/Register User
  test("Create User", async () => {
    const res = await request(app).post("/api/register").send({
      name: "Taufik",
      email: "taunur@gmail.com",
      password: "12345",
    });
    expect(res.status).toBe(201);
  });

  // update User
  test("Update User", async () => {
    const res = await request(app).put("/api/users").send({
      id: 4,
      name: "Donal Bebek",
      email: "donal@gmail.com",
      password: "12345",
    });
    expect(res.statusCode).toBe(201);
  });

  // delete User
  test("Delete User", async () => {
    const res = await request(app).delete("/api/users/8");
    expect(res.statusCode).toBe(200);
  });
});
