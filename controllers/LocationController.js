import connect from '../database/conn';
import dotenv from 'dotenv';

dotenv.config();

class LocationController {
  static addLocation(req, res) {
    let pId;
    const { name, female, male, areaCode, parentid } = req.body;
    const formattedName = name.trim().toLowerCase();
    const randomId = Math.floor(Math.random() * 100000000000);
    const locationId = randomId + Date.now();
    const total = parseInt(male) + parseInt(female);
    const formattedAreaCode = areaCode.trim().toLowerCase();

    if (parentid == undefined) {
      pId = 'None';
    }
    else {
      pId = parentid.trim().toLowerCase();
    }


    connect.query(
      `${"insert into locations (name, female, male, locationid, parentid, areacode, total) " +
      "values ('"}${formattedName}', '${female}' , '${male}','${locationId}','${pId}', '${formattedAreaCode}', '${total}')`,
      (err, response) => {
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

  static getById(req, res) {
    const { pid } = req.params;
    connect.query(
      `SELECT name, male, female, total, areacode FROM locations
        WHERE parentid = '${pid.trim().toLowerCase()}'
        `,
      (err, response) => {
        const result = JSON.parse(JSON.stringify(response.rows));
        if (result.length > 0) {
          return res.status(200).json({
            status: "success",
            statusCode: 200,
            subLocations: result,
          });
        }
        else {
          return res.status(404).json({
            status: "not found",
            statusCode: 404,
            message: "No Sublocation exist for this location!",
          });
        }
      }
    );
  }

  static update(req, res) {
    let pId;
    const { aid } = req.params;
    const { name, female, male, areaCode, parentid } = req.body;
    const formattedName = name.trim().toLowerCase();
    const total = parseInt(male) + parseInt(female);
    const formattedAreaCode = areaCode.trim().toLowerCase();

    if (parentid == undefined) {
      pId = 'None';
    }
    else {
      pId = parentid.trim().toLowerCase();
    }
    connect.query(
      `UPDATE locations SET 
      name = '${formattedName}',
      female = '${female}',
      male = '${male}',
      total = '${total}',
      areacode = '${formattedAreaCode}',
      parentid = '${pId.trim().toLowerCase()}'
      WHERE areacode='${aid.trim().toLowerCase()}'`,
      (err, response) => {
        if (err) {
          throw err.message;
        }
        if (response.rowCount > 0) {
          return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Location was updated successfully",
          });
        }
        return res.status(400).json({
          status: "error",
          statusCode: 400,
          message: "Location update failed",
        });
      }
    );
  } 

  static delete(req, res) {
    const { aid } = req.params;
    connect.query(
      `DELETE FROM locations
        WHERE areacode = '${aid.trim().toLowerCase()}'
        `,
      (err, response) => {
        if (response.rowCount > 0) {
          return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: `Location has been deleted successfully!`,
          });
        }
        else {
          return res.status(400).json({
            status: "error",
            statusCode: 400,
            message: "Locations couldn't be deleted! Something went wrong.",
          });
        }
      }
    );
  }


}

export default LocationController;
