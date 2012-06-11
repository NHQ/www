var toCamelCase = exports.toCamelCase = function( sInput ) {
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
};

var getStyle = exports.getStyle = function(el, style) {
  if(!document.getElementById) return;

   var value = el.style[toCamelCase(style)];

  if(!value)
    if(document.defaultView)
      value = document.defaultView.
         getComputedStyle(el, "").getPropertyValue(style);

    else if(el.currentStyle)
      value = el.currentStyle[toCamelCase(style)];

   return value;
};

var setStyle = exports.setStyle = function(objId, style, value) {
  document.getElementById(objId).style[style] = value;
}

exports.getPropVal = function(elem, prop){

	return parseInt(getStyle(elem, prop));

};

exports.getCSSPrimitiveValue = function(propValue){
	var valueType = propValue.__proto__.constructor.name
	;
	switch(valueType.toLowerCase()){
		case 'cssvalue':
			return {type: 'cssValue', value : {unit: '', type: propValue.cssValueType, val: propValue.cssText}};
		break;
		case 'cssvaluelist':
			var l = propValue.length;
			return {type: 'cssPrimitiveValue', value : exports.CSSGetPrimitiveValue(propValue[0])};
		break;
		case 'cssprimitivevalue':
			return {type: 'cssPrimitiveValue', value : exports.CSSGetPrimitiveValue(propValue)};
		break;
		case 'svgpaint':
			return {type: 'SVGPaint', value : exports.CSSGetPrimitiveValue(propValue)};
		break;
	}
	
};

