const express = require('express');
const cors = require("cors");
const routes = require('./routes')

// Prisma Client
const app = express();
const port = 8000;

// Handle Cors, Form Data, and JSON
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rest API Routes
// curl http://localhost:8000
app.get("/", async (req, res) => {
  res.status(201).send({
    status: true,
    message: "Hello this is API from Express Tutorial",
  });
});

// Routes API
routes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
