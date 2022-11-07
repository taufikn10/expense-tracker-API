const request = require("supertest");
const app = require("./server");

afterAll((done) => {
  done();
});

// Get Users
describe("User", () => {
  test("Get User", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
  });
});

// Create User

// Delete USer
