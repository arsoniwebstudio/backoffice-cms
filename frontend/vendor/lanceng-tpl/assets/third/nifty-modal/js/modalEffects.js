/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */


(function(window) {
	
	
	function init() {

		
		$( '.md-trigger' ).each( function() {
			
			var modal=$('#' + this.getAttribute( 'data-modal' ));
			
			var	close = $( modal ).find ( ' .md-close' );
			
//			function removeModal( hasPerspective ) {
			function removeModal(  ) {
				$( modal ).removeClass('md-show' );

//				if( hasPerspective ) {
//					document.documentElement.removeClass( 'md-perspective' );
//				}
			}

			function removeModalHandler() {
//				removeModal( $(this).hasClass( 'md-setperspective' ) ); 
				removeModal(); 
			}

			$(this).on( 'click', function( ev ) {
				console.log(this.getAttribute( 'data-modal' ))
				$('#'+ this.getAttribute( 'data-modal' )).delay(1000).addClass( 'md-show' );
				$( '.md-overlay' ).click(removeModalHandler);
				$( '.md-overlay' ).click(removeModalHandler );
			});

			close[0].click( function( ev ) {
				ev.stopPropagation();
				removeModalHandler();
			});

		} );

	}

	var modalEffect={
		init:init
	};

	// transport
	if ( typeof define === 'function' && define.amd ) {
	  // AMD
		define( modalEffect );
	} else {
	  // browser global
	  window.modalEffect = modalEffect;
	}
	
})(window);