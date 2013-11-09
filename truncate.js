/*
truncate.js v0.1
Written by Leon Li (https://github.com/li-cn).
Requires jQuery (for now).
*/

// counts occurrences of given substring inside given string
// function lifted from Stack Overflow user Vitim.us on 2013-11-08 here: http://stackoverflow.com/questions/4009756/
function occurrences(string, subString, allowOverlapping){

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

// jQuery experimental plugin
(function ( $ ) {

	$.fn.truncate = function() {

		return this.each(function() {
			var $this = $(this);
			var maxLength = 625;
			var originalContent = $this.html();
			var trimmedContent = originalContent.substr(0, maxLength);
			var trimLength = maxLength;
			var ellipsis = ' ...';
			var morelink = '<button class="btn btn-primary btn-sm btn-block space-10 morelink">more</button>';
			var lesslink = '<button class="btn btn-primary btn-sm btn-block space-10 lesslink">less</button>';

			if (occurrences(trimmedContent, "<", false) == occurrences(trimmedContent, ">", false)) {

				if (occurrences(trimmedContent, "<a ", false) == occurrences(trimmedContent, "</a>", false)) {
					trimLength = Math.max(trimmedContent.lastIndexOf(" ", maxLength), trimmedContent.lastIndexOf(">", maxLength)+1);
				}
				else {
					trimLength = trimmedContent.lastIndexOf("<a ", maxLength);
				};

				trimmedContent = trimmedContent.substr(0, trimLength);

			}
			else {
				
				if (occurrences(trimmedContent, "<a ", false) == occurrences(trimmedContent, "</a>", false)) {
					trimLength = trimmedContent.lastIndexOf("<", maxLength);
				}
				else {
					trimLength = trimmedContent.lastIndexOf("<a ", maxLength);
				};

				trimmedContent = trimmedContent.substr(0, trimLength);

			};

			if (occurrences(trimmedContent, "<p>", false) == occurrences(trimmedContent, "</p>", false)) {
				trimmedContent = trimmedContent + morelink;
			}
			else {
				trimmedContent = trimmedContent + ellipsis + '</p>' + morelink;
			};

			if (trimmedContent.length < $this.html().length) {
				$this.html(trimmedContent);
			}
			$this.on("click", '.morelink', function(){
			$this.html(originalContent + lesslink);
			});
			$this.on("click", '.lesslink', function(){
			$this.html(trimmedContent);
			});
		});

	};

}( jQuery ));
