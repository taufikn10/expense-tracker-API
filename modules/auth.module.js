const prisma = require("../helpers/database");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class _auth {
  // Create/Post User
  register = async (body) => {
    try {
      // Validasi input
      const schema = joi
        .object({
          name: joi.string().required(),
          email: joi.string().required(),
          password: joi.string().required(),
        })
        .options({ abortEarly: false });

      const validation = schema.validate(body);

      if (validation.error) {
        const errorDetails = validation.error.details.map(
          (detail) => detail.message
        );

        return {
          status: false,
          code: 422,
          error: errorDetails.join(", "),
        };
      }

      const password = bcrypt.hashSync(body.password, 10);

      const add = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password,
        },
      });

      return {
        status: true,
        code: 201, //sukses membuat create data
        data: add,
      };
    } catch (error) {
      console.error("createUser user module Error: ", error);

      return {
        status: false,
        error,
      };
    }
  };

  login = async (body) => {
    try {
      const schema = joi.object({
        email: joi.string().required(),
        password: joi.string().required(),
      });
      const validation = schema.validate(body);

      if (validation.error) {
        const errorDetails = validation.error.details.map(
          (detail) => detail.message
        );

        return {
          status: false,
          code: 422,
          error: errorDetails.join(", "),
        };
      }

      // Cari user dengan email
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });

      // Kalo user tidak ada return error
      if (!user) {
        return {
          status: false,
          code: 404,
          error: "User tidak ditemukan",
        };
      }

      // kalo user ada check password
      if (!bcrypt.compareSync(body.password, user.password)) {
        return {
          status: false,
          code: 401,
          error: "Password Salah",
        };
      }

      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = jwt.sign(payload, "jwt-secret-code", { expiresIn: "8h" }); // 8 jam

      return {
        status: true,
        data: {
          token,
        },
      };
    } catch (error) {
      console.error("Login auth module Error: ", error);

      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _auth();
