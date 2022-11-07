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

        // Create Expense
        test("Create Expense", async () => {
            const res = await request(app)
              .post("/api/expense")
              .set("Authorization", `Bearer ${token}`)
              .send({
                description: "Jatah",
                expense: 10000,
              });
        
            switch (res.statusCode) {
                case 200:
                    expect(res.status).toBe(200);
                    console.log(res.body)
                    break;
                case 401:
                    expect(res.status).toBe(401);
                    console.log(res.body)
                    break;
                default:
                    console.log('Kosong')
                    break;
            }
          });
        
        //Get Expense
        test("Get Expense", async () => {
            const res = await request(app)
            .get("/api/expense/")
            .set("Authorization", `Bearer ${token}`)

            expect(res.status).toBe(200);
            console.log(res.body);
        });

        //Update Expense
        test("Update Expense", async () => {
            const res = await request(app)
              .put("/api/expense/4")
              .set("Authorization", `Bearer ${token}`)
              .send({
                description: "gaji bulan 2",
                expense: 10000,
              });
            expect(res.statusCode).toBe(201);
          });

         // delete Expense
        test("Delete Expense", async () => {
            const res = await request(app)
            .delete("/api/expense/4")
            .set("Authorization", `Bearer ${token}`);
            expect(res.statusCode).toBe(200);
        });
  });