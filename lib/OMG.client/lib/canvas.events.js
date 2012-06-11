module.exports = function(){
	return {
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
					console.log(this.sb);
  				var bright = Math.abs((event.point.x - this.sb.position.x + 180)) / 360;
  				var sat = Math.abs((event.point.y - this.sb.position.y + 180)) / 360;
  				this.sb.fillColor.saturation = sat;
  				this.sb.fillColor.lightness =  bright;
  				this.globs.color = this.pal.lightness = bright;
  				this.globs.color = this.pal.saturation = sat;
  				this.palAlphaZero.saturation = sat;
  				this.palAlphaZero.lightness = bright;
  				this.palAlpha1.saturation = sat;
  				this.palAlpha1.lightness = bright;
					omg.eve.emit('palTest', this.pal.toCssString())
  			}
  			if (this.hueSelect.hitTest(event.point, {fill:true}) || this.tiny.hitTest(event.point, {fill:true})){
  				this.sb.fillColor = this.pal.clone();
					var val = ((event.point.x - this.hueSelect.bounds.left) * 360) / (.88 * this.size[0]);
  				this.pal.hue = val;
  				this.sb.fillColor.hue = val;
  				this.tiny.position.x = event.point.x
  				this.palAlphaZero.hue = val;
  				this.palAlpha1.hue = val;
					omg.eve.emit('palTest', this.pal.toCssString())

  			}
  			if (this.as.hitTest(event.point, {fill:true})){
  				this.pal.alpha = Math.abs((event.point.x - this.as.bounds.left) / (.88 * this.size[0]));
  				this.sb.alpha =  Math.abs((event.point.x - this.as.bounds.left) / (.88 * this.size[0]));
					omg.eve.emit('palTest', this.pal.toCssString())
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

	  			if (this.hueSelect.hitTest(event.point, {fill:true})){
    				this.sb.fillColor = this.pal.clone();
						var val = ((event.point.x - this.hueSelect.bounds.left) * 360) / (.88 * this.size[0]);
    				this.pal.hue = val;
    				this.sb.fillColor.hue = val;
    				this.tiny.position.x = event.point.x
    				this.palAlphaZero.hue = val;
    				this.palAlpha1.hue = val;
						omg.eve.emit('palTest', this.pal.toCssString())

    			}
    			if (this.as.hitTest(event.point, {fill:true})){
    				this.pal.alpha = Math.abs((event.point.x - this.as.bounds.left) / (.88 * this.size[0]));
    				this.sb.alpha =  Math.abs((event.point.x - this.as.bounds.left) / (.88 * this.size[0]));
						omg.eve.emit('palTest', this.pal.toCssString())

					}
    			if (this.sb.hitTest(event.point, {fill:true})){
    				this.circ.position = event.point;
	  				var bright = Math.abs((event.point.x - this.sb.position.x + 180)) / 360;
	  				var sat = Math.abs((event.point.y - this.sb.position.y + 180)) / 360;
    				this.sb.fillColor.saturation = sat;
    				this.sb.fillColor.lightness =  bright;
    				this.pal.lightness = bright;
    				this.pal.saturation = sat;
    				this.palAlphaZero.saturation = sat;
    				this.palAlphaZero.lightness = bright;
    				this.palAlpha1.saturation = sat;
    				this.palAlpha1.lightness = bright;
						omg.eve.emit('palTest', this.pal.toCssString())
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
			};
};