var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'KuleReader' });
});

router.get('/test', function(req, res) {
  res.render('test/index', { title: 'Retention Quiz' });
});

router.get('/test/questions', function(req, res) {
  res.render('test/questions', { title: 'Retention Quiz' });
});


router.get('/page/:number', function(req, res) {
  res.render('page/' + req.params.number, { title: 'KuleReader', pageNumber: req.params.number });
});

module.exports = router;
