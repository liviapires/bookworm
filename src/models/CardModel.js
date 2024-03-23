const db = require("../../config/db");

class Card {
    constructor(cardNumber, cardName, cardFlag, securityCode, expirationDate, preferred, createdAt, updatedAt, userId) {
        this.cardNumber = cardNumber;
        this.cardName = cardName;
        this.cardFlag = cardFlag;
        this.securityCode = securityCode;
        this.expirationDate = expirationDate;
        this.preferred = preferred;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
    }

    // get all cards
    async getAllCards() {
        const [results, metadata] = await db.query(
            `SELECT * FROM creditCards;`
        );

        return results;
    }

    // create a new card
    async createCard(card) {
        const [results, metadata] = await db.query(
            `INSERT INTO creditCards (cardNumber, cardName, cardFlag, securityCode, expirationDate, preferred, createdAt, updatedAt, userId) \
                VALUES (
                    '${card.cardNumber}',
                    '${card.cardName}',
                    '${card.cardFlag}',
                    '${card.securityCode}',
                    '${card.expirationDate}',
                    '${card.preferred}',
                    '${card.createdAt}',
                    '${card.updatedAt}',
                    '${card.userId}'
                );`
        );

        return results;
    }

    // delete a card
    async deleteCard(cardId) {
        const [results, metadata] = await db.query(
            `DELETE FROM creditCards WHERE cardId = '${cardId}';`
        );

        return results;
    }

    // get card by id
    async getCardById(cardId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM creditCards WHERE cardId = '${cardId}';`
        );

        return results;
    }

    // get card id
    async getCardId(card) {
        const [results, metadata] = await db.query(
            `SELECT cardId FROM creditCards 
                WHERE cardNumber = '${card.cardNumber}' 
                    AND cardName = '${card.cardName}' 
                    AND expirationDate = '${card.expirationDate}'
                    AND cardFlag = '${card.cardFlag}'
                    AND cvv = '${card.cvv}'
                    AND createdAt = '${card.createdAt}';`
        );

        return results;
    }

    // get card by userId
    async getCardByUserId(userId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM creditCards WHERE userId = '${userId}';`
        );

        return results;
    }

    // delete card by userId
    async deleteCardByUserId(userId) {
        const [results, metadata] = await db.query(
            `DELETE FROM creditCards WHERE userId = '${userId}';`
        );

        return results;
    }

}

module.exports = Card;