var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Candidate = mongoose.model('Candidates');

router.get('/admin', function(req, res, next) {
  var candidate = Candidate.find();
  res.sendfile('public/admin.html');
});

router.param('candidate', function(req, res, next, id) {
  var query = Candidate.findById(id);
  query.exec(function (err, candidate){
    if (err) { return next(err); }
    if (!candidate) { return next(new Error("can't find candidate")); }
    req.candidate = candidate;
    return next();
  });
});

router.post('/voter', function(req, res, next) {
  var candidate = new Candidate(req.body);
  candidate.save(function (err, candidate) {
    if (err) { return next(err); }
    res.json(candidate);
  });
});

/* GET home page. */
router.get('/voter', function(req, res, next) {
  Candidate.find(function (err, candidates) {
    if (err) { return next(err); }
    res.json(candidates);
  });
});

router.get('/voter/:candidate', function (req, res, next) {
  res.json(req.candidate);
});

router.put('/voter/:candidate/vote', function(req, res, next) {
  req.candidate.vote(function(err, candidate){
    if (err) { return next(err); }
    res.json(candidate);
  });
});

router.delete('/voter/:candidate', function(req, res, next) {
  Candidate.remove({'_id': req.candidate._id}, function (err) {
    if (err) { console.error(err); }
    res.sendStatus(204);
  });
});

module.exports = router;
