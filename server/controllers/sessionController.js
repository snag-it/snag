const Session = require("../models/sessionModel");

const sessionController = {};

//start to store cookie ssid or user id
sessionController.startSession = (req, res, next) => {
  Session.create({ cookieId: res.locals.user.id })
    .then((result) => {
      return next();
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        return next();
      }
      return next(err);
    });
};

//verifies that user is logged in

sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({ cookieId: req.cookieId.ssid })
    .then((result) => {
      if (result) {
        return next();
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = sessionController;
