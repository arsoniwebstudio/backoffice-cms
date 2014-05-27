define([
	'jquery',
	'underscore',
	'backbone',
	'models/clientes',
], function($, _, Backbone, ClientesModel){

    var ClientesList = Backbone.Collection.extend({
        model   : ClientesModel,

        url     : function() {
            return '/api/clientes';
        },

        parse : function(response) {
            return response;
        },

        initialize: function(options) {
            options || (options = {tipo:'row'});
            this.tipo = options.tipo;
        }
    })

    return ClientesList;
    
});