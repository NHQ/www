var style = exports.style = require('./playground/element.style.js');

var create = exports.create = function(tag){

	var elem = document.createElement(tag)
		,	id = function(){return new Date().getTime().toString()}
	;
	elem.id = id();
	elem._addClasses = function(classes){
		var self = this;
		classes.forEach(function(c){self.classList.add(c)})
	}
	return elem

};

var addClasses = exports.addClasses = function(elem, classList){
	
	classList.forEach(elem.classList.add)
	return undefined

};

var makeWrap = exports.makeWrap = function(){
	
	var wrapper = create('div')
	;
	
	wrapper.classList.add('wrapper');
	
	return wrapper
	
};

exports.makeDragHandle = function(){
	
	var dragHandle = create('div')
	;
	
	dragHandle.style['background-image'] = 'url(/css/ui-lightness/images/ui-icons_222222_256x240.png)';
	dragHandle._addClasses(['Handle', 'dragHandle', 'handlePosTopRight']);

	
	return dragHandle
	
};

exports.rotatorCuffLink = function(){

	var elem = create('div')
	;
	elem.style['background-image'] = 'url(/css/ui-lightness/images/ui-icons_222222_256x240.png)';
	elem._addClasses(['Handle', 'rotateHandle']);
	elem.style.top = '-32px';
	elem.style.right = '0px';
	
	return elem

};