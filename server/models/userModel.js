const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: String,
  lastname: String,
  email: String,
  favorites: [
    {
      id: { type: String },
      title: { type: String },
      retailer: { type: String },
      price: { type: String },
      imgSrc: { type: String },
      link: { type: String },
    },
  ],
  history: [
    {
      type: Schema.Types.ObjectId,
      ref: 'history',
    },
  ],
});

userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
    if (err) console.log(err);
    user.password = hash;
    return next();
  });
});

userSchema.methods.comparePassword = function (potentialPass) {
  const user = this;
  return bcrypt.compare(potentialPass, user.password);
};

// userSchema.createIndex({ createdAt: 1 }, { expireAfterSeconds: 30 });

module.exports = mongoose.model('User', userSchema);
