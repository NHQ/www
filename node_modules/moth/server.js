var connect = require('connect')
,		fs = require('fs')
,		server = connect()
,		parseURL = require('url').parse
,		path = require('path')
,		Person = require('./lib/people.js')
,	 	personDB = require('./lib/personDB.js')
,		compile = require('../jade.compiler')
,		path = require('path')
,		resolvedPath = path.resolve('./', '../authentication')
;	

var s = connect.static(resolvedPath + '/public');

var authentication = function(req, res){
		
	var Auth = function(){
		
		var p = parseURL(req.url);

		if (req.method === 'GET')
		{
		
			res.writeHead('200', {
				'Content-type' : 'text/html'
			});
		
			switch (p.pathname.toLowerCase())
			{
				case '/':
					var html = compile('layout', {body: 'index', title: 'You got SWerved!'});
								
					res.write(html);
								
					res.end();
				break;

				case '/join':

					var html = compile('layout', {body: 'create', title: 'You got SWerved!'});

					res.write(html)
				
					res.end()

				break;
			}
				
		}
	
		else if (req.method === 'POST')
		{
		
			res.writeHead('301');
		
			switch (p.pathname.toLowerCase())
			{
				case '/':
			
					var verification = function(err, result){
						if(err){console.log('ERROR ' + err, 'RESULT: ' + result); return}
						switch (typeof result) {
							case 'string': // wrong PW
							
								res.write(compile('layout', {body: 'index', title: result}))
							
								res.end()
						
							break;
							case 'object': // correct login
						
								req.session.auth = true;
							
								req.session.user = result._id;
						
								res.write(compile('layout', {body: 'profile', title: 'welcome back ' + result.fname + ' ' + result.lname, info: JSON.stringify(result)}))
							
								res.end()
							
							break;
							case 'boolean': // incorrect email or login or something
						
								var title = result ? 'unknown error' : 'wrong email or password';

								res.write(compile('layout', {body: 'index', title: title}));

								res.end();
							
							break;
						}		
					}

					/* down here */

					personDB.verify(req.body, verification)
				
				break;

				case '/create':

					var create = function(req, res){

						var person = new Person(req.body)

						var exists = personDB.create(person)

						if(exists){

							res.write(compile('layout', {body: 'create', title: 'That email is already registered, or there was an error'}));

							res.end();
						
							return

						}

						else {
						

							req.session._id = person._id;

							res.write(compile('layout', {body: 'profile', title: 'Welcome', info: JSON.stringify(person) }));

							res.end();

							return
						
						}

					};
				
					create(req, res);
				
				break;
			}
		}
	};
	
	s(req, res, Auth);
	
};


module.exports = authentication;