exports.CSSGetPrimitiveValue = function (value) {
		try {
	   		
				var valueType = value.primitiveType;
				
			  if (CSSPrimitiveValue.CSS_PX == valueType) {
					return {class: CSSPrimitiveValue.CSS_PX, unit : 'px', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (valueType == CSSPrimitiveValue.CSS_NUMBER) {
					return {class: CSSPrimitiveValue.CSS_NUMBER, unit : '', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (valueType == CSSPrimitiveValue.CSS_PERCENTAGE) {
					return {class: CSSPrimitiveValue.CSS_PERCENTAGE, unit : '%', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (CSSPrimitiveValue.CSS_EMS == valueType) {
					return {class: CSSPrimitiveValue.CSS_EMS, unit : 'em', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (CSSPrimitiveValue.CSS_CM == valueType) {
					return {class: CSSPrimitiveValue.CSS_CM, unit : 'cm', type: 'float', val : value.getFloatValue (valueType)};
			  }
			
			  if (CSSPrimitiveValue.CSS_IDENT == valueType) {
					return {class: CSSPrimitiveValue.CSS_IDENT, unit : '', type: 'string', val : value.getStringValue (valueType)};
			  }
			
			  if (CSSPrimitiveValue.CSS_EXS == valueType) {
					return {class: CSSPrimitiveValue.CSS_EXS, unit : 'ex', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (CSSPrimitiveValue.CSS_IN == valueType) {
					return {class: CSSPrimitiveValue.CSS_IN, unit : 'in', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (CSSPrimitiveValue.CSS_MM == valueType) {
					return {class: CSSPrimitiveValue.CSS_MM, unit : 'mm', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (CSSPrimitiveValue.CSS_PC == valueType) {
					return {class: CSSPrimitiveValue.CSS_PC, unit : 'pc', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (CSSPrimitiveValue.CSS_PT == valueType) {
					return {class: CSSPrimitiveValue.CSS_PT, unit : 'pt', type: 'float', val : value.getFloatValue (valueType)};
			  }
			
			 	if (valueType == CSSPrimitiveValue.CSS_DIMENSION){
					return {class: CSSPrimitiveValue.CSS_DIMENSION, unit : '', type: 'float', val : value.getFloatValue (valueType)};
				}
				
			  if (CSSPrimitiveValue.CSS_STRING <= valueType && valueType <= CSSPrimitiveValue.CSS_ATTR) {
			     return {unit : '', type: 'string', val: value.getStringValue (valueType)};
			  }

			  if (valueType == CSSPrimitiveValue.CSS_COUNTER) {
			    var counterValue = value.getCounterValue ();
					return {
						class: CSSPrimitiveValue.CSS_COUNTER,
						unit: '',
						type: 'counter',
						val : {
							identifier: counterValue.identifier,
							listStyle: counterValue.listStyle,
							separator: counterValue.separator
						}};
			   }

			   if (valueType == CSSPrimitiveValue.CSS_RECT) {
			      var rect = value.getRectValue ()
			       	,	topPX = rect.top.getFloatValue (CSSPrimitiveValue.CSS_PX)
			       	,	rightPX = rect.right.getFloatValue (CSSPrimitiveValue.CSS_PX)
			       	,	bottomPX = rect.bottom.getFloatValue (CSSPrimitiveValue.CSS_PX)
			       	,	leftPX = rect.left.getFloatValue (CSSPrimitiveValue.CSS_PX)
						;
						return {
							class: CSSPrimitiveValue.CSS_RECT,
							unit: 'px',
							type: 'rect',
							val: {
								top: topPX,
								right: rightPX,
								bottom: bottomPX,
								left: leftPX
							}};
			   }

			   if (valueType == CSSPrimitiveValue.CSS_RGBCOLOR) {
			      var rgb = value.getRGBColorValue ()
			       	,	r = rgb.red.getFloatValue (CSSPrimitiveValue.CSS_NUMBER)
			       	,	g = rgb.green.getFloatValue (CSSPrimitiveValue.CSS_NUMBER)
			       	, b = rgb.blue.getFloatValue (CSSPrimitiveValue.CSS_NUMBER)
						;
		
						return {
							class: CSSPrimitiveValue.CSS_RGBCOLOR,
							unit: '',
							type: 'rgb',
							val: {
								r: r,
								g: g,
								b: b,
							}};
			   }

				if (CSSPrimitiveValue.CSS_GRAD == valueType >= CSSPrimitiveValue.CSS_DEG ) {
					return {unit : 'grad', type: 'angle', val : value.getFloatValue (valueType)};
				}
			
				if(valueType == CSSPrimitiveValue.CSS_DEG) {
					return {class: CSSPrimitiveValue.CSS_DEG, unit : 'deg', type: 'angle', val : value.getFloatValue (valueType)};
				}
			
				if(valueType == CSSPrimitiveValue.CSS_RAD) {
					return {class: CSSPrimitiveValue.CSS_RAD, unit : 'radian', type: 'angle', val : value.getFloatValue (valueType)};
				}
			
				if(CSSPrimitiveValue.CSS_S == valueType ) {
					return {class: CSSPrimitiveValue.CSS_S, unit : '', type: 'time', val : value.getFloatValue (valueType)};
				}
			
				if(valueType == CSSPrimitiveValue.CSS_MS ) {
					return {class: CSSPrimitiveValue.CSS_MS, unit : '', type: 'time', val : value.getFloatValue (valueType)};
				}
				
				if(!valueType) {
					return {class: undefined, unit : '', type: 'unknown', val : value.cssText};
				}
			
			return {class: undefined, unit : '', type: 'unknown', val : value.cssText};
						
		}
		
		catch (Err){	   
			return {class: 'unknown', unit : '', type: value.propValue.__proto__.constructor.name, val : value.cssText};
		}
};

exports.winX = window.innerWidth;

exports.winY = window.innerHeight;

exports.toggle = function(){this.x = true;return function(){return this.x ? this.x = false : this.x = true}}

exports.spaceTime = function(){return new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000)};

exports.merge = function(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};

exports.yodel = function(fn){
	var self = this;
	console.log(this);
    var hollar = function () {
	    var start = new Date().getTime();
        return function(e){
            fn.apply(self, arguments)
            console.log(new Date().getTime() - start)
        }                                    
    }
    return hollar()
};

exports.metaDbSave = function(){
		exports.yodel(omg.fs.writeFile('/metadb.json', JSON.stringify(omg.metaLocal), 'utf8', exports.yodel(function(e,r){
			console.log(e,r)
		})));
};

exports.partial = function(str, opts){
	return omg.jade(str, opts)
};

exports.getSVG = function(str, width, height){
	if(!height) var height = 100;
	if(!width) var width = 100;
	var svg = omg.svg[str + '.svg'].replace('{{height}}', height + 'px').replace('{{width}}', width + 'px')
	console.log(svg)
	return svg
};