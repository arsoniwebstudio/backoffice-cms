define([
  'jquery',
  'underscore',
  'backbone',
  'models/clientes',
  'views/clientes/tableData',
  'text!views/templates/clientes/clientes.html',
  'text!views/templates/clientes/add.html',
  'views/ui/ui'
], 

function ($, _, backbone, clienteModel, tableDataView , clientesTpl, addTpl, UI) {

	  var clientesView = Backbone.View.extend({
	    el: '#content',

	    events: {
	    	'click #modal-add': 'renderModalAddform'
		},
		    
	    template: _.template(clientesTpl),

	    initialize: function () {
	      _.bindAll(this, 'renderModalAddform', 'create'); 
	    },

	    render: function () {
	      this.$el.html(this.template());
	      new tableDataView().render();
	      return this;
	    },
	    
	    renderModalAddform: function(){
	    	new UI().renderModal('top',addTpl);//.append(form());
	    	
	    	$('#btn-save').on('click',function(){
		    	  var nuevo = new clienteModel({
		    		  nombre     	: $('#inputNombre').val(),
			          cif        	: $('#inputCif').val(),
			          telefono   	: $('#inputTel').val(),
			          email      	: $('#inputEmail').val(),
			          direccion  	: $('inputEmail').val(),
			          codigo	 	: $('inputCod').val(),
			          creado_por	: sessvars.session.user.id,
			          creado		: Date(),
			          estado		: 1
		    		});
		    	  return nuevo.save();
		      });
	    	return this;
	    },
	    
	    create: function(){
	    	return this;
	    }

	  });

	  return clientesView;
	  
});
