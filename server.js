var connect = require('connect')
,		fs = require('fs')
,		server = connect()
,		parseURL = require('url').parse
,		path = require('path')
,		path = require('path')
,		resolvedPath = path.resolve('./')
,		auth = require('moth')
,		johnny = require('./sites/johnny/server.js')
;

server.use(function(req, res, next){
	req.__Server = server;
	next();
});
server.use(connect.cookieParser('keyboard cat'))
			.use(connect.bodyParser())
			.use(function(req, res, next){
				req.domani = req.headers.host.split('.');
				johnny(req, res);
//				next();
			});
//			.use(auth)
			
server.listen(3009, '127.0.0.1');

function Static (req, res){
	
	return connect.static('/public')
}