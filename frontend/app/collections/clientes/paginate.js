define([
	'jquery',
	'underscore',
	'pageable',
	'models/clientes',
], function($, _, PageableCollection, ClientesModel){
	
    var ClientesPaginate = PageableCollection.extend({
    	
    	model   : ClientesModel,
    	  
    	state: {
    	    pageSize: 1
    	},
    	
    	mode: "client",
        
        url     : function() {
            return '/api/clientes';
        },

        parse : function(response) {
            return response.objects;
        },

        initialize: function(options) {
            options || (options = {tipo:'row'});
            this.tipo = options.tipo;
        }
    })

    return ClientesPaginate;
    
});