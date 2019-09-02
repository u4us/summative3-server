var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema(
  {
    id: Number,
    comment: String,
    product_id: Number,
    user_id: Number,
    product_id: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);