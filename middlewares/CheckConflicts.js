import connect from '../database/conn';

class CheckConflicts {

  static existingLocation(req, res, next) {
    const { areaCode } = req.body;
    const formatedAreaCode = areaCode.trim();
    connect.query(
      `SELECT id, name FROM locations WHERE areacode= '${formatedAreaCode}'`,
      (err, response) => {
        const result = JSON.parse(JSON.stringify(response.rows));
        if (result.length > 0) {
          return res.status(409).json({
            status: "error",
            statusCode: 409,
            message: "Location already exist! Kindly check the location area code"
          });
        }
        next();
      }
    );
  }

  static checkParentId(req, res, next) {
    const { parentId } = req.body
    if (parentId) {
      connect.query(
        `SELECT id FROM locations WHERE parentlocationid= '${parentId}'`,
        (err, response) => {
          const result = JSON.parse(JSON.stringify(response.rows));
          if (result.length < 1) {
            return res.status(404).json({
              status: "error",
              statusCode: 404,
              message: "Location does not exist! Kindly check the parentid"
            });
          }
          next();
        }
      );
    }
    else {
      next();
    }
  }

}

export default CheckConflicts;
