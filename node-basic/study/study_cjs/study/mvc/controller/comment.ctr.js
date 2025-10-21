const commentModel = require('../model/comment.model')

exports.main = (req, res) => {

    res.render('index');
}

exports.comments = (req, res) => {
    res.render('comments',{ commentInfos:commentModel.comments()})
}

exports.comment = (req, res) => {
    console.log(req.params);
    console.log(req.params.id);
    const commentId = req.params.id;
    const comments = commentModel.comments();
    console.log();
    res.render('comment', {commentInfo : comments[commentId - 1]});
}