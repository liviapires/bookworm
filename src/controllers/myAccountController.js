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

// Renderiza a view myAccount
const myAccountView = (req, res) => {
    res.render('myAccount', {
        title: 'myAccount'
    });
}

// Renderiza a view addresses
const addressesView = (req, res) => {
    res.render('addresses', {
        title: 'addresses',
        enderecos: enderecos
    });
}

const cardsView = (req, res) => {
    res.render('cards', {
        title: 'cards',
        cartoes: cartoes
    });
}

module.exports = {
    myAccountView,
    addressesView,
    cardsView
}