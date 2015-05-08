var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
  title:  String,
  body:   String,
  date: { type: Date, default: Date.now },
});
//CommentSchema.index({ title : 1 , date : -1 });
module.exports = mongoose.model('Comment', CommentSchema)

