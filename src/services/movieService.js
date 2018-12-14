const typeorm = require('typeorm');
const Movie = require('../models/movie').Movie;
const rpn = require('request-promise-native');

exports.getMovies = function(){
    return new Promise((resolve, reject) => {
        typeorm.getConnection().manager.find(Movie)
            .then((movies) => resolve(movies));
    });
};

exports.addMovie = function(movie){
    const omdbPayload = {
        uri: `http://www.omdbapi.com/?t=${movie.title}&apikey=${process.env.OMDB_APIKEY}`,
        method: 'GET'
    };
    return rpn(omdbPayload)
        .then((data) => {
            let movieInfo = JSON.parse(data);
            let movie = new Movie(movieInfo.Title, movieInfo.Released, movieInfo.Runtime, null);
            return movie;
        }).then((movie) => typeorm.getConnection().manager.insert(Movie, movie));
};