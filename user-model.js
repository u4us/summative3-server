var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = require('./product-model');

var UserSchema = new Schema(
  {
    id: Number,
    username: String,
    password: String,
    email: String,
    savedProducts:[Number]
  },
  {
  	timestamps: true,
  	toJSON: { virtuals: true }
  }
);


UserSchema.virtual('favourites', {
  ref: 'Product', // The model to use
  localField: 'savedProducts', // Find people where `localField`
  foreignField: 'id', // is equal to `foreignField`
  justOne: false,

});

module.exports = mongoose.model('User', UserSchema);