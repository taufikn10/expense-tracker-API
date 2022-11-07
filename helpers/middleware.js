const jwt = require("jsonwebtoken");
const prisma = require("../helpers/database");

const userSession = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      console.log(req.headers.authorization);
      token = req.headers.authorization.split(" ")[1];

      const verified = jwt.verify(token, "jwt-secret-code");
      console.log(verified);

      const user = await prisma.user.findUnique({
        where: {
          id: verified.id,
        },
      });
      if (user) {
        // define user value token request backend
        req.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          password: user.password,
        };
        next();
      } else {
        res.status(403).send({
          status: false,
          error: "Not authenticated",
        });
      }
    } catch (error) {
      console.log("userSession middleware helper error : ", error);

      res.status(403).send({
        status: false,
        error: "Not authorize",
      });
    }
  }

  if (!token) {
    res.status(401).send({
      status: false,
      message: "Not authenticated, no token",
    });
  }
};

module.exports = userSession;
