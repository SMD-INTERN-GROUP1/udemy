function getHomePage(req, res, next) {
    res.render('index', {title: "Group1 SMD Number one"});
}

module.exports = {
    getHomePage
}