app.controller("dashboardController", ["$scope","$rootScope","$http","$location", function ($scope,$rootScope,$http,$location,) {
  
  
   
  $scope.dateFrom=new Date(Date.now());
  $scope.dateFrom.setMonth($scope.dateFrom.getMonth()-1);
  //var d=Date.now();
      $scope.dateTo=new Date(Date.now());
  //$scope.dateTo=new Date(Date.now()-31);
  

  

 
  function dashboard()
  {
    console.log("datefrom",($scope.dateFrom));
    console.log("dateto",$scope.dateTo);
   
    let from=$scope.dateFrom.toISOString().substr(0, 10);
    let to=$scope.dateTo.toISOString().substr(0, 10);;
    console.log(from,to);
    
 
    //  if($scope.prevSearchString!=$scope.searchString)
    //  {
 
    //    $scope.start=0;
    //  }
     
    //   $http({
    //       method: 'POST',
    //       data : {search : $scope.searchString,start :$scope.start },
    //       url: '/channel/search'
    //     }).then(function successCallback(res) {
    //         if(res.data.success)
    //         {
    //           console.log(res.data.data);
    //           if($scope.start==0)
    //           $scope.start+=20;
    //           if($scope.prevSearchString!=$scope.searchString)
    //           {
    //              $scope.channels=[];
                 
    //           }
    //           $scope.prevSearchString=$scope.searchString;
    //           $scope.channels=$scope.channels.concat(res.data.data);
    //         }
            
 
            
    //       }, function errorCallback(response) {
    //         console.log("err");
            
    //       });
      
  }
  
 $scope.dashboard=dashboard;
 
  
 }]);