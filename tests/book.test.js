const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('books', () => {
    before(async () => Book.sequelize.sync());

    beforeEach(async () => {
        await Book.destroy({ where: {} });
    });

    describe('with no records in the database', () => {
        describe('POST /books', () => {
          it('creates a new book in the database', async () => {
            const response = await request(app).post('/books').send({
              title: 'Shantaram',
              author: 'Gregory David Roberts',
              genre: 'Adventure fiction',
              ISBN: '1-920769-00-5'
            });
            const newBookRecord = await Book.findByPk(response.body.id, {
              raw: true,
            });
    
            expect(response.status).to.equal(201);
            expect(response.body.title).to.equal('Shantaram');
            expect(newBookRecord.title).to.equal('Shantaram');
            expect(newBookRecord.author).to.equal('Gregory David Roberts')
            expect(newBookRecord.genre).to.equal('Adventure fiction');
            expect(newBookRecord.ISBN).to.equal('1-920769-00-5');
          });
        });
      });


      describe('with records in the database', () => {
        let books;
    
        beforeEach(async () => {
          books = await Promise.all([
            Book.create({
                title: 'Shantaram',
                author: 'Gregory David Roberts',
                genre: 'Adventure fiction',
                ISBN: '1-920769-00-5'
            }),
            Book.create({ title: 'Book of Dust', author: 'Philip Pullman', genre: 'Fantasy fiction', ISBN: '9780385604413'}),
            Book.create({ title: 'The Colour Of Magic', author: 'Terry Pratchett', genre: 'Fantasy comedy', ISBN: '978-0-552-16659-1'}),
          ]);
        });
    
        describe('GET /books', () => {
          it('gets all books records', async () => {
            const response = await request(app).get('/books');
    
            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(3);
    
            response.body.forEach((book) => {
              const expected = book.find((a) => a.id === book.id);
    
              expect(book.title).to.equal(expected.title);
              expect(book.author).to.equal(expected.author);
              expect(book.genre).to.equal(expected.genre);
              expect(book.ISBN).to.equal(expected.ISBN);
            });
          });
        });
    
        describe('GET /books/:id', () => {
          it('gets books record by id', async () => {
            const book = books[0];
            const response = await request(app).get(`/books/${book.id}`);
    
            expect(response.status).to.equal(200);
            expect(response.body.title).to.equal(book.title);
            expect(response.body.author).to.equal(book.author);
            expect(response.body.genre).to.equal(book.genre);
            expect(response.body.ISBN).to.equal(book.ISBN);
          });
    
          it('returns a 404 if the book does not exist', async () => {
            const response = await request(app).get('/books/12345');
    
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The book could not be found.');
          });
        });
    
        describe('PATCH /books/:id', () => {
          it('updates books email by id', async () => {
            const book = books[0];
            const response = await request(app)
              .patch(`/books/${book.id}`)
              .send({ genre: 'Horror' });
            const updatedBookRecord = await Book.findByPk(book.id, {
              raw: true,
            });
    
            expect(response.status).to.equal(200);
            expect(updatedBookRecord.genre).to.equal('Horror');
          });
    
          it('returns a 404 if the book does not exist', async () => {
            const response = await request(app)
              .patch('/books/12345')
              .send({ genre: 'testing' });
    
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The book could not be found.');
          });
        });
    
        describe('DELETE /books/:id', () => {
          it('deletes book record by id', async () => {
            const book = books[0];
            const response = await request(app).delete(`/books/${book.id}`);
            const deletedBook = await Book.findByPk(book.id, { raw: true });
    
            expect(response.status).to.equal(204);
            expect(deletedBook).to.equal(null);
          });
    
          it('returns a 404 if the book does not exist', async () => {
            const response = await request(app).delete('/books/12345');
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The book could not be found.');
          });
        });
      });
});