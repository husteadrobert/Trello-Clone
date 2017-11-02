var router = new (Backbone.Router.extend({
  routes: {
    "index": App.boardsView.bind(App),
    "index/:boardID": App.listsView.bind(App),
    "index/:boardID/:cardID" : "singleCardView"
  }
}))();

router.on("route:singleCardView", function(boardID, cardID) {
  App.listsView(boardID, cardID);
  //var listID = App.lists.findListByCardID(+cardID);
  //App.detailedCardView(cardID, listID);
});

Backbone.history.start({
  pushState: true
});