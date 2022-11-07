const Joi = require("joi");
const prisma = require("../helpers/database");
const bcrypt = require("bcrypt");

class _balance {
    // getBalance
    getBalance = async (body) => {
      try {
        const uBalance = await prisma.user.findMany({
          where: {
            id: body.id,
          },
          select: {
            name: true,
            balance: true,
          },
        });
  
        console.log("module balance", uBalance);
        return {
          status: true,
          code: 201,
          message: "Data Balance",
          data: uBalance,
        };
      } catch (error) {
        console.log("Get Balance module Error :", error);
  
        return {
          status: false,
          error,
        };
      }
    };

  
    //
  }
  
  module.exports = new _balance();
  