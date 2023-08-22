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

const livros = [
    {
        id: '1',
        titulo: 'O Senhor dos Anéis',
        autor: 'J. R. R. Tolkien',
        editora: 'HarperCollins',
        preco: 39.99,
        imagem: 'https://m.media-amazon.com/images/I/51yxqpcD9iL._SX327_BO1,204,203,200_.jpg'
    },
    {
        id: '2',
        titulo: 'As Crônicas de Nárnia',
        autor: 'C. S. Lewis',
        editora: 'HarperCollins',
        preco: 29.99,
        imagem: 'https://m.media-amazon.com/images/I/51+2QAB7I+L._SX329_BO1,204,203,200_.jpg'
    },
    {
        id: '3',
        titulo: 'O Guia do Mochileiro das Galáxias',
        autor: 'Douglas Adams',
        editora: 'Arqueiro',
        preco: 19.99,
        imagem: 'https://m.media-amazon.com/images/I/51bJleesV-L._SX343_BO1,204,203,200_.jpg'
    },
    {
        id: '4',
        titulo: 'O Pequeno Príncipe',
        autor: 'Antoine de Saint-Exupéry',
        editora: 'Geração Editorial',
        preco: 9.99,
        imagem: 'https://m.media-amazon.com/images/I/41-TNa2nXtL._SX339_BO1,204,203,200_.jpg'
    }
];

let precoFinal = 0;
let frete = 10.00;

// Calcula o preço final
livros.forEach(livro => {
    precoFinal += livro.preco;
});

let precoFinalComFrete = precoFinal + frete;

// Renderiza a view cart
const cartView = (req, res) => {
    res.render('cart', {
        title: 'Carrinho',
        livros: livros,
        precoFinal: precoFinal,
    });
}

const cartContinueView = (req, res) => {
    res.render('cartContinue', {
        title: 'Carrinho',
        livros: livros,
        precoFinal: precoFinal,
        cartoes: cartoes,
        frete: frete,
        precoFinalComFrete: precoFinalComFrete,
    });
}

module.exports = {
    cartView,
    cartContinueView
}