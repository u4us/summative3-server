var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    id: Number,
    username: String,
    password: String,
    email: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);