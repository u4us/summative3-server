var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema(
  {
    id: Number,
    address: String,
    name: String,
    email: String,

  },
  {
  	timestamps: true,
  	toJSON: { virtuals: true }
  }
);


module.exports = mongoose.model('Location', LocationSchema);