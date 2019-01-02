const commentRepository = require('../repositories/commentRepository');
const movieRepository = require('../repositories/movieRepository');

exports.getComments = function(){
    return new Promise((resolve, reject) => {
        commentRepository.getComments()
            .then((comments) => filterComments(comments))
            .then((filteredComments) => resolve(filteredComments));
    });
};

exports.addComment = function(comment){
    return new Promise((resolve, reject) => {
        if (validateComment(comment)) reject('You must provide valid comment');
        resolve(comment);
    }).then((comment) => {
        return movieRepository.getMovieByTitle(comment.movie)
            .then((data) => {
                if (!data) throw new Error(`Movie ${comment.movie} doesnt exist in database`);
                return data;
            });
    }).then((movie) => {
        comment.movie = movie.id;
        return commentRepository.insertComment(comment)
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