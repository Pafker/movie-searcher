let assert = require('assert');
let commentService = require('../src/services/commentService');
const postgres = require('../postgres');
const Movie = require('../src/models/movie').Movie;
const Comment = require('../src/models/comment').Comment;
const typeorm = require('typeorm');
require('dotenv').config();

describe('Comment Service', () => {
    before((done) => {
        postgres.createConnection()
            .then(() => typeorm.getConnection().manager.insert(Movie, new Movie('test movie', '2018', '100 min')))
            .then(() => done());
    });

    afterEach((done) => {
        setTimeout(() => done(), 500);
    });
    
    describe('#addComment(): invalid comment payload', () => {
        it('should reject with error: You must provide valid comment', () => {
            commentService.addComment({'invalid': 'comment'})
                .catch((error) => assert.equal(error, 'You must provide valid comment'));
        });
    });

    describe('#addComment(): valid comment, movie not found', () => {
        it('should reject with error: Error: Movie invalid title doesnt exist in database', () => {
            commentService.addComment({'author': 'Pafker', 'content': 'Test comment', 'movie': 'invalid title'})
                .catch((error) => assert.equal(error.message, 'Movie invalid title doesnt exist in database'));
        });
    });

    describe('#addComment(): valid comment, movie found', () => {
        it('should insert comment, should return success message with record id', () => {
            commentService.addComment({'author': 'Pafker', 'content': 'Test comment', 'movie': 'test movie'})
                .then((result) => assert.equal(result.startsWith('Created comment to test movie with id'), true));
        });
    });

    describe('#getComments()', () => {
        it('should return comments, including test one', () => {
            commentService.getComments().then((data) => {
                let comments = JSON.parse(JSON.stringify(data));
                assert.equal(comments.filter((comment) => comment.movie.title == 'test movie').length, 1);
            });
        });
    });

    after((done) => {
        typeorm.getConnection().manager.delete(Comment, {content: 'Test comment'})
            .then(() => typeorm.getConnection().manager.delete(Movie, {title: 'test movie'}))
            .then(() => done());
    });
    
});
