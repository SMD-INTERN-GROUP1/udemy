const Banner = require("../database/models/Banner");
const Course = require('../database/models/Course');

const getHomePage = async (req, res, next) => {
    const banners = await Banner.find();
    const courses = await Course.find();
    res.render('index', {banners, courses});

}

module.exports = {
    getHomePage
} 