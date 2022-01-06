const Course = require('../database/models/Courses');

function getHomePage(req, res, next) {

    Course.find({}, function(err, courses){
        if(!err) {
            res.render('index', {title: "Group1 SMD Number one", courses});
        }
        else {
           console.log('This is err: ', err);
       }
    })
    
}

module.exports = {
    getHomePage
}