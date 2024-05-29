const Categories = require('../models/CategoryModel');

const aCategory = new Categories();

// Renderiza a view signin
const signinView = (req, res) => {

    let categories = aCategory.getAllCategories();

    res.render('signin', {
        title: 'Sign In',
        categories: categories
    });
}

module.exports = {
    signinView
}