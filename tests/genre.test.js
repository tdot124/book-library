const { expect } = require('chai');
const request = require('supertest');
const { Genre } = require('../src/models');
const app = require('../src/app');

describe('/genres', () => {
    before(async () => Genre.sequelize.sync());

    beforeEach(async () => {
        await Genre.destroy({ where: {} });
    });

    describe('with no records in the database', () => {
        describe('POST /genres', () => {
          it('creates a new genre in the database', async () => {
            const response = await request(app).post('/genres').send({
              genre: 'Adventure fiction'
            });
            const newGenreRecord = await Genre.findByPk(response.body.id, {
              raw: true,
            });
    
            expect(response.status).to.equal(201);
            expect(response.body.genre).to.equal('Adventure fiction');
            expect(newGenreRecord.genre).to.equal('Adventure fiction');
          });

        it('throws an error if genre is empty', async() => {
          const response = await request(app).post('/genres').send({
            genre: '',
          });
          expect(response.status).to.equal(400);
          });
        });
      });

      describe('with records in the database', () => {
        let genres;
    
        beforeEach(async () => {
          genres = await Promise.all([
            Genre.create({ genre: 'Adventure fiction' }),
            Genre.create({ genre: 'Fantasy fiction' }),
            Genre.create({ genre: 'Fantasy comedy' }),
          ]);
        });

        describe('POST /genres', () => {
            it('errors if genre already exists', async () => {
                const response = await request(app).post('/genres').send({
                    genre: 'Adventure fiction'
                  });
                  expect(response.status).to.equal(400);
            });
        });
    
        describe('GET /genres', () => {
          it('gets all genre records', async () => {
            const response = await request(app).get('/genres');
    
            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(3);
    
            response.body.forEach((genre) => {
              const expected = genres.find((a) => a.id === genre.id);    
              
              expect(genre.genre).to.equal(expected.genre);
            });
          });
        });
    
        describe('GET /genres/:id', () => {
          it('gets genres record by id', async () => {
            const genre = genres[0];
            const response = await request(app).get(`/genres/${genre.id}`);
    
            expect(response.status).to.equal(200);
            expect(response.body.genre).to.equal(genre.genre);
          });
    
          it('returns a 404 if the genre does not exist', async () => {
            const response = await request(app).get('/genres/12345');
    
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The genre could not be found.');
          });
        });
    
        describe('PATCH /genres/:id', () => {
          it('updates genres name by id', async () => {
            const genre = genres[0];
            const response = await request(app)
              .patch(`/genres/${genre.id}`)
              .send({ genre: 'Dave Davidson' });
            const updatedGenreRecord = await Genre.findByPk(genre.id, {
              raw: true,
            });
    
            expect(response.status).to.equal(200);
            expect(updatedGenreRecord.genre).to.equal('Dave Davidson');
          });
    
          it('returns a 404 if the genre does not exist', async () => {
            const response = await request(app)
              .patch('/genres/12345')
              .send({ genre: 'testing' });
    
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The genre could not be found.');
          });
        });
    
        describe('DELETE /genres/:id', () => {
          it('deletes genre record by id', async () => {
            const genre = genres[0];
            const response = await request(app).delete(`/genres/${genre.id}`);
            const deletedGenre = await Genre.findByPk(genre.id, { raw: true });
    
            expect(response.status).to.equal(204);
            expect(deletedGenre).to.equal(null);
          });
    
          it('returns a 404 if the genre does not exist', async () => {
            const response = await request(app).delete('/genres/12345');
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The genre could not be found.');
          });
        });
      });
});