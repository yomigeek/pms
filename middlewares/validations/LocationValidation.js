import Validator from "validatorjs";

class LocationValidation {

  static addLocation(req, res, next) {
    const locationInfo = {
      name: "required|alpha|min:2",
      female: "required|integer",
      male: "required|integer",
      areaCode:"required|alpha_num|min:2"
    };
    const validator = new Validator(req.body, locationInfo);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        errors
      });
    });
  }
}

export default LocationValidation;
