const express = require('express')
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.get("/books/:category", categoryController.categoryView);

module.exports = router;