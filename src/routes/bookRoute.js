const express = require('express')
const router = express.Router();

const bookView = require("../controllers/bookController");

router.get("/book", bookView.bookView);

// rota pega id do livro como parametro e renderiza a view book com o livro selecionado

router.get("/book/:id", (req, res) => {
    const id = req.params.id;
    const livro = livros.find(livro => livro.id === id);
    res.render('book', {
        title: 'Livro',
        livro: livro
    });
});

module.exports = router;