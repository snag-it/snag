const express = require('express');
const cors = require('cors');
const path = require('path');

PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// WEBPACK DEV SERVER
app.use('/build', express.static(path.resolve(__dirname, '../client/build')));
app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

// sending request send a post request to '/getPrices'
// object off of req.body
// sending a post request for logins to '/login'
// username, password
// add in ssid cookie middleware
// sending a post request for signups to '/signup'
// first name, last name, email, username, password
// add in ssid cookie middleware

// send a get request to '/getUserData' after login to send back history of purchases

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
