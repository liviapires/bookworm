const pedido = [{
    id: '1',
    titulo: 'O Senhor dos Anéis',
    autor: 'J. R. R. Tolkien',
    preco: '39.99',
    imagem: 'https://m.media-amazon.com/images/I/51yxqpcD9iL._SX327_BO1,204,203,200_.jpg',
    descricao: 'O Senhor dos Anéis é um romance de fantasia criado pelo escritor, professor e filólogo britânico J. R. R. Tolkien. A história começa como sequência de um pedido anterior de Tolkien, O Hobbit, e logo se desenvolve numa história muito maior.',
    disponibilidade: '10',
    paginas: '576',
    editora: 'HarperCollins',
    idioma: 'Português',
    anoEdicao: '2019',
    isbn: '9788595085601',
    categorias: ['Fantasia', 'Aventura', 'Ficção'],
    situacao: 'Finalizado',
    dataPedido: '10/10/2020',
    cliente: 'João da Silva',
    motivo: 'Avaria',
    descricaoMotivo: 'O livro veio com a capa rasgada.',
}];

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

    res.render('evaluateExchanges', {
        title: 'Avaliar Troca',
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

    res.render('evaluateExchange', {
        title: 'Avaliar Troca',
        exchange: exchange[0]
    });
}

const evaluateDevoutionView = (req, res) => {
    res.render('evaluateDevolution', {
        title: 'Avaliar Devolução',
        pedido: pedido
    });
}

const evaluateDevolutionContinueView = (req, res) => {
    res.render('evaluateDevolutionContinue', {
        title: 'Avaliar Devolução',
        pedido: pedido
    });
}

async function mainAdminView (req, res) {
    res.render('mainAdmin', {
        title: 'Administração'
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

    res.render('sale', {
        title: 'Venda',
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

    res.render('sales', {
        title: 'Vendas',
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
        }
    } else if (what == 'reject') {

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
    }
    
}

module.exports = {
    evaluateExchangesView,
    evaluateExchangeView,
    evaluateDevoutionView,
    evaluateDevolutionContinueView,
    mainAdminView,
    salesView,
    saleView,
    updateSaleStatus,
    updateTransaction
}