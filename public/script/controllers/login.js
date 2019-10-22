
app.controller("loginController", ["$scope","$rootScope","$http","$location","currentUser", function ($scope,$rootScope,$http,$location,currentUser) {
  
  $scope.userName="";
  $scope.password="";
 
   
 
  function getLogin()
  {
  //    console.log($rootScope.login);
      $http({
          method: 'POST',
          data : {userName : $scope.userName,password : $scope.password},
          url: '/login'
        }).then(function successCallback(res) {
            if(res.data.success)
            {
              currentUser.user=res.data.data;
              
            $location.path('/channel');
            }
            else
            {
                alert("username or password is not correct");
                $location.path('/login');
            }

            
          }, function errorCallback(response) {
            console.log("err");
            
          });
      
  }
  $scope.getLogin=getLogin;
  
}]);
