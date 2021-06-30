const User = require('../models/userModel');

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
      favorites: [],
      history: [],
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

userController.verifyUser = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user.comparePassword(req.body.password)) {
        res.locals.user = user;
        return next();
      } else {
        res.redirect('/signup');
      }
    })
    .catch((err) => {
      return next(err);
    });
};

userController.addFavorite = async (req, res, next) => {
  try {
    // instead of the actual id, do req.cookies.ssid
    const user = await User.findOne({ _id: '60dc9dffef153f08f31274bf' });
    // spread previous favorites into new array
    const userFavorites = [...user.favorites];
    // get new item object off of request body
    const newFavorite = req.body.addFavorite;
    // push new favorite onto entire favorites list
    userFavorites.push(newFavorite);
    // update the user's file with the new favorites array
    // instead of the actual id, do req.cookies.ssid
    const userUpdated = await User.findOneAndUpdate(
      { _id: '60dc9dffef153f08f31274bf' },
      { favorites: userFavorites },
      { new: true }
    );
    res.locals.favorites = userUpdated.favorites;
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

userController.removeFavorite = async (req, res, next) => {
  try {
    // instead of the actual id, do req.cookies.ssid
    const user = await User.findOne({ _id: '60dc9dffef153f08f31274bf' });
    const origFavorites = [...user.favorites];
    const newFavoritesList = origFavorites.filter((favObj) => {
      return favObj.title !== req.body.removeFavorite.title;
    });
    // instead of the actual id, do req.cookies.ssid
    const userUpdated = await User.findOneAndUpdate(
      { _id: '60dc9dffef153f08f31274bf' },
      { favorites: newFavoritesList },
      { new: true }
    );
    res.locals.favorites = userUpdated.favorites;
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

userController.getUserData = async (req, res, next) => {
  try {
    // get the user from the database from whoever just logged in
    const user = await User.findOne({ _id: req.cookies.ssid });
    // we want to send to frontend: username
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = userController;
