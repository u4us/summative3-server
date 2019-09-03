var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    id: Number,
    description: String,
    product_id: Number,
    user_id: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);