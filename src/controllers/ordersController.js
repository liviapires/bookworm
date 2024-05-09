const Books = require('../models/BookModel');
const Sales = require('../models/SaleModel');
const SalesBooks = require('../models/SaleBooksModel');
const Categories = require('../models/CategoryModel');
const Phones = require('../models/PhoneModel');
const SalePayments = require('../models/SalePaymentModel');

const aBook = new Books();
const aSale = new Sales();
const theSaleBooks = new SalesBooks();
const aCategory = new Categories();
const aPhone = new Phones();
const aSalePayment = new SalePayments();

async function orderView (req, res) {

    const sale = await aSale.getSaleById(req.params.id);

    sale.forEach(sale => {
        let date = new Date(sale.purchaseDate);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        sale.purchaseDate = `${day}/${month}/${year}`;
    });

    // get books from sale
    const books = await theSaleBooks.getSaleBooksBySaleId(req.params.id);

    // get payment methods from sale
    const payments = await aSalePayment.getSalePaymentBySaleId(req.params.id);

    // para cada livro da venda, busca o livro no banco e adiciona ao um novo array de livros
    let livros = [];
    for (const book of books) {
        let livro = await aBook.getBookById(book.bookId);
        let bookCategories = [];
        const categories = await aCategory.getBookCategories(book.bookId);
        categories.forEach(category => {
            category = category.categoryName;
            bookCategories.push(category);
        });
        livro[0].categories = bookCategories;
        if (!livro[0].bookImage) {
            livro[0].bookImage = '/img/default-book.png';
        }
        livros.push(livro[0]);
    }

    // procura o telefone do cliente e adiciona ao objeto de venda
    const phones = await aPhone.getPhoneByUserId(sale[0].userId);
    sale[0].phones = phones;

    // put books in sale object
    sale[0].books = livros;

    // put payment methods in sale object
    sale[0].payments = payments;

    res.render('order', {
        title: 'Meus Pedidos',
        pedido: sale[0]
    });
}

async function doOrderView (req, res) {
    
    const sale = await aSale.getSaleById(req.params.id);

    sale.forEach(sale => {
        let date = new Date(sale.purchaseDate);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        sale.purchaseDate = `${day}/${month}/${year}`;
    });

    // get books from sale
    const books = await theSaleBooks.getSaleBooksBySaleId(req.params.id);

    // para cada livro da venda, busca o livro no banco e adiciona ao um novo array de livros
    let livros = [];
    for (const book of books) {
        let livro = await aBook.getBookById(book.bookId);
        let bookCategories = [];
        const categories = await aCategory.getBookCategories(book.bookId);
        categories.forEach(category => {
            category = category.categoryName;
            bookCategories.push(category);
        });
        livro[0].categories = bookCategories;
        if (!livro[0].bookImage) {
            livro[0].bookImage = '/img/default-book.png';
        }
        livro[0].quantity = book.quantity;
        
        livros.push(livro[0]);
    }

    // procura o telefone do cliente e adiciona ao objeto de venda
    const phones = await aPhone.getPhoneByUserId(sale[0].userId);
    sale[0].phones = phones;

    // put books in sale object
    sale[0].books = livros;

    sale[0].action = 'troca';

    res.render('doOrder', {
        title: 'Solicitação de Troca/Devolução',
        pedido: sale[0]
    });
}

async function exchangeView (req, res) {
    const sale = await aSale.getSaleById(req.params.id);

    sale.forEach(sale => {
        let date = new Date(sale.purchaseDate);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        sale.purchaseDate = `${day}/${month}/${year}`;
    });

    // get books from sale
    const books = await theSaleBooks.getSaleBooksBySaleId(req.params.id);

    // para cada livro da venda, busca o livro no banco e adiciona ao um novo array de livros
    let livros = [];
    for (const book of books) {
        let livro = await aBook.getBookById(book.bookId);
        let bookCategories = [];
        const categories = await aCategory.getBookCategories(book.bookId);
        categories.forEach(category => {
            category = category.categoryName;
            bookCategories.push(category);
        });
        livro[0].categories = bookCategories;
        if (!livro[0].bookImage) {
            livro[0].bookImage = '/img/default-book.png';
        }
        livro[0].quantity = book.quantity;
        livros.push(livro[0]);
    }

    // procura o telefone do cliente e adiciona ao objeto de venda
    const phones = await aPhone.getPhoneByUserId(sale[0].userId);
    sale[0].phones = phones;

    // put books in sale object
    sale[0].books = livros;

    res.render('exchange', {
        title: 'Troca',
        pedido: sale[0]
    });
}

async function returnView (req, res) {
    const sale = await aSale.getSaleById(req.params.id);

    sale.forEach(sale => {
        let date = new Date(sale.purchaseDate);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        sale.purchaseDate = `${day}/${month}/${year}`;
    });

    // get books from sale
    const books = await theSaleBooks.getSaleBooksBySaleId(req.params.id);

    // para cada livro da venda, busca o livro no banco e adiciona ao um novo array de livros
    let livros = [];
    for (const book of books) {
        let livro = await aBook.getBookById(book.bookId);
        let bookCategories = [];
        const categories = await aCategory.getBookCategories(book.bookId);
        categories.forEach(category => {
            category = category.categoryName;
            bookCategories.push(category);
        });
        livro[0].categories = bookCategories;
        if (!livro[0].bookImage) {
            livro[0].bookImage = '/img/default-book.png';
        }
        livro[0].quantity = book.quantity;
        livros.push(livro[0]);
    }

    // procura o telefone do cliente e adiciona ao objeto de venda
    const phones = await aPhone.getPhoneByUserId(sale[0].userId);
    sale[0].phones = phones;

    // put books in sale object
    sale[0].books = livros;

    res.render('return', {
        title: 'Devolução',
        pedido: sale[0]
    });
}

async function exchange (req, res) {
    console.log(req.body);
    console.log(req.session.transaction);

    res.redirect(req.get('referer'));
}

async function setTransaction (req, res) {
    let books = [];

    books.push({
        bookId: req.params.id,
        quantity: req.body.quantity
    });

    if (req.session.transaction) {
        // verifica se o livro já está no array
        let bookExists = false;
        req.session.transaction.books.forEach(book => {
            if (book.bookId == req.params.id) {
                bookExists = true;
                book.quantity = req.body.quantity;
            }
        });

        // se o livro não existir no array, adiciona
        if (!bookExists) {
            req.session.transaction.books.push({
                bookId: req.params.id,
                quantity: req.body.quantity
            });
        }
    } else {
        req.session.transaction = {
            transactionType: req.params.transactionType,
            books: books
        }
    }

    res.redirect(req.get('referer'));
}


module.exports = {
    orderView,
    doOrderView,
    exchangeView,
    returnView,
    exchange,
    setTransaction
}