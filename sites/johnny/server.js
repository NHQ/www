mono
function what(x){ 
	this.z = x;
	var that = this;
	function abadad(){
		this.__proto__ = that;
		return what
	};
	return new abadad()
}

var connect = require('connect')
,		fs = require('fs')
,		server = connect()
,		parseURL = require('url').parse
,		path = require('path')
,		compile = require('jade.compiler')(__dirname)
;	

var Static = connect.static(__dirname + '/public');

var authentication = function(req, res){
		
	var Routes = function(){
		
		var p = parseURL(req.url);

		if (req.method === 'GET')
		{
		
			var html = compile('layout', {body: 'index', title: 'You got SWerved!'});
						
			res.write(html);
						
			res.end();
				
		}
	
		else if (req.method === 'POST')
		{
		
			
		}
	};
	
	Static(req, res, Routes);
	
};


module.exports = authentication;
