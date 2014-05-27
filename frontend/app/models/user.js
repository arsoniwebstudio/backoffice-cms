define([
  'jquery',
  'backbone',
  'views/utils'
], function ($, Backbone, Utils) {
    
  var userModel = Backbone.Model.extend({
		url: 'api/cms/user/',
		login: function(){
			return $.ajax({
				type: 'POST',
		          dataType: 'json',
		          url: 'api/user/login/',
		          data: {
		            user: (this.get('username') || ''),
		            password: (this.get('password')),
		            success_url: window.location.hash
		          },
		          success: function (data) {
		        	  Utils.manage_response(data)
		          }
		        });
		},
		logout: function(){
			return $.ajax({
				type: 'POST',
		          dataType: 'json',
		          url: 'api/user/login/',
		          data: {
		            success_url: '/'
		          },
		          success: function (data) {
		        	  
		        	  
		        	  
		          }
		        });
		}
  });

  return userModel;
});