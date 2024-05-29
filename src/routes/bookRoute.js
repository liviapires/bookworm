const express = require('express')
const router = express.Router();

const bookView = require("../controllers/bookController");
const categoryView = require("../controllers/categoryController");

router.get("/allBooks", bookView.allBooksView);

router.get("/category/:id", categoryView.categoryView);

router.get("/book/:id", bookView.oneBookView);

module.exports = router;