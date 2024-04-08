const db = require(`../../config/db`);

class saleCards {
    constructor(createdAt, updatedAt, saleId, cardId) {
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.saleId = saleId;
        this.cardId = cardId;
    }

    async createSaleCards(saleCards) {
        const [results, metadata] = await db.query(
            `INSERT INTO saleCards (createdAt, updatedAt, saleId, cardId)
                VALUES (
                    '${saleCards.createdAt}',
                    '${saleCards.updatedAt}',
                    '${saleCards.saleId}',
                    '${saleCards.cardId}'
                );`
        );

        return results;
    }

    async deleteSaleCards(saleCardsId) {
        const [results, metadata] = await db.query(
            `DELETE FROM saleCards WHERE saleCardsId = ${saleCardsId};`
        );

        return results;
    }
}

module.exports = saleCards;