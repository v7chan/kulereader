var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res) {
  res.render('index', { title: 'KuleReader' });
});

/* Chapter routes */
router.get('/page/:number', function(req, res) {
  res.render('page/' + req.params.number, { title: 'KuleReader', pageNumber: req.params.number });
});

/* Test Routes */
router.get('/test', function(req, res) {
  res.render('test/index', { title: 'Retention Quiz' });
});

router.get('/test/questions', function(req, res) {
  res.render('test/questions', { title: 'Retention Quiz' });
});

router.get('/test/thankyou', function(req,res){
	res.render('test/thankyou', { title: 'Thank you!'});
});

router.post('/save_questions', function (req, res) {
    console.log(req.body.q1);
    console.log(req.body.q2);
    res.redirect('/test/thankyou');
});

module.exports = router;
