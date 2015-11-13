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
    
    var userEmail = req.cookies.email;
    var timeStartedStr = req.cookies.timestarted;
    var timeStarted = new Date(timeStartedStr);
    var now = new Date(); 
    var timeTaken = now-timeStarted;

    db.User.findOne({where : {email: userEmail}}).then(function(r){
      db.Answer.create({
        email: userEmail, 
        time_taken : timeTaken/60000, // minutes
        answer1  : req.body.q1,
        answer2  : req.body.q2,
        answer3  : req.body.q3,
        answer4  : req.body.q4,
        answer5  : req.body.q5,
        answer6  : req.body.q6,
        answer7  : req.body.q7,
        answer8  : req.body.q8,
        answer9  : req.body.q9,
        answer10 : req.body.q10,
        answer11 : req.body.q11,
        userId   : r.id
      });
    });

    res.clearCookie('email');
    res.clearCookie('token');
    res.clearCookie('timestarted');
    res.clearCookie('full_name');

    res.redirect('/test/thankyou');
});

router.get('/data_dump', function(req,res){
  db.User.findAll().then(function(users){
    db.Answer.findAll({
       include: [
       { 
         model: db.User, 
         as : 'user'
       }
  ],
    }).then(function(answers){
      res.render('data_dump', {'users': users, 'answers': answers});
      });
  });
});

router.post('/save_user',function(req,res){
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
