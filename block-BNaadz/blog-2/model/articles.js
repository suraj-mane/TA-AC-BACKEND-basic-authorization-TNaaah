var mongoose = require('mongoose');
var schema = mongoose.Schema;

var articleSchema = new schema({
  title:{type:String,required:true},
  tags:[{type:String}],
  commentId:[{type:schema.Types.ObjectId, ref:'comment'}],  
  author:[{type:schema.Types.ObjectId, ref:"User", required:true}],
  summery:{type:String},
  likes:{type:Number,default:0}
},{timestamps:true});

module.exports = mongoose.model('article', articleSchema);