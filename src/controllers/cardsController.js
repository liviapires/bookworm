const Card = require('../models/CardModel');

// get all cards
const getAllCards = async (req, res) => {
    const card = new Card();

    try {
        const [cards] = await card.getAll();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// get one card by id
const getCardById = async (req, res) => {
    const card = new Card();

    try {
        const [cards] = await card.getById(req.params.id);
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// create card
const createCard = async (req, res) => {
    const card = new Card();

    card.cardNumber = req.body.cardNumber;
    card.cardName = req.body.cardName;
    card.cardFlag = req.body.cardFlag;
    card.cvv = req.body.cvv;

    try {
        const results = await card.create(card);

        res.status(201).json({
            message: "Cartão criado com sucesso!",
            card: results
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// update card
const updateCard = async (req, res) => {
    const card = new Card();

    card.cardNumber = req.body.cardNumber;
    card.cardName = req.body.cardName;
    card.cardFlag = req.body.cardFlag;
    card.cvv = req.body.cvv;

    try {
        const results = await card.update(req.params.id);

        res.status(200).json({
            message: "Cartão atualizado com sucesso!",
            card: results
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// delete card
const deleteCard = async (req, res) => {
    const card = new Card();

    try {
        const results = await card.delete(req.params.id);

        res.status(200).json({
            message: "Cartão deletado com sucesso!",
            card: results
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getAllCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard
}