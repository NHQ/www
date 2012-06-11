var	utils = require('./client.utils.js')
;

module.exports = Media

function Media(title, type, opts, metaFileName, fileName){

	this.type = type || undefined;
	this.owner = omg.user.fullName || 'W. Name';
	this.title = title || 'Sans Titre';
	this.subTitles = [];
	this.description = '';
	this.file = undefined; // TBDefined in next step. Default name should be last_name_date.file
	this.file_namespace = undefined; // eg.'.js'
	// this.publisherTags = this.ownerTags = 
	this.tags = [];
	this.dateCreatedLocal = new Date().getTime();
	this._id = this.dateCreatedGLobal = utils.spaceTime();
	this.parentFile = null;
	this.children = [];
	this.location = undefined;
	this.fileMetaData = null;
	this.publisher = undefined;
	this.comments = undefined;
	this.notes = undefined;
	this.edits = undefined;
	this.sets = undefined;
	this.app = undefined;
	
	if(opts){
		utils.merge(this, opts);		
	}
	
	return this
}