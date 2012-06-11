paper.install(window);


module.exports = function(){
	
	$('body').empty().prepend('<style>'+ omg.css['draw.css'] +'</style>').append(omg.jade('draw'))

	paper.install(window);
	initGG = function(){
	colz = store.get('colors');
	sinceLast = new Date().getTime(); 
	paper.setup('canvas');
	center = view.center;

	// notes: smudge draw. user holds down to "soak" up color alpha, and then as they drag, the alpha decerases until gone. 

	  omg.gg = Object.create(null);
	  omg.gg = {
	    init: function(){
	      _.bindAll(this);
	      this.groupAll = new Group();
				this.tool = new Tool();
				this.tool.onMouseDrag = this.mouseDrag();
			  this.tool.onMouseDown = this.mouseDown();
				this.tool.onMouseUp = this.mouseUp();
				this.tool.activate();
				this.tool.minDistance = 0;
				//this.spirals(view.center)
				this.draw.init.apply(this)
				//this.spiral.go.apply(this, [view.center]);
				view.draw()
	    },
	    globs:{
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
	  	    this.active.init.apply(omg.gg, [true, false]);
	  	  }
	    },
	    style:{
	      strokeColor:"",
	      strokeWidth:"",
	      dashArray:[],
	      fillColor:""
	    },
	    target: {
	      item: null,
	      setItem: function(item, bool){
	        var i = this.target.item || null;
	        if(i){
	          if(item._id != i._id)
	          i.selected = false;
	        //  omg.gg.globs.selectRect.remove();
	        //  omg.gg.globs.selectDot.remove();
	        }
	        item.fullySelected = bool;
	        this.target.item = item;
	        //view.draw();
	/*      
	        this.globs.selectRect = new Path.Rectangle(item.bounds)
	        this.globs.selectRect.insertBelow(item);
	        this.globs.selectRect.selectable = false;
	        this.globs.selectRect.style = {
	        strokeColor : new HSBColor(210,1,1,.2)       
	        };
	        this.globs.selectDot = new Path.Circle(item.position, 3);
	        this.globs.selectDot.insertBelow(item);
	        this.globs.selectDot.style = {
	          fillColor: '#000',
	          strokeWidth: 0
	        }
	*/ 
	      },
	      setSegment: function(item){
	        this.target.segment = item;
	      }
	    },
	    events: {
	      select: function(event){
	          var hit = project.hitTest(event.point, {tolerance: 10, fill: true, stroke:true, segments: true})
	          if (hit && hit.item.selectable){
	            /* clear all selected
	            _.each(project.layers, function(lay){
	              _.each(lay.children, function(chi){
	                chi.selected = false;
	              })
	            })
	            this.funs.deSelect.apply(this);
	            *///select new
	            //if(this.target.item && this.target.item._id != hit.item._id){console.log('hair');this.target.item.selected = false}
	            this.target.setItem.apply(this, [hit.item, true]);
	            //this.funs.select.apply(this, [hit.item, true])
	            this.tool.onMouseDown = this.mouseDown(this.events.grabSegment, this.events.select);
	            //this.tool.onMouseUp = this.mouseUp(this.events.grabSegment, this.events.select);
	            // need to function this mouseDown to target item's parts for drag, while also keep item selection on ...
	            //hit.segment.point = new Point([0,0])
	          }
	          else {
	            _.each(project.layers, function(lay){
	              _.each(lay.children, function(chi){
	                chi.selected = false;
	              })
	            })
	            //this.funs.deSelect.apply(this);
	            this.tool.onMouseDown = this.mouseDown(this.events.select);
	            this.tool.onMouseDrag = this.mouseDown();
	          }
	        },
	        grabSegment: function(event){
	          var hit = project.hitTest(event.point, {tolerance: 30, segments: true})
	          if(hit && hit.segment && hit.item.selectable){
	            this.target.setSegment.apply(this, [hit.segment]);
	            this.tool.onMouseDrag = this.mouseDrag(this.events.dragSegment)
	            this.tool.onMouseUp = this.mouseUp(this.events.dropSegment)
	          }
	          else this.tool.onMouseDrag = this.mouseDrag();
	        },
	        dragSegment: function(event){
	          this.target.segment.point = event.point;
	        //  this.target.item.smooth();
	        //  this.tool.onMouseDown = this.mouseDown(this.events.grabSegment, this.events.select);
	        },
	        dropSegment: function(event){
	          this.tool.onMouseDrag = this.mouseDrag();
	          this.tool.onMouseDown = this.mouseDown(this.events.grabSegment, this.events.select);
	        },
	        selected: function(event){
	          var hit = project.hitTest(event.point, {tolerance: 50, segments: true})
	          if(hit && hit.segment){
	            hit.segment.point = event.point
	          }
	        },
	        draw: function(event){
	          this.layer = new Layer();
	          this.path = new Path();
	          this.target.setItem.call(this, this.path, false);
	          this.path.strokeWidth = 2;
	          this.path.strokeCap = 'round';
	          this.path.strokeColor = this.globs.color.clone();
	        },
	        drawDrag: function(event){
	          this.path.add(event.point);
	        },
	        drawDrop: function(event){
	          //this.path.simplify(1);
	        },
	        CP_mouseUp: function (event){

	          //sb = saturation/brightness

	      			if (this.sb.hitTest(event.point, {fill:true})){
	      				this.circ.position = event.point;
	      				var bright = (360 - Math.abs((event.point.x - this.sb.position.x)*2))/360;
	      				var sat = (360 - Math.abs((event.point.y - this.sb.position.y)*2))/360;;
	      				this.sb.fillColor.saturation = sat;
	      				this.sb.fillColor.brightness =  bright;
	      				this.globs.color = this.pal.brightness = bright;
	      				this.globs.color = this.pal.saturation = sat;
	      				this.palAlphaZero.saturation = sat;
	      				this.palAlphaZero.brightness = bright;
	      				this.palAlpha1.saturation = sat;
	      				this.palAlpha1.brightness = bright;
	      			}
	      			if (this.hueSelect.hitTest(event.point, {fill:true})){
	      				this.sb.fillColor = this.pal.clone();
	      				this.globs.color = this.pal.hue = (event.point.x - this.hueSelect.bounds.left);
	      				this.sb.fillColor.hue = (event.point.x - this.hueSelect.bounds.left);
	      				this.tiny.position.x = event.point.x
	      				this.palAlphaZero.hue = (event.point.x - this.hueSelect.bounds.left);
	      				this.palAlpha1.hue = (event.point.x - this.hueSelect.bounds.left);
	      			}
	      			if (this.as.hitTest(event.point, {fill:true})){
	      				this.globs.color = this.pal.alpha = (event.point.y - this.as.bounds.top) / 340;
	      				this.globs.color = this.sb.alpha = (event.point.y - this.sb.bounds.top) / 360;
	      			}
	      			if(this.addRect.hitTest(event.point, {fill:true})){
	      			  if( (new Date().getTime() - this.sinceLast) < 500){
	        		    return
	        		  }
	        		  this.sinceLast = new Date().getTime();
	      			  this.colorPicker.pallette.set(this.pal.clone());
	      			  this.globs.color = this.pal;
	        			 this.colorPicker.remove();
	        			 this.globs.last();
	      			}
	      			if(this.colorPicker.pallette.swathii.hitTest(event.point, {fill:true})){
	      			  var item = this.colorPicker.pallette.swathii.hitTest(event.point, {fill:true}).item;
	      			 this.globs.color = this.colorPicker.pal = item.fillColor;
	      			 this.colorPicker.remove();
	      			 this.globs.last();
	      			}
	      		},
	        CP_drag : function (event) {
	        			// S/B
	        			if (this.hueSelect.hitTest(event.point, {fill:true})){
	        				this.sb.fillColor = this.pal.clone();
	        				this.pal.hue = (event.point.x - this.hueSelect.bounds.left);
	        				this.sb.fillColor.hue = (event.point.x - this.hueSelect.bounds.left);
	        				this.tiny.position.x = event.point.x
	        				this.palAlphaZero.hue = (event.point.x - this.hueSelect.bounds.left);
	        				this.palAlpha1.hue = (event.point.x - this.hueSelect.bounds.left);
	        			}
	        			if (this.as.hitTest(event.point, {fill:true})){
	        				this.pal.alpha = (event.point.y - this.as.bounds.top) / 340;
	        				this.sb.alpha = (event.point.y - this.sb.bounds.top) / 360;
	        			}
	        			if (this.sb.hitTest(event.point, {fill:true})){
	        				this.circ.position = event.point;
	        				var bright = (360 - Math.abs((event.point.x - this.sb.position.x)*2))/360;
	        				var sat = (360 - Math.abs((event.point.y - this.sb.position.y)*2))/360;;
	        				this.sb.fillColor.saturation = sat;
	        				this.sb.fillColor.brightness =  bright;
	        				this.pal.brightness = bright;
	        				this.pal.saturation = sat;
	        				this.palAlphaZero.saturation = sat;
	        				this.palAlphaZero.brightness = bright;
	        				this.palAlpha1.saturation = sat;
	        				this.palAlpha1.brightness = bright;
	        			}
	        			if(this.add.hitTest(event.point, {stroke:true})){
	        			  this.pallette.push(this.pal);
	        			}
	        		},
	        txt_keyDown:function(event){
	              if (event.key == 'space'){
	                event.preventDefault();
	                this.txt.text.content += ' ';
	                this.txt.cursor.position = this.txt.text.position.add((12*this.txt.text.content.length)+10,-5);
	              }
	              else if (event.key == 'backspace'){
	                event.preventDefault();
	                function backspace (x){
	                  //var layer = this.layer[0];
	                  var c = x.content || null;
	                  var l = c ? c.length : null;            
	                  if (l == 0 || !l){
	                    this.txt.layer[0].children.pop();
	                    //write.text = _.last(write.layer[0].children);

	                    if (this.txt.layer[0].children.length == 0){
	                      this.txt.layer.shift();
	                    }
	                    this.txt.text = _.last(this.txt.layer[0].children);
	                    backspace.apply(this, [this.txt.text]);
	                  }
	                  else{
	                   this.txt.text.content = c.slice(0, -1);
	                              this.txt.curses.apply(this);
	                   this.txt.cursor.position = this.txt.text.position.add((12*this.txt.text.content.length)+10,-5);
	                  }
	                }backspace.apply(this, [this.txt.text]);
	                //view.draw();
	              }
	              else if (event.key == 'enter'){
	                console.log('enter');
	                var pos = this.txt.text.position.add([0,this.txt.fontSize]);
	                this.txt.cursor.remove();
	                this.txt.init.apply(this, [true, pos])
	              }
	              else {
	                this.txt.text.content += event.character;
	               this.txt.cursor.position = this.txt.text.position.add((12*this.txt.text.content.length)+10,-5);
	              }
	            },
	            txt_mouseDown:function(event){
	              this.txt.cursor.position = event.point.add(4,-5);
	              var layer = new Layer();
	              this.layer = this.txt.layer;
	              this.txt.layer.unshift(layer);
	              this.txt.text = this.tProto.clone();
	              this.txt.text.position = event.point;
	            },
	            lineDown: function(event){
	              if (this.line.segments.length == 0) {
	                      this.line.add(event.point);
	                  }

	                  this.line.add(event.point);
	            },
	            lineDrag: function(event){
	              this.line.lastSegment.point = event.point;
	              this.target.setItem.call(this, this.line, false);
	            },
	            circleDrag: function(event){
	              if (event.count > 1){this.circle.remove();}
	              this.circle = new Path.Circle(event.downPoint, event.point.subtract(event.downPoint).length);
	              this.circle.strokeColor = this.globs.color;
	              this.target.setItem.call(this, this.circle, false);
	            },
	            polyDrag: function(event){
	              if (event.count > 1){this.polygon.remove();}
	              var rad = Math.abs(event.point.x - event.downPoint.x)
	              ,   rot = event.point.y - event.downPoint.y;
	              this.polygon = new Path.RegularPolygon(event.downPoint, this.globs.burble.sides, rad);
	              this.polygon.strokeColor = this.globs.color;
	              this.polygon.rotate(rot);
	              this.target.setItem.call(this, this.polygon, false);
	            },
	            arcDrag: function(event){
	              if (event.count > 1){this.arc.remove();}
	              this.arc = new Path();
	              this.arc.add(event.downPoint);
	              this.arc.add(event.point)
	              var mid = this.arc.curves[0].segment2.point.subtract(this.arc.curves[0].segment1.point);
	              var mod = mid.clone();
	              mid.angle -= 90;
	              mod.angle -= 90;
	              mid.length = mod.length = mid.length/3;
	              this.arc.curves[0].handle1 = mid; this.arc.curves[0].handle2 = mod;
	              this.arc.strokeColor = this.globs.color;
	              this.target.setItem.call(this, this.arc, false);
	            },
	            burbleDown : function(event){
	          //    this.burble = new Path.RegularPolygon(event.point, this.globs.burble.sides, 0);
	          //    this.burble.strokeColor = this.globs.color.clone();
	            },
	            burbleDrag : function(event, peter){
	              console.log(peter);
	              if (event.count > 1){this.burble.remove();}
	              var rad = Math.abs(event.point.x - event.downPoint.x)
	              ,   rot = event.point.y - event.downPoint.y;
	              this.burble = new Path.RegularPolygon(event.downPoint, this.globs.burble.sides, rad);
	              //this.burble.insertAbove(project.layers[0].children[0]);
	              _.each(this.burble.curves, function(curve, index){
	                  var midpoint = curve.segment2.point.subtract(curve.segment1.point);
	                  midpoint.angle -= this.globs.burble.angle;
	                  curve.handle1 = midpoint.normalize(rad*.5); // the normalize is the variable w/ radius
	                  curve.handle2 = midpoint.normalize(rad*.5); // call 'em curves gui head
	              }, this)
	              this.burble.rotate(rot);
	              this.burble.strokeColor = this.globs.gradient(event.downPoint,this.burble.bounds.bottomRight);
	               this.target.setItem.call(this, this.burble, false);
	              //this.burble.style = styles.apply(burble, [true])
	            },
	            starDown : function(event){
	            //  this.burble = new Path.RegularPolygon(event.point, this.globs.burble.sides, 0);
	            //  this.burble.strokeColor = this.globs.color.clone();
	            },
	            starDrag : function(event){
	              if (event.count > 1){this.star.remove();}
	              var rad = Math.abs(event.point.x - event.downPoint.x)
	              ,   rot = event.point.y - event.downPoint.y;

	              this.star = new Path.RegularPolygon(event.downPoint,10,rad)
	                  _.each(this.star.segments, function(seg, index){
	                    if (index%2) {var vector = event.downPoint.subtract(seg.point)
	                     seg.point = seg.point.add(vector.normalize(rad*-2))} // normalize = inner radius
	                    else {
	                      return
	                    }
	                   // vector.angle += 360/10
	                  })
	                  this.star.rotate(rot);
	                  this.star.strokeColor = this.globs.color;
	                //  this.star.fillColor = this.globs.gradient(event.downPoint,event.downPoint.add([this.star.bounds.width/2,0]))
	                                this.target.setItem.call(this, this.star, false);
	            }
	    },
	    funs: {
	      select: function(item, fully){
	        if(_.contains(this.globs, item)){return}
	        this.globs.selectRect = new Path.Rectangle(item.bounds);
	        // this.globs.selectRect.selectable = false;
	        this.globs.selectRect.style = {
	          strokeColor : new HSBColor(210,1,1,.2)
	        };
	        this.globs.selectDot = new Path.Circle(item.position, 3);
	        this.globs.selectDot.style = {
	          fillColor: '#000',
	          strokeWidth: 0
	        };
	        item.selected = fully;

	      },
	      deSelect: function(item){
	        this.globs.selectRect.remove();
	        this.globs.selectDot.remove();
	        view.draw();
	        //item.selected = false
	      },
	      dot: function(){
	        for (i in arguments){
	          var dot = new Path.Circle(arguments[i], 3);
	          dot.style = {
	            fillColor: '#000',
	            strokeWidth: 0
	          } 
	        }
	      }
	    },
	    remove:function(){
	      this.layer.remove();
	    },
	    mouseDown:function(){
	      var guments = arguments;
	      return function(event){        
	        for (var i = 0; i<guments.length;++i){
	          guments[i].call(omg.gg, event) 
	        }
	      }
	    },
	    mouseUp:function(event){
	      var guments = arguments;
	      return function(event){  
	        for (var i = 0; i<guments.length;++i){
	          guments[i].call(omg.gg, event) 
	        }
	      }
	    },
	    mouseDrag:function(event){
	      var guments = arguments;
	      return function(event){  
	        for (var i = 0; i<guments.length;++i){
	          guments[i].call(omg.gg, event) 
	        }
	      }
	    },
	    keyDown: function(event){
	      var guments = arguments;
	      return function(event){  
	        for (var i = 0; i<guments.length;++i){
	          guments[i].call(omg.gg, event) 
	        }
	      }
	      },
	    keyUp:   function(event){
	        var guments = arguments;
	        return function(event){  
	          for (var i = 0; i<guments.length;++i){
	            guments[i].call(omg.gg, event) 
	          }
	        }
	        },
	    colorPicker : {
	    		init: function(){
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
	    		      store.set('colors', _.map(this.get, function(obj){
	    		        return [obj.hue, obj.saturation, obj.brightness, obj.alpha]
	    		      }));
	    		      this.set();
	    		      return		      		        
	    		      }
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
	    		    //this.swathii.position = [550,0]
	    		    },
	    		  get: [],
	    		  swathii: new Group(),
	    		  swath:[]
	    		},
	    		Selector : function(){
	    		  this.group = new Group();
	    			this.globs.color = this.pal =  new HSBColor(210, 1, 1);
	    			this.bg = [];
	    			for (i=35;i>0;--i){
	    				this.bg[i] = new Path([3,(i*10)],[358,0+(i*10)]);
	    				this.bg[i].strokeWidth = 5;
	    				this.bg[i].strokeColor = "#c1c2c3";
	    				this.group.addChild(this.bg[i])
	    			}
	    			this.sb = new Path.Circle(180, 180, 180);
	    			this.sb.fillColor = this.pal;
	    			this.circ = new Path.Circle(this.sb.position.x,this.sb.position.y,6);
	    			this.circ.strokeColor = "black";
	    			this.circ.strokeWidth = 3;
	    			var colors = [];
	    			var cycles = 4;
	    			for (var i = 0, l = 360; i < l; i++) {
	    				var brightness = 1;
	    				var hue = i;
	    				var color = new HSBColor(hue, 1, brightness);
	    				colors.push(color);
	    			}

	    			this.hueSelect = new Path.Rectangle(0,375,360,30);
	    			var gradient = new Gradient(colors);
	    			var gradientColor = new GradientColor(gradient, this.hueSelect.bounds.bottomLeft,this.hueSelect.bounds.bottomRight);
	    			this.hueSelect.fillColor = gradientColor;

	    			this.tiny = new Path.Circle([210, 390],3);
	    			this.tiny.fillColor= "white";
	    			this.tiny.strokeColor = "#000";

	    			this.as = new Path.Rectangle(375,-10,30,360);
	    			this.palAlpha1 = this.pal.clone();
	    			this.palAlphaZero = this.pal.clone();
	    			this.palAlphaZero.alpha = 0;
	    			var gradient = new Gradient([[this.palAlphaZero],[this.palAlpha1]]);
	    			var gradientColor = new GradientColor(gradient, this.as.bounds.topLeft,this.as.bounds.bottomLeft);
	    			this.as.fillColor = gradientColor;
	    			this.add = new PointText([367,410]);
	    			this.add.content= "+";
	    			this.add.characterStyle = {
	              fontSize: 60,
	          }
	          this.add.strokeJoin = 'round';
	    			this.add.fillColor = "#000";
	    			this.add.strokeColor = "#fff"

	    			this.addRect = new Path.Rectangle(new Point(367,365), new Size(48,48));
	    			//var cornerSize = new Size(20, 20);
	    			//this.addRect = new Path.RoundRectangle(aRex, cornerSize);

	    			this.addRect.strokeColor = "#fff";
	    			this.addRect.fillColor = "#fff";
	    			this.addRect.fillColor.alpha = 0;

	    			this.group.addChildren([this.as, this.sb, this.hueSelect, this.tiny, this.circ, this.add, this.addRect]);
	    			this.group.selected = false;
	    			this.group.position = view.center;



	    //			this.add = new Path([[25,25],[25,10],[35,10],[25,35]]);
	    		},
	    		remove: function(){
	    	    omg.gg.group.remove();
	    	    this.pallette.swathii.remove();
	    	  },
		  },
	    shapes: {
	      line: function(){
	        this.globs.active = this.shapes.line;
	        this.line = new Path();
	        this.line.strokeColor = this.globs.color;
	        this.tool.onMouseDown = this.mouseDown.call(this, this.events.lineDown);
	        this.tool.onMouseUp = null;
	        this.tool.onMouseDrag = this.mouseDrag.call(this, this.events.lineDrag);
	        this.tool.onKeyDown = null;
	        this.tool.onKeyDown = null;
	      },
	      circle: function(){
	        this.globs.active = this.shapes.circle;
	        this.tool.onMouseDown = null;
	        this.tool.onMouseUp = null;
	        this.tool.onMouseDrag = this.mouseDrag.call(this, this.events.circleDrag);
	        this.tool.onKeyDown = null;
	        this.tool.onKeyDown = null;
	      },
	      arc: function(){
	        this.globs.active = this.shapes.arc;
	        this.tool.onMouseDown = null;
	        this.tool.onMouseUp = null;
	        this.tool.onMouseDrag = this.mouseDrag.call(this, this.events.arcDrag);
	        this.tool.onKeyDown = null;
	        this.tool.onKeyDown = null;
	      },
	      polygon: function(){
	        this.globs.active = this.shapes.polygon;
	        this.tool.onMouseDown = null;
	        this.tool.onMouseUp = null;
	        this.tool.onMouseDrag = this.mouseDrag.call(this, this.events.polyDrag);
	        this.tool.onKeyDown = null;
	        this.tool.onKeyDown = null;
	      },
	      star: function(){
	        this.globs.active = this.shapes.star;
	        this.tool.onMouseDown = null;
	        this.tool.onMouseUp = null;
	        this.tool.onMouseDrag = this.mouseDrag.call(this, this.events.starDrag);
	        this.tool.onKeyDown = null;
	        this.tool.onKeyDown = null;
	      },
	      burst: function(){
	        this.globs.active = this.shapes.burst;
	        this.tool.onMouseDown = null;
	        this.tool.onMouseUp = null;
	        this.tool.onMouseDrag = this.mouseDrag.call(this, this.events.burbleDrag);
	        this.tool.onKeyDown = null;
	        this.tool.onKeyDown = null;
	      }
	    },
	    draw: {
	        init: function(){
	          this.globs.active = this.draw;
	          this.tool.onMouseDown = this.mouseDown.call(this, this.events.draw);
	          this.tool.onMouseUp = this.mouseUp.call(this, this.events.drawDrop);
	          this.tool.onMouseDrag = this.mouseDrag.call(this, this.events.drawDrag);
	          this.tool.onKeyDown = null;
	          this.tool.onKeyDown = null;
	        }
	    },
	    txt:{
	      init: function(check, pos){
	        this.globs.active = this.txt;
	        var pos = pos;
	        //_.bindAll(this);
	        this.txt.settings.apply(this);
	        this.txt.curses.apply(this);
	        if (!check && !this.txt.layer){
	          console.log('yup');
	          this.txt.layer = this.txt.layer || [];
	          } 
	        if(check && this.txt.layer[0].children){
	           _.each(this.txt.layer[0].children, function(l){l.fillColor = this.globs.color.clone()}, this)
	        }
	        this.txt.writer.apply(this, [pos]);
	        this.tool.onMouseDown = this.mouseDown.call(this, this.events.txt_mouseDown);
	        this.tool.onMouseUp = this.mouseUp();
	        this.tool.onMouseDrag = this.mouseDrag();
	        this.tool.onKeyDown = this.keyDown.call(this, this.events.txt_keyDown);
	  			this.tool.onKeyUp = this.keyUp();
	  			view.draw()
	      },
	      curses: function(){
	        if (this.txt.cursor){this.txt.cursor.remove();this.txt.cursor = null;this.txt.curses.apply(this)}
	        else
	        this.txt.cursor = new Path.Rectangle(-10,-10,this.txt.fontSize-2, 22);
	        this.txt.cursor.fillColor = this.globs.color;
	        if (this.txt.text){
	          this.txt.cursor.position = this.txt.text.position.add((12*this.txt.text.content.length)+10,-5);
	        }
	      },
	      remove:function(){
	        this.txt.cursor.remove();
	      },
	      settings:function(){
	        this.txt.font = 'Courier';
	        this.txt.fontSize = 15;
	        this.txt.color = this.globs.color.clone();
	        this.txt.justify = 'left';
	        this.txt.lineSpacing = 0;
	        this.txt.kerning = 0;
	      },
	      writer: function(pos){          
	        this.tProto = new PointText();
	        this.tProto.paragraphStyle.justification = this.txt.justify;
	        this.tProto.characterStyle.fontSize = this.txt.fontSize;
	        this.tProto.characterStyle.font = this.txt.font;
	        this.tProto.fillColor = this.txt.color;
	        if (pos && typeof pos == 'object') {
	          //this.layer[0].fillColor = this.color;
	          //this.text.fillColor = this.color;
	          this.txt.text = this.tProto.clone();
	          this.txt.text.position = pos;
	          this.txt.cursor.position = this.txt.text.position.add((12*this.txt.text.content.length)+10,-5);
	          this.txt.cursor.fillColor = this.txt.color;
	        }  
	        if (this.text){
	          this.text.fillColor = this.txt.color
	        }
	      }
	    },
	    spiral: {
	      go: function(e){
	        e.preventDefault;
	        this.spiral.stopper = 1;
	        this.spiral.spiral.apply(this);
	      },
	      spiral: function (item){
	          var spath = this.target.stud ? this.target.stud : this.target.item.clone();
	          if (this.spiral.stopper > this.spiral.reps ){this.spiral.end.apply(this);return}
	          ++this.spiral.stopper;
	          var p = spath.segments[0].point
	          ,   q = _.last(spath.segments).point
	          ,   j = p
	          ,   g = q
	          ,   qp = q.subtract(j);

	          if(spath.closed){
	            g = q = p;
	            this.target.center = p;
	            qp = q.subtract(j)
	          }

	          for (i = 1; i < spath.segments.length - 1; ++i){
	            var ty = spath.segments[i].point.subtract(j), ti = spath.segments[i].point.add(j);
	            ty.angle += this.spiral.angle;
	            ty.length *= this.spiral.mx;
	            spath.segments[i].point = g.add(ty);
	            spath.segments[i].handleIn.angle += this.spiral.angle;
	            spath.segments[i].handleOut.angle += this.spiral.angle;
	            spath.segments[i].handleIn.length *= this.spiral.mx;
	            spath.segments[i].handleOut.length *= this.spiral.mx;
	          }

	          spath.segments[0].point = q;
	          spath.segments[0].handleIn.angle += this.spiral.angle;
	          spath.segments[0].handleOut.angle += this.spiral.angle;
	          spath.segments[0].handleIn.length *= this.spiral.mx;
	          spath.segments[0].handleOut.length *= this.spiral.mx;
	          qp.angle += this.spiral.angle;
	            qp.length *= this.spiral.mx;
	          _.last(spath.segments).point = q.add(qp);
	          _.last(spath.segments).handleIn.angle += this.spiral.angle;
	          _.last(spath.segments).handleOut.angle += this.spiral.angle;
	          _.last(spath.segments).handleIn.length *= this.spiral.mx;
	          _.last(spath.segments).handleOut.length *= this.spiral.mx;
	          spath.simplify();
	          this.target.item.addSegments(spath.segments);
	          this.target.stud = spath;
	          window.setTimeout(this.spiral.spiral.apply(this),12)
	        },
	        end: function (){
	          console.log(this.target.item.segments.length)
	          this.target.stud.remove();
	          this.target.stud = null;
	          //this.target.item.simplify();
	          this.target.item.strokeColor = this.globs.gradient( this.target.item.bounds.center,  this.target.item.bounds.bottomRight )
	          view.draw();
	        }
	    }
	  }
	  omg.gg.init();
	};initGG()
	function update(x){
	  console.log(arguments)
	  omg.gg.spiral.angle = parseFloat(document.getElementById('angle').value);
	  omg.gg.spiral.mx = parseFloat(document.getElementById('mx').value);
	  omg.gg.spiral.reps = parseFloat(document.getElementById('reps').value);
	  omg.gg.spiral.go.apply(omg.gg, [x])
	}
}

module.exports.create = function(){
	
}