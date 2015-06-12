
var app = angular.module('numerapp', []);


app.controller('controller', ['$scope', '$http', function($scope, $http){

	
	$scope.addNumber 	=	function(num){

		var val 	=	document.getElementById('preview_numbers').value;

		val += new String(num);

		document.getElementById('preview_numbers').value = val; 


	}

	$scope.request =	function(){

		document.getElementById('response_warning').innerHTML = 'Finding words';

		var values_group 	=	[];
		var values 			=	document.getElementById('preview_numbers').value;

		if(values.length == 0) {
			alert("please enter values");
			return;
		}

		$scope.posts 	=	'';
		//document.getElementById('response').innerHTML = '';

		for(var i = 0; i < values.length;i++) {
			values_group.push(values[i]);
		}

		var post 	=	values_group.join(",");

		$http.post('/api/GetWord', {numbers:post}).
		  success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.posts 	=	data.words;

		    if(data.words.length > 0) {
		    	document.getElementById('response_warning').innerHTML = 'Words Found';
		    } else {
		    	document.getElementById('response_warning').innerHTML = 'No Words Found';
		    }


		    
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
		

	}

	$scope.posts 	=	[];

}]);