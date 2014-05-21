define([
  'jquery',
  'underscore',
  'backbone',
  'collections/clientes',
  'text!views/templates/clientes/listRows.html'
], function ($, _, backbone, clientesList, listTpl) {
  
  var listClientesView = Backbone.View.extend({
    el: '.data-table tbody',
    
    template: _.template(listTpl),

    initialize: function () {
      _.bindAll(this,'render','renderCliente');
    },

    render: function () {
      this.collection = new clientesList();     
      this.collection.fetch({
    	  success: $.proxy(function (collection, response) {
    		  this.$el.html(this.template({objetos: response.objects}));
    	  },this)
      });
      return this;
    },
    
    renderCliente: function (querystring) {
    	return this;
    }
  });

  return listClientesView;
});