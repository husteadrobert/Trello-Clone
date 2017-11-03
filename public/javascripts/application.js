var App = {
  templates: JST,
  $el: $('#content'),
  needsInit: true,
  currentBoardID: 1,
  currentBoardTitle: "Board 1",
  boardsView: function() {
    this.needsInit = true;
    this.$el.html(App.templates.boardView());
    router.navigate('/index');
    $('#boardView a').on('click', function(e) {
      e.preventDefault();
      $('#boardView').remove();
      App.listsView();
      router.navigate('/index/' + App.currentBoardID);
    });
  },
  init: function() {
    App.$el.append(App.templates.header({boardTitle: App.currentBoardTitle}));
    App.renderLists();
    App.$el.find('#listsDisplay').append(App.templates.addList({boardID: App.currentBoardID}));
    App.makeCardsSortable();
    App.makeListsSortable();
    App.bindEvents();
  },
  listsView: function(boardID, cardID) {
    if (this.needsInit) {
      $.ajax({
        url: "/loadLists/" + App.currentBoardID,
        method: "GET",
        success: function(response) {
          $('#boardView').remove();
          App.lists = new Lists(response);
          App.init();
          if (cardID) {
            var listID = App.lists.findListByCardID(+cardID);
            App.detailedCardView(cardID, listID);
          }
        }
      });
    } else if (cardID) {
        var listID = App.lists.findListByCardID(+cardID);
        App.detailedCardView(cardID, listID);
        router.navigate('/index/' + this.currentBoardID + '/' + cardID);
    } else {
      this.$el.siblings('#singleCard').remove();
      this.$el.siblings('#modalLayer').remove();
      router.navigate('/index/' + this.currentBoardID);
    }
  },
  makeCardsSortable: function() {
    $('article.list > ul').sortable({
       connectWith: "article.list > ul",
       placeholder: "placeholderHighlight",
       forcePlaceholderSize: true,
       receive: function(event, ui) {
        var cardID = $(ui.item).attr('data-id');
        var originalListID = $(ui.sender).closest('article').attr('data-id');
        var targetListID = $(ui.item).closest('article').attr('data-id');
        App.transferCard(cardID, originalListID, targetListID);
      },
      update: function(event, ui) {
        var order = $(this).sortable("toArray", {attribute: 'data-id'});
        var listID = $(ui.item).closest('article').attr('data-id');
        App.lists.updateListsCardOrder(listID, order);
      }
    });
    
  },
  makeListsSortable: function() {
    $('#listsDisplay').sortable({
      items: "> li:not(:last-of-type)",
      connectWith: "#listsDisplay > ul",
      placeholder: "placeholderHighlight",
      forcePlaceholderSize: true,
      update: function(event, ui) {
        var order = $(this).sortable("toArray", {attribute: 'data-id'});
        App.updateStorage(order);
      }
    });
  },
  transferCard(cardID, originalListID, targetListID) {
    var self = this;
    $.ajax({
      url: "/deleteCard/" + cardID,
      type: "delete",
      data: { cardID: cardID },
      success: function(response) {
        var card = self.lists.removeCardFromList(cardID, originalListID);
        $.ajax({
          url: "/transferCardToList/" + targetListID,
          type: "post",
          data: { cardData: JSON.stringify(card) },
          success: function(response) {
            self.lists.insertCardToList(card, targetListID);
          }
        });
      }
    });
  },
  readStorage: function() {
    return JSON.parse(localStorage.getItem('allLists')) || [];
  },
  renderSingleList: function(item) {
    var singleList = new listView({
      model: item
    });
    singleList.$el.appendTo(App.$el.find('#listsDisplay'));
  },
  renderLists: function() {
    var self = this;
    var order = this.readStorage();
    if (order.length !== 0) {
      order.forEach(function(listID) {
        var selectedList = self.lists.get(+listID);
        self.renderSingleList(selectedList);
      });
    } else {
      this.lists.each(this.renderSingleList);
      this.lists.each(function(list) {
        order.push(String(list.get('id')));
      });
      this.updateStorage(order);
    }
  },
  updateStorage: function(order) {
    localStorage.setItem('allLists', JSON.stringify(order));
  },
  addCardToList: function(data) {
    var self = this;
    $.ajax({
      url: data.action,
      type: data.method,
      data: { newCardTitle: data.newCardTitle },
      success: function(response) {
        self.lists.addCardToList(response, data.listID);
      }
    });
  },
  appendNewList: function(response) {
    var newListModel = new List(response);
    var newListView = new listView({
      model: newListModel
    });
    this.lists.add(newListModel);
    var order = this.readStorage();
    order.push(String(newListModel.get('id')));
    this.updateStorage(order);
    var currentLength = $('#listsDisplay').find('li > article.list').length;
    var lastList = $('#listsDisplay').find('li > article.list').eq(currentLength - 2).closest('li');
    if (currentLength === 1) {
      lastList.before(newListView.$el);
    } else {
      lastList.after(newListView.$el);
    }
    this.makeCardsSortable();
  },
  addList: function(data) {
    this.removeNewListForm();
    var self = this;
    $.ajax({
      url: data.action,
      type: data.method,
      data: { listTitle: data.newListTitle },
      success: function(response) {
        self.appendNewList(response);
      }
    });
  },
  displayNewListForm: function() {
    $('article.addList form').css('display', 'block');
    $('article.addList form textarea').focus();
    $('article.addList h3').css('display', 'none');
  },
  removeNewListForm: function() {
    $('article.addList form textarea').val('');
    $('article.addList form').css('display', 'none');
    $('article.addList h3').css('display', 'inline');
  },
  removeSingleList(id) {
    this.lists.removeList(id);
    var order = this.readStorage();
    order.splice(order.indexOf(String(id)), 1);
    this.updateStorage(order);
    localStorage.removeItem('list' + id);
  },
  deleteList: function(id) {
    var self = this;
    $.ajax({
      url: "/deleteList/" + id,
      type: "DELETE",
      success: function(response) {
        self.removeSingleList(id);
      }
    });
  },
  displayModal: function() {
    $('main').append(this.templates.modal());
  },
  removeModal: function() {
    $('#modalLayer').remove();
    router.navigate('/index/' + this.currentBoardID);
  },
  updateCardTitle: function(data) {
    var self = this;
    $.ajax({
      url: data.action,
      method: data.method,
      data: {title: data.cardTitle, listID: data.listID },
      success: function(response) {
        self.lists.updateCardTitle(data.listID, data.cardID, data.cardTitle);
      }
    });
  },
  renderSearchResults: function(cards) {
    $('#searchResults').css('display', 'block');
    $('#searchResults').html(this.templates.searchResults({cards: cards}));
  },
  removeSearchResults: function() {
    $('#searchResults').css('display', 'none');
  },
  searchCards(text) {
    var result = this.lists.searchCards(text);
    if(result.length >= 1) {
      this.renderSearchResults(result);
    } else {
      this.removeSearchResults();
    }
  },
  detailedCardView: function(cardID, listID) {
    this.displayModal();
    var cardData = App.lists.getCardData(cardID);
    cardData.listID = listID;
    cardData.listTitle = App.lists.get(listID).get('title');
    var currentCard = new singleCard(cardData);
    var currentView = new singleCardView({
      model: currentCard
    });
    this.currentCard = currentCard
    this.currentView = currentView;
    $('main').append(currentView.$el);
    var self = this;
    $.ajax({
      url: "/loadComments/" + cardID,
      method: "GET",
      success: function(response) {
        self.currentCard.set('comments', response);
      }
    });
    router.navigate('index/' + this.currentBoardID +'/' + cardID);
  },
  addComment: function(data) {
    var self = this;
    $.ajax({
      url: data.action,
      method: data.method,
      data: {message: data.message, timestamp: data.timestamp, author: data.author},
      success: function(response) {
        var comments = self.currentCard.get('comments');
        comments.push(response);
        self.currentCard.trigger('change:comments');
        $.ajax({
          url: "/incrementCommentCounter",
          method: "PUT",
          data: {cardID: data.cardID, listID: data.listID},
          success: function(response) {
            self.lists.addComment(data.listID, data.cardID);
          }
        });
      }
    });
  },
  updateCardDescription: function(data) {
    var self = this;
    $.ajax({
      url: data.action,
      method: data.method,
      data: {description: data.description, listID: data.listID, cardID: data.cardID},
      success: function(response) {
        self.lists.updateCardDescription(data.listID, data.cardID, data.description);
        self.currentCard.set('description', data.description);
      }
    });
  },
  bindEvents: function() {
    this.needsInit = false;
    _.extend(this, Backbone.Events);
    this.on("addCardToList", this.addCardToList.bind(this));
    this.on("deleteList", this.deleteList.bind(this));
    this.on('displayModal', this.displayModal.bind(this));
    this.on('removeModal', this.removeModal.bind(this));
    this.on('updateCardTitle', this.updateCardTitle.bind(this));
    this.on('refreshSortable', this.makeCardsSortable.bind(this));
    this.on('updateCardDescription', this.updateCardDescription.bind(this));
    this.on('addComment', this.addComment.bind(this));
    $('#searchBox').attr('readonly', false).attr('placeholder', 'Search cards...').css('background', 'white');
    $('#searchBox').on('keyup', function(event) {
      if(event.keyCode === 27) {
        $(this).val("");
      }
      var searchText = $(this).val();
      if(searchText === "") {
        App.removeSearchResults();
      } else {
        App.searchCards(searchText);
      }
    });
    $('#content').on('click','li.card a', function(e) {
      e.preventDefault();
      var cardID = $(e.currentTarget).closest('li').attr('data-id');
      var listID = $(e.currentTarget).closest('article').attr('data-id');
      App.detailedCardView(cardID, listID);
    });
    $('#searchResults').on('click', 'li.card', function(e) {
      e.preventDefault();
      var cardID = $(e.currentTarget).closest('li').attr('data-id');
      var listID = App.lists.findListByCardID(+cardID);
      App.detailedCardView(cardID, listID);
    });
    $('article.addList').on('click', function(e) {
      e.preventDefault();
      this.displayNewListForm();
    }.bind(this));
    $('#closeAddList').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation()
      this.removeNewListForm();
    }.bind(this));
    $('#newListForm input').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var data = {};
      var $f = $('#newListForm');
      $f.serializeArray().forEach(function(item) {
        data[item.name] = item.value;
      });
      if (data.newListTitle === "") {
        return;
      }
      data.action = $f.attr('action');
      data.method = $f.attr('method');
      data.boardID = $f.closest('form').attr('data-boardID');
      this.addList(data);
    }.bind(this));
    $('#newListForm textarea').on('blur', function(e) {
      if ($(e.relatedTarget).is('input')) {
        return;
      }
      this.removeNewListForm();
    }.bind(this));
  }
};


Handlebars.registerHelper('formatTime', function(timestamp) {
  var now = Date.now();
  var msPerDay = 1000 * 60 * 60 * 24;
  var difference = (now - timestamp) / msPerDay;
  if (difference >= 2) {
    return Math.floor(difference) + " days ago";
  } else if (difference >= 1) {
    return "1 day ago";
  } else {
    var hours = Math.floor(difference * 24);
    if (hours >= 2) {
      return hours + " hours ago";
    } else if (hours === 1) {
      return "1 hour ago";
    } else {
      return "New";
    }
  }
});

