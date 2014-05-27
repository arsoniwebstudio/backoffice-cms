define([
  'jquery',
  'backbone'
], function ($, Backbone) {
    
  var clienteModel = Backbone.Model.extend({
		url: 'api/clientes/',
  });

  return clienteModel;
});