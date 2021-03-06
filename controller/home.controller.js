
const Banner = require("../database/models/banners");
const Course = require('../database/models/Courses');

const getHomePage = async (req, res, next) => {
    const banners = await Banner.find();
    const courses = await Course.find();
    res.render('index', {banners, courses});

}

module.exports = {
    getHomePage
} 

