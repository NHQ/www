module.exports = function(){
	console.log('yodel')
	$('head').append('<style>'+ omg.css['omg.css'] +'</style>')
	$('body').empty().append(omg.jade('frontis'), {auth:'false'}) // loadng html template		}
};
