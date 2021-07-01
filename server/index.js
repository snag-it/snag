const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const amazonController = require('./puppeteer/amazon');
const ebayController = require('./puppeteer/ebay');
const targetController = require('./puppeteer/target');
const cacheController = require('./controllers/cacheController');
const bodyParser = require('body-parser');
const passport = require('passport');
var cookieSession = require('cookie-session');
const session = require('express-session');
require('./oauth');
require('./oauthfb');
const nodemailer = require('nodemailer');

const cookieParser = require('cookie-parser');

PORT = 3001;
const app = express();

//import in controllers
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));

//define and connect to DB
const mongoURI =
  'mongodb+srv://vanessa:codesmith123@cluster0.7anxu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'myFirstDatabase',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

PORT = 3001;

//image serving fingers crossed!
app.use('/public', express.static(path.resolve(__dirname, '../client/public')));
// WEBPACK DEV SERVER

app.use('/build', express.static(path.resolve(__dirname, '../client/build')));

app.use(
  cookieSession({
    name: 'SnagIt-session',
    keys: ['key1', 'key2'],
  })
);

// const isLoggedIn = (req, res, next) => {
//   if (req.user) {
//     next()
//   } else {
//     res.sendStatus(401);
//   }
// }
app.use(
  session({
    secret: 'key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/getUserData', userController.getUserData, (req, res) => {
  res.status(200).json(res.locals.userData);
});

app.get(
  '/home',
  // sessionController.isLoggedIn,
  (req, res) => {
    res
      .status(200)
      .sendFile(path.join(__dirname, '../client/public/index.html'));
  }
);

app.get('/history', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.get('/historyData', userController.getHistoryData, (req, res) => {
  res.status(200).json(res.locals.history);
});

app.get('/signup', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/public/index.html'));
});

// sending request send a post request to '/getPrices'
// object off of req.body
// after amazon send to ebay and then target and then send the accumulated data on locals.scraped to frontend as a json object

app.post(
  '/getPrices',
  cacheController.findCachedItem,
  amazonController.getAmazon,
  ebayController.getEbay,
  targetController.getTarget,
  userController.addHistory,
  cacheController.makeCachedItem,
  (req, res) => {
    res.status(200).json(res.locals.scraped);
  }
);

// send a get request to '/getUserData' after login to send back history of purchases
app.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,

  (req, res) => {
    res.redirect('/home');
  }
);

app.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,

  (req, res) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'snagit.app@gmail.com',
        pass: 'luhansehun',
      },
    });

    console.log('testing', req.body.email);
    const options = {
      from: '',
      to: req.body.email,
      subject: 'Thank you so much for choosing our service.',
      text: 'Daily deals will be send to you with promo codes.',
    };

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Sent', info.response);
    });

    res.redirect('/home');
  }
);

// add a favorite, frontend sends this request with the item object's details
// add to the user's favorite list
// send new updated entire favorites list back to frontend

app.post('/addFavorite', userController.addFavorite, (req, res) => {
  res.status(200).json(res.locals.favorites);
});

app.post('/removeFavorite', userController.removeFavorite, (req, res) => {
  res.status(200).json(res.locals.favorites);
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(`err`, err);
  const defaultErr = {
    log: 'Default global error handler triggered',
    status: 400,
    error: { err: 'An error occurred processing your request.' },
  };
  const errObj = { ...defaultErr, ...err };
  res.status(400).send(errObj.error);
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  }
);

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/secrets',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  }
);

module.exports = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
