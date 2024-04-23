const db = require("../../config/db");

class Coupon {
    constructor(couponCode, couponValue, generationDate, expirationDate, active, createdAt, updatedAt) {
        this.couponCode = couponCode;
        this.couponValue = couponValue;
        this.generationDate = generationDate;
        this.expirationDate = expirationDate;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // get all coupons
    async getAllCoupons() {
        const [results, metadata] = await db.query(
            `SELECT * FROM coupons;`
        );

        return results;
    }

    // create coupon
    async createCoupon(coupon) {
        const [results, metadata] = await db.query(
            `INSERT INTO coupons (couponCode, couponValue, generationDate, expirationDate, active, createdAt, updatedAt) \
            VALUES (
                '${coupon.couponCode}',
                '${coupon.couponValue}',
                '${coupon.generationDate}',
                '${coupon.expirationDate}',
                '${coupon.active}',
                '${coupon.createdAt}',
                '${coupon.updatedAt}'
            );`
        );

        return results;
    }

    // update coupon by id
    async updateCoupon(coupon) {
        const [results, metadata] = await db.query(
            `UPDATE coupons SET 
                couponCode = '${coupon.couponCode}', 
                couponValue = '${coupon.couponValue}', 
                generationDate = '${coupon.generationDate}', 
                expirationDate = '${coupon.expirationDate}', 
                active = '${coupon.active}', 
                updatedAt = '${coupon.updatedAt}'
            WHERE couponId = ${coupon.couponId};`
        );

        return results;
    }

    // delete coupon by id
    async deleteCoupon(couponId) {
        const [results, metadata] = await db.query(
            `DELETE FROM coupons WHERE couponId = ${couponId};`
        );

        return results;
    }

    // get coupon by id
    async getCouponById(couponId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM coupons WHERE couponId = ${couponId};`
        );

        return results;
    }

    // get coupon by code
    async getCouponByCode(couponCode) {
        const [results, metadata] = await db.query(
            `SELECT * FROM coupons WHERE couponCode = '${couponCode}';`
        );

        return results;
    }

}

module.exports = Coupon;