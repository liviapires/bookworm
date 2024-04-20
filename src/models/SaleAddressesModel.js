const db = require(`../../config/db`);

class saleAddress {
    constructor(residenceType, street, number, neighborhood, zipCode, city, state, country, complement, notes, preferred, createdAt, updatedAt) {
        this.residenceType = residenceType;
        this.street = street;
        this.number = number;
        this.neighborhood = neighborhood;
        this.zipCode = zipCode;
        this.city = city;
        this.state = state;
        this.country = country;
        this.complement = complement;
        this.notes = notes;
        this.preferred = preferred;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    async createSaleAddress(saleAddress) {
        const [results, metadata] = await db.query(
            `INSERT INTO saleAddresses (residenceType, street, number, neighborhood, zipCode, city, state, country, complement, notes, preferred, createdAt, updatedAt)
                VALUES (
                    '${saleAddress.residenceType}',
                    '${saleAddress.street}',
                    '${saleAddress.number}',
                    '${saleAddress.neighborhood}',
                    '${saleAddress.zipCode}',
                    '${saleAddress.city}',
                    '${saleAddress.state}',
                    '${saleAddress.country}',
                    '${saleAddress.complement}',
                    '${saleAddress.notes}',
                    '${saleAddress.preferred}',
                    '${saleAddress.createdAt}',
                    '${saleAddress.updatedAt}'
                );`
        );

        return results;
    }

    async updateSaleAddress(saleAddress) {
        const [results, metadata] = await db.query(
            `UPDATE saleAddresses SET 
                zipCode = '${saleAddress.zipCode}',
                street = '${saleAddress.street}',
                number = '${saleAddress.number}',
                complement = '${saleAddress.complement}',
                neighborhood = '${saleAddress.neighborhood}',
                city = '${saleAddress.city}',
                state = '${saleAddress.state}'
                preferred = '${saleAddress.preferred}'
            WHERE userId = ${saleAddress.userId};`
        );

        return results;
    }

    async deleteSaleAddress(userId) {
        const [results, metadata] = await db.query(
            `DELETE FROM saleAddresses WHERE userId = ${userId};`
        );

        return results;
    }

    async getSaleAddress(userId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM saleAddresses WHERE userId = ${userId};`
        );

        return results;
    }

    async getSaleAddressIdByZipCode(zipCode) {
        const [results, metadata] = await db.query(
            `SELECT saleAddresses.saleAddressId FROM saleAddresses WHERE zipCode = '${zipCode}';`
        );

        return results;
    }
}

module.exports = saleAddress;