const db = require("../../config/db");

class SaleTransactionBooks {
    constructor (bookId, transactingQuantity, value, createdAt, updatedAt, transactionId) {
        this.bookId = bookId
        this.transactingQuantity = transactingQuantity;
        this.value = value;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.transactionId = transactionId;
    }

    // get all transactions
    async getAllSaleTransactionBooks() {
        const [results, metadata] = await db.query(
            `SELECT * FROM saleTransactionBooks;`
        );

        return results;
    }

    // create transaction
    async createSaleTransactionBooks(saleTransactionBooks) {
        const [results, metadata] = await db.query(
            `INSERT INTO saleTransactionBooks (bookId, transactingQuantity, value, createdAt, updatedAt, transactionId) \
            VALUES (
                '${saleTransactionBooks.bookId}',
                '${saleTransactionBooks.transactingQuantity}',
                '${saleTransactionBooks.value}',
                '${saleTransactionBooks.createdAt}',
                '${saleTransactionBooks.updatedAt}',
                '${saleTransactionBooks.transactionId}'
            );`
        );

        return results;
    }

    // delete transaction by id
    async deleteSaleTransactionBooks(id) {
        const [results, metadata] = await db.query(
            `DELETE FROM saleTransactionBooks WHERE saleTransactionBooksId = ${id};`
        );

        return results;
    }

    // get transaction by id
    async getSaleTransactionBooksById(id) {
        const [results, metadata] = await db.query(
            `SELECT * FROM saleTransactionBooks WHERE saleTransactionBooksId = ${id};`
        );

        return results;
    }

    // get transaction by transaction id
    async getSaleTransactionBooksByTransactionId(transactionId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM saleTransactionBooks WHERE transactionId = ${transactionId};`
        );

        return results;
    }

}

module.exports = SaleTransactionBooks;