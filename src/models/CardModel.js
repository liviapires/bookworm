const db = require('../database');

class Card {
    constructor(cardNumber, cardName, cardFlag, cvv) {
        this.cardNumber = cardNumber;
        this.cardName = cardName;
        this.cardFlag = cardFlag;
        this.cvv = cvv;
    }

    async getAll() {
        const [results, metadata] = await db.query(
            `SELECT * FROM cards;`
        );

        return results;
    }

    async create(params) {
        const [results, metadata] = await db.query(
            `INSERT INTO cards (cardNumber, cardName, cardFlag, cvv) \
                VALUES (${params.cardNumber}, ${params.cardName}, ${params.cardFlag}, ${params.cvv});`
        );

        return results;
    }

    async update(id) {
        const [results, metadata] = await db.query(
            `UPDATE cards SET cardNumber = ?, cardName = ?, cardFlag = ?, cvv = ? \
                WHERE id = ${id};`
        );

        return results;
    }

    async delete(id) {
        const [results, metadata] = await db.query(
            `DELETE FROM cards WHERE id = ${id};`
        );

        return results;
    }

    async getById(id) {
        const [results, metadata] = await db.query(
            `SELECT * FROM cards WHERE id = ${id};`
        );

        return results;
    }

    async getByCardNumber(cardNumber) {
        const [results, metadata] = await db.query(
            `SELECT * FROM cards WHERE cardNumber = ${cardNumber};`
        );

        return results;
    }

}