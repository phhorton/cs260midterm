var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Items = mongoose.model('Items');

router.get('/administrator', function(req, res, next) {
  var item = Items.find();
  res.sendfile('public/administrator.html');
});

router.param('item', function(req, res, next, id) {
  var query = Items.findById(id);
  query.exec(function (err, item){
    if (err) { return next(err); }
    if (!item) { return next(new Error("can't find item")); }
    req.item = item;
    return next();
  });
});

router.post('/customer', function(req, res, next) {
  var item = new Items(req.body);
  item.save(function (err, item) {
    if (err) { return next(err); }
    res.json(item);
  });
});

/* GET home page. */
router.get('/customer', function(req, res, next) {
  Items.find(function (err, item) {
    if (err) { return next(err); }
    res.json(item);
  });
});

router.get('/customer/:item', function (req, res, next) {
  res.json(req.item);
});

router.put('/customer/:item/order', function(req, res, next) {
  req.item.order(function(err, item){
    if (err) { return next(err); }
    res.json(item);
  });
});

router.delete('/customer/:item', function(req, res, next) {
  Items.remove({'_id': req.item._id}, function (err) {
    if (err) { console.error(err); }
    res.sendStatus(204);
  });
});

module.exports = router;
