const db = require(`../../config/db`);

class saleBooks {
    constructor(quantity, unitValue, createdAt, updatedAt, saleId, bookId) {
        this.quantity = quantity;
        this.unitValue = unitValue;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.saleId = saleId;
        this.bookId = bookId;
    }

    async createSaleBooks(saleBooks) {
        const [results, metadata] = await db.query(
            `INSERT INTO saleBooks (quantity, unitValue, createdAt, updatedAt, saleId, bookId)
                VALUES (
                    '${saleBooks.quantity}',
                    '${saleBooks.unitValue}',
                    '${saleBooks.createdAt}',
                    '${saleBooks.updatedAt}',
                    '${saleBooks.saleId}',
                    '${saleBooks.bookId}'
                );`
        );

        return results;
    }

    async deleteSaleBooks(saleBooksId) {
        const [results, metadata] = await db.query(
            `DELETE FROM saleBooks WHERE saleBooksId = ${saleBooksId};`
        );

        return results;
    }

    async getAllSaleBooks() {
        const [results, metadata] = await db.query(
            `SELECT * FROM saleBooks;`
        );

        return results;
    }

    async getSaleBooksBySaleId(saleId) {
        const [results, metadata] = await db.query(
            `SELECT bookId, quantity, unitValue FROM saleBooks WHERE saleId = ${saleId};`
        );

        return results;
    }

    async deleteSaleBooksBySaleId(saleId) {
        const [results, metadata] = await db.query(
            `DELETE FROM saleBooks WHERE saleId = ${saleId};`
        );

        return results;
    }
}

module.exports = saleBooks;