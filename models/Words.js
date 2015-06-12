'use strict';
var fs 		= require('fs'),
	utils 	= require('../utilities/utils')(),
	db 		= require('../db'), 
	Schemas	= require('../models/Schema'),
	wordSchema = Schemas.word();

var Words 	=	function(filepath) {
	
	var obj 	=	this;
	
	this.path 	=	filepath;
	this.data	=	new Object();

	this.__construct 	=	function(filepath, callback){

		try {

			if(!filepath || filepath.length <= 0) throw { message : 'File path parameter not given'};

			fs.open(filepath,'r',  function(err, fd){

				if(err)
				{
					//utils.log("File does not exist");
					callback("File does not exist", undefined);
					throw err.message;
					fs.close();
				}
				else
				{
					obj.path 	=	filepath;
					utils.log("File exists - ", "fd: " + fd, " path ", obj.path);
					


					obj.parseWords(callback);
					//fs.close();
				}
				
			});


		} catch(e) {
			//utils.log("123 " + e.message);
			callback(e.message, 0);
			fs.close();
			
		}


	};
	
	this.parseWords 		=	function(callback){

		try {

			if(this.path.length <= 0) throw {message: 'No Filepath set.'};

				fs.readFile(this.path, 'utf-8', function(err, data){

					if(err) {
						callback(err, {});
						throw err;	
					}
					else {

						obj.setData(data.split("\n"), callback);
					} 

				});

			
		} catch(e) {
				callback(e.message, {});
		}
		

	};

	this.setData 		=	function(data, callback) {

		try {

			if(data && typeof data === 'object' && data.length > 0) {
				this.data 	=	data;
				callback(null, true);
			} else {
				throw { message : 'Data was not correct'};
			}

		} catch(e) {

			callback(e.message, false);
		
		}
	};
 
	this.InsertData 	=	function(callback){

		//utils.log("insert data: ", this.data);
		//so we dont double up on data
		wordSchema.findOne({title: "Words"}, function(err, doc){

			if(!err) {
				//utils.log("there is no error");
				//utils.log("type ", typeof doc);
				//utils.LogObject(doc);

				if(doc) {
					callback(err, doc);
				} else {
					var WordData 		=	{ title: "Words", data: obj.data};

					var InsertWordData 	=	new wordSchema(WordData);

					///utils.log(InsertWordData);

					InsertWordData.save(function(err, InsertWordData){

						if(err) {
							callback(err, {});
						} else {
							callback(err, InsertWordData);
						}

					});
				}



			}
		});
	};


	return this;
};

module.exports 	=	function(filepath) {
	var model 	=	new Words(filepath);

	return model;
}