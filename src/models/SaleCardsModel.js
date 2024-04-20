const db = require(`../../config/db`);

class saleCard {
    constructor(cardNumber, cardName, cardFlag, securityCode, expirationDate, createdAt, updatedAt, saleId) {
        this.cardNumber = cardNumber;
        this.cardName = cardName;
        this.cardFlag = cardFlag;
        this.securityCode = securityCode;
        this.expirationDate = expirationDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.saleId = saleId;
    }

    async createSaleCard(saleCard) {
        const [results, metadata] = await db.query(
            `INSERT INTO saleCards (cardNumber, cardName, cardFlag, securityCode, expirationDate, createdAt, updatedAt, saleId)
                VALUES (
                    '${saleCard.cardNumber}',
                    '${saleCard.cardName}',
                    '${saleCard.cardFlag}',
                    '${saleCard.securityCode}',
                    '${saleCard.expirationDate}',
                    '${saleCard.createdAt}',
                    '${saleCard.updatedAt}',
                    '${saleCard.saleId}'
                );`
        );

        return results;
    }

    async deleteSaleCard(saleCardId) {
        const [results, metadata] = await db.query(
            `DELETE FROM saleCards WHERE saleCardId = ${saleCardId};`
        );

        return results;
    }

    async getAllSaleCards() {
        const [results, metadata] = await db.query(
            `SELECT * FROM saleCards;`
        );

        return results;
    }

    async getSaleCardById(saleCardId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM saleCards WHERE saleCardId = ${saleCardId};`
        );

        return results;
    }

    async getSaleCardBySaleId(saleId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM saleCards WHERE saleId = ${saleId};`
        );

        return results;
    }
}

module.exports = saleCard;