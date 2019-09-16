import connect from '../database/conn';
import dotenv from 'dotenv';

dotenv.config();

class LocationController {
  static addLocation(req, res) {
    let pId;
    const { name, female, male, areaCode } = req.body;
    const formattedName = name.trim().toLowerCase();
    const randomId = Math.floor(Math.random() * 100000000000);
    const locationId = randomId + Date.now();
    const total = parseInt(male) + parseInt(female);

    if (req.body.parentId == undefined) {
      pId = 'None';
    }
    else {
      pId = req.body.parentId;
    }


    connect.query(
      `${"insert into locations (name, female, male, locationid, parentid, areacode, total) " +
      "values ('"}${formattedName}', '${female}' , '${male}','${locationId}','${pId}', '${areaCode}', '${total}')`,
      (err, response) => {
        if (err) {
          throw err.message;
        }
        return res.status(201).json({
          status: "success",
          statusCode: 201,
          message: "location created successfully",
        });
      }
    );
  }

  static getAll(req, res) {

    connect.query(
      `SELECT name, male, female, total, areacode FROM locations
      `,
      (err, response) => {
        const result = JSON.parse(JSON.stringify(response.rows));
        if (result.length > 0) {
          return res.status(200).json({
            status: "success",
            statusCode: 200,
            locations: result,
          });
        }
        else {
          return res.status(404).json({
            status: "not found",
            statusCode: 404,
            message: "No location exist!",
          });
        }
      }
    );
  }


}

export default LocationController;
