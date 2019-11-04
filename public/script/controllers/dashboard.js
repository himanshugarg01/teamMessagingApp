app.controller("dashboardController", ["$scope","$rootScope","$http","$location", function ($scope,$rootScope,$http,$location,) {
  
  
   
  $scope.dateFrom=new Date(Date.now());
  $scope.dateFrom.setMonth($scope.dateFrom.getMonth()-1);
  $scope.dateTo=new Date(Date.now());
  $scope.topRegions=[];
  $scope.topChannels=[];
  $scope.topUsers=[];
  $scope.topTags=[];
 

  

 
  function dashboard()
  {
    console.log("datefrom",($scope.dateFrom));
    console.log("dateto",$scope.dateTo);
   
    let from=$scope.dateFrom.toISOString().substr(0, 10);
    let to=$scope.dateTo.toISOString().substr(0, 10);
    console.log(from,to);
    
 
  
      $http({
          method: 'POST',
          data : {from : from,to :to },
          url: '/dashboard'
        }).then(function successCallback(res) {
            if(res.data.success)
            {
              console.log((res.data.data));
              
              $scope.topChannels=res.data.data[0].topChannels;
              $scope.topRegions=res.data.data[2].topRegions;
              $scope.topUsers=res.data.data[3].topUsers;
              $scope.topTags=res.data.data[1].topTags;
              console.log($scope.topChannels);
              
            }
            
 
            
          }, function errorCallback(response) {
            console.log("err");
            
          });
      
  }
  
 $scope.dashboard=dashboard;
 $scope.dashboard();
 
  
 }]);