const Course = require('../database/models/Courses');

function getDetailCourse(req, res, next) {
    console.log("tessssssssssss");
    const title = req.params.title;
    //query, raw query
    Course.findOne({title: title}, function(err, course) {
        if(!err) {
            console.log("okkkkkkk");
            res.render("component/course_detail", {course});
        } else {
            console.log(err);
        }
    })       
}
module.exports = {
    getDetailCourse
}