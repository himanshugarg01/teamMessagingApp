app.controller("searchChannelController", ["$scope","$rootScope","$http","$location", function ($scope,$rootScope,$http,$location,) {
  
  $scope.searchString="";
 $scope.channels=[];

 $scope.start=20;

 $(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(window).height()+200+($scope.start*80)) {
     //  $scope.getMessages();
     console.log("scroll");
     
       $scope.start+=20;
   }
});
 
$scope.getChannel =function getChannel()
 {
     $http({
         method: 'GET',
         url: '/channel/getSearch'
       }).then(function successCallback(res) {
           if(res.data.success)
           {
             console.log(res.data.data);
             $scope.channels=res.data.data;
             
           }
           
           
         }, function errorCallback(response) {
           console.log("err");
           
         });
 }

 function searchChannel()
 {
    //console.log($scope.channelName,$scope.description);
     

     $http({
         method: 'POST',
         data : {search : $scope.searchString},
         url: '/channel/search'
       }).then(function successCallback(res) {
           if(res.data.success)
           {
             console.log(res.data.data);
             $scope.channels=res.data.data;
           }
           

           
         }, function errorCallback(response) {
           console.log("err");
           
         });
     
 }
  $scope.joinChannel=function (channel)
 {
    //console.log($scope.channelName,$scope.description);
     

     $http({
         method: 'POST',
         data : {channel : channel},
         url: '/channel/joinChannel'
       }).then(function successCallback(res) {
           if(res.data.success)
           {
             
             
             alert("Channel Joined");
            for(let i=0;i<$scope.channels.length;i++)
            {
              if($scope.channels[i]==channel)
              {
                $scope.channels.splice(i,1);
                break;
              }
            }
            //  console.log(res.data.data);
            //  $scope.channels=res.data.data;
           }
           

           
         }, function errorCallback(response) {
           console.log("err");
           
         });
     
 }
$scope.searchChannel=searchChannel;
 $scope.getChannel();
 
}]);