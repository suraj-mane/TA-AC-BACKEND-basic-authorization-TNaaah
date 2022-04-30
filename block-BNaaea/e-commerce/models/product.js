var mongoose = require('mongoose');
const { modelName } = require('./users');
var schema = mongoose.Schema;

var productSchema = new schema({
  name:{type:String, required:true},
  quantity:{type:Number},
  price:{type:Number},
  image:{type:String},
  likes:{type:Number, default:0}
}, {timestamps:true});

module.exports = mongoose.model('Product', productSchema);