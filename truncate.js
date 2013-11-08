/*
truncate.js v0.1
Written by Leon Li (https://github.com/li-cn).
Requires jQuery (for now).
*/

(function ( $ ) {

$.fn.truncate = function( options ) {

	var settings = $.extend({
		charlength: 30
	}, options );

	return $(this).each(function() {
			var original = $(this).html();
			var charlength = settings.charlength;
			var trimmed = original.substr(0, charlength);
			$(this).html(trimmed);
		}
	);

};

}( jQuery ));
