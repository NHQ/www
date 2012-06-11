var colorPicker = require('./canvas.colorpicker.js')
	,	events = require('./canvas.events.js')
;

module.exports = function(id, size){

	var canvas = function(domID, size){ // STRING(), ARRAY()
		
		this.html = domID;
		this.size = size;
		var self = this;
		
		paper.setup(domID)
		
		this.init = function(){
			view.viewSize = new Size(size);
			this.center = view.center;
			this.tool = new Tool();
			this.tool.onMouseDrag = this.mouseDrag();
		  this.tool.onMouseDown = this.mouseDown();
			this.tool.onMouseUp = this.mouseUp();
			this.tool.activate();	
			view.draw()
		};
			
		this.remove = function(){
		
		};
		
		this.tool = new Tool();
		
		this.events = events()
		
		this.globs = {
      color: new HSBColor(1,1,0,1),
      gradient: function(from, to){
        var gradient = new Gradient([['black',],['orange',.13],['yellow',.4],[new HSBColor(240,.7,1,1),.67]], 'radial');
        var gcolor = new GradientColor(gradient, from, to);
        return gcolor;
      },
      burble: {
        sides: 10,
        angle: 90,
        hi: undefined,
        ho: undefined
      },
      sides: 7,
      innerRad: undefined,
      active:{},
      last: function(){
        if(!this.active.init){return}
        else
  	    this.active.init.apply(this, [true, false]);
  	  }
    };
			
		this.mouseDown = function(){
	    var guments = arguments
				, self = this
			;
			return function(event){        
	      for (var i = 0; i<guments.length;++i){
	        guments[i].call(self, event) 
	      }
	    }
	  };

	  this.mouseUp = function(event){
	    var guments = arguments
				, self = this
			;
	    return function(event){  
	      for (var i = 0; i<guments.length;++i){
	        guments[i].call(self, event) 
	      }
	    }
	  };

	  this.mouseDrag = function(event){
	    var guments = arguments
				, self = this
			;
	    return function(event){  
	      for (var i = 0; i<guments.length;++i){
	        guments[i].call(self, event) 
	      }
	    }
	  };

	  this.keyDown = function(event){
	    var guments = arguments
				, self = this
			;
	    return function(event){  
	      for (var i = 0; i<guments.length;++i){
	        guments[i].call(self, event) 
	      }
	    }
	   };

	  this.keyUp = function(event){
		    var guments = arguments
					, self = this
				;
	      return function(event){  
	        for (var i = 0; i<guments.length;++i){
	          guments[i].call(self, event) 
	        }
	      }
	   };
	
		this.colorPicker = colorPicker();
	
		this.xyRangePicker = function(xRange, yRange) { // STRING(), ARRAY(), ARRAY(), ARRAY()
			var data = Object.create(null)
			var group = new Group();
			var layer = new Layer();
			var dot = new Path.Circle(view.center, 1)
				, x
				,	w = size[0]
				,	h = size[1]
				,	z = _.range(295 / 5)
			;
			for (x = 5; x < 300; x+=(300/60)){
				z.forEach(function(i){
					var copy = dot.clone()
					;
					copy.position = new Point(x, 5 + i * 5);
					copy.fillColor = new HslColor(88, .8, .8, .5);
				})
			}
			
		};

		this.init();
		
		return this
		
	};
	
	return new canvas(id, size); 
	
};







