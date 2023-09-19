const boxes = [
    {
        id: '1',
        titulo: 'BOX: O Senhor dos Anéis',
        autor: 'J. R. R. Tolkien',
        preco: '129.99',
        imagem: 'https://m.media-amazon.com/images/I/41omIYtLS1L._SY498_BO1,204,203,200_.jpg'
    },
    {
        id: '2',
        titulo: 'BOX: Mestres da Filosofia',
        autor: 'Platão, Aristóteles',
        preco: '99.99',
        imagem: 'https://m.media-amazon.com/images/I/51Kd0xrsUgL._SY498_BO1,204,203,200_.jpg'
    },
    {
        id: '3',
        titulo: 'BOX: Sherlock Holmes',
        autor: 'Arthur Conan Doyle',
        preco: '104.99',
        imagem: 'https://m.media-amazon.com/images/I/51dn4o9rcTL._SX384_BO1,204,203,200_.jpg'
    },
];

const Book = require('../models/BookModel');
const Category = require('../models/CategoryModel');

const aBook = new Book();
const aCategory = new Category();

// Renderiza a view home
async function homeView (req, res) {

    let livros = await aBook.getAllBooks();
    let categorias = await aCategory.getAllCategories();

    res.render('home', {
        title: 'Home',
        livros: livros,
        boxes: boxes,
        categorias: categorias
    });
}

module.exports = {
    homeView
}