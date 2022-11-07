const prisma = require("../helpers/database");
const Joi = require("joi");

class _expense {
  // list Expense
  getExpense = async (req) => {
    try {
      const getExpense = await prisma.expense.findMany({
        where: {
          user_id: req.user_id,
        },
      });
      console.log(getExpense);

      return {
        status: true,
        code: 200,
        message: "Data Semua Expense",
        data: getExpense,
      };
    } catch (error) {
      console.log("getExpense module Error :", error);

      return {
        status: false,
        error,
      };
    }
  };

  // sum Expense
  sumExpense = async (body) => {
    try {
      const expense = await prisma.expense.groupBy({
        by: ["user_id"],
        _sum: {
          expense: true,
        },
        where: {
          user: {
            id: body.id,
          },
        },
      });
      console.log("Sum", expense);
      return {
        status: true,
        code: 200,
        message: "Expense Berhasil dijumlah",
        data: expense,
      };
    } catch (error) {
      console.log("Sum Expense module Error :", error);

      return {
        status: false,
        error,
      };
    }
  };

  // create expense
  createExpense = async (body) => {
    try {
      // validasi input
      const schema = Joi.object({
        user_id: Joi.number().required(),
        description: Joi.string().required(),
        expense: Joi.number().required(),
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

      if(balanceUser.balance < body.expense){
        return {
          status: false,
          code: 401,
          message: "Saldo Tidak Cukup",
        };
      }

      const add = await prisma.expense.create({
        data: {
          user_id: body.user_id,
          description: body.description,
          expense: body.expense,
        },
      });

      const addTracker = await prisma.tracker.create({
        data: {
          user_id: body.user_id,
          status: 'Uang Keluar',
          balance: body.expense,
        },
      });

      const update = await prisma.user.update({
        where: {
          id: body.user_id,
        },
        data: {
          balance: balanceUser.balance - body.expense,
        },
      });
      console.log("update", update);

      return {
        status: true,
        code: 201,
        message: "Expense Berhasil Ditambah",
        data: add,
      };
    } catch (error) {
      console.log("create Expense module Error :", error);

      return {
        status: false,
        error,
      };
    }
  };

  // update expense
  updateExpense = async (id, body) => {
    try {
      const update = await prisma.expense.update({
        where: {
          id: id,
        },
        data: {
          description: body.description,
          expense: body.expense,
        },
      });

      return {
        status: true,
        code: 201,
        message: "Expense Berhasil Diupdate",
        data: update,
      };
    } catch (error) {
      console.log("update Expense module Error :", error);

      return {
        status: false,
        error,
      };
    }
  };

  // delete expense
  deleteExpense = async (id) => {
    try {
      const delExpense = await prisma.expense.delete({
        where: {
          id: id,
        },
      });

      return {
        status: true,
        code: 200,
        message: "Expense Berhasil Dihapus",
        data: delExpense,
      };
    } catch (error) {
      console.log("Delete Expense module Error :", error);

      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _expense();
