var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var Product = require('../models/product');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Product.find({}, (err,product) => {
    if(err) return next(err);
    res.render('viewProduct', {product:product});
  })
});

/* GET users login */
router.get('/login', function(req,res,next) {
  var error = req.flash('error')[0];
  res.render('login', {error});
})

/* GET user Register */
router.get('/register', function(req,res,next) {
  res.render('register');
})

/* POST register user */
router.post('/register', function(req,res,next) {
  Users.create(req.body, (err,users) => {
    if(err) return next(err);
    res.redirect('/users/login'); 
  })
})

/* POST login user */
router.post('/login', function(req,res,next) {
  var {email,password} = req.body;
  if(!email && !password) {
    return res.redirect('/users/login');
  }
  Users.findOne({email}, function(err,user) {
    if(err) return next(err);
    if(!user){
      return res.redirect('/users/login');
    }
    user.verifyPassword(password,(err,result) => {
      if(err) return next(err);
      if(!result){
        return res.redirect('/users/login');
      } else {
        req.session.userId = user.id;
        req.session.role = user.role;
        res.redirect('/users');
      }
    })
  })
})

/* GET logout */
router.get('/logout', function(req,res,next) {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/users/login');
})

/* GET Add product*/
router.get('/product', (req,res,next) => {
  if(req.session.role == 'admin'){
    res.render('newProduct');
  } else {
    req.flash('error', 'Only admin can add Product');
    res.redirect('/users/login');
  }
})

/* POST Add Product */
router.post('/product', (req,res,next) => {
    Product.create(req.body, (err,result) => {
      if(err) return next(err);
      res.redirect('/users');
    })
})
module.exports = router;
