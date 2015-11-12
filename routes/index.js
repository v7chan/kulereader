var express = require('express');
var router = express.Router();
var db = require('../db')

/* GET home page */
router.get('/', function(req, res) {
  res.render('index', { title: 'KuleReader' });
});

/* Chapter routes */
router.get('/page/:number', function(req, res) {
  res.render('page/' + req.params.number, { title: 'KuleReader', pageNumber: req.params.number });
});

router.get('/user_info', function(req,res) {
  var token = req.cookies.token;

  if(token) res.redirect('/page/1');

	res.render('user_info', {title : 'Participant Survey'});
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

router.get('/data_dump', function(req,res){
  var u,a ; 

  db.User.findAll().then(function(users){
    //console.log(users);
    db.Answer.findAll().then(function(answers){
      //console.log(answers);
      res.render('data_dump', {'users': users, 'answers': answers});
      });
  });
  
});

router.post('/save_user',function(req,res){
	console.log(req.body.name);
	console.log(req.body.email);
  console.log(req.body.avg_books);
  console.log(req.body.familiarity);
  console.log(req.body.english);

  res.cookie('email', req.body.email);
  res.cookie('full_name', req.body.name);
  res.cookie('token', Math.random());
  res.cookie('timestarted', new Date());

  db.User.create({
    full_name : req.body.name,
    email : req.body.email,
    avg_books : req.body.avg_books,
    familiarity : req.body.familiarity,
    english : req.body.english
  });
	
  res.redirect('/page/1');
});

module.exports = router;
