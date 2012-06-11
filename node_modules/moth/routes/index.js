var Person = require('../lib/people.js')
	, personDB = require('../lib/personDB.js')
;


exports.index = function(req, res){

  res.render('index', { layout:true, title: '' })

};


exports.create = function(req, res){

	var person = new Person(req.body)
	
	var exists = personDB.create(person)
		
	if(exists){

		res.render('create', {title: 'That email is already registered, or there was an error'});

		return

	}
	
	else

		req.session._id = person._id;

  	res.render('profile', { title: 'Welcome', info: JSON.stringify(person) });

		return

};


exports.verify = function(req, res){

	var verification = function(err, result){
		if(err){console.log(err, result)}
		switch (typeof result) {
			case 'string':
				res.render('index', {title: result})
			break;
			case 'object':
				res.render('profile', {title: 'welcome back ' + result.fname + ' ' + result.lname, info: JSON.stringify(result)})
			break;
			case 'boolean':
				(result) ?
				res.render('index', {title: 'unkown error'}) :
				res.render('index', {title: 'wrong email or password'})			
			break;
		}		
	}
	
	/* down here */
	
	personDB.verify(req.body, verification)

};


exports.join = function(req, res){

  res.render('create', { title: 'Authentification' })

};