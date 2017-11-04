var List = Backbone.Model.extend({
  addCard: function(data) {
    this.get('cards').push(data);
    var currentOrder = this.getCurrentOrder();
    currentOrder.push(String(data.cardID));
    this.updateStorage(currentOrder);
    this.set('cardOrder', currentOrder);
    this.trigger('change:cardAdded');
  },
  insertCard: function(data) {
    this.get('cards').push(data);
  },
  getCurrentOrder: function() {
    var id = this.get('id');
    return JSON.parse(localStorage.getItem('list' + id));
  },
  updateCardTitle: function(cardID, data) {
    var cards = this.get('cards');
    var card = _(cards).findWhere({ cardID: cardID });
    card.title = data;
    this.trigger('update');
  },
  updateCardDescription: function(cardID, description) {
    var cards = this.get('cards');
    var card = _(cards).findWhere({ cardID: cardID });
    card.description = description;
    this.trigger('update');
  },
  addComment: function(cardID) {
    var cards = this.get('cards');
    var selectedCard = _.findWhere(cards, {cardID: cardID});
    selectedCard.commentCount = selectedCard.commentCount + 1;
    this.trigger('update');
  },
  synchronizeCards: function(order) {
    var cards = this.get('cards');
    var cardIDs = _.pluck(cards, 'cardID');
    cardIDs.forEach(function(id) {
      if (order.indexOf(String(id)) === -1) {
        order.push(String(id));
      }
    });
    order = order.filter(function(id) {
        return cardIDs.indexOf(+id) !== -1
    });
    return order;
  },
  init: function() {
    var id = this.get('id');
    var order = JSON.parse(localStorage.getItem('list' + id));
    if (order) {
      order = this.synchronizeCards(order);
      this.set('cardOrder', order);
    } else {
      var order = [];
      var cards = this.get('cards');
      cards.forEach(function(card) {
        order.push(String(card.cardID));
      });
    }
    this.updateStorage(order);
  },
  updateStorage: function(order) {
    var id = this.get('id');
    localStorage.setItem('list' + id, JSON.stringify(order));
  },
  removeCard: function(id) {
    var cards = this.get('cards');
    var targetCard = _.findWhere(cards, {cardID: +id});
    var index = cards.indexOf(targetCard);
    var removedCard = cards.splice(index, 1)[0];
    var currentOrder = this.getCurrentOrder();
    currentOrder.splice(currentOrder.indexOf(String(removedCard.cardID)), 1);
    this.updateStorage(currentOrder);
    return removedCard;
  },
  initialize: function() {
    this.init();
  }
});