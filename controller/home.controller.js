const Banner = require("../database/models/banners");

const getHomePage = async (req, res, next) => {
    const banners = await Banner.find();
    console.log(banners);
    res.render('index', {banners});
}

module.exports = {
    getHomePage
} 