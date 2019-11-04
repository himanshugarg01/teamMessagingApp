
app.controller("signupController", ["$scope","$http","$location",'$rootScope', function ($scope,$http,$location,$rootScope) {
  
  $scope.userName="";
  $scope.emailId="";
  $scope.password="";
  $scope.password1="";
  $scope.firstName="";
  $scope.lastName="";
  $scope.region="";
  $scope.incorrectUName=false;
  $rootScope.status=false;
  function signUp()
  {
    if($scope.password!=$scope.password1)
    alert("check your password");
    else
      {  
          $http({
              method: 'POST',
              data : {
                userName : $scope.userName,
                password : $scope.password,
                firstName : $scope.firstName,
                lastName : $scope.lastName,
                region : $scope.region
            },
          url: '/signup'
          }).then(function successCallback(res) {
              console.log(res);
              
              if(res.data.success)
              {
                  alert("signup successful");
                  $location.path('/');
              }
              else
              {
                  alert("signup not successful try again");
                  $location.path('/signup');
              }
  
              
              }, function errorCallback(response) {
              console.log("err");
              
              });
      
       }
  }
  function checkUsername()
  {
      if($scope.userName!="")
      {
      $http({
          method: 'POST',
          data : {userName : $scope.userName},
          url: '/signup/checkName'
      }).then(function successCallback(res) {
         //console.log(res);
          
          if(res.data.success)
          {
             console.log("fgknjkkjnjvv");
              
             $scope.incorrectUName=true;
          }
          else
          {
              $scope.incorrectUName=false;
          }

          
          }, function errorCallback(response) {
          console.log("err");
          
          });
      }
  
  }
  $scope.signUp=signUp;
  $scope.checkUsername=checkUsername;
  
}]);
