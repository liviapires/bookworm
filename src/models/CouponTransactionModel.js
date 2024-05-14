const db = require("../../config/db");

class CouponTransaction {
    constructor (couponId, transactionId) {
        this.couponId = couponId;
        this.transactionId = transactionId;
    }

    // get all coupon transactions
    async getAllCouponTransactions() {
        const [results, metadata] = await db.query(
            `SELECT * FROM couponTransactions;`
        );

        return results;
    }

    // create coupon transaction
    async createCouponTransaction(couponTransaction) {
        const [results, metadata] = await db.query(
            `INSERT INTO couponTransactions (couponId, transactionId) \
            VALUES (
                '${couponTransaction.couponId}',
                '${couponTransaction.transactionId}'
            );`
        );

        return results;
    }

    async getCouponIdByTransactionId(transactionId) {
        const [results, metadata] = await db.query(
            `SELECT couponId FROM couponTransactions WHERE transactionId = '${transactionId}';`
        );

        return results;
    }
}

module.exports = CouponTransaction;