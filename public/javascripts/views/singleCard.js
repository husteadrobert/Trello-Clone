var singleCardView = Backbone.View.extend({
  template: App.templates.detailedView,
  commentsTemplate: App.templates.singleComment,
  attributes: {
    id: "singleCard"
  },
  events: {
    "click #removeModal": "removeView",
    "click #editDescription": "showEditDescription",
    "click #closeEditCard": "closeEditCard",
    "submit form.editCardForm": "editDescription",
    "click #cardTitle > h2": "editTitle",
    "blur textarea[name='cardTitle']": "submitTitle",
    "submit form.addCommentForm": "addComment"
  },
  submitTitle: function(e) {
    e.preventDefault();
    var data = {};
    var $textarea = this.$el.find('textarea[name="cardTitle"]');
    var $h2 = this.$el.find('#cardTitle > h2');
    if ($textarea.val() === "" || $textarea.val() === this.model.get('title')) {
      $textarea.hide()
      $h2.show();
      return;
    }
    var $f = $textarea.closest('form');
    data.cardTitle = $textarea.val();
    data.listID = +this.model.get('listID');
    data.cardID = this.model.get('cardID');
    data.action = $f.attr('action');
    data.method = $f.attr('method');
    $textarea.hide();
    $h2.css('display', 'inline-block').text(data.cardTitle);
    App.trigger("updateCardTitle", data);
  },
  addComment: function(e) {
    e.preventDefault();
    var data = {};
    var $textarea = this.$el.find('form.addCommentForm textarea');
    var $f = $textarea.closest('form');
    data.message = $textarea.val();
    $textarea.val("");
    if( data.message === "") {
      return;
    }
    data.listID = +this.model.get('listID');
    data.cardID = this.model.get('cardID');
    data.action = $f.attr('action');
    data.method = $f.attr('method');
    data.timestamp = Date.now();
    data.author = "Random User";
    App.trigger("addComment", data);
  },
  editTitle: function(e) {
    e.preventDefault();
    $(e.currentTarget).hide();
    var $textarea = this.$el.find('textarea[name="cardTitle"]');
    $textarea.show();
    var val = $textarea.val();
    $textarea.focus().val('').val(val);
  },
  editDescription: function(e) {
    e.preventDefault();
    var data = {};
    var $p = this.$el.find('p.description')
    var $f = this.$el.find('form.editCardForm')
    var $textarea = $f.find('textarea');
    if ($textarea.val() === "" || $textarea.val() === this.model.get('description')) {
      $p.show();
      $f.hide();
      return;
    }
    data.description = $textarea.val();
    data.listID = +this.model.get('listID');
    data.cardID = this.model.get('cardID');
    data.action = $f.attr('action');
    data.method = $f.attr('method');
    $p.css('display', 'block').text(data.description);
    $f.hide();
    App.trigger("updateCardDescription", data);
  },
  closeEditCard: function(e) {
    e.preventDefault();
    var $p = this.$el.find('p.description')
    var $f = this.$el.find('form.editCardForm')
    $p.show();
    $f.hide();
  },
  showEditDescription: function(e) {
    e.preventDefault();
    var $p = this.$el.find('p.description')
    var $f = this.$el.find('form.editCardForm')
    var val = this.model.get('description');
    $p.hide();
    $f.show();
    $f.find('textarea').focus().val('').val(val);
  },
  removeView: function(e) {
    e.preventDefault();
    this.remove();
    App.trigger('removeModal');
  },
  renderComments: function() {
    var self = this;
    this.$el.find('#cardActivity > ul > li').remove();
    var comments = this.model.get('comments');
    if (comments.length === 0) {
      self.$el.find('#cardActivity > ul').append('<p>There are no Comments.</p>');
    } else {
      self.$el.find('#cardActivity > ul > *').remove();
      comments.forEach(function(comment) {
        self.$el.find('#cardActivity > ul').append(self.commentsTemplate(comment));
      });
    }
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    if (this.model.get('comments')) {
      this.renderComments();
    }
  },
  initialize: function() {
    this.$el.attr('data-cardID', this.model.get('cardID'));
    this.$el.attr('data-listID', this.model.get('listID'));
    this.render();
    this.listenTo(this.model, 'change:description', this.render);
    this.listenTo(this.model, 'change:comments', this.renderComments);
  }
});