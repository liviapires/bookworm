const db = require("../../config/db");

class Transaction {
    constructor (transactionCode, transactionType, status, requestDate, reason, explanation, transactionValue, createdAt, updatedAt, saleId) {
        this.transactionCode = transactionCode;
        this.transactionType = transactionType;
        this.status = status;
        this.requestDate = requestDate;
        this.reason = reason;
        this.explanation = explanation;
        this.transactionValue = transactionValue;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.saleId = saleId;
    }

    // get all transactions
    async getAllTransactions() {
        const [results, metadata] = await db.query(
            `SELECT * FROM transactions;`
        );

        return results;
    }

    // create transaction
    async createTransaction(transaction) {
        const [results, metadata] = await db.query(
            `INSERT INTO transactions (transactionCode, transactionType, status, requestDate, reason, explanation, transactionValue, createdAt, updatedAt, saleId) \
            VALUES (
                '${transaction.transactionCode}',
                '${transaction.transactionType}',
                '${transaction.status}',
                '${transaction.requestDate}',
                '${transaction.reason}',
                '${transaction.explanation}',
                '${transaction.transactionValue}',
                '${transaction.createdAt}',
                '${transaction.updatedAt}',
                '${transaction.saleId}'
            );`
        );

        return results;
    }

    // update transaction by id
    async updateTransaction(transaction) {
        const [results, metadata] = await db.query(
            `UPDATE transactions SET 
                status = '${transaction.status}',
                updatedAt = '${transaction.updatedAt}',
                couponId = '${transaction.couponId}'
            WHERE id = ${transaction.id};`
        );

        return results;
    }

    // delete transaction by id
    async deleteTransaction(id) {
        const [results, metadata] = await db.query(
            `DELETE FROM transactions WHERE id = ${id};`
        );

        return results;
    }

    // get transaction by id
    async getTransactionById(id) {
        const [results, metadata] = await db.query(
            `SELECT * FROM transactions WHERE id = ${id};`
        );

        return results;
    }

    // get transaction by sale id
    async getTransactionBySaleId(saleId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM transactions WHERE saleId = ${saleId};`
        );

        return results;
    }

    // get transaction by code
    async getTransactionByCode(transactionCode) {
        const [results, metadata] = await db.query(
            `SELECT * FROM transactions WHERE transactionCode = '${transactionCode}';`
        );

        return results;
    }

    // get transaction by transaction type
    async getTransactionByType(transactionType) {
        const [results, metadata] = await db.query(
            `SELECT * FROM transactions WHERE transactionType = '${transactionType}';`
        );

        return results;
    }
}

module.exports = Transaction;