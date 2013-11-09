/*
truncate.js v0.1
Written by Leon Li (https://github.com/li-cn).
Requires jQuery.
Released under the MIT License.
*/

function occurrences(string, subString, allowOverlapping){
	// counts occurrences of given substring inside given string
	// function lifted from Stack Overflow user Vitim.us on 2013-11-08 here: http://stackoverflow.com/questions/4009756/

	string+=""; subString+="";
	if(subString.length<=0) return string.length+1;

	var n=0, pos=0;
	var step=(allowOverlapping)?(1):(subString.length);

	while(true){
		pos=string.indexOf(subString,pos);
		if(pos>=0){ n++; pos+=step; } else break;
	}
	return(n);

}

// truncate.js jQuery plugin
(function ( $ ) {

	$.fn.truncate = function( options ) {

		var defaults = {
			maxLength: 300,
			ellipsis: ' ...',
			morelink: '<a class="morelink">more</a>',
			lesslink: '<a class="lesslink">less</a>',
			morelinkClass: '.morelink',
			lesslinkClass: '.lesslink'
		}

		var options = $.extend(defaults, options);

		return this.each(function() {

			var o = options;

			var $this = $(this);
			var originalContent = $this.html();
			var trimmedContent = originalContent.substr(0, o.maxLength);
			var trimLength = o.maxLength;

			if (occurrences(trimmedContent, "<", false) == occurrences(trimmedContent, ">", false)) {

				// if-else flows to be optimized in the future
				if (occurrences(trimmedContent, "<a ", false) == occurrences(trimmedContent, "</a>", false)) {
					trimLength = Math.max(trimmedContent.lastIndexOf(" ", o.maxLength), trimmedContent.lastIndexOf(">", o.maxLength)+1);
				}
				else {
					trimLength = trimmedContent.lastIndexOf("<a ", o.maxLength);
				};

				trimmedContent = trimmedContent.substr(0, trimLength);

			}
			else {
				
				// if-else flows to be optimized in the future
				if (occurrences(trimmedContent, "<a ", false) == occurrences(trimmedContent, "</a>", false)) {
					trimLength = trimmedContent.lastIndexOf("<", o.maxLength);
				}
				else {
					trimLength = trimmedContent.lastIndexOf("<a ", o.maxLength);
				};

				trimmedContent = trimmedContent.substr(0, trimLength);

			};

			if (occurrences(trimmedContent, "<p>", false) == occurrences(trimmedContent, "</p>", false)) {
				trimmedContent = trimmedContent + o.morelink;
			}
			else {
				trimmedContent = trimmedContent + o.ellipsis + '</p>' + o.morelink;
			};

			// truncates only if the truncated HTML is shorter than the original
			if (trimmedContent.length < $this.html().length) {
				$this.html(trimmedContent);
			}

			// buttons to expand and collapse truncated HTML; option to disable this to be created in the future
			$this.on("click", o.morelinkClass, function(){
				$this.html(originalContent + o.lesslink);
			});
			$this.on("click", o.lesslinkClass, function(){
				$this.html(trimmedContent);
			});

			// future capabilities:
			// * truncate by word count (currently character count)
			// * truncate by HTML height or number of lines
			// * support for protecting inline tags other than <a> (like <pre>, <ul>, <li>, etc.)
			// * support for wrapping with inline tags other than <p> (like <small>, <strong>, <em>, etc.)
			// * animate expanding/collapsing

		});

	};

}( jQuery ));
