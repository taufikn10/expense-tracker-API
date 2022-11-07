const prisma = require("../helpers/database");
const Joi = require("joi");

class _income {
  // list income
  getIncome = async (req) => {
    try {
      const getIncome = await prisma.income.findMany({
        where: {
          user_id: req.user_id,
        },
      });
      console.log(getIncome);

      return {
        status: true,
        code: 200,
        message: "Data Semua Income",
        data: getIncome,
      };
    } catch (error) {
      console.log("getIncome module Error :", error);

      return {
        status: false,
        error,
      };
    }
  };

  // sum
  sumIncome = async (body) => {
    try {
      const income = await prisma.income.groupBy({
        by: ["user_id"],
        _sum: {
          income: true,
        },
        where: {
          user: {
            id: body.id,
          },
        },
      });
      console.log("Sum", income);
      return {
        status: true,
        code: 200,
        message: "Income Berhasil dijumlah",
        data: income,
      };
    } catch (error) {
      console.log("Sum Income module Error :", error);

      return {
        status: false,
        error,
      };
    }
  };

  // create income
  createIncome = async (body) => {
    try {
      // validasi input
      const schema = Joi.object({
        user_id: Joi.number().required(),
        description: Joi.string().required(),
        income: Joi.number().required(),
      }).options({ abortEarly: false });
      const validation = schema.validate(body);

      const balanceUser = await prisma.user.findUnique({
        where : {
          id : body.user_id
        }
      })

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
       const add = await prisma.income.create({
        data: {
          user_id: body.user_id,
          description: body.description,
          income: body.income,
        },
      });

      const addTracker = await prisma.tracker.create({
        data: {
          user_id: body.user_id,
          status: 'Uang Masuk',
          balance: body.income,
        },
      });

      // masukan ke balance
      const update = await prisma.user.update({
        where: {
          id: body.user_id,
        },
        data: {
          balance: balanceUser.balance + body.income,
        },
      });
      console.log("update", update);

      return {
        status: true,
        code: 201,
        message: "Income Berhasil Ditambah",
        data: add,
      };
    } catch (error) {
      console.log("createIncome module Error :", error);

      return {
        status: false,
        error,
      };
    }
  };

  // update income
  updateIncome = async (id, body) => {
    try {
      const update = await prisma.income.update({
        where: {
          id: id,
        },
        data: {
          description: body.description,
          income: body.income,
        },
      });

      return {
        status: true,
        code: 201,
        message: "Income Berhasil Diupdate",
        data: update,
      };
    } catch (error) {
      console.log("update Income module Error :", error);

      return {
        status: false,
        error,
      };
    }
  };

  // delete income
  deleteIncome = async (id) => {
    try {
      const delIncome = await prisma.income.delete({
        where: {
          id: id,
        },
      });

      return {
        status: true,
        code: 200,
        message: "Income Berhasil Dihapus",
        data: delIncome,
      };
    } catch (error) {
      console.log("deleteIncome module Error :", error);

      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _income();
