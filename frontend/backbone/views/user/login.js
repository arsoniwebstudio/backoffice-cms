define([
  'jquery',
  'underscore',
  'backbone',
  'models/user',
  'text!views/templates/login.html',
  'icheck',
//  'utils'
], 

function ($, _, backbone, userModel, loginTpl, iCheck) {

	  var loginView = Backbone.View.extend({
	    el: '#main',

	    events: {
	    	'click #btnLogin': 'doLogin'
		},
		    
	    template: _.template(loginTpl),

	    initialize: function () {
	        _.bindAll(this, 'render', 'beforeRender', 'afterRender', 'doLogin', 'doLogout'); 
	        var _this = this; 
	        this.render = _.wrap(this.render, function(render) { 
	            _this.beforeRender(); 
	            render(); 
	            _this.afterRender(); 
	            return _this; 
	        });
	    },

	    render: function () {
	      this.$el.html(this.template());
	      return this;
	    },
	    
	    beforeRender: function(){
	    	return this;
	    },
	    
	    afterRender: function(){
	    	$('input').iCheck({
	    		checkboxClass: 'icheckbox_minimal-grey',
	    		radioClass: 'iradio_minimal-grey',
	    		increaseArea: '20%' // optional
	    	});
	    	return this;
	    },
	    
	    doLogin: function(){
	    	var user = new userModel();
	    	user.set({
	            username :$('#username').val(),
	            password : $('#password').val(),
	        });
	    	user.login()
	    	return this;
	    },
	    
	    doLogout: function(){
//	    	var user = new userModel();
//	    	user.logout();
	    	sessvars.session.user=null;
	    	this.render();
	    	return this;
	    }

	  });

	  return loginView;
	  
});
