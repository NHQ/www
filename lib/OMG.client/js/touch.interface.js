window.onload = function(){
	
	var io = io.connect('http://localhost:8020')
	;
	
	
	
	Touchy(document.body, {
		one: function(hand, finger){
			
			io.emit('touch', {hand, finder})
			
		}
	})
}