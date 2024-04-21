const Sale = require('../models/SaleModel');
const SaleBooks = require('../models/SaleBooksModel');
const Book = require('../models/BookModel');
const Category = require('../models/CategoryModel');

const aSale = new Sale();
const theSaleBooks = new SaleBooks();
const aBook = new Book();
const aCategory = new Category();

// Renderiza a view myAccount
async function myAccountView (req, res) {

    const clientId = req.session.clientId;

    const cliente = req.session.clientInfo;
    const clientPhones = req.session.phones;
    const clientAddresses = req.session.addresses;
    const clientCards = req.session.cards;

    const clientSales = await aSale.getSaleByUserId(clientId);

    // parse da data de cada venda
    clientSales.forEach(sale => {
        let date = new Date(sale.purchaseDate);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        sale.purchaseDate = `${day}/${month}/${year}`;
    });

    let livrosPorVenda = {};

    for (const sale of clientSales) {
        const saleBooks = await theSaleBooks.getSaleBooksBySaleId(sale.saleId);
        const bookIds = saleBooks.map(book => book.bookId);
        livrosPorVenda[sale.saleId] = bookIds;
    }

    // pega o bookId de cada livro e busca o livro no banco e adiciona a um array de livros diferente para cada venda
    for (const saleId in livrosPorVenda) {
        let livros = [];
        // para cada livro da venda, busca o livro no banco e adiciona ao array de livros
        for (const bookId of livrosPorVenda[saleId]) {
            let book = await aBook.getBookById(bookId);
            const categories = await aCategory.getBookCategories(bookId);
            let bookCategories = [];
            categories.forEach(category => {
                category = category.categoryName;
                bookCategories.push(category);
            });
            book[0].categories = bookCategories;
            if (!book.bookImage) {
                book[0].bookImage = '/img/default-book.png';
            }
            livros.push(book[0]);
        }

        // adiciona o array de livros à venda correspondente
        clientSales.forEach(sale => {
            if (sale.saleId == saleId) {
                sale.livros = livros;
            }
        });
    }


    clientCards.forEach(card => {
        if (card.cardFlag == 'Visa') {
            card.cardFlag = 'https://www.svgrepo.com/show/508730/visa-classic.svg';
        } else if (card.cardFlag == 'Mastercard') {
            card.cardFlag = 'https://www.svgrepo.com/show/508703/mastercard.svg';
        } else if (card.cardFlag == 'American Express') {
            card.cardFlag = 'https://www.svgrepo.com/show/508403/amex.svg';
        } else if (card.cardFlag == 'Elo') {
            card.cardFlag = 'https://www.svgrepo.com/show/508421/elo.svg';
        }
    });

    clientCards.forEach(card => {
        let cardNumber = card.cardNumber;
        let censoredCardNumber = cardNumber.replace(/\d(?=\d{4})/g, "*");
        card.cardNumber = censoredCardNumber;
    });

    res.render('myAccount', {
        title: 'Minha Conta',
        cliente: cliente,
        phones: clientPhones,
        addresses: clientAddresses,
        cards: clientCards,
        pedidos: clientSales
    });
}

module.exports = {
    myAccountView
}