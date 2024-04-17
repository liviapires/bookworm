const db = require(`../../config/db`);

class sale {
    constructor(status, code, purchaseDate, paymentMethod, totalQuantity, totalValue, createdAt, updatedAt, userId, saleAddressId) {
        this.status = status;
        this.code = code;
        this.purchaseDate = purchaseDate;
        this.paymentMethod = paymentMethod;
        this.totalQuantity = totalQuantity;
        this.totalValue = totalValue;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
        this.saleAddressId = saleAddressId;
    }

    async createSale(sale) {
        const [results, metadata] = await db.query(
            `INSERT INTO sales (status, code, purchaseDate, paymentMethod, totalQuantity, totalValue, createdAt, updatedAt, userId, saleAddressId)
                VALUES (
                    '${sale.status}',
                    '${sale.code}',
                    '${sale.purchaseDate}',
                    '${sale.paymentMethod}',
                    '${sale.totalQuantity}',
                    '${sale.totalValue}',
                    '${sale.createdAt}',
                    '${sale.updatedAt}',
                    '${sale.userId}',
                    '${sale.saleAddressId}'
                );`
        );

        return results;
    }

    async updateSale(sale) {
        const [results, metadata] = await db.query(
            `UPDATE sales SET 
                status = '${sale.status}',
                updatedAt = '${sale.updatedAt}',
            WHERE code = ${sale.code};`
        );

        return results;
    }

    async deleteSale(saleId) {
        const [results, metadata] = await db.query(
            `DELETE FROM sales WHERE saleId = ${saleId};`
        );

        return results;
    }

    async getAllSales() {
        const [results, metadata] = await db.query(
            `SELECT * FROM sales;`
        );

        return results;
    }

    async getSaleById(saleId) {
        const [results, metadata] = await db.query(
            `SELECT sales.*, saleCards.*, saleAddresses.*, users.name as userName FROM sales
                LEFT JOIN saleAddresses ON sales.saleAddressId = saleAddresses.saleAddressId
                LEFT JOIN users ON sales.userId = users.userId
                WHERE sales.saleId = ${saleId};`
        );

        return results;
    }

    async getSaleByCode(code) {
        const [results, metadata] = await db.query(
            `SELECT * FROM sales WHERE code = ${code};`
        );

        return results;
    }

    async getSaleByUserId(userId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM sales 
                LEFT JOIN saleAddresses ON sales.saleAddressId = saleAddresses.saleAddressId
                WHERE sales.userId = ${userId};`
        );

        return results;
    }

    async deleteSaleByUserId(userId) {
        const [results, metadata] = await db.query(
            // delete the sale and all its books
            `DELETE FROM sales WHERE userId = ${userId};`
        );

        return results;
    }
}

module.exports = sale;