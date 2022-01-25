const CategoriesModel = require("../database/models/Categories");

// GET: /admin/categories
const renderCategoriesPage = async (req, res, next) => {
  try {
    const getAllCategories = await CategoriesModel.find();
    res.render("dashboard_admin/master", {
      title: "Admin page",
      content: "../categories/category_index",
      getAllCategories,
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

// POST: /admin/categries
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
      res.status(500).send(error.message);
    });
};

// GET: /admin/updatecategories/:id
const renderUpdatePage = async (req, res, next) => {
  const { id } = req.params;
  const getCategory = await CategoriesModel.findById(id)
    .then((category) => {
      res.render("dashboard_admin/master", {
        title: "Category page",
        content: "../categories/update",
        category,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// PUT: /admin/editcategories/:id
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
      res.render("dashboard_admin/master", {
        title: "Bin of categories",
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
  create,
  renderUpdatePage,
  update,
  destroy,
  forceDestroy,
  renderTrashCategories,
  restore,
};
