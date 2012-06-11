    module.exports = function(){
	
		return {
    		init: function(size){
					var self = this;
		
    			this.colorPicker.Selector.apply(this);
    			_.bindAll(this);
          this.tool.onMouseUp = this.mouseUp.call(this, this.events.CP_mouseUp);
          this.tool.onMouseDrag = this.mouseDrag.call(this, this.events.CP_drag);
          this.tool.onMouseDown = this.mouseDown();
    			this.colorPicker.pallette.store();
    			view.draw()
    		},
    		pallette : {
    		  store: function(){
    		    var cors = store.get('colors');
    		    var poop = [];
    		    _.each(cors, function(e){
    		      var c = new HSBColor(e[0],e[1],e[2],e[3]);
    		      poop.push(c);
    		    })
    		    this.get = poop;
    		    this.set();
    		  },
    		  set: function(color){
    		    if (color){
    		      this.get.unshift(color);
							omg.playground.selectedColor = color;
							omg.playground.palette = this.get();
    		      store.set('colors', _.map(this.get, function(obj){
    		        return [obj.hue, obj.saturation, obj.lightness, obj.alpha]
    		      }));
    		      this.set();
    		      return		      		        
    		      }
/*
    		    this.swathii.remove();
    		    this.swathii = new Group();
    		    this.swath = [];
    		    var rad = 330;
    		    var radian = 15;
    		    if (this.get.length > 24){radian-=6}
    		    for (var x = this.get.length; x >= 0; --x){
    		      var unit = 360 / this.get.length;
    		      vek = new Point({
                angle: -(x * radian) - 5,
                length: rad
              })
    		      this.swath[x] = new Path.Circle(center.add(vek),30);
    		      //this.swath[x].strokeColor = "#333";
    		      this.swath[x].fillColor = this.get[x];
    		      //this.swath[x].moveAbove(this.swath[x+1]);
    		      this.swathii.addChild(this.swath[x])
    		    }
*/  
    		    //this.swathii.position = [550,0]
    		    },
    		  get: [],
    		  swathii: new Group(),
    		  swath:[]
    		},
    		Selector : function(){
					var magicNum = .88 * this.size[0]
						,	magicNumY = .623 * this.size[1]
						,	pad = ((1-.88)/2);
						
    		  this.group = new Group();
    			this.globs.color = this.pal =  new HSLColor(210, 1, 0.65);
    			this.bg = [];
    			for (i=0;i<magicNumY;i+=magicNumY/22){

    				this.bg[i] = new Path([pad * this.size[0], (this.size[1] * .047) + i], [(pad * this.size[0]) + magicNum, (this.size[1] * .044) + i]);
    				this.bg[i].strokeWidth = 1/120*this.size[0];
    				this.bg[i].strokeColor = "#c1c2c3";
    			}
    			this.sb = new Path.Rectangle(pad * this.size[0], .04 * this.size[1], magicNum, magicNumY);
    			this.sb.fillColor = this.pal;
    			this.circ = new Path.Circle(this.sb.position.x + (this.pal.lightness * (8 * this.size[0])/2),this.sb.position.y,6);
    			this.circ.strokeColor = "black";
					this.circ.fillColor = '#999';
    			this.circ.strokeWidth = 3;
    			var colors = [];
    			var cycles = 4;
    			for (var i = 0, l = 360; i < l; i++) {
    				var lightness = .65;
    				var hue = i;
    				var color = new HSLColor(hue, 1, lightness);
						colors.push(color);
    			}

/*
					var huePreviewColors = [];
    			for (var i = 0, l = 360; i < l; i++) {
    				var lightness = .65;
    				var hue = i;
    				var color = new HSLColor(hue, 1, lightness);
						huePreviewColors.push(color);
    			}

					this.huePreview = new Path.Rectangle(0,420,360,14);
*/
    			this.hueSelect = new Path.Rectangle(pad * this.size[0], magicNumY + (.08 * this.size[1]), magicNum, .06 * this.size[1]);
    			var gradient = new Gradient(colors);
    			var gradientColor = new GradientColor(gradient, this.hueSelect.bounds.bottomLeft,this.hueSelect.bounds.bottomRight);
    			this.hueSelect.fillColor = gradientColor;

    			this.tiny = new Path.Circle([(this.pal.hue/360)*(.88*this.size[0])+(pad * this.size[0]), magicNumY + (.11 * this.size[1])], .01 * this.size[1]);
    			this.tiny.fillColor = this.pal;
    			this.tiny.strokeColor = "#000";
					var text = new PointText(this.hueSelect.bounds.topLeft);
					text.position.y += .14 * this.size[1];
					text.content = '###################################'
					text.characterStyle.fontSize = .04 * this.size[1];
					text.fillColor = '#ddd';
    			this.as = this.hueSelect.clone();
					this.as.position.y += .1 * this.size[1]
    			this.palAlpha1 = this.pal.clone();
    			this.palAlphaZero = this.pal.clone();
    			this.palAlphaZero.alpha = 0;
    			var gradient = new Gradient([[this.palAlphaZero],[this.palAlpha1]]);
    			var gradientColor = new GradientColor(gradient, this.as.bounds.left,this.as.bounds.right);
    			this.as.fillColor = gradientColor;
					this.hueSelect.position.y += .05 * this.size[1];
					this.as.position.y += .05 * this.size[1];
					this.tiny.position.y += .05 * this.size[1];
					text.position.y += .05 * this.size[1];
    			this.add = new PointText([367,410]);
    			this.add.content= "+";
    			this.add.characterStyle = {
              fontSize: 60,
          }
          this.add.strokeJoin = 'round';
    			this.add.fillColor = "#000";
    			this.add.strokeColor = "#fff"
    			this.addRect = new Path.Rectangle(new Point(367,365), new Size(48,48));
    			this.addRect.strokeColor = "#fff";
    			this.addRect.fillColor = "#fff";
    			this.addRect.fillColor.alpha = 0;
    		},
    		remove: function(){
    	    omg.gg.group.remove();
    	    this.pallette.swathii.remove();
    	  },
	  }
	}