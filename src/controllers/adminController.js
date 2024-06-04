const Sale = require('../models/SaleModel');
const SaleBooks = require('../models/SaleBooksModel');
const Category = require('../models/CategoryModel');
const Phone = require('../models/PhoneModel');
const Book = require('../models/BookModel');
const Transaction = require('../models/TransactionModel');
const SaleTransactionBooks = require('../models/SaleTransactionBooksModel');
const Coupon = require('../models/CouponModel');
const CouponTransaction = require('../models/CouponTransactionModel');

const moment = require('moment');

const aSale = new Sale();
const theSaleBooks = new SaleBooks();
const aCategory = new Category();
const aPhone = new Phone();
const aBook = new Book();
const aTransaction = new Transaction();
const aSaleTransactionBook = new SaleTransactionBooks();
const aCoupon = new Coupon();
const aCouponTransaction = new CouponTransaction();

// Renderiza a view evaluateExchange
async function evaluateExchangesView (req, res) {

    let exchanges = await aTransaction.getTransactionByType('exchange');

    let categories = await aCategory.getAllCategories();

    res.render('evaluateExchanges', {
        title: 'Avaliar Troca',
        categories: categories,
        exchanges: exchanges
    });
}

async function evaluateExchangeView (req, res) {

    let exchange = await aTransaction.getTransactionById(req.params.id);

    let sale = await aSale.getSaleById(exchange[0].saleId);

    if (exchange[0].reason == 'defeito') {
        exchange[0].reason = 'Produto com defeito';
    } else if (exchange[0].reason == 'errado') {
        exchange[0].reason = 'Produto errado';
    } else if (exchange[0].reason == 'avaria') {
        exchange[0].reason = 'Produto com avaria';
    }

    exchange.forEach(exchange => {
        let date = new Date(exchange.requestDate);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        exchange.requestDate = `${day}/${month}/${year}`;
    });

    sale.forEach(sale => {
        let date = new Date(sale.purchaseDate);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        sale.purchaseDate = `${day}/${month}/${year}`;
    })

    exchange[0].salePurchaseDate = sale[0].purchaseDate;

    // get books from exchange
    const books = await aSaleTransactionBook.getSaleTransactionBooksByTransactionId(req.params.id);

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
        // romove todas as informações do book menos o value e substitui pelo livro
        delete book.bookId;
        delete book.createdAt;
        delete book.updatedAt;
        delete book.transactionId;
        
        book.infos = livro[0];
    }

    // put books in exchange object
    exchange[0].books = books;

    let categories = await aCategory.getAllCategories();

    res.render('evaluateExchange', {
        title: 'Avaliar Troca',
        categories: categories,
        exchange: exchange[0]
    });
}

async function evaluateDevolutions (req, res) {

    let devolutions = await aTransaction.getTransactionByType('return');

    let categories = await aCategory.getAllCategories();

    res.render('evaluateDevolutions', {
        title: 'Avaliar Devoluções',
        categories: categories,
        devolutions: devolutions
    });
}

async function evaluateDevoutionView (req, res) {

    let devolution = await aTransaction.getTransactionById(req.params.id);

    let sale = await aSale.getSaleById(devolution[0].saleId);

    if (devolution[0].reason == 'defeito') {
        devolution[0].reason = 'Produto com defeito';
    } else if (devolution[0].reason == 'errado') {
        devolution[0].reason = 'Produto errado';
    } else if (devolution[0].reason == 'avaria') {
        devolution[0].reason = 'Produto com avaria';
    }

    devolution.forEach(devolution => {
        let date = new Date(devolution.requestDate);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        devolution.requestDate = `${day}/${month}/${year}`;
    });

    sale.forEach(sale => {
        let date = new Date(sale.purchaseDate);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        sale.purchaseDate = `${day}/${month}/${year}`;
    });

    devolution[0].salePurchaseDate = sale[0].purchaseDate;

    // get books from devolution
    const books = await aSaleTransactionBook.getSaleTransactionBooksByTransactionId(req.params.id);

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
        // romove todas as informações do book menos o value e substitui pelo livro
        delete book.bookId;
        delete book.createdAt;
        delete book.updatedAt;
        delete book.transactionId;
        
        book.infos = livro[0];
    }

    // put books in devolution object
    devolution[0].books = books;

    let categories = await aCategory.getAllCategories();

    res.render('evaluateDevolution', {
        title: 'Avaliar Devolução',
        categories: categories,
        devolution: devolution[0]
    });
}


