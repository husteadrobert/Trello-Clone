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

  saveFile: function(lastCardID, lastListID, data) {
    fs.writeFileSync(file_path, JSON.stringify({
      lastCardID: lastCardID,
      lastListID: lastListID,
      data: data
    }), "utf8");
  },

  addCardToList: function(listID, data) {
    var lists = this.get();
    var selectedList = _(lists).findWhere({id: +listID});
    selectedList.cards.push(data);
    this.saveFile(this.getLastCardID() + 1, this.getLastListID(), lists);
  },

  addList: function(data) {
    var lists = this.get();
    lists.push(data);
    this.saveFile(this.getLastCardID(), this.getLastListID() + 1, lists);
  },

  deleteList: function(id) {
    var lists = this.get();
    lists = _.reject(lists, function(element) {
      return element.id === id;
    });
    this.saveFile(this.getLastCardID(), this.getLastListID(), lists);
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
    this.saveFile(this.getLastCardID(), this.getLastListID(), lists);
  },

  updateCardTitle: function(listID, card, newTitle) {
    var lists = this.get();
    var selectedList = _(lists).findWhere({ id: listID });
    var selectedCard = _(selectedList.cards).findWhere({ cardID: card });
    selectedCard.title = newTitle;
    this.saveFile(this.getLastCardID(), this.getLastListID(), lists);
  },

  updateCardDescription: function(listID, cardID, newDescription) {
    var lists = this.get();
    var selectedList = _(lists).findWhere({ id: listID });
    var selectedCard = _(selectedList.cards).findWhere({ cardID: cardID });
    selectedCard.description = newDescription;
    this.saveFile(this.getLastCardID(), this.getLastListID(), lists);
  },

  incrementCommentCounter: function(listID, cardID) {
    var lists = this.get();
    var selectedList = _(lists).findWhere({ id: listID });
    var selectedCard = _(selectedList.cards).findWhere({ cardID: cardID });
    selectedCard.commentCount += 1;
    this.saveFile(this.getLastCardID(), this.getLastListID(), lists);
  }
};
