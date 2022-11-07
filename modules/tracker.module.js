const prisma = require("../helpers/database");

class _tracker {
    getTracker = async (body) => {
        try {
          const getTracker = await prisma.tracker.findMany({
            where: {
              user_id: body.id,
            },
          });
          console.log(getTracker);
    
          return {
            status: true,
            code: 200,
            message: "Data Semua Tracker",
            data: getTracker,
          };
        } catch (error) {
          console.log("getTracker module Error :", error);
    
          return {
            status: false,
            error,
          };
        }
      };
}

module.exports = new _tracker();