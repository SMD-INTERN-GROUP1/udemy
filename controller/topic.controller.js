const renderTopicPage = async (req, res, next) => {
  res.render("template/master", {
    title: "Topic page",
    content: "../topic/topic_index",
  });
};

module.exports = { renderTopicPage };
