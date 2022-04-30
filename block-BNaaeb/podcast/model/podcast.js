var mongoose = require('mongoose');
var schema = mongoose.Schema;

var podcastSchema = new schema({
  name:{type:String, required:true},
  section:{type:String, default:"free"},
  category:{type:String},
  isVerified:{type:Boolean, default:false}
}, {timestamps:true});

module.exports = mongoose.model('podcast', podcastSchema);