const router = require("express").Router();
const categoryService = require("../services/category.services");
const authenticateToken = require("../middlerwares/auth.middleware");
const cartController = require("../controller/cart.controller");

router.get("/", authenticateToken, cartController.listCart);

router.patch("/add/:id", cartController.addCart);

router.delete("/delete/:id", cartController.removeCart);

router.get("/checkout", authenticateToken, async (req, res) => {
  return res.json("thanh toán");
});

module.exports = router;
