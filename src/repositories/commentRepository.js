const typeorm = require('typeorm');
const Comment = require('../models/comment').Comment;

exports.getComments = function(){
    return typeorm.getConnection().getRepository(Comment).find({relations: ['movie']});
};

exports.insertComment = function(comment){
    return typeorm.getConnection().manager.insert(Comment, comment)
};