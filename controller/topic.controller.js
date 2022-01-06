const renderTopicPage = async (req, res, next) => {
  res.render("template/master", {
    title: "Topic page",
    content: "../topic/index",
  });
};

module.exports = { renderTopicPage };
