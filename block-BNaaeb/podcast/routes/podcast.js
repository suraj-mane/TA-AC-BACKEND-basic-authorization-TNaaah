var express = require('express');
const podcast = require('../model/podcast');
var router = express.Router();
var Podcast = require('../model/podcast');

/* GET Podcast */
router.get('/', (req,res,next) => {
  Podcast.find((err,podcast) => {
    if(err) return next(err);
    res.render('allPodcast', {podcast});
  })
})

/* GET add podcast*/
router.get('/addPodcast', (req,res,next) => {
  res.render('addPodcast');
})

/* POST add podcast*/
router.post('/addPodcast', (req,res,next) => {
  if(req.user.isAdmin){
    req.body.isVerifed = true;
  } else {
    req.body.section = 'free';
    req.body.isVerifed = false;
  }
  Podcast.create(req.body, (err,podcast) => {
    if(err) return next(err);
    res.redirect('/podcast/');
  })
})

module.exports = router;