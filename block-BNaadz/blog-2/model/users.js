var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new schema({
  name:{type:String, required:true},
  email:{type:String, required:true},
  password:{type:String, required:true},
  article:{type:schema.Types.ObjectId, ref:'article'}
}, {timestamps:true});

userSchema.pre('save', function(next){
  if(this.password && this.isModified('password')){
    bcrypt.hash(this.password, 10, (err,user) => {
      if(err) return next(err);
      this.password = user;
      return next();
    })
  } else {
    next();
  }
})

userSchema.methods.verifyPassword = function(password,cb) {
  bcrypt.compare(password,this.password, (err,result) => {
    return cb(err,result);
  })
}
module.exports = mongoose.model('User', userSchema);