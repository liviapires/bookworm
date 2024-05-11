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

const moment = require('moment');

const aSale = new Sale();
const theSaleBooks = new SaleBooks();
const aCategory = new Category();
const aPhone = new Phone();
const aBook = new Book();
const aTransaction = new Transaction();

// Renderiza a view evaluateExchange
async function evaluateExchangeView (req, res) {

    let exchanges = await aTransaction.getTransactionByType('exchange');

    console.log(exchanges);

    res.render('evaluateExchange', {
        title: 'Avaliar Troca',
        exchanges: exchanges
    });
}

const evaluateExchangeContinueView = (req, res) => {
    res.render('evaluateExchangeContinue', {
        title: 'Avaliar Troca',
        pedido: pedido
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

module.exports = {
    evaluateExchangeView,
    evaluateExchangeContinueView,
    evaluateDevoutionView,
    evaluateDevolutionContinueView,
    mainAdminView,
    salesView,
    saleView,
    updateSaleStatus
}