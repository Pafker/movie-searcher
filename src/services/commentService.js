const typeorm = require('typeorm');
const Comment = require('../models/comment').Comment;
const Movie = require('../models/movie').Movie;

exports.getComments = function(){
    return new Promise((resolve, reject) => {
        typeorm.getConnection().getRepository(Comment).find({relations: ['movie']})
            .then((comments) => filterComments(comments))
            .then((filteredComments) => resolve(filteredComments));
    });
};

exports.addComment = function(comment){
    return new Promise((resolve, reject) => {
        if (validateComment(comment)) reject('You must provide valid comment');
        resolve(comment);
    }).then((comment) => {
        return typeorm.getConnection().getRepository(Movie).findOneOrFail({where: {title: comment.movie}});
    }).then((movie) => {
        comment.movie = movie.id;
        return typeorm.getConnection().manager.insert(Comment, comment)
            .then((id) => `Created comment to ${movie.title} with id: ${id.raw[0].id}`);
    });
};

function filterComments(comments){
    comments.forEach((comment) => {
        delete comment.movie.released;
        delete comment.movie.runtime;
        delete comment.movie.id;
    });
    return comments;
}

function validateComment(comment){
    return !comment.author && !comment.content && !comment.movie;
}