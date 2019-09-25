var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = require('./product-model');

var UserSchema = new Schema(
  {
    id: Number,
    username: String,
    password: String,
    email: String,
    savedProducts:[Number],
    myCart:[Number],
    location: String,
    bio: String,

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
UserSchema.virtual('products', {
  ref: 'Product', // The model to use
  localField: 'id', // Find people where `localField`
  foreignField: 'user_id', // is equal to `foreignField`
  justOne: false,
});
UserSchema.virtual('cart', {
  ref: 'Product', // The model to use
  localField: 'myCart', // Find people where `localField`
  foreignField: 'id', // is equal to `foreignField`
  justOne: false,
});

module.exports = mongoose.model('User', UserSchema);