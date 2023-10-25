const Book = require('../models/BookModel');
const Category = require('../models/CategoryModel');

const aBook = new Book();
const aCategory = new Category();

// Renderiza a view allBooks
async function allBooksView (req, res) {
    let livros = await aBook.getAllBooks();
    let categorias = await aCategory.getAllCategories();

    res.render('allBooks', {
        title: 'Todos os Livros',
        livros: livros,
        categorias: categorias
    });
}

// Renderiza a view book
async function bookView (req, res) {
    // let livros = await aBook.getAllBooks();

    res.render('book', {
        title: 'Livro',
        livros: livros
    });
}

async function oneBookView (req, res) {
    // let livro = await aBook.getBookById(req.params.id);

    res.render('book', {
        title: 'Livro',
        livro: livro
    });
}

module.exports = {
    bookView,
    oneBookView,
    allBooksView
}