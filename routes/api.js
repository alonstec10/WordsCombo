var express 	= require('express');
var router 		= express.Router(),
	utils 		= require('../utilities/utils')();
var WordApplication     = require('parse-number-word');



/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Express' });
});



router.post('/GetWord', function(req, res, next){

	
	var numbers 	=	req.body.numbers ? req.body.numbers : '';

	if(numbers.indexOf(',') > -1) {

		numbers 	=	numbers.split(",");
	} else {
		numbers 	=	[numbers];	
	}

	//utils.log("Start: ");
	//utils.LogObject(WordApplication.data);
	//utils.log("End: ");

	WordApplication.GetWordCombinationsForNumbers(numbers, function(words){


		//utils.LogObject(words);

		res.json({ success: true, message: 'Words Found.', words : words, err: ''});

	});

	
}); 

module.exports = router;