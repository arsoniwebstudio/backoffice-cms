define([
  'jquery',
  'underscore',
  'backbone',
  'slimscroll',
  'text!views/templates/ui/nav-left.html',
  'views/user/login',
  'text!views/templates/ui/content.html',
  'text!views/templates/ui/modal-top.html'
], 

function ($, _, backbone, slimscroll, navleftTpl, loginView, pageContentTpl, modalTopTpl) {

	  var UI = Backbone.View.extend({
	    el: '#main',

	    events: {
	    	
		},
		    
	    template: _.template(navleftTpl),

	    initialize: function () {
	    	
	        _.bindAll(this, 'render', 'beforeRender', 'afterRender', 'renderLeftNav', 'renderPageContent', 'renderModal'); 
	        
	        var _this = this; 
	        
	        this.render = _.wrap(this.render, function(render) { 
	            _this.beforeRender(); 
	            render(); 
	            _this.afterRender(); 
	            return _this; 
	        });
	      
	    },

	    render: function () {
	      this.renderLeftNav();
	      this.renderPageContent();
	      return this;
	    },
	    
	    beforeRender: function(){
	    	return this;
	    },
	    
	    afterRender: function(){
	    	return this;
	    },
	    
	    renderLeftNav: function(){
	    	this.template=_.template(navleftTpl)
	    	var usr='';
	    	if(sessvars.session!=undefined && sessvars.session!=null){
	    		var usr=sessvars.session.user.username;
	    	}
	    	var data={
	    		username: usr
	    	}
	    	this.$el.html(this.template(data));
	    	
	    	$('#sidebar-menu > ul > li > a').click(function() {
	    		$('#sidebar-menu li').removeClass('selected');
	    		$(this).closest('li').addClass('selected');	
	    		var checkElement = $(this).next();
	    			if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
	    				$(this).closest('li').removeClass('selected');
	    				checkElement.slideUp('fast');
	    			}
	    			if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
	    				$('#sidebar-menu ul ul:visible').slideUp('fast');
	    				checkElement.slideDown('fast');
	    			}
	    			if($(this).closest('li').find('ul').children().length == 0) {
	    				return true;
	    				} else {
	    				return false;	
	    			}		
	    	});
	    	
	    	$('.slimscroller').slimscroll({ height: 'auto' });
	    	window.onresize=function(){$('.slimscroller').slimscroll({ height: 'auto' })};
	    	$('.media-body a.md-trigger').click(function(){
	    		new loginView().doLogout();
	    	});
	    	return this;
	    },
	    
	    renderPageContent: function(){
	    	this.$el.append(_.template(pageContentTpl));
	    	return this;
	    },
	    
	    renderModal: function(type,tpl){
	    	var modal;
	    	
	    	switch (type){
		    	case 'top'://Top Modal
		    		$('.md-overlay').after(_.template(modalTopTpl));
		    		modal=$('#top-modal');
		    		modal.find('.md-content').append(_.template(tpl));
		    		break;
		    	default:
		    		break;
	    	}
	    
			var	close = $(modal).find ( ' .md-close' );
			
			function removeModal( hasPerspective ) {
				$( modal ).removeClass('md-show' );
				$('.md-overlay').removeClass('active');
				if( hasPerspective ) {
					document.documentElement.removeClass( 'md-perspective' );
				}
			}
			
			function removeModalHandler() {
				removeModal( $(this).hasClass( 'md-setperspective' ) ); 
				removeModal(); 
			}
			
			$(modal).addClass('md-show');
			$('.md-overlay').addClass('active');
			$( '.md-overlay' ).click(removeModalHandler);
			

			close.click( function( ev ) {
				ev.stopPropagation();
				removeModalHandler();
			});
			
	    	
	    	return this;
	    }
	    
	  });

	  return UI;
	  
});
