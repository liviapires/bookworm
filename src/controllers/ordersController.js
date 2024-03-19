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

// get order by id from the array
async function getOrderById(id) {
    return pedidos.find(pedido => pedido.id == id);
}


async function orderView (req, res) {

    const pedido = await getOrderById(req.params.id);

    res.render('order', {
        title: 'Meus Pedidos',
        pedido: pedido
    });
}

async function doOrderView (req, res) {
    
    const pedido = await getOrderById(req.params.id);

    res.render('doOrder', {
        title: 'Solicitação de Troca/Devolução',
        pedido: pedido
    });
}

module.exports = {
    orderView,
    doOrderView
}