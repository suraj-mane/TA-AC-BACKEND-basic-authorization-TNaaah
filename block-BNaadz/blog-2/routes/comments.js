var express = require('express');
var router = express.Router();
var Articles = require('../model/articles');
const comment = require('../model/comment');
var Comment = require('../model/comment');

var auth = require('../middlerwares/auth');

/* GET Edit comment*/
router.get('/:id', auth.isUserLogged, (req,res,next) => {
  var id = req.params.id;
  Comment.findById(id, (err,comment) => {
    if(err) return next(err);
    res.render('EditComment', {comment});
  })
})

/* POST Edit Comment*/ 
router.post('/:id', auth.isUserLogged, (req,res,next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (err,comment) => {
    if(err) return next(err);
    res.redirect('/articles/' + comment.articleId);
  })
})

/* GET like */
router.get('/:id/like', auth.isUserLogged, (req,res,next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, {$inc: {likes:1}}, (err,comment) => {
    if(err) return next(err);
    res.redirect('/articles/' + comment.articleId);
  })
})

/* GET delete comment*/
router.get('/:id/delete', (req,res,next) => {
  var id = req.params.id;
  Comment.findByIdAndDelete(id, (err,comment) => {
    if(err) return next(err);
    res.redirect('/articles/' + comment.articleId);
  })
})

module.exports = router;