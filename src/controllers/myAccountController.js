let pedidos = [
    {
        id: '1',
        nomeCliente: 'Fulano de Tal',
        telefone: {
            codigoPais: '+55',
            ddd: '11',
            numero: '99999-9999'
        },
        livros: [
            {
                titulo: 'O Hobbit',
                quantidade: 2,
                imagem: 'https://www.lojadobolseiro.com.br/uploads/images/2020/02/76-livro-o-hobbit-capa-smaug-j-r-r-tolkien-1582738560.jpg',
                preco: 'R$ 50,00',
                autor: 'J.R.R. Tolkien',
                editora: 'HarperCollins',
                ano: '2019',
                idioma: 'Português',
                isbn: '9788595084637',
                categorias: ['Aventura', 'Fantasia']
            },
            {
                titulo: 'O Silmarillion',
                quantidade: 1,
                imagem: 'https://m.media-amazon.com/images/I/71mWHFvaZ5L._AC_UF894,1000_QL80_.jpg',
                preco: 'R$ 50,00',
                autor: 'J.R.R. Tolkien',
                editora: 'HarperCollins',
                ano: '2012',
                idioma: 'Português',
                isbn: '9788595084634',
                categorias: ['Fantasia']
            }
        ],
        situacao: 'Em andamento',
        dataPedido: '15/10/2020',
        subtotal: 'R$ 150,00',
        frete: 'R$ 0,00',
        total: 'R$ 150,00',
        endereco: {
            rua: 'Rua dos Bobos',
            numero: '0',
            bairro: 'Bairro da Lapa',
            cidade: 'São Paulo',
            estado: 'SP',
            cep: '05000-001'
        },
        pagamento: {
            forma: 'Cartão de Crédito',
            parcelas: 3
        }
    },
    {
        id: '2',
        nomeCliente: 'Beltrano de Tal',
        telefone: {
            codigoPais: '+55',
            ddd: '12',
            numero: '99999-9999'
        },
        livros: [
            {
                titulo: 'O Hobbit',
                quantidade: 1,
                imagem: 'https://www.lojadobolseiro.com.br/uploads/images/2020/02/76-livro-o-hobbit-capa-smaug-j-r-r-tolkien-1582738560.jpg',
                preco: 'R$ 50,00',
                autor: 'J.R.R. Tolkien',
                editora: 'HarperCollins',
                ano: '2019',
                idioma: 'Português',
                isbn: '9788595084632',
                categorias: ['Aventura', 'Fantasia']
            }
        ],
        situacao: 'Entregue',
        dataPedido: '10/10/2020',
        subtotal: 'R$ 50,00',
        frete: 'R$ 13,00',
        total: 'R$ 63,00',
        endereco: {
            rua: 'Rua dos Bobos',
            numero: '0',
            bairro: 'Bairro da Lapa',
            cidade: 'São Paulo',
            estado: 'SP',
            cep: '05000-001'
        },
        pagamento: {
            forma: 'Cartão de Crédito',
            parcelas: 1
        }
    },
    {
        id: '3',
        nomeCliente: 'Ciclano de Tal',
        telefone: {
            codigoPais: '+55',
            ddd: '13',
            numero: '99999-9999'
        },
        livros: [
            {
                titulo: 'O Silmarillion',
                quantidade: 2,
                imagem: 'https://m.media-amazon.com/images/I/71mWHFvaZ5L._AC_UF894,1000_QL80_.jpg',
                preco: 'R$ 50,00',
                autor: 'J.R.R. Tolkien',
                editora: 'HarperCollins',
                ano: '2012',
                idioma: 'Português',
                isbn: '9788595084634',
                categorias: ['Fantasia']
            }
        ],
        situacao: 'Em Troca',
        dataPedido: '05/10/2020',
        subtotal: 'R$ 100,00',
        frete: 'R$ 10,00',
        total: 'R$ 110,00',
        endereco: {
            rua: 'Rua dos Bobos',
            numero: '0',
            bairro: 'Bairro da Lapa',
            cidade: 'São Paulo',
            estado: 'SP',
            cep: '05000-001'
        },
        pagamento: {
            forma: 'Cartão de Crédito',
            parcelas: 2
        }
    },
    {
        id: '4',
        nomeCliente: 'Deltrano de Tal',
        telefone: {
            codigoPais: '+55',
            ddd: '14',
            numero: '99999-9999'
        },
        livros: [
            {
                titulo: 'O Silmarillion',
                quantidade: 1,
                imagem: 'https://m.media-amazon.com/images/I/71mWHFvaZ5L._AC_UF894,1000_QL80_.jpg',
                preco: 'R$ 50,00',
                autor: 'J.R.R. Tolkien',
                editora: 'HarperCollins',
                ano: '2012',
                idioma: 'Português',
                isbn: '9788595084634',
                categorias: ['Fantasia']
            }
        ],
        situacao: 'Cancelado',
        dataPedido: '01/10/2020',
        subtotal: 'R$ 50,00',
        frete: 'R$ 5,00',
        total: 'R$ 55,00',
        endereco: {
            rua: 'Rua dos Bobos',
            numero: '0',
            bairro: 'Bairro da Lapa',
            cidade: 'São Paulo',
            estado: 'SP',
            cep: '05000-001'
        },
        pagamento: {
            forma: 'Cartão de Crédito',
            parcelas: 1
        }
    }
]

const Client = require('../models/ClientModel');

const aClient = new Client();

// Renderiza a view myAccount
async function myAccountView (req, res) {

    const cliente = await aClient.getClientById(4);

    // get different image depending on the cardFlag

    if (cliente[0].cardFlag == 'Visa') {
        cliente[0].cardFlag = 'https://www.svgrepo.com/show/508730/visa-classic.svg';
    } else if (cliente[0].cardFlag == 'Mastercard') {
        cliente[0].cardFlag = 'https://www.svgrepo.com/show/508703/mastercard.svg';
    } else if (cliente[0].cardFlag == 'American Express') {
        cliente[0].cardFlag = 'https://www.svgrepo.com/show/508403/amex.svg';
    } else if (cliente[0].cardFlag == 'Elo') {
        cliente[0].cardFlag = 'https://www.svgrepo.com/show/508421/elo.svg';
    }

    // censor the credit card number

    let cardNumber = cliente[0].cardNumber;
    let censoredCardNumber = cardNumber.replace(/\d(?=\d{4})/g, "*");
    cliente[0].cardNumber = censoredCardNumber;

    res.render('myAccount', {
        title: 'Minha Conta',
        cliente: cliente,
        pedidos: pedidos
    });
}

module.exports = {
    myAccountView
}