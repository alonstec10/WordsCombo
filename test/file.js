'use strict';
var fs 			= require('fs'), 
	utils 		= require('../utilities/utils')(), 
	supertest 	= require('supertest'),
	should 		= require('should'), 
	path 		= require('path'), 
	Words 		= require('../models/Words'),
	db 			= require('../db'), 
	assert 		= require('assert'),
	app 		= require('../app'), 
	express 	= require('express');


describe("Words:", function(){

	it("Test to exists/read word file", function(done){

		var wordfile	= __dirname + '/data/words';
		//wordfile		=	'';
		var TestObject 	=	new Words(wordfile);

		TestObject.__construct(wordfile, function(err, data){
			//check to see if there is an error
			//utils.log("in callback");
			//utils.log("error " + err);
			//utils.log("data " + data);
			
			if(!err)
			{
				TestObject.data.should.be.a.Object;
				assert.notEqual(TestObject.data.length, 0);
				done();
			}
			else
			{
				throw err;
				done();
			}
			
		});

	});

	it.skip("Test Temp Words file insert ", function(done){

		var testData	= ['test', 'blah', 'car', 'stereo', 'fish', 'programming'];

		var TestObject 	=	new Words('');
		
		TestObject.setData(testData, function(err, data){
			//check to see if there is an error
			//utils.log("error " + err);
			//utils.log("data " + data);
			
			if(!err)
			{
				//data.should.be.a.Object;
				//assert.notEqual(data.length, 0);

				TestObject.InsertData(function(err, data){

					if(err) {
						throw err
						done();
					} else {

						data.should.be.a.Object;
						assert.notEqual(data.length, 0);
						should(data).have.property('title');
						should(data).have.property('data').length(testData.length);
						
						done();
					}
				});
				
			}
			else
			{
				throw err;
				done();
			}
			
		});

	});

	it("Test Temp Words with route", function(done){

		//make sure the 2000ms doesnt trigger error 
		//saving words to mongo
		this.timeout(20000);

		supertest(app)
		.get('/api/insertWordData')
		.expect(200)
		.expect('Content-Type', /json/)
		.end(function(err, res){

			if (err) {
				throw err;
				done();
			}
			else
			{
				done();
			}
			
		});
	});


});