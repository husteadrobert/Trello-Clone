var express = require('express');
var router = express.Router();
var path = require('path');
var Lists = require(path.resolve(path.dirname(__dirname), "modules/lists"));
var Comments = require(path.resolve(path.dirname(__dirname), "modules/comments"));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/index');
});

router.get('/index', function(req, res, next) {
  res.render('index', {});
});

router.get('/index/:boardID', function(req, res, next) {
  res.render('index', { listsData: Lists.get() });
});

router.get('/loadLists/:boardID', function(req, res, next) {
  var lists = Lists.get();
  res.json(lists);
});

router.get('/index/:boardID/:cardID', function(req, res, next) {
  res.render('index', { listsData: Lists.get() });
});

router.post('/addCardToList/:listID', function(req, res, next) {
  var card = {};
  card.title = req.body.newCardTitle;
  card.cardID = Lists.getLastCardID() + 1;
  card.description = "";
  card.commentCount = 0;
  Lists.addCardToList(req.params.listID, card);
  res.json(card);
});

router.post('/transferCardToList/:listID', function(req, res, next) {
  var card = JSON.parse(req.body.cardData);
  var listID = req.params.listID;
  Lists.addCardToList(listID, card);
  res.send(card);
});

router.post('/addList/:boardID', function(req, res, next) {
  var list = {};
  list.title = req.body.listTitle;
  list.id = Lists.getLastListID() + 1;
  list.cards = [];
  list.boardID = +req.params.boardID;
  list.cardOrder = [];
  Lists.addList(list);
  res.json(list);
});

router.delete('/deleteList/:listID', function(req, res, next) {
  Lists.deleteList(+req.params.listID);
  res.status(200).end();
});

router.delete('/deleteCard/:cardID', function(req, res, next) {
  var id = +req.params.cardID;
  Lists.deleteCard(id);
  res.status(200).end();
});

router.put('/editCardTitle/:cardID', function(req, res, next) {
  var listID = +req.body.listID;
  var card = +req.params.cardID;
  var newTitle = req.body.title;
  Lists.updateCardTitle(listID, card, newTitle)
  res.status(200).end();
});

router.put('/editCardDescription', function(req, res, next) {
  var listID = +req.body.listID;
  var cardID = +req.body.cardID;
  var newDescription = req.body.description;
  Lists.updateCardDescription(listID, cardID, newDescription);
  res.status(200).end();
});


router.get('/loadComments/:cardID', function(req, res, next) {
  var cardID = +req.params.cardID;
  var comments = Comments.find(cardID);
  res.json(comments);
});

router.post('/addComment/:cardID', function(req, res, next) {
  var cardID = +req.params.cardID;
  var message = req.body.message;
  var timestamp = +req.body.timestamp;
  var author = req.body.author;
  var newComment = Comments.addComment(cardID, message, timestamp, author);
  res.json(newComment);
});

router.put('/incrementCommentCounter', function(req, res, next) {
  var cardID = +req.body.cardID;
  var listID = +req.body.listID;
  Lists.incrementCommentCounter(listID, cardID);
  res.status(200).end();
});

module.exports = router;
