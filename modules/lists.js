var path = require('path');
var fs = require('fs');
var file_path = path.resolve(path.dirname(__dirname), "data/lists.json");
var _ = require('underscore');


module.exports = {
  __readFile: function() {
    return JSON.parse(fs.readFileSync(file_path, "utf8"));
  },

  get: function() {
    return this.__readFile().data;
  },

  getLastCardID: function() {
    return this.__readFile().lastCardID;
  },

  getLastListID: function() {
    return this.__readFile().lastListID;
  },


  addCardToList: function(listID, data) {
    var lists = this.get();
    var selectedList = _(lists).findWhere({id: +listID});
    selectedList.cards.push(data);
    fs.writeFileSync(file_path, JSON.stringify({
      lastCardID: this.getLastCardID() + 1,
      lastListID: this.getLastListID(),
      data: lists
    }), "utf8");
  },

  addList: function(data) {
    var lists = this.get();
    lists.push(data);
    fs.writeFileSync(file_path, JSON.stringify({
      lastCardID: this.getLastCardID(),
      lastListID: this.getLastListID() + 1,
      data: lists
    }), "utf8");
  },

  deleteList: function(id) {
    var lists = this.get();
    lists = _.reject(lists, function(element) {
      return element.id === id;
    });
    fs.writeFileSync(file_path, JSON.stringify({
      lastCardID: this.getLastCardID(),
      lastListID: this.getLastListID(),
      data: lists
    }), "utf8");
  },

  deleteCard: function(id) {
    var lists = this.get();
    var selectedList;
    for (var i = 0; i < lists.length; i++) {
      if (_(lists[i].cards).findWhere({ cardID: id })) {
        selectedList = lists[i];
        break;
      }
    }
    var cards = selectedList.cards;
    cards = cards.filter(function(card) {
      return card.cardID !== id;
    });
    selectedList.cards = cards;
    fs.writeFileSync(file_path, JSON.stringify({
      lastCardID: this.getLastCardID(),
      lastListID: this.getLastListID(),
      data: lists
    }), "utf8");
  },

  updateCardTitle: function(listID, card, newTitle) {
    var lists = this.get();
    var selectedList = _(lists).findWhere({ id: listID });
    var selectedCard = _(selectedList.cards).findWhere({ cardID: card });
    selectedCard.title = newTitle;
    fs.writeFileSync(file_path, JSON.stringify({
      lastCardID: this.getLastCardID(),
      lastListID: this.getLastListID(),
      data: lists
    }), "utf8");
  },

  updateCardDescription: function(listID, cardID, newDescription) {
    var lists = this.get();
    var selectedList = _(lists).findWhere({ id: listID });
    var selectedCard = _(selectedList.cards).findWhere({ cardID: cardID });
    selectedCard.description = newDescription;
    fs.writeFileSync(file_path, JSON.stringify({
      lastCardID: this.getLastCardID(),
      lastListID: this.getLastListID(),
      data: lists
    }), "utf8");
  },

  incrementCommentCounter: function(listID, cardID) {
    var lists = this.get();
    var selectedList = _(lists).findWhere({ id: listID });
    var selectedCard = _(selectedList.cards).findWhere({ cardID: cardID });
    selectedCard.commentCount += 1;
    fs.writeFileSync(file_path, JSON.stringify({
      lastCardID: this.getLastCardID(),
      lastListID: this.getLastListID(),
      data: lists
    }), "utf8");
  }
};
