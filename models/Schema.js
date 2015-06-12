var db 		= require('../db'),
	Schema 	= db.Schema;


function Schemas() {


	this.word 	=	function(){
		var wordSchema = new Schema({
		  title     	: { type: String },
		  data   		: { type: Array }
		});
		return db.model('words', wordSchema);
	};


	return this;
}

module.exports 	=	Schemas();


