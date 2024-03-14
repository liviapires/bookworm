const express = require('express')
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.get("/category/:id", categoryController.categoryView);

// router.get("/categories", categoryController.categoriesView);

module.exports = router;