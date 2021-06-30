const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const amazonController = require('./puppeteer/amazon');

PORT = 3001;
const app = express();

//import in controllers
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/getUserData', (req, res) => {
  res.status(200).json(res.locals.userData);
});

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

// sending request send a post request to '/getPrices'
// object off of req.body
// after amazon send to ebay and then target and then send the accumulated data on locals.scraped to frontend as a json object
app.post('/getPrices', amazonController.getAmazon, (req, res) => {
  console.log(res.locals.scraped);
  res.status(200).json(res.locals.scraped);
});

// send a get request to '/getUserData' after login to send back history of purchases
app.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    res.status(200).json(true);
  }
);

app.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
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

module.exports = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
