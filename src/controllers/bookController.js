const Book = require('../models/BookModel');
const Category = require('../models/CategoryModel');

const aBook = new Book();
const aCategory = new Category();

async function oneBookView (req, res) {
    let livro = await aBook.getBookById(req.params.id);

    let categories = await aCategory.getAllCategories();

    res.render('book', {
        title: 'Livro',
        categories: categories,
        livro: livro[0]
    });
}

module.exports = {
    oneBookView
}