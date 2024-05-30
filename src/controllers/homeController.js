const Client = require('../models/UserModel');
const Address = require('../models/AddressModel');
const Phone = require('../models/PhoneModel');
const Card = require('../models/CardModel');
const Category = require('../models/CategoryModel');
const Book = require('../models/BookModel');

const aClient = new Client();
const anAddress = new Address();
const aPhone = new Phone();
const aCard = new Card();
const aCategory = new Category();
const aBook = new Book();

// Renderiza a view home
async function homeView (req, res) {
    if (!req.session.clientId) {
        // gera um número aleatorio a partir de 1 até 10 e salva na sessão
        req.session.clientId = Math.floor(Math.random() * 10) + 1;
        req.session.clientInfo = await aClient.getClientById(req.session.clientId);
        req.session.addresses = await anAddress.getAddressByUserId(req.session.clientId);
        req.session.phones = await aPhone.getPhoneByUserId(req.session.clientId);
        req.session.cards = await aCard.getCardByUserId(req.session.clientId);
        req.session.mainCategories = [];
        req.session.mainBooks = [];
        
        for (let i = 1; i <= 4; i++) {
            let number = Math.floor(Math.random() * 28) + 1;
            let category = await aCategory.getCategoryById(number);
            req.session.mainCategories.push(category[0]);
        }

        for (let i = 1; i <= 4; i++) {
            let number = Math.floor(Math.random() * 32) + 1;
            let book = await aBook.getBookById(number);
            req.session.mainBooks.push(book[0]);
        }

    };

    let categories = await aCategory.getAllCategories();

    res.render('home', {
        title: 'Home',
        categories: categories,
        livros: req.session.mainBooks,
        categorias: req.session.mainCategories
    });
}

module.exports = {
    homeView
}