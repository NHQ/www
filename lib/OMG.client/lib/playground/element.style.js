module.exports = function(){
	
	var $ = Object.create(null)
		,	border_styles = ['none', 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset']
		,	border_options = {'width': {type:'float'}, 'style': border_styles, 'color': {type: 'color'}}
	;
	
	$.size = [
		{'height': {type: 'float'}},
		{'width': {type:'float'}}
	];
	
	$.positioning = [
		{'position': ['relative', 'absolute', 'fixed']},
		{'top': {type: 'float'}},
		{'left': {type: 'float'}}
	];
	
	$.padding = [
		{'padding': {type: 'float'}},
		{'top': {type: 'float'}},
		{'right': {type: 'float'}},
		{'bottom': {type: 'float'}},
		{'left': {type: 'float'}}
	];
	
	$.margin = [
		{'magrin': {type: 'float'}},
		{'top': {type: 'float'}},
		{'right': {type: 'float'}},
		{'bottom': {type: 'float'}},
		{'left': {type: 'float'}}
	];
	
	$.background = [
		{'background-color': {type: 'color'}},
		{'background-image': {type: 'image'}},
		{'background-position': {type: 'xy'}},
		{'background-repeat': ['repeat', 'no-repeat', 'repeat-x', 'repeat-y']},
		{'background-size': {type: 'size'}},
		{'background-clip': ['border-box', 'padding-box', 'content-box']},
		{'background-origin': {type: 'xy'}},
		{'background-attachment': ['scroll', 'fixed']},
		{'background-break': ['bounding-box', 'each-box', 'continuous']}
	];
	
	$.borders = [
		{'border': border_options},
		{'border-top': border_options},
		{'border-bottom': border_options},
		{'border-right': border_options},
		{'border-left': border_options}
	];
	
	$.corners = [
		{'border-top-left-radius':{type: 'float'}},
		{'border-top-right-radius':{type: 'float'}},
		{'border-bottom-right-radius':{type: 'float'}},
		{'border-bottom-right-radius':{type: 'float'}}
	];
	
	$.box_shadow = [
		{type: 'ol', values: ['float', 'float', 'length', 'color'], option: 'inset'}
	];
	
	$.font = [
		{'font-style': ['normal', 'italic', 'oblique', 'inherit']}, 
		{'font-weight': {type: 'range', min: 100, max: 900}},
		{'font-family': {type: 'string'}} // One day a selection
	];
	
	$.text = [
		{'direction': ['ltr', 'rtl', 'inherit']}, 
		{'text-align': ['start', 'end', 'left', 'right', 'center', 'justify']}, 
		{'text-decoration': ['none', 'underline', 'overline', 'line-through', 'blink']},
		{'text-shadow': {type: 'ol', values: ['float', 'float', 'xy', 'color']}},
		{'text-transform': ['none', 'capitalize', 'uppercase', 'lowercase']}
	];
	
	$.transform = [
		{'transform-origin': {type: 'xy'}},
		{'perspective': {type: 'float'}},
		{'skewX' : {type: 'float'}},
		{'skewY' : {type: 'float'}},
		{'scaleX' : {type: 'float'}},
		{'scaleY' : {type: 'float'}},
		{'rotateX' : {type: 'float'}},
		{'rotateY' : {type: 'float'}},
		{'rotateZ' : {type: 'float'}}
	];

	return $

}()
