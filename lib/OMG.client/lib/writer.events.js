var util = require('./client.utils.js')
,		Media = require('./media.js')
,		winX = util.winX
,		winY = util.winY
,		spaceTime = util.spaceTime
;

exports.newWriter = function(){ // this one feeld ugly

	var self = OMG
	,		tempMetaFileName = omg.user.name.replace(/\s/g, '_') + '.' + spaceTime() + '.meta.json'
	,		tempFileName = omg.user.name.replace(/\s/g, '_') + '.' + spaceTime() + '.json'
	,		file = new Media(
				{
					type: 'text', 
					owner: omg.user.name, 
					app: 'writer',
					location: '/temp/' + tempFileName
				})
	;
	
	omg.metaLocal[tempMetaFileName] = file;
	
	util.metaDbSave();
	
	function initWriter(e, blob){
		
		if(e) omg.errorHandler(e);
		
		file.blob = blob;
		
		omg.fs.readString(blob, 'utf-8', function(e, txt){
						
			file.textFile = txt;
			
			exports.writerFileLoaded(e, file)
			
		})		
								
	};
	
	omg.eve.on('newFileReady', initWriter);

	var nish = function(){

		util.yodel(omg.fs.writeFile('/temp/' + tempMetaFileName, JSON.stringify(file), 'utf-8', util.yodel(function(e,r){console.log(e,r)})));

		omg.fs.writeFile('/temp/' + tempFileName, 'Nothing has been written yet.','utf-8', omg.eve.remit('newFileReady'))

	};
	
	// fin 
	
	nish();	

};

exports.writerFileLoaded = function(e, file){
	
	omg.writer(e, file) // <--- ---- ---- ----- ---- an end point
	
};

exports.saveWriter = function(file){
	
	omg.fs.writeFile(file.location, file.textFile, 'utf-8', omg.omniMessage);
	
};

exports.loadWriter = function(file){
	
	omg.fs.readFile(file.location, 'utf-8', function(e, txt){
		
		if(e) omg.errorHandler(e);
		
		file.textFile = txt;
		
		exports.writerFileLoaded(e, file)
		
	});

};

exports.getMetaFile = function(e){
	
	var metaFile = omg.metaLocal[this.id];
	
	exports.loadWriter(metaFile)
	
};

exports.deleteWriter = function(file){
	
};

exports.setFontSize = function(e){
	console.log('yodel')
	var self = omg
	,		ole = self.writer.editor.renderer.lineHeight
	,		editor = self.writer.editor
	;

  self.user.writer.setFontSize = parseInt(this.value);
  self.writer.editor.setFontSize(this.value + 'px')
	self.writer.editor.resize() 

	$('#editor').css({
    left: ((winX - self.user.writer.fullSize()) / 2) + 'px',
    right : ((winX - self.user.writer.fullSize()) / 2) - 5 + 'px',
		top: (winY / 2) - (self.writer.editor.renderer.lineHeight * self.writer.editor.getSession().getDocument().getLength())
  });
	self.writer.editor.resize() 	
	$('.ace_sb').css('visibility','hidden');

	if((editor.getSession().getDocument().getLength() * editor.renderer.lineHeight + editor.renderer.scrollBar.getWidth())  >= (winY / 2) - 10){
		$('#editor').css({
			top: 10
		})
		if (self.user.writer.showScrollX)
			$('.ace_sb').css('visibility','visible');
	}
	self.writer.editor.resize() 	
  self.writer.editor.focus()
};

exports.returnHome = function(){
	$('body').prepend('<style>'+ omg.css['omg.css'] +'</style>')
	$('body').empty().append(omg.frontis) // loadng html template	
};

exports.setTextMode = function(e){
console.log('GET')
	$.get('/lib/ace.build/build/src/mode-'+this.id+'.js').complete(function(e,r,b){
		var		TextMode = ace.require("ace/mode/" + this.value).Mode;
	  omg.writer.editor.getSession().setMode(new TextMode());		
	})

  
};

exports.showGutter = function(e){
	var self = omg;
	self.user.writer.setShowGutter = this.checked;
	self.writer.editor.renderer.setShowGutter(this.checked)
};

exports.setHighlightActiveLine = function(e){
	var self = OMG;
	self.user.writer.setHighlightActiveLine = this.checked;
	self.writer.editor.setHighlightActiveLine(this.checked)
};

exports.showScrollX = function(e){
	var self = OMG;
	self.user.writer.showScrollX = this.checked;
	var bool = this.checked ? 'visible' : 'hidden';
	var test = require('./check.js')
	test('ahoy')
	$('.ace_sb').css('visibility', bool);
};

exports.createDocument = function(e){
};