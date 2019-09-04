var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = require('./category-model');
var Comment = require('./comment-model');

var ProductSchema = new Schema(
  {
    id: Number,
    name: String,
    description: String,
    photo: String,
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

ProductSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: 'id',
  justOne: true,
});

ProductSchema.virtual('category', {
  ref: 'Category',
  localField: 'category_id',
  foreignField: 'id',
  justOne: true,
});

ProductSchema.virtual('comments', {
  ref: 'Comment',
  localField: 'id',
  foreignField: 'product_id',
  justOne: false,
});

module.exports = mongoose.model('Product', ProductSchema);