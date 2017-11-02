var path = require('path');
var fs = require('fs');
var file_path = path.resolve(path.dirname(__dirname), "data/comments.json");
var _ = require('underscore');


module.exports = {
  __readFile: function() {
    return JSON.parse(fs.readFileSync(file_path, "utf8"));
  },

  get: function() {
    return this.__readFile().data;
  },

  getLastCommentID: function() {
    return this.__readFile().lastCommentID;
  },

  find: function(cardID) {
    var comments = this.get();
    comments = comments.filter(function(comment) {
      return comment.cardID === cardID;
    });
    comments.sort(function(a, b) {
      return a - b;
    });
    return comments;
  },

  addComment: function(cardID, message, timestamp, author) {
    var comments = this.get();
    var newComment = {};
    newComment.commentID = this.getLastCommentID() + 1;
    newComment.boardID = 1;
    newComment.cardID = cardID;
    newComment.timestamp = timestamp;
    newComment.author = author;
    newComment.message = message;
    comments.push(newComment);
    fs.writeFileSync(file_path, JSON.stringify({
      lastCommentID: this.getLastCommentID() + 1,
      data: comments
    }), "utf8");
    return newComment;
  }

};
