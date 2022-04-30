var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new schema({
  name:{type:String, required:true},
  email:{type:String, required:true},
  password:{type:String},
  isAdmin:{type:Boolean, default:false},
  member:{type:String, default:'free'}
}, {timestamps:true});

userSchema.pre('save', function(next) {
  if(this.password && this.isModified('password')){
    bcrypt.hash(this.password, 10, (err, result) => {
      if(err) return next(err);
      this.password = result;
      return next();
    })
  } else {
    return next();
  }
})

userSchema.methods.verifyPassword = function(password,cb) {
  bcrypt.compare(password,this.password, (err,result) => {
    return cb(err,result);
  })
}  


module.exports = mongoose.model('users', userSchema);