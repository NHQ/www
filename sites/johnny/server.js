var connect = require('connect')
,		fs = require('fs')
,		server = connect()
,		parseURL = require('url').parse
,		q = require('querystring')
,		path = require('path')
,		compile = require('jade.compiler')(__dirname)
,		styles = require('stylus')
,		twilioAPI = require('twilio-api')
,		creds = require(__dirname + '/text/twi_creds.js')
,		client = new twilioAPI.Client(creds.twi_sid, creds.twi_token) 
;	

var twilioNumber = '+15104601907';

console.log(client)

client.account.getApplication(creds.app_sid, function(err, app) {
	console.log(app);
	app.sendSMS(twilioNumber, '3125323639', 'yodel homei', function(er,re){
		console.log(er, re)
	})

});

var Static = connect.static(__dirname + '/public');

var Site = function(req, res){
	
	var req = req, res = res;
		
	var Routes = function(){
		
		var p = parseURL(req.url);

		if(req.url.match('/session')){
			res.setHeader('Content-Type', 'text/html')
			res.writeHead('200');
			res.end(req.session.id);
			return;
		}
		
		if(req.url.match('/txt')){
			res.setHeader('Content-Type', 'text/html')
			res.writeHead('200');
			res.end('true');
			var msg = q.parse(p.query).msg;
		}
		
		if(req.url.match('/incoming')){
			var data = q.parse(p.query);
			console.log(data);
			res.setHeader('Content-Type', 'text/xml');
			res.writeHead('200');
			res.end('<?xml version="1.0" encoding="UTF-8" ?>'  
							+ '<Response></Response>');
		}
		
	};
	
	var session = function(req, res){
		
	}
	
	Static(req, res, Routes);
	
};


module.exports = Site;
