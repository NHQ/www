function(doc){
	var winX = window.innerWidth
	,		winY = window.innerHeight
	, 	fontSize = 16
	,		charsPerLine = 80
	,		doc = doc
	
	var currWidth = parseInt(getStyle(test, "width"));
	var spaceWidth = testLength(test.textContent.replace(/[*]/g, ' '))
	var bodyWidth = parseInt(getStyle(document.body, "width"));
	var pixelsPerChar = Math.ceil(currWidth / test.textContent.length);
	var charConst = Math.ceil(fontSize / pixelsPerChar); // font-size / pixelsPerChar
	var widthFactor = charsPerLine / charConst; // CPL / charConst
	var w = charsPerLine * pixelsPerChar * (1 * (fontSize * .1)) // room for innacuracy?
	,		linesPerPage = Math.floor(( .75 * winY ) / Math.floor(18 * 1.62))
	,		charsPerPage = linesPerPage * (w / pixelsPerChar)
	;
	
	
	,		merge = function(a, b){
			  if (a && b) {
			    for (var key in b) {
			      a[key] = b[key];
			    }
			  }
			  return a;
			}
	,		mockDock = {
				raw: 'String',
				images: [],
				videos: [],
				audios: [],
				parsed: [],
				template: {
					html: 'str',
					stylesheet: 'str',
					javascript: 'str'
				}
			}
	,		doc = merge(mockDock, doc)
	;
	
	var Line = new Function(){
		this.
	}
	
	var Page = new function(){
		
	}
	
	
	function getStyle(el, style) {
	  if(!document.getElementById) return;

	   var value = el.style[toCamelCase(style)];

	  if(!value)
	    if(document.defaultView)
	      value = document.defaultView.
	         getComputedStyle(el, "").getPropertyValue(style);

	    else if(el.currentStyle)
	      value = el.currentStyle[toCamelCase(style)];

	   return value;
	}

	function setStyle(objId, style, value) {
	  document.getElementById(objId).style[style] = value;
	}

	function toCamelCase( sInput ) {
	  var oStringList = sInput.split('-');
	  if(oStringList.length == 1)  
	    return oStringList[0];
	  var ret = sInput.indexOf("-") == 0 ? 
	      oStringList[0].charAt(0).toUpperCase() + oStringList[0].substring(1) : oStringList[0];
	  for(var i = 1, len = oStringList.length; i < len; i++){
	    var s = oStringList[i];
	    ret += s.charAt(0).toUpperCase() + s.substring(1)
	  }
	  return ret;
	}
	
	function testLength(text){
		try {
			test.innerHTML = text.join(' ');				
		}
		catch(err) {
			test.innerHTML = text;
		}
		var currWidth = parseInt(getStyle(test, "width"));

		return currWidth
	}
	
	
}