var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = require('./category-model');
var Comment = require('./comment-model');

var ProductSchema = new Schema(
  {
    id: Number,
    name: String,
    description: String,
    price: Number,
    category_id: Number,
    user_id: Number,
  },
  { 
    timestamps: true,
    toJSON:{
      virtuals: true,
    } 
  }
);

ProductSchema.virtual('category', {
  ref: 'Category',
  localField: 'category_id',
  foreignField: 'id',
  justOne: true,
});

module.exports = mongoose.model('Product', ProductSchema);