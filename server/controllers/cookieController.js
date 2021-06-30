const cookieController = {};

//grab the id of user who is logged in to store as a cookie
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie("ssid", res.locals.user.id, { httpOnly: true });
  return next();
};

module.exports = cookieController;
