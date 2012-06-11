var fs = require('fs')
,		fileStr = fs.readFileSync('./html/index.html', 'utf8')
;

module.exports = function(apps){
	return {apps: apps, str : fileStr}
}
