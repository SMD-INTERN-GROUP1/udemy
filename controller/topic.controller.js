const TopicsModel = require("../database/models/Topics");
const categoryService = require("../services/category.services");

const getListTopics = async (req, res, next) => {
  const getTopics = await TopicsModel.find()
    .populate("category_id")
    .then((topics) => {
      res.render("template/master", {
        title: "Admin page",
        content: "../topic/topic_index",
        topics,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const renderCreateView = async (req, res, next) => {
  const getCategories = await categoryService
    .getListCategory()
    .then((categories) => {
      res.render("template/master", {
        title: "Categories page",
        content: "../topic/create",
        categories,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const create = async (req, res, next) => {
  let data;
  const { name, description, category_id } = req.body;
  data = { name, description, category_id };
  const createTopic = new TopicsModel(data);
  await createTopic
    .save()
    .then(() => {
      res.redirect("/admin/topics");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const renderUpdateView = (req, res, next) => {
  Promise.all([
    TopicsModel.findById({ _id: req.params.id }).populate("category_id"),
    categoryService.getListCategory(),
  ]).then(([topic, categories]) => {
    res.render("template/master", {
      title: "Category page",
      content: "../topic/update",
      topic,
      categories,
    });
  });
};

const update = (req, res, next) => {
  TopicsModel.updateOne({ _id: req.params.id }, req.body)
    .then(() => res.redirect("/admin/topics"))
    .catch((error) => {
      res.status(500).send(error);
    });
};

const destroy = async function (req, res, next) {
  const deleteTopic = await TopicsModel.delete({ _id: req.params.id })
    .then(() => {
      res.redirect("/admin/topics");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const forceDestroy = async (req, res, next) => {
  const forceTopic = await TopicsModel.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/admin/trash/topics");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const renderTrashTopics = async (req, res, next) => {
  const getTopicsDeleted = await TopicsModel.findDeleted({})
    .populate("category_id")
    .then((topicsdeleted) => {
      res.render("template/master", {
        title: "Trash topic",
        content: "../trash_view/trash_topic",
        topicsdeleted,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const restore = async (req, res, next) => {
  const restoreTopicById = await TopicsModel.restore({ _id: req.params.id })
    .then(() => {
      res.redirect("/admin/trash/topics");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports = {
  renderCreateView,
  create,
  renderUpdateView,
  update,
  getListTopics,
  destroy,
  renderTrashTopics,
  restore,
  forceDestroy,
};
