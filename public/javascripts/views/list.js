var listView = Backbone.View.extend({
  template: App.templates.list,
  cardTemplate: App.templates.listCard,
  tagName: "li",
  events: {
    "click #addCardToList": "displayAddCard",
    "click #closeAddCardToList": "closeAddCard",
    "blur form.addCardForm": "closeAddCard",
    "click .deleteItem": "deleteList",
    "click .editImage": "editCardTitle",
    "click .updateCardTitle": "updateCardTitle",
    "click #cancelEditButton": "removeEditCard",
    "submit .editCardTitle": "updateCardTitle",
    "submit .addCardForm": "addCard"
  },
  findIndex: function(id) {
    return this.$el.find('ul li[data-id="' + id +'"]').index();
  },
  editCardTitle: function(e) {
    e.preventDefault();
    e.stopPropagation();
    App.trigger('displayModal');
    $(e.currentTarget).closest('li').find('form').css('display', 'block');
    $(e.currentTarget).siblings('a').css('display', 'none');
  },
  updateCardTitle: function(e) {
    e.preventDefault();
    if ($(e.currentTarget).is('form')) {
      return;
    }
    App.trigger('removeModal');
    var data = {};
    var $f = $(e.currentTarget).closest('form');
    $f.serializeArray().forEach(function(item) {
      data[item.name] = item.value;
    });
    data.listID = +this.$el.find('article').attr('data-id');
    data.cardID = +$(e.currentTarget).closest('li').attr('data-id');
    data.action = $f.attr('action');
    data.method = $f.attr('method');
    if (data.cardTitle.length > 0) {
      App.trigger('updateCardTitle', data)
    }
    $(e.currentTarget).prev('li').find('form').css('display', 'none');
    $(e.currentTarget).prev('li').find('a').css('display', 'block');
    $(e.currentTarget).css('display', 'none');

  },
  removeEditCard: function(e) {
    e.preventDefault();
    App.trigger('removeModal');
    $(e.currentTarget).closest('form').css('display', 'none');
  },
  deleteList: function(e) {
    e.preventDefault();
    var listID = $(e.currentTarget).closest('article.list').attr('data-id');
    App.trigger('deleteList', listID);
  },
  closeAddCard: function(e) {
    e.preventDefault();
    if ($(e.relatedTarget).is('input')) {
      return;
    }
    this.clearForm();
    this.removeForm();
    this.displayAddButton();
  },
  addCard: function(e) {
    e.preventDefault();
    var data = {};
    var $f = this.$('footer form');
    $f.serializeArray().forEach(function(item) {
      data[item.name] = item.value;
    });
    if (data.newCardTitle === "") {
      return;
    }
    data.action = $f.attr('action');
    data.method = $f.attr('method');
    data.listID = +this.$el.find('article').attr('data-id');
    App.trigger('addCardToList', data);
    this.clearForm();
  },
  clearForm: function() {
    this.$('form').find('textarea').val('');
  },
  removeAddButton: function() {
    this.$el.find('footer > a').css('display', 'none');
  },
  displayAddButton: function() {
    this.$el.find('footer > a').css('display', 'block');
  },
  removeForm: function() {
    this.$el.find('footer form').css('display', 'none');
  },
  displayForm: function() {
    this.$el.find('footer form').css('display', 'block');
    this.$el.find('footer form textarea').focus();
  },
  renderSingleCard: function() {
    this.render();
    App.trigger('refreshSortable');
    this.removeAddButton();
    this.displayForm();
  },
  renderCardsInOrder: function(cards, cardOrder) {
    var self = this;
    cardOrder.forEach(function(cardID) {
      var currentCard = _.findWhere(cards, {cardID: +cardID});
      self.$el.find('ul').append(self.cardTemplate(currentCard));
    });
  },
  renderAllCards: function(cards) {
    var self = this;
    cards.forEach(function(card) {
      self.$el.find('ul').append(self.cardTemplate(card));
    });
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    var cards = this.model.get('cards');
    var cardOrder = this.model.get('cardOrder') || [];
    if (cardOrder.length !== 0) {
      this.renderCardsInOrder(cards, cardOrder);
    } else {
      this.renderAllCards(cards);
    }
  },
  displayAddCard: function(e) {
    e.preventDefault();
    this.removeAddButton();
    this.displayForm();
  },
  removeList: function() {
    this.$el.remove();
  },
  refreshSingleCard: function() {
    this.render();
    App.trigger('refreshSortable');
  },
  updateDescription: function() {
    this.render();
    App.trigger('refreshSortable');
  },
  updateComments: function() {
    this.render();
    App.trigger('refreshSortable');
  },
  initialize: function() {
    this.model.view = this;
    this.$el.attr('data-id', this.model.get('id'));
    this.render();
    this.listenTo(this.model, "cardAdded", this.renderSingleCard);
    this.listenTo(this.model, "cardTitleUpdated", this.refreshSingleCard);
    this.listenTo(this.model, "cardDescriptionUpdated", this.updateDescription);
    this.listenTo(this.model, "cardCommentUpdated", this.updateComments);
  }
});