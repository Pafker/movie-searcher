const movieService = require('../services/movieService');

exports.getMovies = function(req, res){
    movieService.getMovies()
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(500).send(`Error ${error}`));
};

exports.addMovie = function(req, res){
    movieService.addMovie(req.body)
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(500).send(`Error ${error}`));
};