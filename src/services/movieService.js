const movieRepository = require('../repositories/movieRepository');
const Movie = require('../models/movie').Movie;
const rpn = require('request-promise-native');

exports.getMovies = function(){
    return new Promise((resolve, reject) => {
        movieRepository.getMovies()
            .then((movies) => resolve(movies));
    });
};

exports.addMovie = function(movie){
    return new Promise((resolve, reject) => {
        if (validateMovie(movie)) reject('You must provide movie title');
        resolve(movie.title);
    })
    .then((title) => {
        return rpn(getOmdbPayload(title))
            .then((movieInfo) => {
                if (movieInfo.Error) throw new Error(movieInfo.Error);
                return new Movie(movieInfo.Title, movieInfo.Released, movieInfo.Runtime, null);
            })
            .then((movie) => checkIfMovieUnique(movie))
            .then((movie) => movieRepository.insertMovie(movie))
                .then((id) => `Created movie with id: ${id.raw[0].id}`);
    });
};

function validateMovie(movie){
    return !movie.title;
}

function getOmdbPayload(movieTitle){
    return omdbPayload = {
        uri: `http://www.omdbapi.com/?t=${movieTitle}&apikey=${process.env.OMDB_APIKEY}`,
        method: 'GET',
        json: true
    };
}

function checkIfMovieUnique(movie){
    return new Promise((resolve, reject) => {
        movieRepository.getMovieByTitle(movie.title)
            .then((data) => {
                if (data) reject(`${data.title} already exists in database, id: ${data.id}`);
                resolve(movie);
            });
    });
}