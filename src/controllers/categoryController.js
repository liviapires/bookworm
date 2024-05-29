const Category = require('../models/CategoryModel');

const aCategory = new Category();

// Renderiza a view category
const categoryView = (req, res) => {

    let categories = aCategory.getAllCategories();

    res.render('category', {
        title: 'category',
        categories: categories
    });
}

module.exports = {
    categoryView
}