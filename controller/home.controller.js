const Course = require('../database/models/Courses');
const Topic = require('../database/models/Topics');
const Category = require('../database/models/Categories');
const getHomePage = async (req, res, next) => {
    try {      
        let listCategory = [];
        Course.find().populate('topic_id').
        exec( async (err, courses) => {
            if(!err) {
                courses.sort(function(first_course, second_course) {
                    let first_category_id = first_course.topic_id.category_id;
                    let second_category_id = second_course.topic_id.category_id;
                    if(first_category_id < second_category_id) return -1;
                    if(first_category_id > second_category_id) return 1;
                    else return 0
                }) 
                for(let i = 0; i < courses.length; i++) {
                    let category_name = await Category.findById(courses[i].topic_id.category_id);              
                    if(i === 0) {
                        listCategory.push(
                            {
                                "category_id": courses[i].topic_id.category_id,
                                "category_name": category_name.category
                            }
                        );
                        
                    } else {
                        if(courses[i].topic_id.category_id.toString() !== courses[i-1].topic_id.category_id.toString()) {
                            listCategory.push(
                                {
                                    "category_id": courses[i].topic_id.category_id,
                                    "category_name": category_name.category
                                }
                            );
                        } else {
                            continue;
                        }
                    } 
                }
                console.log('courses: ', courses);
                console.log('listCategory: ', listCategory);
                res.render('index', {courses, listCategory});
            } else {
                console.log(err);
            }
        })
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getHomePage
} 