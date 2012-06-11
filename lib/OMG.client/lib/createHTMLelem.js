module.exports = function (elem, tag, target, rel){		
			var id = function(){return new Date().getTime().toString()}
				,	elem = document.createElement(tag)
				,	subject = target === 'stage' ? $('#stage') : $(self.selected) || $('#stage')
			;
			
			
			
			
			
			elem.id = 'elem:' + id();
			elem.classList.add('media');
			subject[relationship]($(elem));
			$(elem).draggable({drag:function(e){console.log(e)}});
//			$(elem).resizable();
			$(elem).bind('mousedown', self.select)
			playground.dragHelper = function(){return elem}			
		};
