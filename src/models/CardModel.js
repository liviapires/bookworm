const db = require("../../config/db");

class Card {
    constructor(cardNumber, cardName, expirationDate, cardFlag, cvv, createdAt, updatedAt, clientId) {
        this.cardNumber = cardNumber;
        this.cardName = cardName;
        this.expirationDate = expirationDate;
        this.cardFlag = cardFlag;
        this.cvv = cvv;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.clientId = clientId;
    }

    // get all cards
    async getAllCards() {
        const [results, metadata] = await db.query(
            `SELECT * FROM cards;`
        );

        return results;
    }

    // create a new card
    async createCard(card) {
        const [results, metadata] = await db.query(
            `INSERT INTO cards (cardNumber, cardName, expirationDate, cardFlag, cvv, createdAt, updatedAt, clientId) \
                VALUES (
                    '${card.cardNumber}',
                    '${card.cardName}',
                    '${card.expirationDate}',
                    '${card.cardFlag}',
                    '${card.cvv}',
                    '${card.createdAt}',
                    '${card.updatedAt}',
                    '${card.clientId}'
                );`
        );

        return results;
    }

    // update a card
    async updateCard(card) {
        const [results, metadata] = await db.query(
            `UPDATE cards SET 
                cardNumber = '${card.cardNumber}',
                cardName = '${card.cardName}',
                expirationDate = '${card.expirationDate}',
                cardFlag = '${card.cardFlag}',
                cvv = '${card.cvv}',
                updatedAt = '${card.updatedAt}'
            WHERE cardId = ?;`
        );

        return results;
    }

    // delete a card
    async deleteCard(id) {
        const [results, metadata] = await db.query(
            `DELETE FROM cards WHERE cardId = '${id}';`
        );

        return results;
    }

    // get card by id
    async getCardById(id) {
        const [results, metadata] = await db.query(
            `SELECT * FROM cards WHERE cardId = '${id}';`
        );

        return results;
    }

    // get card id
    async getCardId(card) {
        const [results, metadata] = await db.query(
            `SELECT cardId FROM cards 
                WHERE cardNumber = '${card.cardNumber}' 
                    AND cardName = '${card.cardName}' 
                    AND expirationDate = '${card.expirationDate}'
                    AND cardFlag = '${card.cardFlag}'
                    AND cvv = '${card.cvv}'
                    AND createdAt = '${card.createdAt}';`
        );

        return results;
    }

    // get card by clientId
    async getCardByClientId(id) {
        const [results, metadata] = await db.query(
            `SELECT * FROM cards WHERE clientId = '${id}';`
        );

        return results;
    }

    // delete card by clientId
    async deleteCardByClientId(id) {
        const [results, metadata] = await db.query(
            `DELETE FROM cards WHERE clientId = '${id}';`
        );

        return results;
    }

}

module.exports = Card;