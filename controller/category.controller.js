const CategoriesModel = require("../database/models/Categories");

const renderCategoriesPage = async (req, res, next) => {
  const getAllCategories = await CategoriesModel.find()
    .then((categories) => {
      res.render("template/master", {
        title: "Admin page",
        content: "../categories/category_index",
        categories,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const renderCreateView = (req, res, next) => {
  res.render("template/master", {
    title: "Categories page",
    content: "../categories/create",
  });
};

const create = async (req, res, next) => {
  let data;
  const { description, category } = req.body;
  data = { description, category };
  const createCategory = new CategoriesModel(data);
  await createCategory
    .save()
    .then(() => {
      res.redirect("/admin/categories");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).redirect("/admin/createcategories");
    });
};

const renderUpdateView = async (req, res, next) => {
  const { id } = req.params;
  const getCategory = await CategoriesModel.findById(id)
    .then((category) => {
      res.render("template/master", {
        title: "Category page",
        content: "../categories/update",
        category,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const update = (req, res, next) => {
  CategoriesModel.updateOne({ _id: req.params.id }, req.body)
    .then(() => res.redirect("/admin/categories"))
    .catch((error) => {
      res.status(500).send(error);
    });
};

const destroy = async function (req, res, next) {
  const deleteCategory = await CategoriesModel.delete({ _id: req.params.id })
    .then(() => {
      res.redirect("/admin/categories");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const forceDestroy = async (req, res, next) => {
  const forceDelete = await CategoriesModel.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/admin/trash/categories");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const renderTrashCategories = async (req, res, next) => {
  const getCategoriesDeleted = await CategoriesModel.findDeleted({})
    .then((categoriesDeleted) => {
      res.render("template/master", {
        title: "Trash topic",
        content: "../trash_view/trash_category",
        categoriesDeleted,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const restore = async (req, res, next) => {
  const restoreCategoryById = await CategoriesModel.restore({
    _id: req.params.id,
  })
    .then(() => {
      res.redirect("/admin/trash/categories");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports = {
  renderCategoriesPage,
  renderCreateView,
  create,
  renderUpdateView,
  update,
  destroy,
  forceDestroy,
  renderTrashCategories,
  restore,
};
