var express = require('express');
var router = express.Router();
var Articles = require('../model/articles');
var Comment = require('../model/comment');
var Users = require('../model/users');

var auth = require('../middlerwares/auth');

/* GET Articles form*/
router.get('/', (req,res,next) => {
  res.render('addarticles');
})

/* POST ADD Articles*/
router.post('/', auth.isUserLogged, (req,res,next) => {
  req.body.author = req.user._id;
  var userId = req.user._id;
  var tag = req.body.tags.split(" ");
  req.body.tags = tag;
  Articles.create(req.body, (err,article) => {
    if(err) return next(err);
    Users.findByIdAndUpdate(userId,{$push:{article:article._id}}, (err,user) => {
      if(err) return next(err);
      res.redirect('/users');
    })
  })
})

/* GET SingleArticle */
router.get('/:id', (req,res,next) => {
  var id = req.params.id;
  Articles.findById(id).populate('commentId').populate('author').exec((err,article) => {
    if(err) return next(err);
    res.render('singleArticel', {article:article})
  })
})



/* GET Edit Article */
router.get('/:id/edit', auth.isUserLogged, (req,res,next) => {
  var id = req.params.id;
  Articles.findById(id, (err,article) => {
    if(err) return next(err);
    res.render('EditArticle', {article});
  })
})

/* POST Edit Article */
router.post('/:id/edit',  auth.isUserLogged, (req,res,next) => {
  var id = req.params.id;
  var tag = req.body.tags.split(" ");
  req.body.tags = tag;
  Articles.findByIdAndUpdate(id, req.body, (err,article) => {
    if(err) return next(err);
    res.redirect('/articles/' + id);
  })
})

/* GET delete Article */
router.get('/:id/delete', auth.isUserLogged, (req,res,next) => {
  var id = req.params.id;
  Articles.findByIdAndDelete(id, (err,article) => {
    if(err) return next(err);
    Comment.deleteMany({commentId: article.id}, (err,comment) => {
      if(err) return next (err);
      res.redirect('/users/');
    })
  })
})

/* GET Like */
router.get('/:id/like', auth.isUserLogged, (req,res,next) => {
  var id = req.params.id;
  Articles.findByIdAndUpdate(id, {$inc:{likes:1}}, (err,likes) => {
    if(err) return next(err);
    res.redirect('/articles/' + id);                                                                                                                                                                  
  })
})

/* POST Add Comment */
router.post('/:id/comment', auth.isUserLogged, (req,res,next) => {
  var id = req.params.id;
  req.body.articleId = id;
  Comment.create(req.body, (err,comment) => {
    if(err) return next(err);
    Articles.findByIdAndUpdate(id, { $push : {commentId :comment._id}}, (err,comment) => {
      if(err) return next(err); 
      res.redirect('/articles/' + id);
    })
  })
})

router.get('/:id/my', (req,res,next) => {
  var id = req.params.id;
 Users.findById(id).populate('article').exec((err, article) => {
   if(err) return next(err);
  res.render('myArticles',{article});
 })
})
module.exports = router;