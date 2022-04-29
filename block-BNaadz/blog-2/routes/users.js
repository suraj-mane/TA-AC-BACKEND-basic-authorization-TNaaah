var express = require('express');
var router = express.Router();
var Users = require('../model/users');
var Articles = require('../model/articles');
var Comment = require('../model/comment');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = req.session.userId;
  Articles.find({}, (err,article) => {
    if(err) return next(err);
    res.render('mainPage',{article});
  })  
});

/* GET users login */
router.get('/login', function(req,res,next) {
  var error = req.flash('error')[0];
  res.render('login', {error});
})

/* GET users Register */
router.get('/register', function(req,res,next) {
  res.render('register');
})

/* POST user register */
router.post('/register', (req,res,next) => {
  Users.create(req.body, (err,user) => {
    if(err) return next(err);
    res.redirect('/users/login');
  })
})

/* POST user login */
router.post('/login', (req,res,next) => {
  var {email,password} = req.body;
  if(!email || !password) {
    req.flash('error','Email and Password required');
    return res.redirect('/users/login');
  }
  Users.findOne({email}, (err,user) => {
    if(err) return next(err);
    if(!user){
      req.flash('error', 'Email is not register');
      return res.redirect('/users/login');
    }
    user.verifyPassword(password, (err,result) => {
      if(err) return next(err);
      if(!result){
        req.flash('error','Password is not match');
        return res.redirect('/users/login');
      } else {
        req.session.userId = user.id;
        return res.redirect('/users');
      }
    }) 
  })
})

/* GET Logout */
router.get('/logout', (req,res,next) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/users/login'); 
})

module.exports = router;
