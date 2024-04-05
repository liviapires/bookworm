const livros = [
    {
        id: '1',
        titulo: 'O Senhor dos Anéis',
        autor: 'J. R. R. Tolkien',
        preco: '39.99',
        imagem: 'https://m.media-amazon.com/images/I/51yxqpcD9iL._SX327_BO1,204,203,200_.jpg'
    },
    {
        id: '2',
        titulo: 'As Crônicas de Nárnia',
        autor: 'C. S. Lewis',
        preco: '29.99',
        imagem: 'https://m.media-amazon.com/images/I/51+2QAB7I+L._SX329_BO1,204,203,200_.jpg'
    },
    {
        id: '3',
        titulo: 'O Guia do Mochileiro das Galáxias',
        autor: 'Douglas Adams',
        preco: '19.99',
        imagem: 'https://m.media-amazon.com/images/I/51bJleesV-L._SX343_BO1,204,203,200_.jpg'
    },
    {
        id: '4',
        titulo: 'O Pequeno Príncipe',
        autor: 'Antoine de Saint-Exupéry',
        preco: '9.99',
        imagem: 'https://m.media-amazon.com/images/I/41-TNa2nXtL._SX339_BO1,204,203,200_.jpg'
    }
];

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

const categorias = [
    {
        id: '1',
        nome: 'Fantasia',
        imagem: 'https://m.media-amazon.com/images/I/51yxqpcD9iL._SX327_BO1,204,203,200_.jpg'
    },
    {
        id: '2',
        nome: 'Aventura',
        imagem: 'https://m.media-amazon.com/images/I/51+2QAB7I+L._SX329_BO1,204,203,200_.jpg'
    },
    {
        id: '3',
        nome: 'Ficção',
        imagem: 'https://m.media-amazon.com/images/I/51bJleesV-L._SX343_BO1,204,203,200_.jpg'
    },
    {
        id: '4',
        nome: 'Filosofia',
        imagem: 'https://m.media-amazon.com/images/I/51Kd0xrsUgL._SY498_BO1,204,203,200_.jpg'
    }
]

const Book = require('../models/BookModel');
const Category = require('../models/CategoryModel');

const aBook = new Book();
const aCategory = new Category();

// Renderiza a view home
async function homeView (req, res) {
    
    if (!req.session.clientId) {
        req.session.clientId = Math.floor(Math.random() * 10);
    };

    const clientSessionId = req.session.clientId;

    res.render('home', {
        title: 'Home',
        livros: livros,
        boxes: boxes,
        categorias: categorias,
        clientSessionId: clientSessionId
    });
}

module.exports = {
    homeView
}