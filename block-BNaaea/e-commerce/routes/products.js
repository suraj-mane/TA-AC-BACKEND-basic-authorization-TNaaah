var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var Product = require('../models/product');

router.get('/:id/delete', (req,res,next) => {
 if(req.session.role == 'admin'){
    var id = req.params.id;
    Product.findByIdAndDelete(id, (err,result) => {
      if(err) return next(err);
      res.redirect('/users');
    })
  } else {
    res.redirect('/users/login');
  } 
})


module.exports = router;