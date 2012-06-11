(function(){
	var winX = window.innerWidth, winY = window.innerHeight;
	paper.install(window);
	paper.setup('bg');
	view.viewSize = new Size([winX, winY]);
	
	var bg = new Path.Rectangle(view.viewSize);
	bg.fillColor = new HSLColor(1,.6, .6);
		
	var pts = []
		, paths = []
		,	featureLength = 60
		, startingPoint = new Point(600,600)
	;
		
	function newPath(pt, angle){
		var path = new Path(pt);
		path._vector = new Point({
		        angle: angle,
		        length: featureLength
		    });
		path.strokeWidth = 2;
		path.strokeColor = 'red';
		paths.push(path)
		return path; 
	};
	
	
	var p = newPath(startingPoint, 60), p2 = newPath(startingPoint, 0);

	var pendulum = function(){
		this.min = -180
		this.max = 180
		this.val = 0
		this.incrby = 60
		this.direction = true
		
		return function(){
			switch (this.direction){
				case true:
					if(this.val <= this.max)
						return this.val += this.incrby
						else 
							this.direction = false
							return this.val
				break;
				case false:
					if(this.val >= this.min)
						return this.val -= this.incrby
					else 
						this.direction = true
						return this.val
				break;
			}
			if(this.val >= this.max)
			return this.x ? this.x = false : this.x = true
		}	
	}()
	
	var Cycle = function(options){
		var options = options;
		console.log(options)
		return function(){
				options.push(options.shift())
				return options[0] 
		}
	}
	
	var cycle = new Cycle([60, -60, 180, 60, -60])

	function frame(){
		var cyc = cycle();

		for(var x =  0; x < 3; ++x){
			p._vector.angle += cyc;
			
			p.lineBy(p._vector)
		}
		view.draw()	
		
	}
	var t = setInterval(function(){}, 4)
	var q = setInterval(frame, 5);


	setTimeout(function(){view.onFrame = null, clearInterval(q), clearInterval(t)}, 5500)
		
}())
