// NOTE: this is for checking the file system for previous use, the metadb.json, 


exports.initFS = function(err, fs){
	if(err) console.log(err);
	omg.fs.readdir('', checkUpLoad)
	
	function checkUpLoad(err, res){

		function truthTest(e){
			console.log(e)
			return e === '/metadb.json'
		
		};
		
		if (_.any(res, truthTest)){
			
			omg.fs.readFile('/metadb.json', 'utf8', exports.readyDB);
		
		}
		
		else {
			
			// creating a new file system
			
			var metadb = {
				
				created: new Date().getTime(),
				owner: omg.user.name,
				files: [],
				sets: [],
				lastUpdate: new Date().getTime()

			};
			
			omg.fs.mkdir('/temp', omg.errorHandler);
			omg.fs.mkdir('/draftsman', JSON.stringify(metadb), omg.errorHandler);
			omg.fs.mkdir('/publications', JSON.stringify(metadb), omg.errorHandler);
			omg.fs.mkdir('/media', JSON.stringify(metadb), omg.errorHandler);
			
			omg.fs.writeFile('/metadb.json', JSON.stringify(metadb), 'utf8', exports.readyDB);

		}

	};

};

exports.readyDB = function(error, read, buffer){	

	var reader = new FileReader();

	reader.onload = function(db){
		
//		console.log(db.target.result)
		
		omg.metaLocal = JSON.parse(db.target.result);

		omg.eve.emit('readyFS') // < --- endpoint

	};

	reader.onerror = omg.errorHandler;
	
	reader.readAsText(buffer || read);

};

