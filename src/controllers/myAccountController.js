const livros = [
    {
        id: '1',
        titulo: 'O Senhor dos Anéis',
        autor: 'J. R. R. Tolkien',
        preco: '39.99',
        imagem: 'https://m.media-amazon.com/images/I/51yxqpcD9iL._SX327_BO1,204,203,200_.jpg'
    },
    {
        id: '2',
        titulo: 'As Crônicas de Nárnia',
        autor: 'C. S. Lewis',
        preco: '29.99',
        imagem: 'https://m.media-amazon.com/images/I/51+2QAB7I+L._SX329_BO1,204,203,200_.jpg'
    },
    {
        id: '3',
        titulo: 'O Guia do Mochileiro das Galáxias',
        autor: 'Douglas Adams',
        preco: '19.99',
        imagem: 'https://m.media-amazon.com/images/I/51bJleesV-L._SX343_BO1,204,203,200_.jpg'
    },
    {
        id: '4',
        titulo: 'O Pequeno Príncipe',
        autor: 'Antoine de Saint-Exupéry',
        preco: '9.99',
        imagem: 'https://m.media-amazon.com/images/I/41-TNa2nXtL._SX339_BO1,204,203,200_.jpg'
    }
];

const enderecos = [
    {
        id: 1,
        name: 'Casa',
        street: 'Rua dos Bobos',
        number: '0',
        complement: 'Não tem nada',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '00000-000',
    },
    {
        id: 2,
        name: 'Trabalho',
        street: 'Rua Socorrinho',
        number: '80',
        complement: 'Trabalho',
        city: 'Phortaleza',
        state: 'CE',
        zipCode: '00000-000',
    },
]

const cartoes = [
    {
        id: '1',
        numero: '1234 5678 9012 3456',
        nome: 'Fulano de Tal',
        validade: '12/2021',
        cvv: '123',
        bandeira: 'mastercard',
        imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png'
    },
    {
        id: '2',
        numero: '9876 5432 1098 7654',
        nome: 'Ciclano de Tal',
        validade: '12/2021',
        cvv: '321',
        bandeira: 'visa',
        imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png'
    }
];

const categorias = [
    {
        id: '1',
        nome: 'Fantasia'
    },
    {
        id: '2',
        nome: 'Terror'
    },
    {
        id: '3',
        nome: 'Ação'
    }
]

// Renderiza a view myAccount
const myAccountView = (req, res) => {
    res.render('category', {
        title: 'Todos os Livros',
        livros: livros,
        categorias: categorias
    });
}

// Renderiza a view addresses
const addressesView = (req, res) => {
    res.render('addresses', {
        title: 'Endereços',
        enderecos: enderecos
    });
}

const cardsView = (req, res) => {
    res.render('cards', {
        title: 'Cartões',
        cartoes: cartoes
    });
}

module.exports = {
    myAccountView,
    addressesView,
    cardsView
}