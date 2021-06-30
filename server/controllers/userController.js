const User = require("../models/userModel");

const userController = {};

//create new user
userController.createUser = (req, res, next) => {
  User.create(
    {
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    },
    (err, result) => {
      if (err) {
        return next({
          log: `Error in userController.createUser, Error Message: ${err}`,
          message: `Error in userController.createUser, check log for details`,
        });
      }
      res.locals.user = result;
      return next();
    }
  );
};

//need to ask about verification of user here
module.exports = userController;
