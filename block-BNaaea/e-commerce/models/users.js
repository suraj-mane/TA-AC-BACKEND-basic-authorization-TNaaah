var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var usersSchema = new schema ({
  email:{type:String,required:true},
  password:{type:String, required:true},
  role:{type:String}
}, {timestamps:true});

usersSchema.pre('save', function(next) {
  if(this.password && this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err,result) => {
      if(err) return next(err);
      this.password = result;
      return next();
    })
  } else {
    next();
  }
})

usersSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password,this.password, (err,result) => {
    return cb(err, result);
  })
}

module.exports = mongoose.model('Users', usersSchema);