const db = require("../../config/db");

class Book {

    constructor(title, author, year, publisher, edition, isbn, numPages, synopsis, height, width, weight, depth, barcode, active, createdAt, updatedAt, pricingGroupId) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.publisher = publisher;
        this.edition = edition;
        this.isbn = isbn;
        this.numPages = numPages;
        this.synopsis = synopsis;
        this.height = height;
        this.width = width;
        this.weight = weight;
        this.depth = depth;
        this.barcode = barcode;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.pricingGroupId = pricingGroupId;
    }

    // get all books with pricing group
    async getAllBooks() {
        const [results, metadata] = await db.query(
            `SELECT b.*, pg.value as price FROM books b LEFT JOIN pricingGroups pg ON b.pricingGroupId = pg.pricingGroupId;`
        );

        return results;
    }

    // create book
    async createBook(book) {
        const [results, metadata] = await db.query(
            `INSERT INTO books (title, author, year, publisher, edition, isbn, numPages, synopsis, height, width, weight, depth, barcode, active, createdAt, updatedAt, pricingGroupId) \
            VALUES (
                '${book.title}',
                '${book.author}',
                '${book.year}',
                '${book.publisher}',
                '${book.edition}',
                '${book.isbn}',
                '${book.numPages}',
                '${book.synopsis}',
                '${book.height}',
                '${book.width}',
                '${book.weight}',
                '${book.depth}',
                '${book.barcode}',
                '${book.active}',
                '${book.createdAt}',
                '${book.updatedAt}',
                '${book.pricingGroupId}'
            );`
        );

        return results;
    }

    // update book by id
    async updateBook(book) {
        const [results, metadata] = await db.query(
            `UPDATE books SET 
                title = '${book.title}', 
                author = '${book.author}',
                year = '${book.year}', 
                publisher = '${book.publisher}',
                edition = '${book.edition}', 
                isbn = '${book.isbn}', 
                numPages = '${book.numPages}', 
                synopsis = '${book.synopsis}', 
                height = '${book.height}',
                width = '${book.width}',
                depth = '${book.depth}',
                weight = '${book.weight}',
                barcode = '${book.barcode}',
                active = '${book.active}',
                updatedAt = '${book.updatedAt}',
                pricingGroupId = '${book.pricingGroupId}'
            WHERE bookId = ${book.id};`
        );

        return results;
    }

    // delete book by id
    async deleteBook(id) {
        const [results, metadata] = await db.query(
            `DELETE FROM books WHERE bookId = ${id};`
        );

        return results;
    }

    // get book by id
    async getBookById(id) {
        const [results, metadata] = await db.query(
            `SELECT b.*, pg.value as price FROM books b LEFT JOIN pricingGroups pg ON b.pricingGroupId = pg.pricingGroupId WHERE b.bookId = ${id};`
        );

        return results;
    }

    // get book by title
    async getBookByTitle(title) {
        const [results, metadata] = await db.query(
            `SELECT * FROM books WHERE title = '${title}';`
        );

        return results;
    }
}

module.exports = Book;