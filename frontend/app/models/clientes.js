define([
  'jquery',
  'backbone'
], function ($, Backbone) {
    
  var clienteModel = Backbone.Model.extend({
		url: 'api/cms/clientes/',
  });

  return clienteModel;
});