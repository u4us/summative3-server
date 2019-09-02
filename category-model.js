var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema(
  {
    id: Number,
    name: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);