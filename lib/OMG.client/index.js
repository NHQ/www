var writer = require('./lib/writer.js')
,		init = require('./lib/init.js')
,		apps = ['Publish', 'Aggregate', 'Write', 'Visualize', 'Files', 'Profile', 'Configure']
,		css = require('css')
,		svg = require('svg')
,		bjade = require("browserijade").renderFile
,		playground = require('./lib/playground.js')
;

module.exports = app;

function app(window) {
		var self = this
	  ,   winX = window.innerWidth
	  ,   winY = window.innerHeight
	  ;
		
		window.OMG = window.omg = this;
				
		this.apps = apps;
		
		this.errorHandler = function(e){
				console.log('errrrr', e)
				
			  var msg = '';
				
			  switch (e.code) {
			    case FileError.QUOTA_EXCEEDED_ERR:
			      msg = 'QUOTA_EXCEEDED_ERR';
			      break;
			    case FileError.NOT_FOUND_ERR:
			      msg = 'NOT_FOUND_ERR';
			      break;
			    case FileError.SECURITY_ERR:
			      msg = 'SECURITY_ERR';
			      break;
			    case FileError.INVALID_MODIFICATION_ERR:
			      msg = 'INVALID_MODIFICATION_ERR';
			      break;
			    case FileError.INVALID_STATE_ERR:
			      msg = 'INVALID_STATE_ERR';
			      break;
			    default:
			      msg = 'Unknown Error';
						console.log(e)
			      break;
			  };
		};
	  this.user = {
			name: 'johnny',
			age : 31
		};
		this.css = css;
		this.svg = svg;
		this.jade = bjade;
		this.frontis = $('body').html()
		this.writer = writer;
		this.playground = new playground();
		this.init = init;
//		this.events = require('./lib/events.js');
//		this.init = require('./lib/init')
//		this.writer();
		return this
};

