const typeorm = require('typeorm');
const MovieSchema = require('./src/schemas/movieSchema');
const CommentSchema = require('./src/schemas/commentSchema');

exports.createConnection = function(){
    return typeorm.createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: true,
        entities: [
            MovieSchema,
            CommentSchema
        ],
        synchronize: true,
        logging: ['error']
    });
};