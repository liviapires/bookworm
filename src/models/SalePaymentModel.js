const db = require(`../../config/db`);

class salePayment {
    constructor(paymentMethod, paymentValue, createdAt, updatedAt, saleId) {
        this.paymentMethod = paymentMethod;
        this.paymentValue = paymentValue;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.saleId = saleId;
    }

    async createSalePayment(saleCard) {
        const [results, metadata] = await db.query(
            `INSERT INTO salePayment (paymentMethod, paymentValue, createdAt, updatedAt, saleId)
                VALUES (
                    "${this.paymentMethod}",
                    "${this.paymentValue}",
                    "${this.createdAt}",
                    "${this.updatedAt}",
                    "${this.saleId}"
                );`
        );

        return results;
    }

    async deleteSalePayment(salePaymentId) {
        const [results, metadata] = await db.query(
            `DELETE FROM salePayment WHERE salePaymentId = ${salePaymentId};`
        );

        return results;
    }

    async getAllSalePayments() {
        const [results, metadata] = await db.query(
            `SELECT * FROM salePayment;`
        );

        return results;
    }

    async getSalePaymentById(saleCardId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM salePayment WHERE salePaymentId = ${saleCardId};`
        );

        return results;
    }

    async getSalePaymentBySaleId(saleId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM salePayment WHERE saleId = ${saleId};`
        );

        return results;
    }
}

module.exports = salePayment;