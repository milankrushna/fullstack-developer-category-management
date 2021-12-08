
const { validationResult } = require("express-validator");


module.exports = class Validation {


  /**
   * validation middleware
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
static processValidation(req, res,next){
  console.log("Ip",req.connection.remoteAddress);
    return new Promise((resolve, reject) => {
      try {
        const foreignEntities = req.foreignEntities;
        if (foreignEntities && foreignEntities.length > 0) {
          return res.status(400).json({
            status: 0,
            message: `Unprocessable entities passed - ${foreignEntities.join(
              ","
            )}`,
            data : "",
          });
        }
    
      const errors = validationResult(req);
      // console.log(errors);
      if (!errors.isEmpty()) {
        console.log(JSON.stringify(errors.array()));
        //joining the error field
        return res.status(422).json({ status: 0, message: `Unprocessable Entity - ${ Object.keys(errors.mapped()).join()}`, data : "",errors:errors.array()  });
      } else {
        next()
      }
    } catch (error) {
      return res.status(422).json({status:0,message:error.message,data : ""})
    }
    })
  
  }

}