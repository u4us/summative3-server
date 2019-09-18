var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema(
  {
    id: Number,
    name: String,
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

CategorySchema.virtual('products', {
  ref: 'Product',
  localField: 'id', 
  foreignField: 'category_id', 
  justOne: false,
});

module.exports = mongoose.model('Category', CategorySchema);