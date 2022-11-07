const request = require("supertest");
const app = require("./server");

afterAll((done) => {
  done();
});

let token;

describe("Expense", () => {
    // login
      test("Login", async () => {
          const res = await request(app)
          .post("/api/login")
          .send({ email: "debby@gmail.com", password: "password" });

          expect(res.status).toBe(200);
          token = res.body.data.token;
      });

    //Get Tracker
        test("Get Tracker", async () => {
            const res = await request(app)
            .get("/api/tracker/")
            .set("Authorization", `Bearer ${token}`)

            expect(res.status).toBe(200);
            console.log(res.body);
        });
});