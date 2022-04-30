var Users = require('../model/users');

module.exports = {
  isLoggedUser: (req,res,next) => {
    if(req.session && req.session.userId){
      next();
    } else {
      res.redireact('/users/login');
    }
  },
  
  userInfo: (req,res,next) => {
    var id = req.session && req.session.userId;
    Users.findById(id, ['name','email','isAdmin','member'], (err,user) => {
      if(err) return next(err);
      if(user){
        req.user = user;
        res.locals.user = user;
        next();
      } else {
        req.user = null;
        res.locals.user = null;
        next();
      }
    })
  }
}