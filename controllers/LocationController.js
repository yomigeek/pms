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

    if(req.body.parentId == undefined) {
      pId = 'None';
    }
    else {
      pId = req.body.parentId;
    }


    connect.query(
      `${"insert into locations (name, totalfemale, totalmale, locationid, parentlocationid, areaCode) " +
        "values ('"}${formattedName}', '${female}' , '${male}','${locationId}','${pId}', '${areaCode}')`,
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

}

export default LocationController;
