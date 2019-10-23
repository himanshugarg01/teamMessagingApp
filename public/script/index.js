var app = angular.module("teamApp", ["ngRoute",'btford.socket-io'])
.factory('chatSocket', function (socketFactory) {
    return socketFactory();
   })

.factory('authHttpResponseInterceptor',['$q','$location',function($q,$location){
	return {
		response: function(response){
            console.log(response.status);
			if (response.status === 401) {
				console.log("Response 401");
			}
			return response || $q.when(response);
		},
		responseError: function(rejection) {
            console.log('reject', rejection.status);
			if (rejection.status === 401) {
				console.log("Response Error 401",rejection);
				$location.path('/').search('returnTo', $location.path());
			}
			return $q.reject(rejection);
		}
	}
}])
.config(['$httpProvider',function($httpProvider) {
	//Http Intercpetor to check auth failures for xhr requests
	$httpProvider.interceptors.push('authHttpResponseInterceptor');
}]);

app.factory("currentUser", function () {
  var user={};
  return user;
})


app.config(["$routeProvider","$locationProvider","$httpProvider",function ($routeProvider, $locationProvider,$httpProvider) {
  $routeProvider
      .when("/", {
          templateUrl: "./views/login.html",
          controller: "loginController"

      })
      .when("/signup", {
          templateUrl: "./views/signup.html",
          controller: "signupController"
      })
      .when("/channel", {
        templateUrl: "./views/mainPage.html",
        controller: "channelController"
        })
        .when("/channel/search", {
          templateUrl: "./views/searchChannel.html",
          controller: "searchChannelController"
          })
        .when("/channel/discuss/:id", {
          templateUrl: "./views/discussion.html",
          controller: "discussionController"
          })
        .when("/dashboard", {
          templateUrl: "./views/dashboard.html",
          controller: "dashboardController"
          })
      .otherwise({
          redirectTo: "/"
      });
      $locationProvider.html5Mode(true);
     
}])












