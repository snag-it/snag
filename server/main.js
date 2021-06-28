const express = require('express');
const app = express();
const mongoose = require('mongoose');

const itemController = require('./itemController');

const PORT = 3000;

mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());










app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
