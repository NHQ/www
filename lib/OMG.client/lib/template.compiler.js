module.exports = function(resolvedPath){

	var jadePath = resolvedPath + '/html/templates/'
	,		stylesPath = resolvedPath + '/css/templates/'
	,		imagePath = resolvedPath + '/images'
	,		fs = require('fs')
	,		watcher = fs
	,		jade = require('jade')
	,		styles = require('stylus')
	,		_ = require('underscore')
	,		auth = true
	,		jadeLocals = {
				elemenos : ['div', 'a', 'p', 'blockquote', 'textarea', 'ul', 'li', 'ol', 'form', 'input', 'button', 'img', 'audio', 'video', 'canvas', 'header', 'iframe'],
				cssProps : ['background', 'height', 'width', 'position', 'color', 'border-radius', 'border', 'top', 'left', 'right', 'bottom', 'line-height', 'font-size', 'font-family', 'padding', 'margin', 'box-shadow', 'text-shadow', 'z-index', 'text-decoration', 'zoom', 'display', 'visibility', 'transform', 'transform-origin', 'transform-style', 'backface-visibility', 'transition', 'animation'],
				auth: 'false',
				partial: function(str, opts){
					var temp = fs.readFileSync(jadePath + str + '.jade', 'utf8')
					,		jadefn = jade.compile(temp, {filename: jadePath + str + '.jade', pretty: true})
					,		opts = opts
					,		html = jadefn(opts)
					;
					return html
				},
				getSVG: function(str, height, width){
					if(!height) var height = 100;
					if(!width) var width = 100;
					var stringSVG = fs.readFileSync(imagePath + '/' + str + '.svg', 'utf8').replace('{{height}}', height + 'px').replace('{{width}}', width + 'px')
					return stringSVG
				}
			}
	;

	readFolder(jadePath);
	readFolder(stylesPath);

	function switchBoard(file){

		var name = file.slice(file.lastIndexOf('/') + 1, file.lastIndexOf('.'))
		,		ext = file.slice(file.lastIndexOf('.') + 1);

		switch(ext) {

			case 'html':
			
			  var html = fs.readFileSync(file)

				fs.writeFileSync(resolvedPath + '/html/' + name + '.html',  html, 'utf8')

			break;

			case 'jade':

				jadeTempl = fs.readFileSync(file, 'utf8')

				jadefn = jade.compile(jadeTempl, {filename: file, pretty: true})

				html = jadefn(jadeLocals)

				fs.writeFileSync(resolvedPath + '/html/' + name + '.html', html, 'utf8')

			break;

			case 'styl':

				var css = fs.readFileSync(file, 'utf8');

				styles(css)
					.render(function(err, css){
				  	if (err) throw err;
						else 
						fs.writeFileSync(resolvedPath + '/css/' + name + '.css', css, 'utf8')
					});

			break;

		};

	};

	function readFolder(path) {

		var path = path
		,		f = fs.readdirSync(path)
		;

		f.forEach(watchFile)

		function watchFile(file) {

			var file = file
			,		fileName = path + file
			;

			watch = fs.watch(fileName, function(ev){})

			switchBoard(fileName)

			watch.on('change', upDateFile)

			function upDateFile(){

				readFolder(jadePath);
				readFolder(stylesPath);

			};

		};

	};

	
}

