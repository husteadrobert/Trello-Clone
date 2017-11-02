this["JST"] = this["JST"] || {};

this["JST"]["addList"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li>  <article class=\"list addList\" data-boardID=\""
    + alias4(((helper = (helper = helpers.boardID || (depth0 != null ? depth0.boardID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"boardID","hash":{},"data":data}) : helper)))
    + "\">    <header>      <h3>Add a list...</h3>    </header>    <footer>      <form action=\"/addList/"
    + alias4(((helper = (helper = helpers.boardID || (depth0 != null ? depth0.boardID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"boardID","hash":{},"data":data}) : helper)))
    + "\" method=\"POST\" id=\"newListForm\">        <fieldset>          <textarea rows=\"1\" name=\"newListTitle\" placeholder=\"Add a list...\"></textarea>          <input type=\"submit\" value=\"Save\">          <a href=\"#\" id=\"closeAddList\">X</a>        </fieldset>      </form>    </footer>  </article></li>";
},"useData":true});

this["JST"]["boardView"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"boardView\">  <a href=\"#\">Board 1</a></div>";
},"useData":true});

this["JST"]["detailedView"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<section id=\"cardTitle\">  <span id=\"listIcon\" class=\"cardIcon\"></span>  <h2>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>  <span class=\"deleteItem\" id=\"removeModal\">X</span>  <form class=\"editCardTitle\" action=\"/editCardTitle/"
    + alias4(((helper = (helper = helpers.cardID || (depth0 != null ? depth0.cardID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardID","hash":{},"data":data}) : helper)))
    + "\" method=\"put\">    <textarea rows=\"2\" cols=\"75\" name=\"cardTitle\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</textarea>  </form>  <p class=\"lightText\">in list <span id=\"listName\">"
    + alias4(((helper = (helper = helpers.listTitle || (depth0 != null ? depth0.listTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listTitle","hash":{},"data":data}) : helper)))
    + "</span></p>  <p class=\"lightText\">Description <a href=\"#\" id=\"editDescription\">Edit</a></p>  <p class=\"description\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>  <form action=\"/editCardDescription\" method=\"PUT\" class=\"editCardForm\">    <fieldset>      <textarea rows=\"3\" cols=\"75\" name=\"cardDescription\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</textarea>      <input type=\"submit\" value=\"Save\">      <a href=\"#\" id=\"closeEditCard\">X</a>    </fieldset>  </form></section><section id=\"cardComments\">  <span id=\"personIcon\" class=\"cardIcon\"></span>  <h2>Add Comment</h2>  <form action=\"/addComment/"
    + alias4(((helper = (helper = helpers.cardID || (depth0 != null ? depth0.cardID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardID","hash":{},"data":data}) : helper)))
    + "\" method=\"POST\" class=\"addCommentForm\">    <fieldset>      <textarea cols=\"75\" rows=\"5\"></textarea>      <input type=\"submit\" value=\"Save\">    </fieldset>  </form></section><section id=\"cardActivity\">  <span id=\"chatIcon\" class=\"cardIcon\"></span>  <h2>Activity</h2>  <ul>  </ul></section>";
},"useData":true});

this["JST"]["header"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<header>  <h1>"
    + container.escapeExpression(((helper = (helper = helpers.boardTitle || (depth0 != null ? depth0.boardTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"boardTitle","hash":{},"data":data}) : helper)))
    + "</h1></header><ul id=\"listsDisplay\"></ul>";
},"useData":true});

this["JST"]["list"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"list\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">  <header>    <h3>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + " <span class=\"deleteItem\">X</span></h3>  </header>  <body>    <ul>    </ul>  </body>  <footer>    <a href=\"#\" id=\"addCardToList\">Add a card...</a>    <form action=\"/addCardToList/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" method=\"POST\" class=\"addCardForm\">      <fieldset>        <textarea rows=\"3\" name=\"newCardTitle\"></textarea>        <input type=\"submit\" value=\"Add\">        <a href=\"#\" id=\"closeAddCardToList\">X</a>      </fieldset>    </form>  </footer></article>";
},"useData":true});

this["JST"]["listCard"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "      <img src=\"/images/list.png\" class=\"cardIcon\">    ";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      <img src=\"/images/chat.png\" class=\"cardIcon\"> "
    + container.escapeExpression(((helper = (helper = helpers.commentCount || (depth0 != null ? depth0.commentCount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"commentCount","hash":{},"data":data}) : helper)))
    + "    ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"card\" data-id=\""
    + alias4(((helper = (helper = helpers.cardID || (depth0 != null ? depth0.cardID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardID","hash":{},"data":data}) : helper)))
    + "\">  <form class=\"editCardTitle\" action=\"/editCardTitle/"
    + alias4(((helper = (helper = helpers.cardID || (depth0 != null ? depth0.cardID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardID","hash":{},"data":data}) : helper)))
    + "\" method=\"put\">    <fieldset>      <input name=\"cardTitle\" type=\"text\" value=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\" autocomplete=\"off\">      <button class=\"updateCardTitle\">Save</button>      <button class=\"button\" id=\"cancelEditButton\">Cancel</button>    </fieldset>  </form>  <a href=\"#\">    <p class=\"description\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p>        <div class=\"editImage\"></div>    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.commentCount : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </a></li>";
},"useData":true});

this["JST"]["modal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"modalLayer\"></div>";
},"useData":true});

this["JST"]["searchResults"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <li class=\"card\" data-id=\""
    + alias4(((helper = (helper = helpers.cardID || (depth0 != null ? depth0.cardID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardID","hash":{},"data":data}) : helper)))
    + "\">      <a href=\"#\">        <p class=\"description\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p>      </a>      "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.commentCount : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </li>  ";
},"2":function(container,depth0,helpers,partials,data) {
    return "        <img src=\"/images/edit.png\" class=\"cardIcon\">      ";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <img src=\"/images/chat.png\" class=\"cardIcon\"> "
    + container.escapeExpression(((helper = (helper = helpers.commentCount || (depth0 != null ? depth0.commentCount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"commentCount","hash":{},"data":data}) : helper)))
    + "      ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul>  "
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.cards : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});

this["JST"]["singleComment"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li>  <h3>"
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "</h3>  <p>"
    + alias4(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper)))
    + "</p>  <p class=\"lightText\">"
    + alias4((helpers.formatTime || (depth0 && depth0.formatTime) || alias2).call(alias1,(depth0 != null ? depth0.timestamp : depth0),{"name":"formatTime","hash":{},"data":data}))
    + " - <a href=\"#\">Edit</a> - <a href=\"#\">Delete</a></p></li>";
},"useData":true});