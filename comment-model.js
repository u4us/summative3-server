var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    id: Number,
    description: String,
    product_id: Number,
    user_id: Number,
  },
  { 
    timestamps: true,
    toJSON: {
      virtuals: true,
    }
  }
);

CommentSchema.virtual('user', {
	ref: 'User',
	localField: 'user_id', 
	foreignField: 'id', 
	justOne: true,
});

module.exports = mongoose.model('Comment', CommentSchema);