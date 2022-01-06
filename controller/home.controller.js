const banners = require("../database/models/banners");
/* function getHomePage(req, res, next) {
    banners.find({})
    .then(banner => res.render('index', {banner,title: "Group1 SMD Number one"}))
    .catch(next);
}

module.exports = {
getHomePage
} */
function bannerdata(req, res, next) {
    banners.find({})
    .then(banner => res.render('index', {banner,title: "Group1 SMD Number one"}))
    .catch(next);
   
}
module.exports = {bannerdata} 