async function mainAdminView (req, res) {

    let categories = await aCategory.getAllCategories();

    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const defaultEndDate = formatDate(today);
    const defaultStartDate = formatDate(lastMonth);

    res.render('mainAdmin', {
        title: 'Administração',
        categories: categories,
        defaultStartDate,
        defaultEndDate
    });
}

async function saleView (req, res) {

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
        livros.push(livro[0]);
    }

    // procura o telefone do cliente e adiciona ao objeto de venda
    const phones = await aPhone.getPhoneByUserId(sale[0].userId);
    sale[0].phones = phones;

    // put books in sale object
    sale[0].books = livros;

    // verify if the sale has a transaction
    const transaction = await aTransaction.getTransactionBySaleId(req.params.id);
    if (transaction.length > 0) {
        sale[0].transactionId = transaction[0].transactionId;
    }

    let categories = await aCategory.getAllCategories();

    res.render('sale', {
        title: 'Venda',
        categories: categories,
        sale: sale[0]
    });
}

async function salesView (req, res) {

    const sales = await aSale.getAllSales();

    sales.forEach(sale => {
        let date = new Date(sale.purchaseDate);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        sale.purchaseDate = `${day}/${month}/${year}`;
    });

    let categories = await aCategory.getAllCategories();

    res.render('sales', {
        title: 'Vendas',
        categories: categories,
        sales: sales
    });
}

