var mongoose = require('mongoose');
var schema = mongoose.Schema;

var commentSchema = new schema({
  comment:{type:String,required:true},
  articleId:{type:schema.Types.ObjectId, ref:'article'},
  likes:{type:Number,default:0}
},{timestamps:true});

module.exports = mongoose.model('comment', commentSchema);