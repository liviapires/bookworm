const Book = require('../models/BookModel');
const Category = require('../models/CategoryModel');

const aBook = new Book();
const aCategory = new Category();

// Renderiza a view allBooks
async function allBooksView (req, res) {
    let livros = await aBook.getAllBooks();
    let categories = await aCategory.getAllCategories();

    res.render('allBooks', {
        title: 'Todos os Livros',
        categories: categories,
        livros: livros
    });
}

// Renderiza a view book
async function bookView (req, res) {
    // let livros = await aBook.getAllBooks();

    let categories = await aCategory.getAllCategories();

    res.render('book', {
        title: 'Livro',
        categories: categories,
        livros: livros
    });
}

async function oneBookView (req, res) {
    // let livro = await aBook.getBookById(req.params.id);

    let categories = await aCategory.getAllCategories();

    res.render('book', {
        title: 'Livro',
        categories: categories,
        livro: livro
    });
}

module.exports = {
    bookView,
    oneBookView,
    allBooksView
}