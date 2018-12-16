const EntitySchema = require('typeorm').EntitySchema;
const Movie = require('../models/movie').Movie;
const Comment = require('../models/comment').Comment;

module.exports = new EntitySchema({
    name: 'Movie',
    target: Movie,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        title: {
            type: 'varchar',
            nullable: false,
            unique: true
        },
        released: {
            type: 'varchar',
            nullable: false
        },
        runtime: {
            type: 'varchar',
            nullable: false
        }
    },
    relations: {
        comments: {
            target: () => Comment,
            type: 'one-to-many',
            joinTable: true,
            inverseSide: 'movie'
        }
    }
});