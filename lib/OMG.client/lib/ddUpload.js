window.URL = window.URL || window.webkitURL;

module.exports = function(id, eventName, upload, saveLocal){
	var body = document.body // getElementById(id);
	$('body').one("dragenter", hey);
	$('body').one("dragover", hey);
	body.addEventListener('drop', cancel, false);
	var c = document.createElement('div');

	function hey(e){
		e.preventDefault();
		c.classList.add('curtain');
		c.id = 'curtain';
		c.style.display = 'block';
		document.body.appendChild(c);
		c.addEventListener('dragleave', abort, false);
		c.addEventListener('drop', drop, false)
	};

	function abort(e){
		e.preventDefault();
		console.log('w',e);
		c.style.display = 'none';
		document.body.removeChild(c);
		$('body').one("dragenter", hey);
	};

	function cancel (e) {		
	  e.preventDefault()
	  return false
	};
	
	function drop (e) {
	  e.preventDefault();
		c.style.display = 'none';
		document.body.removeChild(c);
	  var dt = e.dataTransfer;
	  var files = dt.files;
		for(var x = 0; x < files.length; ++x){
  	  var File = files[x];
  	  readFile(File);
		}
		$('body').one("dragenter", hey);
		$('body').one("dragover", hey);
	};
	
	function readFile (file) {

		var file = file
		 	,	name = file.name
			, mime = file.type
		 	,	type = file.type.match('image') ? 'img' : file.type.slice(0,file.type.indexOf('/'))
		 	,	size = file.size
			,	reader = new FileReader()
		;
		
		var elem = document.createElement(type);		
				elem.setAttribute('controls', 'controls');
				elem.setAttribute('type', mime);
				elem.onload = function(){omg.eve.emit(eventName, null, elem)};
				elem.src = window.URL.createObjectURL(file);
				
				if(upload){}
				if(saveLocal){}
  };	
};