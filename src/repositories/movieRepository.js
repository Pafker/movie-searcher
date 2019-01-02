const typeorm = require('typeorm');
const Movie = require('../models/movie').Movie;

exports.getMovies = function(){
    return typeorm.getConnection().manager.find(Movie);
};

exports.insertMovie = function(movie){
    return typeorm.getConnection().manager.insert(Movie, movie);
};

exports.getMovieByTitle = function(title){
    return typeorm.getConnection().manager.findOne(Movie, {where: {title: title}});
};