async function updateSaleStatus (req, res) {

    let sale = {
        saleId: req.body.saleId,
        status: req.body.status,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    await aSale.updateSaleStatus(sale);

    res.redirect(req.get('referer'));
}

async function updateTransaction (req, res) {
    let transactionId = req.params.id;
    let type = req.params.type;
    let what = req.params.do;

    if (what == 'approve') {
        // gera um cupom de desconto para a troca aprovada
        if (type == 'exchange') {
            let transaction = await aTransaction.getTransactionById(transactionId);

            exchange = {
                transactionId: transactionId,
                status: 'Troca Aprovada',
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            }

            await aTransaction.updateTransaction(exchange);

            let sale = {
                saleId: transaction[0].saleId,
                status: 'Aguardando Objetos',
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            }

            await aSale.updateSaleStatus(sale);

            res.redirect(req.get('referer'));
        } else if (type == 'devolution') {
            let transaction = await aTransaction.getTransactionById(transactionId);

            devolution = {
                transactionId: transactionId,
                status: 'Devolução Aprovada',
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            }

            await aTransaction.updateTransaction(devolution);

            let sale = {
                saleId: transaction[0].saleId,
                status: 'Aguardando Objetos',
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            }

            await aSale.updateSaleStatus(sale);

            res.redirect(req.get('referer'));
        }
    } else if (what == 'reject') {

        if (type == 'exchange') {
            let transaction = await aTransaction.getTransactionById(transactionId);

            exchange = {
                transactionId: transactionId,
                status: 'Troca Rejeitada',
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            }

            await aTransaction.updateTransaction(exchange);
            
            let sale = {
                saleId: transaction[0].saleId,
                status: 'Troca Rejeitada',
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            }

            await aSale.updateSaleStatus(sale);

            res.redirect(req.get('referer'));
        } else if (type == 'devolution') {
            let transaction = await aTransaction.getTransactionById(transactionId);

            devolution = {
                transactionId: transactionId,
                status: 'Devolução Rejeitada',
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            }

            await aTransaction.updateTransaction(devolution);

            let sale = {
                saleId: transaction[0].saleId,
                status: 'Devolução Rejeitada',
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            }

            await aSale.updateSaleStatus(sale);

            res.redirect(req.get('referer'));
        }
    } else if (what == 'confirm') {
        if (type == 'reception') {
            let transaction = await aTransaction.getTransactionById(transactionId);

            if (transaction[0].transactionType == 'exchange') {
                let coupon = {
                    couponCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
                    couponValue: transaction[0].transactionValue,
                    couponType: 'exchange',
                    generationDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                    expirationDate: moment().add(30, 'days').format('YYYY-MM-DD HH:mm:ss'),
                    active: 1,
                    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
                }

                await aCoupon.createCoupon(coupon);

                let couponId = await aCoupon.getCouponByCode(coupon.couponCode);

                // cria um registro de transação do cupom
                let couponTransaction = {
                    couponId: couponId[0].couponId,
                    transactionId: transactionId
                }

                await aCouponTransaction.createCouponTransaction(couponTransaction);

                exchange = {
                    transactionId: transactionId,
                    status: 'Troca Finalizada',
                    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
                }

                await aTransaction.updateTransaction(exchange);

                let sale = {
                    saleId: transaction[0].saleId,
                    status: 'Troca Finalizada',
                    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
                }

                await aSale.updateSaleStatus(sale);

                res.redirect(req.get('referer'));
            } else if (transaction[0].transactionType == 'return') {
                let coupon = {
                    couponCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
                    couponValue: transaction[0].transactionValue,
                    couponType: 'devolution',
                    generationDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                    expirationDate: moment().add(30, 'days').format('YYYY-MM-DD HH:mm:ss'),
                    active: 1,
                    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
                }

                await aCoupon.createCoupon(coupon);

                let couponId = await aCoupon.getCouponByCode(coupon.couponCode);

                // cria um registro de transação do cupom
                let couponTransaction = {
                    couponId: couponId[0].couponId,
                    transactionId: transactionId
                }

                await aCouponTransaction.createCouponTransaction(couponTransaction);

                devolution = {
                    transactionId: transactionId,
                    status: 'Devolução Finalizada',
                    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
                }

                await aTransaction.updateTransaction(devolution);

                let sale = {
                    saleId: transaction[0].saleId,
                    status: 'Devolução Finalizada',
                    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
                }

                await aSale.updateSaleStatus(sale);

                res.redirect(req.get('referer'));
            }
        }
    }
}

async function chart(req, res){
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const defaultEndDate = formatDate(today);
    const defaultStartDate = formatDate(lastMonth);

    res.render('chart', { 
        defaultStartDate, 
        defaultEndDate 
    });
}

async function filterData(req, res) {
    let { startDate, endDate } = req.query;

    const allSalesData = await aSale.getSalesBooks();

    startDate = new Date(startDate);
    endDate = new Date(endDate);
    endDate.setHours(23, 59, 59, 999);

    const filteredData = allSalesData.filter(item => {
        const itemDate = new Date(item.purchaseDate);
        return itemDate >= startDate && itemDate <= endDate;
    });

    const aggregatedData = {};
    filteredData.forEach(item => {
        const date = new Date(item.purchaseDate);
        const month = new Date(date.getFullYear(), date.getMonth());
        const key = `${month.getFullYear()}-${month.getMonth()}`;

        if (!aggregatedData[key]) {
            aggregatedData[key] = {};
        }

        if (!aggregatedData[key][item.title]) {
            aggregatedData[key][item.title] = 0;
        }

        aggregatedData[key][item.title] += item.quantity;
    });

    const titles = [...new Set(allSalesData.map(item => item.title))];

    const dataPoints = [];
    Object.keys(aggregatedData).forEach(month => {
        const date = new Date(parseInt(month.split('-')[0]), parseInt(month.split('-')[1]));
        const row = [date];
        titles.forEach(title => {
            row.push(aggregatedData[month][title] || 0);
        });
        dataPoints.push(row);
    });


    res.json({
        dataPoints,
        titles
    });
}

module.exports = {
    evaluateExchangesView,
    evaluateExchangeView,
    evaluateDevoutionView,
    evaluateDevolutions,
    mainAdminView,
    salesView,
    saleView,
    updateSaleStatus,
    updateTransaction,
    chart,
    filterData
}