const Books = require('../models/BookModel');
const Sales = require('../models/SaleModel');
const SalesBooks = require('../models/SaleBooksModel');
const Categories = require('../models/CategoryModel');
const Phones = require('../models/PhoneModel');
const SalePayments = require('../models/SalePaymentModel');
const Transactions = require('../models/TransactionModel');
const SaleTransactionBooks = require('../models/SaleTransactionBooksModel');
const Coupons = require('../models/CouponModel');
const CouponTransactions = require('../models/CouponTransactionModel');

const moment = require('moment');

const aBook = new Books();
const aSale = new Sales();
const theSaleBooks = new SalesBooks();
const aCategory = new Categories();
const aPhone = new Phones();
const aSalePayment = new SalePayments();
const aTransaction = new Transactions();
const aSaleTransactionBooks = new SaleTransactionBooks();
const aCoupon = new Coupons();
const aCouponTransaction = new CouponTransactions();

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

    // verifica se a venda entrou em processo de transação
    let transaction = await aTransaction.getTransactionBySaleId(req.params.id);
    if (transaction.length > 0) {
        // get books from transaction
        const transactionBooks = await aSaleTransactionBooks.getSaleTransactionBooksByTransactionId(transaction[0].transactionId);
        // put books in transaction object
        transaction[0].books = transactionBooks;

        // verify if there is a coupon in transaction
        const couponId = await aCouponTransaction.getCouponIdByTransactionId(transaction[0].transactionId);
        
        if (couponId.length > 0) {
            const coupon = await aCoupon.getCouponById(couponId[0].couponId);
            transaction[0].coupon = coupon[0];
        }

        // put transaction in sale object
        sale[0].transaction = transaction[0];
    }

    let categories = await aCategory.getAllCategories();

    res.render('order', {
        title: 'Meus Pedidos',
        categories: categories,
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

    let categories = await aCategory.getAllCategories();

    res.render('doOrder', {
        title: 'Solicitação de Troca/Devolução',
        categories: categories,
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

    let troca = req.session.transaction || [];

    if (troca.transactionType = 'exchange') {

        if (troca.books) {
            // para cada livro da troca, busca o livro no banco e adiciona ao um novo array de livros
            let livrosTroca = [];

            for (const book of troca.books) {
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
                livrosTroca.push(livro[0]);
            }
            
            // put books in sale object
            troca.books = livrosTroca;

            // o valor total da transação é a soma dos valores dos livros vezes a quantidade
            let totalTransaction = 0;
            troca.books.forEach(book => {
                totalTransaction += book.price * book.quantity;
            });
            troca.totalTransaction = totalTransaction.toFixed(2);
        }

    }

    let categories = await aCategory.getAllCategories();

    res.render('exchange', {
        title: 'Troca',
        categories: categories,
        pedido: sale[0],
        troca: troca
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

    let devolucao = req.session.transaction || [];

    if (devolucao.transactionType = 'return') {

        if (devolucao.books) {
            // para cada livro da devolucao, busca o livro no banco e adiciona ao um novo array de livros
            let livrosTroca = [];

            for (const book of devolucao.books) {
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
                livrosTroca.push(livro[0]);
            }
            
            // put books in sale object
            devolucao.books = livrosTroca;

            // o valor total da transação é a soma dos valores dos livros vezes a quantidade
            let totalTransaction = 0;
            devolucao.books.forEach(book => {
                totalTransaction += book.price * book.quantity;
            });
            devolucao.totalTransaction = totalTransaction.toFixed(2);
        }
    }

    let categories = await aCategory.getAllCategories();

    res.render('return', {
        title: 'Devolução',
        categories: categories,
        pedido: sale[0],
        devolucao: devolucao
    });
}

async function confirmDelivery (req, res) {
    let sale = {
        saleId: req.params.saleId,
        status: "Entrega Confirmada",
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    await aSale.updateSaleStatus(sale);

    res.redirect(req.get('referer'));
}

async function exchange (req, res) {
    let transactionInfo = {...req.body, ...req.session.transaction};

    let books = [];
    for (const book of transactionInfo.books) {
        let bookInfo = await theSaleBooks.getSaleBooksBySaleId(transactionInfo.saleId);

        books.push({
            bookId: book.bookId,
            quantity: book.quantity,
            value: bookInfo[0].unitValue
        });
    }

    // o valor total da transação é a soma dos valores dos livros vezes a quantidade
    let totalTransaction = 0;
    books.forEach(book => {
        totalTransaction += book.value * book.quantity;
    });

    // gera um código transação aleatório
    let transactionCode = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++) {
        transactionCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // cria a transação
    let transaction = {
        transactionCode: transactionCode,
        transactionType: transactionInfo.transactionType,
        status: 'Em Avaliação',
        requestDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        reason: transactionInfo.reason,
        explanation: transactionInfo.explanation,
        transactionValue: totalTransaction,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        saleId: req.body.saleId
    }

    await aTransaction.createTransaction(transaction);

    // pega o id da transação criada pelo código
    const transactionId = await aTransaction.getTransactionByCode(transactionCode);

    // cria os livros da transação
    books.forEach(async book => {
        let saleTransactionBook = {
            bookId: book.bookId,
            transactingQuantity: book.quantity,
            value: book.value,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            transactionId: transactionId[0].transactionId
        }

        await aSaleTransactionBooks.createSaleTransactionBooks(saleTransactionBook);
    });

    // muda o status da venda para 'Em troca'
    let sale = {
        status: 'Em Troca',
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        saleId: req.body.saleId
    }

    await aSale.updateSaleStatus(sale);

    // clear transaction session
    req.session.transaction = [];

    let categories = await aCategory.getAllCategories();

    res.render('finishTransaction', {
        title: 'Troca',
        categories: categories,
        type: 'exchange',
    });
}

async function devolution (req, res) {
    let transactionInfo = {...req.body, ...req.session.transaction};

    let books = [];
    for (const book of transactionInfo.books) {
        let bookInfo = await theSaleBooks.getSaleBooksBySaleId(transactionInfo.saleId);

        books.push({
            bookId: book.bookId,
            quantity: book.quantity,
            value: bookInfo[0].unitValue
        });
    }

    // o valor total da transação é a soma dos valores dos livros vezes a quantidade
    let totalTransaction = 0;
    books.forEach(book => {
        totalTransaction += book.value * book.quantity;
    });

    // gera um código transação aleatório
    let transactionCode = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++) {
        transactionCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // cria a transação
    let transaction = {
        transactionCode: transactionCode,
        transactionType: transactionInfo.transactionType,
        status: 'Em Avaliação',
        requestDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        reason: transactionInfo.reason,
        explanation: transactionInfo.explanation,
        transactionValue: totalTransaction,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        saleId: req.body.saleId
    }

    await aTransaction.createTransaction(transaction);

    // pega o id da transação criada pelo código
    const transactionId = await aTransaction.getTransactionByCode(transactionCode);

    // cria os livros da transação
    books.forEach(async book => {
        let saleTransactionBook = {
            bookId: book.bookId,
            transactingQuantity: book.quantity,
            value: book.value,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            transactionId: transactionId[0].transactionId
        }

        await aSaleTransactionBooks.createSaleTransactionBooks(saleTransactionBook);
    });

    // muda o status da venda para 'Em devolução'
    let sale = {
        status: 'Em Devolução',
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        saleId: req.body.saleId
    }

    await aSale.updateSaleStatus(sale);

    // clear transaction session
    req.session.transaction = [];

    let categories = await aCategory.getAllCategories();

    res.render('finishTransaction', {
        title: 'Devolução',
        categories: categories,
        type: 'devolution'
    });
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

async function sendObjects (req, res) {

    let transaction = await aTransaction.getTransactionBySaleId(req.params.saleId);

    let transactionId = transaction[0].transactionId;

    let sale = {
        saleId: req.params.saleId,
        status: "Objetos Enviados",
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    await aSale.updateSaleStatus(sale);

    let editTransaction = {
        status: 'Objetos Enviados',
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        transactionId: transactionId
    }

    await aTransaction.updateTransaction(editTransaction);

    res.redirect(req.get('referer'));
}

module.exports = {
    orderView,
    doOrderView,
    exchangeView,
    returnView,
    confirmDelivery,
    exchange,
    devolution,
    setTransaction,
    sendObjects
}