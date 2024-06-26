const db = require("../../config/db");

class Address {
    constructor(residenceType, street, number, neighborhood, zipCode, city, state, country, complement, notes, preferred, createdAt, updatedAt, userId) {
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
        this.userId = userId;
    }

    // get all addresses
    async getAllAddresses() {
        const [results, metadata] = await db.query(
            `SELECT * FROM addresses;`
        );

        return results;
    }

    // create address
    async createAddress(address) {
        const [results, metadata] = await db.query(
            `INSERT INTO addresses (residenceType, street, number, neighborhood, zipCode, city, state, country, complement, notes, preferred, createdAt, updatedAt, userId) \
            VALUES (
                '${address.residenceType}',
                '${address.street}',
                '${address.number}',
                '${address.neighborhood}',
                '${address.zipCode}',
                '${address.city}',
                '${address.state}',
                '${address.country}',
                '${address.complement}',
                '${address.notes}',
                '${address.preferred}',
                '${address.createdAt}',
                '${address.updatedAt}',
                '${address.userId}'
            );`
        );

        return results;
    }

    // update address by id
    async updateAddress(address) {
        const [results, metadata] = await db.query(
            `UPDATE addresses SET 
                residenceType = '${address.residenceType}',
                street = '${address.street}',
                number = '${address.number}',
                neighborhood = '${address.neighborhood}',
                zipCode = '${address.zipCode}',
                city = '${address.city}',
                state = '${address.state}',
                country = '${address.country}',
                notes = '${address.notes}',
                preferred = '${address.preferred}',
                updatedAt = '${address.updatedAt}'
            WHERE addressId = '${address.addressId}';`
        );

        return results;
    }

    // delete address by id
    async deleteAddress(addressId) {
        const [results, metadata] = await db.query(
            `DELETE FROM addresses WHERE addressId = '${addressId}';`
        );

        return results;
    }

    // get address by id
    async getAddressById(addressId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM addresses WHERE addressId = '${addressId}';`
        );

        return results;
    }

    // get address by userId
    async getAddressByUserId(userId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM addresses WHERE userId = '${userId}';`
        );

        return results;
    }

    // delete address by userId
    async deleteAddressByUserId(userId) {
        const [results, metadata] = await db.query(
            `DELETE FROM addresses WHERE userId = '${userId}';`
        );

        return results;
    }

    // get address id by zipcode and number
    async getAddressIdByZipCodeAndNumber(zipCode, number) {
        const [results, metadata] = await db.query(
            `SELECT addressId FROM addresses WHERE zipCode = '${zipCode}' AND number = '${number}';`
        );

        return results;
    }

}

module.exports = Address;