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

router.get('/user_info', function(req, res) {
  var token = req.cookies.token;

  if(token) res.redirect('/page/1');
  
	res.render('user_info', { title: 'Participant Survey', debug: req.query.debug });
});

router.get('/clear_database',function(req,res){
  db.sequelize.sync({force:true}).then(function(){
    console.log('DB synched');

    res.send('Database cleared');
  //  clearCookies(res);

  });
});

/* Test Routes */
router.get('/test', function(req, res) {
  res.render('test/index', { title: 'Retention Quiz' });
});

router.get('/test/questions', function(req, res) {
  var token = req.cookies.token;
  res.render('test/questions', { title: 'Retention Quiz', color: (token > 0.5) });
});

router.get('/test/thankyou', function(req,res){
	res.render('test/thankyou', { title: 'Thank you!'});
});

function clearCookies(res){
    res.clearCookie('email');
    res.clearCookie('token');
    res.clearCookie('timestarted');
    res.clearCookie('full_name');
};

router.post('/save_questions', function (req, res) {
    var userEmail = req.cookies.email;
    var timeStartedStr = req.cookies.timestarted;
    var timeStarted = new Date(timeStartedStr);
    var now = new Date(); 
    var timeTaken = now - timeStarted;

    db.User.findOne({where : {email: userEmail}}).then(function(r){
      db.Answer.create({
        email: userEmail, 
        time_taken : timeTaken/1000, // seconds
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
        answer12 : req.body.q12,
        answer13 : req.body.q13,
        answer14 : req.body.q14,
        answer15 : req.body.q15,
        feedback1 : req.body.f1,
        feedback2 : req.body.f2,
        feedback3 : req.body.f3,
        userId   : r.id
      });
    });

    clearCookies(res); 

    res.redirect('/test/thankyou');
});

router.get('/data_dump', function(req,res) {
  db.User.findAll().then(function(users) {
    db.Answer.findAll({
       include: [
         { 
           model: db.User,
           as : 'user'
         }
      ],
    }).then(function(answers) {
      var userAnswers = {};
      for(var i = 0; i < answers.length; i++) {
        userAnswers[answers[i].user.id] = answers[i];
      }

      res.render('data_dump', { 'users': users, 'answers': answers, 'userAnswers': userAnswers, title: 'Results' });
    });
  });
});

router.get('/delete_user/:userId', function(req,res) {
  db.User.findById(req.params.userId).then(function(user) {
    db.Answer.findOne({ where: { userId: parseInt(req.params.userId) } }).then(function(answer) {
      if(answer) {
        if(answer.destroy() && user.destroy())
          res.render('delete', { title: 'Delete User', 'user': user, 'answer': answer, 'success': true });  
        else
          res.render('delete', { title: 'Delete User', 'user': user, 'answer': answer, 'success': false });
      }
      else {
        if(user.destroy())
          res.render('delete', { title: 'Delete User', 'user': user, 'success': true });
        else
          res.render('delete', { title: 'Delete User', 'user': user, 'success': false });
      }
    });
  }); 
});

router.post('/save_user', function(req,res) {
  var token, assignment;

  if(req.body.debug) {
    if(req.body.debug == 'no-color')
      token = 0;
    else
      token = 1;
  }
  else {
    token = Math.random();
  }

  if(token > 0.5)
    assignment = 'Color';
  else
    assignment = 'No Color';

  res.cookie('token', token);
  res.cookie('email', req.body.email);
  res.cookie('full_name', req.body.name);
  res.cookie('timestarted', new Date());
  
  db.User.create({
    full_name : req.body.name,
    email : req.body.email,
    avg_books : req.body.avg_books,
    familiarity : req.body.familiarity,
    english : req.body.english,
    condition : assignment
  });

  res.redirect('/tutorial');
});

router.get('/tutorial', function(req, res) {
  var token = req.cookies.token;
  res.render('tutorial', { title: 'Tutorial', color: (token > 0.5) });
});

router.get('/test_assign', function(req, res) {
  var condition_a = 0;
  var condition_b = 0;
  var iterations = 5000;

  for(var i = 0; i < iterations; i++) {
    if(Math.random() > 0.5)
      condition_b++;
    else
      condition_a++;
  }

  res.render('test_assign', { 
    a_result: [condition_a, condition_a/iterations*100], 
    b_result: [condition_b, condition_b/iterations*100]
  });
});

module.exports = router;
