const db = require("../../config/db");

class Category {
    constructor(categoryName, createdAt, updatedAt) {
        this.categoryName = categoryName;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // get all categories
    async getAllCategories() {
        const [results, metadata] = await db.query(
            `SELECT * FROM categories;`
        );

        return results;
    }

    // create category
    async createCategory(category) {
        const [results, metadata] = await db.query(
            `INSERT INTO categories (categoryName, createdAt, updatedAt) \
            VALUES (
                '${category.categoryName}',
                '${category.createdAt}',
                '${category.updatedAt}'
            );`
        );

        return results;
    }

    // update category by id
    async updateCategory(category) {
        const [results, metadata] = await db.query(
            `UPDATE categories SET 
                name = '${category.categoryName}', 
                updatedAt = '${category.updatedAt}'
            WHERE categoryId = ${category.categoryId};`
        );

        return results;
    }

    // delete category by id
    async deleteCategory(categoryId) {
        const [results, metadata] = await db.query(
            `DELETE FROM categories WHERE categoryId = ${categoryId};`
        );

        return results;
    }

    // get category by id
    async getCategoryById(categoryId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM categories WHERE categoryId = ${categoryId};`
        );

        return results;
    }

    // get book categories
    async getBookCategories(bookId) {
        const [results, metadata] = await db.query(
            `SELECT categories.categoryName FROM categories
                JOIN bookCategories ON categories.categoryId = bookCategories.categoryId
                WHERE bookCategories.bookId = ${bookId};`
        );

        return results;
    }

    // get category by name
    async getCategoryByName(categoryName) {
        const [results, metadata] = await db.query(
            `SELECT * FROM categories WHERE categoryName = '${categoryName}';`
        );

        return results;
    }

    // get book by category joining pricingGroups
    async getBooksByCategory(categoryName) {
        const [results, metadata] = await db.query(
            `SELECT books.*, pricingGroups.value as price FROM books
                JOIN bookCategories ON books.bookId = bookCategories.bookId
                JOIN categories ON bookCategories.categoryId = categories.categoryId
                LEFT JOIN pricingGroups ON books.pricingGroupId = pricingGroups.pricingGroupId
                WHERE categories.categoryName = '${categoryName}';`
        );

        return results;
    }
}

module.exports = Category;