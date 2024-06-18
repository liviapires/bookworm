// const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');

const Books = require('../models/BookModel');

const aBook = new Books();

const apiKey = '';

if (!apiKey || apiKey === 'sua_chave_de_api') {
    console.error('Erro: Chave de API não definida ou incorreta.');
    process.exit(1);
}

// Função para gerar uma resposta
async function recommendation(req, res) {

    let bookTitles = req.body.books;

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
                    { role: 'user', content:`Com base na lista de livros que eu estou comprando: ${bookTitles}, recomende outros livros entre esses ${allBooks} que eu possa gostar entre aspas e numa lista ordenada.`}
                ],
                max_tokens: 200,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        
        let recommendations = response.data.choices[0].message.content.trim();

        // get the book titles from the response considering it is in an ordered list
        let bookTitlesRecommended = recommendations.match(/".*?"/g).map(title => title.replace(/['"]/g, ''));

        console.log(bookTitlesRecommended);

        let promises = bookTitlesRecommended.map(async bookName => {
            const book = await aBook.getBookByTitle(bookName);
            if (book.length > 0) {
                let link = `<a href="/book/${book[0].bookId}">${book[0].title}</a>`; // Assuming the book's detail page is at /books/:id
                recommendations = recommendations.replace(bookName, link);
            }
        });

        Promise.all(promises)
        .then(() => {
            // Now you can format the recommendations as before
            let paragraphs = recommendations.split('\n\n');
            let formattedRecommendations = paragraphs.map(paragraph => {
                let listItems = paragraph.split('\n');
                if (listItems.length > 1) {
                    return `<ul>${listItems.map(item => `<li>${item.replace(/^\d+\.\s/, '')}</li>`).join('')}</ul>`;
                } else {
                    return `<p>${paragraph}</p>`;
                }
            }).join('');

            req.session.recommendation = formattedRecommendations;
            res.redirect(req.get('referer'));
        })
        .catch(error => {
            console.error('Erro ao gerar resposta: ', error);
            res.redirect(req.get('referer'));
        });

    } catch (error) {
        console.error('Erro ao gerar resposta: ', error);
        res.redirect(req.get('referer'));
    }
}

module.exports = {
    recommendation
};