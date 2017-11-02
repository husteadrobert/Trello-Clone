var Lists = Backbone.Collection.extend({
  model: List,
  addCardToList: function(data, listID) {
    this.get(listID).addCard(data);
  },
  removeList: function(id) {
    this.remove(this.get(id));
  },
  updateCardTitle: function(listID, cardID, data) {
    this.get(listID).updateCardTitle(cardID, data);
  },
  updateCardDescription: function(listID, cardID, description) {
    this.get(listID).updateCardDescription(cardID, description);
  },
  updateListOrder: function(listID, order) {
    var currentList = this.get(listID);
    currentList.updateStorage(order);
    currentList.set('cardOrder', order);
  },
  removeCardFromList: function(cardID, listID) {
    var currentList = this.get(listID);
    return currentList.removeCard(cardID);
  },
  insertCardToList: function(card, listID) {
    var currentList = this.get(listID);
    currentList.insertCard(card);
  },
  findAllCards: function() {
    var result = [];
    this.forEach(function(list) {
      result.push(list.get('cards'));
    });
    return _.flatten(result);
  },
  searchCards: function(text) {
    var cards = this.findAllCards();
    var queryString = new RegExp(text, 'gi');
    cards = cards.filter(function(card) {
      return card.title.match(queryString) || card.description.match(queryString);
    });
    return cards;
  },
  addComment: function(listID, cardID) {
    this.get(listID).addComment(cardID);
  },
  getCardData: function(cardID) {
    var allCards = this.findAllCards();
    return _.findWhere(allCards, {cardID: +cardID});
  },
  findListByCardID: function(cardID) {
    var list = this.find(function(list) {
      var cards = list.get('cards');
      return _.findWhere(cards, {cardID: cardID});
    });
    return list.get('id');
  }
});