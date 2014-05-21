define([
  'jquery',
  'underscore',
  'backbone',
  'collections/clientes/paginate',
  'text!views/templates/clientes/listRows.html',
  'backgrid',
  'paginator',
  'filter'
], function ($, _, backbone, ClientesPaginate, listTpl, Backgrid, Paginator, Filter) {
  
  var tableDataClientesView = Backbone.View.extend({
    el: '.data-table',
    
    template: _.template(listTpl),

    initialize: function () {
      _.bindAll(this, 'render');
    },

    items:{a:"a"},
    
    columns:[{
    	  name: "id", // The key of the model attribute
    	  label: "ID", // The name to display in the header
    	  editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
    	  // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
    	  cell: Backgrid.IntegerCell.extend({
    	    orderSeparator: ''
    	  })
    	},{
		  name: "nombre",
		  label: "Cliente",
		  // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
		  cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
		},{
		  name: "email",
		  label: "Email",
		  // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
		  cell: "email"
		},{
		  name: "creado",
		  label: "Creado",
		  // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
		  cell: "date"
		},{
		  name: "estado",
		  label: "Estado",
		  // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
		  cell: Backgrid.Cell.extend({
    		  // Cell default class names are the lower-cased and dasherized
    		  // form of the the cell class names by convention.
    		  className: "status-cell",
			  formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
	    	    	fromRaw: function (rawValue, model) {
	    	    		var className,text;
	    	    		if (rawValue==1){
	    	    			className='label-success';
	    	    			text='Activo';
	    	    		}else{
	    	    			className='label-warning';
	    	    			text='Desactivado';
	    	    		}
	    	    		
	    	    		string = '<span class="label '+className+'">'+text+'</span>';
	    	    		parser=new DOMParser();
	    	    		htmlDoc=parser.parseFromString(string, "text/html");
	    	    		return htmlDoc;
	    	    		
	    	    	}
	    	  })
	    	})
		}],
    
    render: function () {
    	var clientesPaginate = new ClientesPaginate();
    	// Fetch some countries from the url
    	clientesPaginate.fetch();     
    	
    	// Initialize a new Grid instance
		  var grid = new Backgrid.Grid({
	    	  columns: this.columns,
	    	  collection: clientesPaginate,
	    	});
	    	
	    	// Render the grid
	    	this.$el.append(grid.render().el);
	    	this.$el.find('table').addClass('table table-hover table-striped').attr('data-sortable','');
	    	// Initialize the paginator
	    	var paginator = new Backgrid.Extension.Paginator({
	    		goBackFirstOnSort: false,
	    		collection: clientesPaginate
	    	});

	    	// Render the paginator
	    	this.$el.after(paginator.render().el);
	    	paginator.$el.addClass("data-table-toolbar");
	    	
	    	
	    	// Initialize a client-side filter to filter on the client
	    	// mode pageable collection's cache.
	    	var filter = new Backgrid.Extension.ClientSideFilter({
	    	  collection: clientesPaginate,
	    	  fields: ['nombre']
	    	});

	    	// Render the filter
	    	$('.additional-box').append(filter.render().el);
	    	
	    	// Add some space to the filter and move it to the right
	    	$(filter.el).attr('role','form');
	    	$(filter.el).css('display','inline-block');
	    	$(filter.el).css('vertical-align','middle');
	    	$(filter.el).find('span').remove();
	    	$(filter.el).find('input').attr('placeholder','Buscar...');
	    	$(filter.el).find('input').addClass('form-control');
	    	
    	
    	return this;
    }
    
  });

  return tableDataClientesView;
});