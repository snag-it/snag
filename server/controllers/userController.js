const { Redirect } = require('react-router');
const User = require('../models/userModel');
const History = require('../models/historyModel');
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

userController.verifyUser = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    const userStatus = await user.comparePassword(req.body.password);
    if (userStatus === true) {
      res.locals.user = user;
      return next();
    } else {
      res.redirect('/signup');
    }
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

userController.addFavorite = async (req, res, next) => {
  try {
    // instead of the actual id, do req.cookies.ssid
    const user = await User.findOne({ _id: req.cookies.ssid });
    // spread previous favorites into new array
    const userFavorites = [...user.favorites];
    // get new item object off of request body
    const newFavorite = req.body.requestItem;
    // push new favorite onto entire favorites list
    userFavorites.push(newFavorite);
    // update the user's file with the new favorites array
    // instead of the actual id, do req.cookies.ssid
    const userUpdated = await User.findOneAndUpdate(
      { _id: req.cookies.ssid },
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
    const user = await User.findOne({ _id: req.cookies.ssid });
    const origFavorites = [...user.favorites];
    const newFavoritesList = origFavorites.filter((favObj) => {
      return favObj.title !== req.body.item.title;
    });
    // instead of the actual id, do req.cookies.ssid
    const userUpdated = await User.findOneAndUpdate(
      { _id: req.cookies.ssid },
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
  console.log('hit');
  try {
    // get the user from the database from whoever just logged in
    const user = await User.findOne({ _id: req.cookies.ssid });
    // we want to send to frontend: username, email, favorites, and history
    console.log(user);
    const userData = {
      username: user.username,
      email: user.email,
      favorites: user.favorites,
      history: user.history,
    };
    res.locals.userData = userData;
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

userController.addHistory = async (req, res, next) => {
  console.log(req.cookies);
  try {
    const historyItem = await History.create({
      searchedItem: req.body.item,
      results: res.locals.scraped,
    });
    console.log(historyItem._id);
    const user = await User.findOne({ _id: req.cookies.ssid });
    const updatedHistory = [...user.history];
    updatedHistory.push(historyItem._id);
    const userUpdated = await User.findOneAndUpdate(
      { _id: req.cookies.ssid },
      { history: updatedHistory },
      { new: true }
    );
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

userController.getHistoryData = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.cookies.ssid });
    console.log(user.history);
    let historyData = await History.find({ _id: { $in: user.history } });
    console.log('history data: ', historyData);
    res.locals.history = historyData;
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

userController.lookUpHistory = async (req, res, next) => {
  try {
    const history = await History.findOne({ searchedItem: req.body.item });
    if (history !== null) {
      return res.status(200).json(history.results);
    }
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = userController;
