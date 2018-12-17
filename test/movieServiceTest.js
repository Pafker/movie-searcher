let assert = require('assert');
let movieService = require('../src/services/movieService');
const postgres = require('../postgres');
const Movie = require('../src/models/movie').Movie;
const Comment = require('../src/models/comment').Comment;
const typeorm = require('typeorm');
require('dotenv').config();

describe('Movie Service', () => {
    afterEach((done) => {
        setTimeout(() => done(), 500);
    });
    
    describe('#addMovie(): invalid movie payload', () => {
        it('should reject with error: You must provide movie title', () => {
            movieService.addMovie({'invalid': 'movie'})
                .catch((error) => assert.equal(error, 'You must provide movie title'));
        });
    });

    describe('#addMovie(): valid movie payload, movie doesnt exist in omdb database', () => {
        it('should reject with error: Movie not found', () => {
            movieService.addMovie({'title': 'doesnt exist'})
                .catch((error) => assert.equal(error, 'Error: Movie not found!'));
        });
    });

    describe('#addMovie(): valid movie payload, movie does exist in omdb database, movie is already in app database', () => {
        before((done) => {
            movieService.addMovie({'title': 'test'})
                .then(() => setTimeout(() => done(), 200));
        });

        it('should reject with error: Movie already exists in database', () => {
            movieService.addMovie({'title': 'test'})
                .catch((error) => assert.equal(JSON.stringify(error).startsWith('"Test already exists in database,'), true));
        });
        
        after((done) => {
            typeorm.getConnection().manager.delete(Movie, {title: 'Test'})
                .then(() => done())
        });
    });

    describe('#addMovie(): valid movie payload, movie does exist in omdb database, movie doesnt exist in app database', () => {
        it('should insert movie, should return success message with record id', () => {
            movieService.addMovie({'title': 'test'})
                .then((data) => assert.equal(JSON.stringify(data).startsWith('"Created movie with id'), true));
        });
    });

    describe('#getMovies()', () => {
        it('should return movies, including test one', () => {
            movieService.getMovies().then((data) => {
                let movies = JSON.parse(JSON.stringify(data));
                assert.equal(movies.filter((movie) => movie.title == 'Test').length, 1);
            });
        });
    });
    
    after((done) => {
        typeorm.getConnection().manager.delete(Movie, {title: 'Test'})
            .then(() => done());
    });
    
});
