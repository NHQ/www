var	events = require('./init.events.js')
;

module.exports = function(){	
	// init event mechanisms
	var self = this;
	
	this.eve = new window.EventEmitter2({
	      wildcard: false, // should the event emitter use wildcards.
	      delimiter: '.', // the delimiter used to segment namespaces, defaults to `.`.
	      maxListeners: 20, // the max number of listeners that can be assigned to an event, defaults to 10.
	    });
		
	$("head").append("<link rel='stylesheet' type='text/css' href='/css/writer.css' />");
	
	$('head').append('<script src="/lib/ace.build/build/src/ace-noconflict.js" type="text/javascript" charset="utf-8"></script>')
	
	paper.install(window);
	
	this.omniMessage = function(e, r){
		if(e) this.errorHandler(e);
		console.log(r) // a message from the system
	}
	
	this.eve.on('error', this.errorHandler)
	
	this.eve.on('newListener', function(e){console.log(e)})

	this.eve.on('readyFS', this.omniMessage) // <-- endpoint. **NOTICE**! If we had actual files and sets, we would index the metadb file and init the whole app. Currently: creates new writer

//	this.eve.on('readyFS', this.writer.create) // <-- endpoint. **NOTICE**! If we had actual files and sets, we would index the metadb file and init the whole app. Currently: creates new writer
	
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

	window.requestFileSystem(window.PERSISTENT, 50 * 1024 * 1024, next, this.errorHandler)
	
	function next(){
	
	self.fs = new WebFS(window.requestFileSystem || window.webkitRequestFileSystem);
	
	self.fs.setFileSystem(self.fs.PERSISTENT, 50, events.initFS, self.errorHandler)
		
	}
		
};


















/* OLD

	function initFS(self){
		window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
		var self = self;
		function successCallback(e){
			self.fs.init({persistent: true, size: 50 * 1024 * 1024}, events.initFS, function(e){console.log(e)});
		};
		window.requestFileSystem(PERSISTENT, 50 * 1024 *1024, successCallback, function(e){console.log(e)})
	};
	
	initFS(this)

*/
