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

// Renderiza a view evaluateExchange
const evaluateExchangeView = (req, res) => {
    res.render('evaluateExchange', {
        title: 'Avaliar Troca',
        pedido: pedido
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

module.exports = {
    evaluateExchangeView,
    evaluateExchangeContinueView,
    evaluateDevoutionView,
    evaluateDevolutionContinueView,
    mainAdminView
}