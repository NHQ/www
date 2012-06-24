
var connect = require('connect')
,		fs = require('fs')
,		server = connect()
,		parseURL = require('url').parse
,		path = require('path')
,		compile = require('jade.compiler')(__dirname)
,		styles = require('stylus')
;	

var css = fs.readFileSync(__dirname + '/public/wildstyle.styl', 'utf8');

styles(css)
	.render(function(err, css){
  	if (err) throw err;
		else 
		fs.writeFileSync(__dirname + '/public/wildstyle.css', css, 'utf8')
	});


var Static = connect.static(__dirname + '/public');

var authentication = function(req, res){
		
	var Routes = function(){
		
		var p = parseURL(req.url);

		if (req.method === 'GET')
		{
		
			var html = compile('layout', {body: 'index', title: 'This is my resume'});
						
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
