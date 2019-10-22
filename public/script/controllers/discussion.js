
app.controller("discussionController", ["$scope","$rootScope","$http","$location","$routeParams", function ($scope,$rootScope,$http,$location,$routeParams) {
  

  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height()+650+$scope.start*180) {
        $scope.getMessages();
        $scope.start+=20;
    }
 });
 
   $scope.discussionBody="";
   $scope.channel;
   $scope.messages=[];
   $scope.start=0;
   console.log($routeParams.id);
    
  $scope.getChannel=function()
  {
    $http({
      method: 'POST',
      data : {id : $routeParams.id},
      url: '/discussion/getChannel'
    }).then(function successCallback(res) {
        if(res.data.success)
        {
          console.log(res.data.data);
          
          $scope.channel=res.data.data;
          $scope.getMessages();
        }
        

        
      }, function errorCallback(response) {
        console.log("err");
        
      });
  
  } 
 
  function sendMessage()
  {
  //    console.log($rootScope.login)
  console.log($scope.discussionBody);
      if($scope.discussionBody==undefined||$scope.discussionBody=="")
      {
        alert("message should not be empty");
      }
      else
      {
       $http({
          method: 'POST',
          data : {discussionBody : $scope.discussionBody,channel : $scope.channel},
          url: '/discussion/sendMessage'
        }).then(function successCallback(res) {
            if(res.data.success)
            {
             // alert("message success");
              $scope.messages=[res.data.data].concat($scope.messages);
              $scope.discussionBody="";
            }
            else
            {
                
            }

            
          }, function errorCallback(response) {
            console.log("err");
            
          });
        }
      
  }

$scope.getMessages=function()
  {
  //    console.log($rootScope.login);
       $http({
          method: 'POST',
          data : {channel : $scope.channel,start : $scope.start},
          url: '/discussion/getMessages'
        }).then(function successCallback(res) {
            if(res.data.success)
            {
              //console.log(res.data.data);
              if($scope.start==0)
              $scope.start+=20;
              
             $scope.messages=$scope.messages.concat(res.data.data); 
            }
            else
            {
                
            }

            
          }, function errorCallback(response) {
            console.log("err");
            
          });
      
  }

  $scope.sendMessage=sendMessage;
  $scope.getChannel();
}]);
