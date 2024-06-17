// const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');

const Books = require('../models/BookModel');

const aBook = new Books();

const apiKey = 'sk-proj-NpekipqybaC1r2aovEKdT3BlbkFJYxHVmkoGa6lg1QNr4T2Z';

if (!apiKey || apiKey === 'sua_chave_de_api') {
    console.error('Erro: Chave de API não definida ou incorreta.');
    process.exit(1);
}

// Função para gerar uma resposta
async function recomendation(req, res) {

    let bookTitles = req.body.books;

    generateRecomendation(bookTitles);

    res.redirect(req.get('referer'));
}

async function generateRecomendation(bookTitles) {

    let booksDump = await aBook.getAllBooks();

    // foreach book in booksDump, save its name on a list of allBooks
    let allBooks = [];
    for (let i = 0; i < booksDump.length; i++) {
        allBooks.push(booksDump[i].title);
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'Você é um assistente útil.' },
                    { role: 'user', content:`Com base na lista de livros: ${bookTitles}, recomende outros livros entre esses ${allBooks} que um leitor possa gostar.`}
                ],
                max_tokens: 100,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    
        // console.log(response.data.choices[0].message.content.trim());
        
        const recommendations = response.data.choices[0].text.trim();
        res.json({ recommendations });
    } catch (error) {
        console.error('Erro ao gerar resposta:', error.response.status, error.response.statusText);
        console.error('Detalhes:', JSON.stringify(error.response.data, null, 2));
    }
}

module.exports = {
    recomendation
};