var express = require('express');
var router = express.Router();
var Users = require('../model/users');



/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(res.user);
  res.send('respond with a resource');
});

/* GET register*/
router.get('/register', (req,res,next) => {
  var error = req.flash('error')[0];
  res.render('register', {error});
})

/* POST register*/ 
router.post('/register', (req,res,next) => {
  Users.create(req.body, (err,user) => {
    if(err) {
      req.flash('error', 'UserName and email is required');
      res.redirect('/users/register');
    } else {
    res.redirect('/users/login');
    }
  })
})

/* GET login*/
router.get('/login', (req,res,next) => {
  var error = req.flash('error')[0];
  res.render('login', {error});
})

/* POST login */
router.post('/login', (req,res,next) => {
  var {email, password} = req.body;
  if(!email && !password){
    req.flash('error', 'Email and Password is required');
    return res.redirect('/users/login');
  }
  Users.findOne({email}, (err,user) => {
    if(err) return next(err);
    if(!user){
      req.flash('error','Email is not existed');
      return res.redirect('/users/login');
    }  
    user.verifyPassword(password, (err,result) => {
      if(err) return next(err);
      if(!result){
        res.flash('error','Password is not match');
        return res.redirect('/users/login');
      } else {
        req.session.userId = user._id;
        return res.redirect('/users');
      }
    }) 
  })
})

/* GET logout*/
router.get('/logout', (req,res,next) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/users/login');
})

module.exports = router;
