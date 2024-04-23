const db = require(`../../config/db`);

class sale {
    constructor(code, status, purchaseDate, totalQuantity, totalValue, shipping, withoutShipping, createdAt, updatedAt, userId, saleAddressId) {
        this.code = code;
        this.status = status;
        this.purchaseDate = purchaseDate;
        this.totalQuantity = totalQuantity;
        this.totalValue = totalValue;
        this.shipping = shipping;
        this.withoutShipping = withoutShipping;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
        this.saleAddressId = saleAddressId;
    }

    async createSale(sale) {
        const [results, metadata] = await db.query(
            `INSERT INTO sales (code, status, purchaseDate, totalQuantity, totalValue, shipping, withoutShipping, createdAt, updatedAt, userId, saleAddressId)
                VALUES (
                    "${sale.code}",
                    "${sale.status}",
                    "${sale.purchaseDate}",
                    "${sale.totalQuantity}",
                    "${sale.totalValue}",
                    "${sale.shipping}",
                    "${sale.withoutShipping}",
                    "${sale.createdAt}",
                    "${sale.updatedAt}",
                    "${sale.userId}",
                    "${sale.saleAddressId}"
                );`
        );

        return results;
    }

    async updateSaleStatus(sale) {
        const [results, metadata] = await db.query(
            `UPDATE sales SET 
                status = '${sale.status}',
                updatedAt = '${sale.updatedAt}'
            WHERE saleId = ${sale.saleId};`
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
            `SELECT sales.*, saleAddresses.*, users.name as userName FROM sales
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