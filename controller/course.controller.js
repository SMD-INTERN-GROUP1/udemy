const Course = require('../database/models/Courses');

function getDetailCourse(req, res, next) {
    const title = req.params.title;
    //query, raw query
    Course.findOne({title: title}, function(err, course) {
        if(!err) {
            res.render("component/course_detail", {course});
        } else {
            console.log(err);
        }
    })       
}
module.exports = {
    getDetailCourse
}
