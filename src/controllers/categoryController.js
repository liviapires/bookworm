const Category = require('../models/CategoryModel');
const Book = require('../models/BookModel');

const aCategory = new Category();
const aBook = new Book();

// Renderiza a view category
async function categoryView(req, res) {
    let books = [];
    let title = "";
    let category = "";

    if (req.params.category == "allBooks") {
        books = await aBook.getAllBooks();
        title = "Todos os Livros";
        category = "Todos os Livros";
    } else {
        books = await aCategory.getBooksByCategory(req.params.category);
        title = "Livros de " + req.params.category;
        category = req.params.category;
    }
    
    const categories = await aCategory.getAllCategories();
    
    if (books.length == 0) {
        res.render('category', {
            title: title,
            category: category,
            categories: categories,
            livros: books,
            message: "Nenhum livro encontrado."
        });
        return;
    }

    res.render('category', {
        title: title,
        category: category,
        categories: categories,
        livros: books
    });
}

module.exports = {
    categoryView
}