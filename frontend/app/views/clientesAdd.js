define([
  'jquery',
  'underscore',
  'backbone',
  'models/clientes',
  'text!views/templates/clientes/add.html'
], 

function ($, _, backbone, clienteModel, addTpl) {

	var addClienteView = Backbone.View.extend({
	    el: '#add.modal .modal-body',
	
	    template: _.template(addTpl),
	
	    initialize: function () {
	      _.bindAll(this, 'render');
	    },
	
	    render: function () {
	      this.$el.html(this.template());
	      return this;
	    },
	
	  });
	
	  return addClienteView;
	
});