var steps = [], moves = [], clock = 10000, points = 0
	,	btns = ['scat_01', 'scat_02', 'scat_03', 'scat_04', 'scat_05', 'scat_06', 'scat_07', 'scat_08', 'scat_09']
	,	startBtn = document.getElementById('startBtn')
 	, Pendulum = function(min, max, startVal, incrby){
			this.min = min;
			this.max = max;
			this.val = startVal;
			this.incrby = incrby;
			this.direction = true;
	
			return function(){
				switch (this.direction){
					case true:
						if(this.val < this.max)
							return this.val += this.incrby
							else 
								this.direction = false
								return this.val
					break;
					case false:
						if(this.val > this.min)
							return this.val -= this.incrby
						else 
							this.direction = true
							return this.val
					break;
				}
				return this.x ? this.x = false : this.x = true
			}	
		}
	,	swing = Pendulum(0, btns.length - 1, btns.length - 1, 1)
	, swingSwing = function(){
			return swing()
		}
	,	ev = new window.EventEmitter2({
      wildcard: false,
      delimiter: '.', 
			maxListeners: 1
    })
	,	styles = document.getElementById('styles')
	, scoreBoard = document.getElementById('score')
	,	gameOn = document.getElementById('newGame')
;

var t = setInterval(swingSwing, 27);

var burp = document.getElementById('burp');
burp.load();

var h = 180;
var loadCount = 9;
btns.forEach(function(b){
	var wav = document.createElement('audio');
	wav.addEventListener('canplaythrough', function(x){console.log(x)}, false);

	wav.src= '../audio/'+b+'.wav';
	wav.id=b;
	wav.addEventListener('ended', function(){ev.emit(b)});
	var pad = document.createElement('div');
	pad.classList.add('pad');
	
	var el = document.createElement('div');
	el.classList.add(b);
	el.classList.add('button');
	el.id = b;
	el.sonidol = wav; 
	var t = h += (360 / btns.length);
	var mozGrad = '-moz-linear-gradient(left, hsla('+(t)+', 90%, 60%, .6) 40%, hsla('+(t)+', 60%, 80%, .6))';
	styles.textContent = '.'+b+'{ background-image: '+ mozGrad +';\r\n background-image: -webkit-linear-gradient(left, hsla('+(t)+', 90%, 60%, .6) 40%, hsla('+(t)+', 60%, 80%, .6))}' + '\r\n' + styles.textContent;
	
	pad.appendChild(el);
	document.getElementById('game').appendChild(pad)
	
	el.addEventListener('mousedown', function(e){
		var self = this;
		self.classList.add('glowing');
		self.sonidol.currentTime = 0;
		self.sonidol.play();
		ev.emit('click', b);
	}, false);
	el.addEventListener('mouseup', function(){
		this.classList.remove('glowing')
	}, false)
});


startBtn.onclick = function(){
	newGame()
};

function newGame(){
	gameOn.classList.remove('hide');
	setTimeout(function(){
		gameOn.classList.add('hide');
			setTimeout(function(){
				ev.removeAllListeners('click');
				steps = [], points = 0;
				advance()
			}, 267)
	},667)
};

function advance(){
	var s = btns[swing()];
	if(s === steps[steps.length-1]){ // no repeats cheat
		advance()
	}
	else {
		steps.push(s);
		playSteps()
		playTurn()	
	}
};

function playSteps(cb){
	var step = 0, elem = undefined;
	
	playSoundAndLightUp()
		
	function playSoundAndLightUp(){
		if(step < steps.length){
			var el = document.getElementById(steps[step]);
			el.sonidol.currentTime = 0;
			el.sonidol.play()
			el.classList.add('glowing');
			setTimeout(function(){el.classList.remove('glowing')},338)
			++step;
			ev.once(el.sonidol.id, function(){
			})
			setTimeout(playSoundAndLightUp, 667);
		}
		else {
		}
	}
};

function playTurn(){
	var set = steps.slice(0)
	,	x = 0
	, correct = function(){return set[x]}
;
		
	function isCorrect(data){
		if(data != correct()){
			burp.play()
			setTimeout(newGame, 367)
		}
		else {
			++x; ++points;
			scoreBoard.textContent = 'Score: ' + points;
			if(x === steps.length){
				ev.once(data, function(){
					advance()
				})
			}
			else {
				ev.once('click', isCorrect)					
			}
		}
	}

	ev.once('click', isCorrect)

};