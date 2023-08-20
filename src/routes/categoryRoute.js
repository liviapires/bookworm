const express = require('express')
const router = express.Router();

const categoryView = require("../controllers/categoryController");

router.get("/category", categoryView.categoryView);

module.exports = router;