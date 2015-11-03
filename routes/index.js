var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'KuleReader' });
});

router.get('/testindex', function(req, res) {
  res.render('testindex', { title: 'Before Retention Quiz' });
});

router.get('/test', function(req, res) {
  res.render('test', { title: 'Retention Quiz' });
});


router.get('/page/:number', function(req, res) {
  res.render('page/' + req.params.number, { title: 'KuleReader' });
});

module.exports = router;
