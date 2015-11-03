var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'KuleReader' });
});

router.get('/page/:number', function(req, res) {
  res.render('page/' + req.params.number, { title: 'KuleReader' });
});

module.exports = router;
