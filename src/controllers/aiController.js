// const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');

const apiKey = 'sk-proj-iL18X4dQZGhvY9uHzqGnT3BlbkFJXjf7AFZBdMKKjSuiCqD7';

if (!apiKey || apiKey === 'sua_chave_de_api') {
    console.error('Erro: Chave de API não definida ou incorreta.');
    process.exit(1);
}

// Função para gerar uma resposta
async function recomendation() {
    
}

module.exports = {
    recomendation
};