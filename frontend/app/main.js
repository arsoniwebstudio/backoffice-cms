require.config({
  // The shim config allows us to configure dependencies for
  // scripts that do not call define() to register a module
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore','jquery'],
      exports: 'Backbone'
    },
    'icheck': {
    	exports: 'iCheck'
    },
    'pnotify': {
    	deps: ['jquery'],
    	exports: 'pnotify'
    },
    'slimscroll': {
    	exports: 'slimscroll'
    },
    'backgrid': {
    	deps: ['backbone','underscore'],
		exports: 'Backgrid'
	  },
    'pageable': {
    	deps: ['backbone', 'underscore'],
		  exports: 'pageable'
	  },
	'paginator': {
		deps: ['backbone', 'underscore', 'pageable','backgrid'],
		exports: 'Backgrid.Extension.Paginator'
	  },
	'filter': {
		deps: ['backbone', 'underscore', 'pageable','backgrid','lunr'],
		exports: 'Backgrid.Extension.Filter'
	  }
	  
	  
  },
  

  // Mention locations of scripts we use
  paths: {
    backbone: '../vendor/backbone/backbone',
    pageable: '../vendor/backbone-pageable-master/lib/backbone-pageable',
    jquery: '../vendor/assets/js/jquery',
    underscore: '../vendor/underscore/underscore',
    text: '../vendor/requirejs/text',
    icheck: '../vendor/lanceng-tpl/assets/third/icheck/icheck.min',
    pnotify: '../vendor/pnotify/jquery.pnotify.min',
    slimscroll: '../vendor/lanceng-tpl/assets/third/slimscroll/jquery.slimscroll.min',
    backgrid: '../vendor/backgrid/lib/backgrid',//mod
    paginator: '../vendor/backgrid/lib/backgrid-paginator.min',
    utils: '../backbone/views/utils',
    lunr: '../vendor/lunr/lunr.min',
    filter: '../vendor/backgrid/lib/backgrid-filter.min'
  }
});
 
require(['routers/router'], function(Router) {
  var router = new Router();
  Backbone.history.start();
  console.log(router);
});