const EntitySchema = require('typeorm').EntitySchema;
const Movie = require('../models/movie').Movie;
const Comment = require('../models/comment').Comment;

module.exports = new EntitySchema({
    name: 'Comment',
    target: Comment,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        author: {
            type: 'varchar'
        },
        content: {
            type: 'varchar'
        }
    },
    relations: {
        movie: {
            target: () => Movie,
            type: 'many-to-one',
            inverseSide: 'comments'
        }
    }
});