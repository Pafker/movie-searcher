const commentService = require('../services/commentService');

exports.getComments = function(req, res){
    commentService.getComments()
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(500).send(`${error}`));
};

exports.addComment = function(req, res){
    commentService.addComment(req.body)
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(500).send(`${error}`));
};