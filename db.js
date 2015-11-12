var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://jlxasdpwwuvdmr:IyMLwN53OG-PVCnro54sqbprT4@ec2-107-21-222-62.compute-1.amazonaws.com:5432/dejcmvtdel9mms',
    {
        dialectOptions: {
           ssl: true
        }
    });

var User = sequelize.define('user', {
    full_name : {
        type : Sequelize.STRING
    },
    email : {
        type: Sequelize.STRING
    },
    avg_books : {
        type: Sequelize.INTEGER
    },
    familiarity : {
        type : Sequelize.STRING
    },
    english : {
        type : Sequelize.INTEGER
    }, 
    started_at : {
        type : Sequelize.DATE, defaultValue : Sequelize.NOW
    }, 
    finished_at : {
        type : Sequelize.DATE
    }
  },
  { 
    freezeTableName : true
  }
);


var Answer = sequelize.define('answers', {
    email : {
        type: Sequelize.STRING, allowNull: false
    },
    date_posted : {
        type: Sequelize.DATE, defaultValue: Sequelize.NOW
    },
    time_taken : {
        type : Sequelize.INTEGER
    },
    answer1: {
        type : Sequelize.STRING
    },
    answer2: {
        type : Sequelize.STRING
    },
    answer3: {
        type : Sequelize.STRING
    },
    answer4: {
        type : Sequelize.STRING
    },
    answer5: {
        type : Sequelize.STRING
    },
    answer6: {
        type : Sequelize.STRING
    },
    answer7: {
        type : Sequelize.STRING
    },
    answer8: {
        type : Sequelize.STRING
    }, 
    answer9: {
        type : Sequelize.STRING
    },
    answer10: {
        type : Sequelize.STRING
    },
    userId : {
        type : Sequelize.INTEGER,
        references : {
            model: User,
            key: 'id'
        }
    }
  },
  { 
    freezeTableName : true
  }
);

Answer.belongsTo(User);

// To add and drop tables call : 

//User.sync();
//Answer.sync();

// {force:true} to recreate the database loosing all the data

sequelize.sync().then(function(){
    console.log('DB synched');
//    User.create({full_name : 'Irfan Mulic', email: 'imulic@gmail.com'});
//    User.create({full_name: 'Vincent Chan', email: 'v7chan@gmail.com'});
});

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize
module.exports.User = User
module.exports.Answer = Answer
