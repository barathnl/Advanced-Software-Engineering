angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams','$http','$cordovaSms', 
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$cordovaSms) {
	$scope.searchVideo =function () {
		var search=document.getElementById("skey").value;
		var response=$http.get("http://www.omdbapi.com/?t="+search+"&y=&plot=short&r=json");
		response.success(function (data) {
			console.log(data.Title);
			console.log(data.Genre);
			console.log(data.Director);
			console.log(data.Plot);
			if(data!=null)
				{
					$scope.ReviewWithSentiment = {"mtitle" : data.Title,
												"mposter":data.Poster,
												"mgenre":data.Genre,
												"mruntime":data.Runtime,												
												"mdirector":data.Director,
												"mwriter":data.Writer,
												"mcast":data.Actors,
												"mplot":data.Plot };
					document.getElementById('div_ReviewList').style.display = 'block';


				}
		});
		
	};
	$scope.searchCritic =function () {
		var search=document.getElementById("skey").value;
		var response=$http.get("https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=e697663a6f104a80aad3c1c61352bb36&query="+search);
		response.success(function (data) {
			console.log(data);
			console.log(data.results[0].summary_short);
			if(data!=null)
				{
					$scope.ReviewWithSentiment1 = {"mreview" : data.results[0].summary_short};
					document.getElementById('div_ReviewList1').style.display = 'block';


				}
		});
		
	};
	
	$scope.showSMS =function () {
		document.getElementById('div_SMS').style.display = 'block';
	};
	
	var options = {
    replaceLineBreaks: false, // true to replace \n by a new line, false by default
    android: {
      intent: '' // send SMS with the native android SMS messaging
        //intent: '' // send SMS without open any other app
        //intent: 'INTENT' // send SMS inside a default SMS app
    }
  };
  
  $scope.sendSMS = function() {
		var search=document.getElementById("skey").value;
		var mobile=document.getElementById("mobile_num").value;
		var msg='Your friend has invited for movie '+search;
    $cordovaSms
      .send(mobile, msg, options)
      .then(function() {
        alert('Success! SMS was sent');
        // Success! SMS was sent
      }, function(error) {
        alert('Error in sending SMS');
        // An error occurred
      });
  }

}])
   
.controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('movieRateCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 