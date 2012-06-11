var win = require('./client.utils.js')
,		events = require('./writer.events.js')
;

// NOTES: next up fix it up with the file system, local storage, user object

// NOTE: fix multi-line delete **BUG**

// NOTE: apps should usually have a prototypical file/document as argument 

module.exports = Writer;

function Writer(e, file){
				
				if(e){omg.errorHandler(e)}
				
     		var winX = win.winX
				,		winY = win.winY
				,		self = omg
				;
				
//				console.log(file)
				
				omg.writer.slogan = 'Zero Friction Drafting for Text or Image';
		/*		
				
				var jadeLocals = function(selection) {
					switch (selection) {
						case 'height':
							break
						;
						case 'width':
							break
						;
						case 'icon'
							break
						;
						case 'height'
							break
						;
						case 'height'
							break
						;
						case 'height'
							break
						;
					}
				}
	*/			
				
				
				var writer = self.user.writer = self.user.writer || null;
				$('#box').fadeOut(350);
				$('body').empty().prepend('<style type="text/css">'+ omg.css['writer.options.css'] + '</style>').append(omg.jade('writer', {getSVG: win.getSVG}))
				tempLoaded()
				function tempLoaded(e,r){
					console.log(e,r)
					var		TextMode = ace.require("ace/mode/text").Mode;
					
									document.title = 'Ωwriter';

		//							$('#editor').empty();

									$('#showOptions').click(function(e){
										$('#options').fadeToggle(150)
									})


									if(!omg.user.writer){
										omg.user.writer = {};  // new Person() ?
										omg.user.writer.showScrollX = false;
										omg.user.writer.setFontSize = 14;
										omg.user.writer.setHighlightActiveLine = true;
										omg.user.writer.showGutter = true;
										omg.user.writer.autoSave = true;
									}

									omg.user.writer.currentFile = file;

					        // All google fonts JSON = https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCC3EWAlPbKZ1dYeq9zNovCmRh35PL2GQQ

									// this is init stuff
					        var editor = omg.writer.editor = ace.edit("editor");
					        editor.getSession().setMode(new TextMode());
					        editor.renderer.setHScrollBarAlwaysVisible(false);
					        //options
					        editor.setFontSize(12 + 'px')
					        editor.setSelectionStyle(true ? "line" : "text");
					        editor.session.setUseWrapMode(true);
					        editor.session.setWrapLimitRange(55, 55);
					        editor.renderer.setPrintMarginColumn(0);
					        editor.setHighlightActiveLine(omg.user.writer.setHighlightActiveLine)
					
									editor.getSession().setValue(file.textFile);

					//				editor.getSession().on('changeCharacterSize', function(e){consnole.log(OMG.writer.editor.container.style.fontSize)})
					        // set dimensions and display
					        // The default width is about 424px + 40px for the gutter = 464px

					        editor.editor_width = function(){return omg.writer.editor.renderer.characterWidth * 60 + omg.writer.editor.renderer.$padding + omg.writer.editor.renderer.$cursorPadding};
					        editor.gutter_width = function(){return $('.ace_gutter').width()};
					        editor.fullSize = function(){return editor.editor_width() + editor.gutter_width()};

					        // setting the editors CSS perameters 

					        editor.focus()
					        
									editor.lineCount = editor.getSession().getDocument().getLength();

					        // set events
									$('#options').children().each(function(i, el){
										var attr, el = el;
										if(attr = $(el).attr('data-event')){
											switch (el.nodeName.toLowerCase()) {
												case 'select':
													$(el).val(omg.user.writer[el.id])
												break;
												case 'input':
													$(el).attr('checked', omg.user.writer[el.id])
												break;
											}
									//		console.log(el, attr, el.id)
											$(el)[attr](events[el.id]) // <-----
										}
									});
									
									setTimeout(function(){
										var editor = omg.writer.editor, self = omg;
										$('head').append('<link rel="stylesheet" href="/css/writer.css" type="text/css">')				
										$('.ace_content').css('height','20')
										$('.ace_scroller').css('overflow','hidden')
										$('#editor').css({
						          left: ((winX - editor.fullSize()) / 2) + 'px',
						          right : (winX - editor.fullSize()) / 2 + 'px',
						          bottom: (winY / 2) - 20,
						          top: (winY / 2) - (omg.user.writer.setFontSize + 6),
						          visibility: 'visible'
						        });
										
										if(editor.getSession().getDocument().getLength() > editor.lineCount)
											{
						            if((editor.getSession().getDocument().getLength() * editor.renderer.lineHeight + editor.renderer.scrollBar.getWidth())  <= (winY / 2) - 10) 
													{
						                 $('#editor').css(
						                   'top', '-=' + editor.renderer.lineHeight
						                 )
														$('.ace_sb').css('visibility','hidden');
					            		}
					            	else if (omg.user.writer.showScrollX)
													{
														$('.ace_scroller').css('overflow','hidden')
														$('.ace_sb').css('visibility','visible')
													}
											}
											
										  editor.getSession().on('change', function(e){

							          if(editor.getSession().getDocument().getLength() > editor.lineCount)
													{
							            	if((editor.getSession().getDocument().getLength() * editor.renderer.lineHeight + editor.renderer.scrollBar.getWidth())  <= (winY / 2) - 10) 
															{
							                 	$('#editor').css(
							                   	'top', '-=' + editor.renderer.lineHeight
							                 	)
							                 	editor.resize() 
																$('.ace_sb').css('visibility','hidden');
							            		}
							            		
														else if (self.user.writer.showScrollX)
															$('.ace_sb').css('visibility','visible');
							          	}
							
							          editor.lineCount = editor.getSession().getDocument().getLength();
							        	$('.ace_scroller').css('overflow','hidden')
											  return
											});
											
											var blob = omg.fs.createBlob(omg.css['writer.css'], 'text/css', function(e,r){console.log(e,r)})
											,		dataURI = omg.fs.readDataUrl(blob, function(e,res){
																			$('head').append('<link rel="stylesheet" href="' + res + '">')				
																			if(e){omg.errorHandler(e)}
																		});
										
										}, 30)
									
									
									/*
					        $('#newWriter').click(self.events.newWriter)
					        $('#saveWriter').click(self.events.saveWriter)
					        $('#deleteWriter').click(self.events.deleteWriter)
					        $('#retrieveWriter').click(self.events.retrieveWriter)

					        $('#fontSizeSelect').change(self.events.fontSizeSelect)
					        $('#showGutter').change(self.events.showGutter)
					        $('#setHighlightActiveLine').change(self.events.setHighlightActiveLine)
					        $('#showScrollX').change(self.events.showScrollX)
									*/
					        // event for Highlighting

					       // editor.getSession().selection.on('changeSelection', self.events.changeSelection);

									// move this to events 			
					
				}

  };
  Writer.create = function(){
    events.newWriter()
  };
  Writer.update = function(){
    
  };
  Writer.delete = function(){
    
  };
  Writer.retreive = function(){
    
  };