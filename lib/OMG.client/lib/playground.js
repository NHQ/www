var win = require('./client.utils.js')
	,	elemenos = ['title', 'div', 'p', 'blockquote', 'textarea', 'list', 'button', 'canvas', 'h1', 'iframe']
	, templates = ['container', 'list', 'paginated', 'slideshow', 'gallery', 'podcast', 'movie', 'comments', 'forum']
	,	cssProps = ['background', 'height', 'width', 'position', 'color', 'border-radius', 'border', 'top', 'left', 'right', 'bottom', 'line-height', 'font-size', 'font-family', 'padding', 'margin', 'box-shadow', 'text-shadow', 'z-index', 'text-decoration', 'zoom', 'display', 'visibility', 'transform', 'transform-origin', 'transform-style', 'backface-visibility', 'transition', 'animation']
	,	layouts = ['absolute', 'scrollY', 'scrollX', 'scrollXY', 'freestyle', 'live stream']
	,	ddUpload = require('./ddUpload.js')
	,	Canvas = require('./canvas.js')
	,	element = require('./element.js')
	,	Media = require('./media.js')
;
	
var playground = function(){
	
	var self = this;
	self.file = new Media('text/html', null, null, null, null);
	
	console.log(self);
	this.init = function (){

		$('body').empty();
		var blob = omg.fs.createBlob(omg.css['playground.css'], 'text/css', function(e,r){console.log(e,r)})
		,		dataURI = omg.fs.readDataUrl(blob, function(e,res){
										$('head').append('<link rel="stylesheet" href="../css/ui-lightness/jqueryui.ui.css">')
										$('head').append('<link rel="stylesheet" href="' + res + '">')
										$('body').append(omg.jade('playground', {getSVG: win.getSVG, templates : templates, elemenos : elemenos, layouts: layouts, meta : Object.keys(self.file)}))
										next.call(self)
										if(e){omg.errorHandler(e)}
									});							

		function next(){
/*			
			$(document).mousemove(function(e){
				win.pageX = e.pageX;
				win.pageY = e.pageY;
				console.log(win)
			});
*/			
//			var animationFrame = window.webkitRequestAnimationFrame;

			
			self.stage = document.getElementById('stage');
			self.config = {};
			self.getContent = function(){return self.stage.innerHTML()};
			
			ddUpload('curtain', 'newMedia', false, false);
			
			self.selectMouseUp = function(e){	
				
				if(self.selected && this.id === self.selected.id) return;
				if(self.selected && this.id != self.selected.id) {
					self.selected.parentElement.classList.remove('selected');
					this.parentElement.classList.add('selected');
					self.selected = this;
					computeObj(this);
				}
				if(!self.selected){
					this.parentElement.classList.add('selected');
					self.selected = this;
					computeObj(this);
				}
				
				function computeObj(elem){
					var elemStyles = window.getComputedStyle(elem)
						,	parentStyles = window.getComputedStyle(elem.parentNode)
						, range = _.range(elemStyles.length)
						,	parentRange = _.range(parentStyles.length)
					;
					
					self.selected.styles = {}
					self.selectedParent = elem.parentNode;
					self.selectedParent.styles = {};
					
					var undefinedProperties = [];

					parentRange.forEach(function(x){
						var val = self.selectedParent.styles[parentStyles[x]] = parentStyles.getPropertyCSSValue(parentStyles[x]);
						val.primitive = win.getCSSPrimitiveValue(val);
						val.property = parentStyles[x];
					});

					range.forEach(function(x){
						var val = self.selected.styles[elemStyles[x]] = elemStyles.getPropertyCSSValue(elemStyles[x]);
						val.primitive = win.getCSSPrimitiveValue(val);
						val.property = elemStyles[x];
						if(!val.primitive){
							undefinedProperties.push(o)
						}
					});
					
					self.selectedObject = _.map(range, function(x){
								var val = elemStyles.getPropertyCSSValue(elemStyles[x])
								,		primitive = win.getCSSPrimitiveValue(val)
								,		o = {property: elemStyles[x], value: val, primitive : primitive}
								;
								if(!o.primitive){
									undefinedProperties.push(o)
								}
								return o
							});
					return;
				}
				
				self.targetView()
				
			};
			
			self.targetView = function(obj){
				
				var styles = element.style;
				console.log(styles);
				var options = $('#toolSet').empty().append(omg.jade('elemTargetView', {styles: styles, compute : win.getPropVal, selected : {css : self.selectedObject, elem : self.selected}, parent : self.selectedParent}));
				
				function xyPositionChange(evt, ui, data){
	//				self.selected.parentNode.centerPos = [ui.offset.left, ui.offset.top];
				};
				
				omg.eve.on('xyPositionChange', xyPositionChange)
				
				
				
				options.children().find('span.float').draggable({
					axis : 'y',
					helper : 'clone',
					revert : true,
					revertDuration : 90,
					cursor : 'move',
					appendTo : '#stage',
					scroll : false,
					drag : function(evt, ui){
						var val = parseFloat(this.getAttribute('data-value'))
							, diff = parseInt(ui.position.top - ui.originalPosition.top)
							, newVal = (val - diff)
						;
						$(self.selected).css(this.parentNode.id, newVal + this.getAttribute('data-unit'));
		 		  	this.textContent = newVal.toString();
						this.playValue = newVal
					},
					stop : function(evt, ui){
						this.setAttribute('data-value', this.playValue)
					}
				});
				options.children().find('.cssString')
				.click(function(evt){
					var startNode = this.childNodes[0];
					var range = document.createRange();
					range.setStart(startNode, 0);
					range.setEnd(startNode, startNode.length);
					var sel = window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);
				})
				.keyup(function(evt){
					var cssProp = this.parentNode.id
					;
					$(self.selected).css(cssProp, this.textContent);
					
				});
				options.css('overflow', 'auto').children().find('.cssPrimitives').click(function(evt){
									
					var cssProp = this
						,	child = $('#' + cssProp.id + ' .cssPrimitiveVal')
					;
					switch (cssProp.getAttribute('data-type').toLowerCase()) {
					
						case 'string':
							return
						break;
					
						case 'float':
							var primVal = parseFloat(child.attr('data-value'))
								,	range = $('.ranger')
							;
							
						  range.attr('min', 0 - Math.abs(0 - primVal) - 200)
							 		 .attr('max', 200 + 0 + Math.abs(0 - primVal) * 2)
							 		 .val(primVal)
							 		 .unbind('change')
									 .bind('change', function(){
											var val = this.value
											;
											$(self.selected).css(cssProp.id, parseFloat(val) + 'px')
							 		  	child.html(this.value)
							 		 })						
						
						break;
						
						case 'string' :
						
						break;
				
						case 'rgb' : 
						if(omg.eve.listeners('palTest').length > 0)	{omg.eve.listeners('palTest').pop(0)};
						omg.eve.on('palTest', function(cssStr){
							$(self.selected).css(cssProp.id, cssStr);
			 		  	child.text(cssStr)
						})
						
						break;
				
					}
					
					return
	
				})
			};
			var c = document.createElement('canvas');
			c.id = 'xyRangeCanvas';
			c.classList.add('xyRangeCanvas');
			$('#stage').append(c);
			var canvas = Canvas('xyRangeCanvas', [300,300]);
			canvas.colorPicker.init.call(canvas);
			

		// event functions

		function createHTMLelem(evt, elem){
			
			var id = function(){return new Date().getTime().toString()}
			
			var wrapper = element.makeWrap()
			 	,	dragHandle = element.makeDragHandle()
			 	,	rotateHandle = element.rotatorCuffLink()
				
				,	target = 'stage' // document.querySelector('#target').value				
				,	relationship = 'append' // document.querySelector('#relationship').value
				,	tag = evt ? $(evt.target).attr('data-type') : null
				,	elem = elem || element.create(tag)
				,	subject = target === 'stage' 
										? $('#stage') 
										: $(self.selected) || $('#stage')
			;
			
			elem.id = 'elem' + id();
			elem.classList.add('media');

			wrapper.appendChild(elem);			
			wrapper.appendChild(dragHandle);
			wrapper.appendChild(rotateHandle);

			subject[relationship]($(wrapper));
			
			$(elem).bind('mouseup', self.selectMouseUp);
			
			function toolSetToggle(){
				$('#toolSet').fadeToggle(49);
			};
			
			var rotatorZ = function(evt, ui){
					var yDiff = parseInt(ui.position.top - ui.originalPosition.top)
						,	xDiff = parseInt(ui.position.left - ui.originalPosition.left)
					;
					this.parentNode.style['-webkit-transform'] = 'rotateZ(' + yDiff + 'deg)';
					omg.eve.emit('rotateZ');
			};

			$(rotateHandle).draggable({
				opacity: 0,
				start: omg.eve.revent('xyPositionChange', [toolSetToggle]),
				helper: function(){return element.create('div')},
				drag: omg.eve.revent('xyPositionChange', [rotatorZ]),
				stop: omg.eve.revent('xyPositionChange', [toolSetToggle, rotatorZ])
			});

			$(wrapper).draggable({
				handle: '.media, div.dragHandle',
				grid: [1,1],
				scroll: false,
				start: omg.eve.revent('xyPositionChange', [toolSetToggle]),
				drag: omg.eve.revent('xyPositionChange'),
				stop: omg.eve.revent('xyPositionChange', [toolSetToggle])
			});

			if(/button{1}/i.test(elem.tagName)){
				elem.setAttribute('type', 'button')
				elem.textContent = 'Click Button'
			}

			if(/audio{1}|video{1}|img{1}/i.test(elem.tagName)){
				$(wrapper).resizable({
					aspectRatio : true,
					autoHide : true,
					start: toolSetToggle,
					resize: omg.eve.revent('xyResize'),
					stop: omg.eve.revent('xyResize', [toolSetToggle])
				});
				return
			}			

			else
				$(wrapper).resizable({
					autoHide : true,
					start: toolSetToggle,
					resize: omg.eve.revent('resize'),
					stop: omg.eve.revent('resize', [toolSetToggle])
				});
				return
		};

		// events listeners

		omg.eve.on('createHTMLelem', createHTMLelem)
		omg.eve.on('newMedia', createHTMLelem)
		// event setters

		$('.createHTMLelem').mousedown(omg.eve.revent('createHTMLelem'))
		$('.menuList > h1').click(function(evt){
			
			// not the best in the nest
		
			if (self.activeMenuId && self.activeMenuId === this.parentNode.id) return;
			
			$(this.parentNode.parentNode).children().find('li').css('display', 'none');
			
			var elem = $(this.parentNode)
				,	pheight = $(this.parentNode.parentNode).innerHeight()
				,	elemHeight = elem.height()
				,	height = (3 * elemHeight)
				,	pos = elem.position().top
				,	distance = (pheight - pos - elemHeight)
			;
				console.log(height, pheight)
				elem.transition({'y': '+='+distance, opacity: 0},30).transition({'y': '-='+(distance - (elemHeight * 2)), opacity: 1},205, function(){
					self.activeMenuId = this[0].id;
					this.attr('style', '');
					this.appendTo(this.parent());
					this.find('li').css('display', 'inline-block');					
				})
				/*
				self.activeMenuId = this.id;
				this.find('li').css('display', 'inline-block');
				this.attr('style','');
				this[0].parentNode.appendChild(this[0]);
				this.transition({'y': '+='+distance, opacity: 1},1000, function(){
					console.log(this);
					$(this).transition({opacity: 1, 'y': '+='+distance},1000, function(){console.log(this, 'done')});
				})
				*/
				
		})
		};
	};
	return this
};




module.exports = playground;

































































