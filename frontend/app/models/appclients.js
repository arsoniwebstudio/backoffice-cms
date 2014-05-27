define([
  'jquery',
  'backbone'
], function ($, Backbone) {
    
  var clienteModel = Backbone.Model.extend({
		url: 'http://backend.arsoñi.com/api/cms/apps/',
  });

  return clienteModel;
});